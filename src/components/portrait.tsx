"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import nbaschezBg from "../../public/nbaschez-full-bg.jpg";
import nbaschezFg from "../../public/nbaschez-full-fg.png";
import { useModalOpen } from "./modal-context";
import { useTheme } from "./theme-context";

interface PortraitProps {
  onLoad?: () => void;
}

type DeviceOrientationEventConstructor = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<PermissionState>;
};

export function Portrait({ onLoad }: PortraitProps) {
  const [loaded, setLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { isModalOpen } = useModalOpen();
  const { baseballMode } = useTheme();

  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse position normalized to -0.5 ... 0.5 range
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 3D tilt springs — restrained for a tasteful "baseball card" feel
  const tiltX = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
  const tiltY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);

  const rotateXSpring = useSpring(tiltX, {
    stiffness: 280,
    damping: 26,
    mass: 0.6,
  });
  const rotateYSpring = useSpring(tiltY, {
    stiffness: 280,
    damping: 26,
    mass: 0.6,
  });

  // Subtle lift + breathing room on hover
  const scale = useSpring(1, {
    stiffness: 300,
    damping: 25,
    mass: 0.5,
  });

  // Foreground subject transforms — modeled as closer on the Z axis.
  // Closer objects should:
  //   - Rotate less extremely than the main card (feels like it's on its own floating plane)
  //   - Have stronger 2D parallax movement during tilt
  const fgRotateX = useTransform(rotateXSpring, (v) => v * 0.38);
  const fgRotateY = useTransform(rotateYSpring, (v) => v * 0.38);
  const fgParallaxX = useTransform(rotateYSpring, [-7, 7], [4.5, -4.5]);
  const fgParallaxY = useTransform(rotateXSpring, [-7, 7], [-2.8, 2.8]);

  // Photo / background layer (bg image + holographic guilloche + Topps stamp).
  // Applies light parallax vs the outer card frame (white padding + blue border).
  // Creates subtle depth between the printed photo area and the physical card "stock".
  // IMPORTANT: the hologram canvas lives inside this layer's motion wrapper so the
  // guilloche pattern translates/rotates in lockstep with the bg photo — they read as one.
  const photoRotateX = useTransform(rotateXSpring, (v) => v * 0.88);
  const photoRotateY = useTransform(rotateYSpring, (v) => v * 0.88);
  const photoParallaxX = useTransform(rotateYSpring, [-7, 7], [2.1, -2.1]);
  const photoParallaxY = useTransform(rotateXSpring, [-7, 7], [-1.2, 1.2]);

  // Overall sheen / glare on top — follows the card tilt for a specular highlight effect
  const glareX = useTransform(rotateYSpring, [-7, 7], [74, 26]);
  const glareY = useTransform(rotateXSpring, [-7, 7], [62, 22]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 36%, transparent 70%)`;
  const glareOpacity = useSpring(0.38, { stiffness: 140, damping: 22 });

  // Holographic guilloche canvas
  const holoCanvasRef = useRef<HTMLCanvasElement>(null);
  const tiltRef = useRef({ tx: 0, ty: 0 });
  const canvasReadyRef = useRef(false);
  const gyroEnabledRef = useRef(false);
  const gyroOriginRef = useRef<{ beta: number; gamma: number } | null>(null);

  // Guilloche (ellipse rosette) configuration — tuned for nice coverage and smoothness
  const guillocheLayers = [
    {
      angle: 12,
      frequency: 19,
      amplitude: 3.1,
      count: 46,
      hueOffset: 195,
      phaseOffset: 0,
      lineWidth: 0.65,
      brightnessMul: 1.0,
    },
    {
      angle: -47,
      frequency: 26,
      amplitude: 2.4,
      count: 39,
      hueOffset: 265,
      phaseOffset: 2.1,
      lineWidth: 0.55,
      brightnessMul: 0.95,
    },
    {
      angle: 68,
      frequency: 15,
      amplitude: 2.8,
      count: 34,
      hueOffset: 145,
      phaseOffset: 4.3,
      lineWidth: 0.6,
      brightnessMul: 1.05,
    },
  ] as const;

  // Controls how smooth the ellipse curves are (higher = smoother, slightly more expensive)
  const curveResolution = 150;

  function drawHolo(
    ctx: CanvasRenderingContext2D,
    logicalW: number,
    logicalH: number,
    tx: number,
    ty: number,
    mx: number,
    my: number,
  ) {
    ctx.clearRect(0, 0, logicalW, logicalH);

    const globalPhase = (mx * 95 + my * 71) % 360;
    const tiltMag = Math.hypot(tx, ty);

    // Global opacity for the whole holographic guilloche layer
    const HOLO_OPACITY = 0.5;

    // Rotated ellipse rosettes — classic smooth guilloche style.
    // Many slightly rotated ellipses create rich moiré patterns with very organic curves.
    const cx = logicalW / 2;
    const cy = logicalH / 2;

    // Three ellipse groups (repurposing the 3 layers)
    // Scaled to cover the full background area
    const maxDim = Math.min(logicalW, logicalH);

    const ellipseGroups = [
      {
        baseRx: maxDim * 0.42,
        baseRy: maxDim * 0.16,
        countMul: 2.8,
        layer: guillocheLayers[0],
      },
      {
        baseRx: maxDim * 0.62,
        baseRy: maxDim * 0.23,
        countMul: 2.4,
        layer: guillocheLayers[1],
      },
      {
        baseRx: maxDim * 0.9,
        baseRy: maxDim * 0.33,
        countMul: 2.1,
        layer: guillocheLayers[2],
      },
    ];

    for (const group of ellipseGroups) {
      const L = group.layer;

      const num = Math.max(24, Math.floor(L.frequency * group.countMul));
      const step = 360 / num;

      const rx = group.baseRx + L.amplitude * (group.baseRx * 0.04);
      const ry = group.baseRy + L.amplitude * (group.baseRy * 0.04);

      ctx.lineWidth = Math.max(0.4, L.lineWidth * 1.3);
      ctx.lineCap = "round";

      for (let i = 0; i < num; i++) {
        const rot = L.angle + i * step;

        // Tilt-reactive brightness — ellipses "catch" light when their long axis aligns with tilt
        const ellipseAngle = rot;
        const alignment = Math.abs(
          Math.cos(
            ((ellipseAngle - (Math.atan2(ty, tx) * 180) / Math.PI) * Math.PI) /
              180,
          ),
        );
        const bright =
          (0.65 + alignment * 0.7 + tiltMag * 0.5) * L.brightnessMul;
        const alpha = Math.min(0.9, 0.13 + bright * 0.22) * HOLO_OPACITY;

        const hue = (L.hueOffset + globalPhase * 0.35 + i * 2.2) % 360;
        ctx.strokeStyle = `hsla(${hue}, 78%, 86%, ${alpha})`;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate((rot * Math.PI) / 180);

        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    }
  }

  function getPhotoRect(parent: HTMLElement) {
    // offsetWidth/Height give the stable layout box size, ignoring CSS transforms
    // (our photo layer scale/rotate + ancestor tilt). This keeps the guilloche
    // pattern geometry perfectly registered to the bg image at all times.
    return { width: parent.offsetWidth, height: parent.offsetHeight };
  }

  function resizeAndDrawHolo() {
    const canvas = holoCanvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const rect = getPhotoRect(parent);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const tx = tiltRef.current.tx;
    const ty = tiltRef.current.ty;
    const mx = mouseX.get();
    const my = mouseY.get();

    drawHolo(ctx, rect.width, rect.height, tx, ty, mx, my);
    canvasReadyRef.current = true;
  }

  // Canvas redraw listeners — top level hooks (framer-motion requirement)
  useMotionValueEvent(rotateXSpring, "change", (v) => {
    tiltRef.current.tx = v;
    if (!prefersReducedMotion && !isModalOpen && canvasReadyRef.current) {
      const canvas = holoCanvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const parent = canvas.parentElement;
          if (parent) {
            const r = getPhotoRect(parent);
            drawHolo(
              ctx,
              r.width,
              r.height,
              v,
              tiltRef.current.ty,
              mouseX.get(),
              mouseY.get(),
            );
          }
        }
      }
    }
  });

  useMotionValueEvent(rotateYSpring, "change", (v) => {
    tiltRef.current.ty = v;
    if (!prefersReducedMotion && !isModalOpen && canvasReadyRef.current) {
      const canvas = holoCanvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const parent = canvas.parentElement;
          if (parent) {
            const r = getPhotoRect(parent);
            drawHolo(
              ctx,
              r.width,
              r.height,
              tiltRef.current.tx,
              v,
              mouseX.get(),
              mouseY.get(),
            );
          }
        }
      }
    }
  });

  useMotionValueEvent(glareOpacity, "change", () => {
    if (!prefersReducedMotion && !isModalOpen && canvasReadyRef.current) {
      const canvas = holoCanvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const parent = canvas.parentElement;
          if (parent) {
            const r = getPhotoRect(parent);
            drawHolo(
              ctx,
              r.width,
              r.height,
              tiltRef.current.tx,
              tiltRef.current.ty,
              mouseX.get(),
              mouseY.get(),
            );
          }
        }
      }
    }
  });

  const handleLoad = () => {
    setLoaded(true);
    onLoad?.();
  };

  // Setup holographic canvas size + ResizeObserver + first draw (after image is ready)
  useEffect(() => {
    if (!loaded) return;

    const canvas = holoCanvasRef.current;
    if (!canvas) return;

    // Initial size + draw (multiple rAFs to survive image layout settling)
    requestAnimationFrame(() => {
      resizeAndDrawHolo();
      requestAnimationFrame(() => resizeAndDrawHolo());
      setTimeout(() => resizeAndDrawHolo(), 120);
    });

    // For reduced motion, paint a very faint static guilloche field once
    if (prefersReducedMotion) {
      setTimeout(() => {
        const canvas = holoCanvasRef.current;
        if (!canvas) return;
        const parent = canvas.parentElement;
        if (!parent) return;
        const rect = getPhotoRect(parent);
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        const ctx = canvas.getContext("2d", { alpha: true });
        if (ctx) {
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          // Very subtle static guilloche field (no animation)
          ctx.clearRect(0, 0, rect.width, rect.height);
          ctx.strokeStyle = "rgba(180, 200, 220, 0.09)";
          ctx.lineWidth = 0.6;
          // Simple static fine lines as placeholder
          for (let i = 0; i < 38; i++) {
            const y = (i / 37) * rect.height;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(rect.width, y);
            ctx.stroke();
          }
        }
      }, 180);
    }

    // Keep it crisp on resize (the card is responsive)
    const parent = canvas.parentElement;
    if (!parent) return;

    const ro = new ResizeObserver(() => {
      requestAnimationFrame(() => resizeAndDrawHolo());
    });
    ro.observe(parent);

    return () => ro.disconnect();
  }, [loaded, prefersReducedMotion]);

  // Updates tilt based on any client coordinates (used by global listener)
  function updateTilt(clientX: number, clientY: number) {
    if (isModalOpen || !cardRef.current || !loaded || prefersReducedMotion)
      return;

    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    // Normalize relative to card size — gives nice range even when cursor is nearby
    const nx = (clientX - cx) / rect.width;
    const ny = (clientY - cy) / rect.height;

    mouseX.set(Math.max(Math.min(nx, 0.5), -0.5));
    mouseY.set(Math.max(Math.min(ny, 0.5), -0.5));

    // Base sheen level (position is driven by tilt, not mouse distance)
    glareOpacity.set(0.38);
  }

  const updateTiltFromDeviceOrientation = useCallback(
    (beta: number | null, gamma: number | null) => {
      if (
        isModalOpen ||
        !loaded ||
        prefersReducedMotion ||
        beta === null ||
        gamma === null
      ) {
        return;
      }

      if (!gyroOriginRef.current) {
        gyroOriginRef.current = { beta, gamma };
      }

      const betaDelta = beta - gyroOriginRef.current.beta;
      const gammaDelta = gamma - gyroOriginRef.current.gamma;

      mouseX.set(Math.max(Math.min(gammaDelta / 28, 0.5), -0.5));
      mouseY.set(Math.max(Math.min(-betaDelta / 36, 0.5), -0.5));
      glareOpacity.set(0.56);
    },
    [glareOpacity, isModalOpen, loaded, mouseX, mouseY, prefersReducedMotion],
  );

  function enableGyroTilt() {
    if (
      typeof window === "undefined" ||
      gyroEnabledRef.current ||
      !("DeviceOrientationEvent" in window)
    ) {
      return;
    }

    const DeviceOrientation =
      window.DeviceOrientationEvent as DeviceOrientationEventConstructor;

    const markEnabled = () => {
      gyroEnabledRef.current = true;
      gyroOriginRef.current = null;
    };

    if (typeof DeviceOrientation.requestPermission === "function") {
      DeviceOrientation.requestPermission()
        .then((permission) => {
          if (permission === "granted") markEnabled();
        })
        .catch(() => {
          // Some browsers expose the API but deny access outside secure contexts.
        });
    } else {
      markEnabled();
    }
  }

  function handleMouseEnter() {
    if (isModalOpen || !loaded || prefersReducedMotion) return;
    setIsHovering(true);
    scale.set(1.008);
    // Strong boost on direct hover
    glareOpacity.set(0.92);
  }

  function handleMouseLeave() {
    setIsHovering(false);
    // Note: we do NOT reset mouseX/mouseY here anymore.
    // The global listener will continue updating tilt from wherever the cursor is.
    scale.set(1);
    // Return to base level
    glareOpacity.set(0.38);
  }

  // Global mouse tracking — the card follows the cursor anywhere on screen
  useEffect(() => {
    if (isModalOpen || !loaded || prefersReducedMotion) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      updateTilt(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", handleGlobalMouseMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
    };
  }, [isModalOpen, loaded, prefersReducedMotion]);

  // Mobile gyro tracking — mirrors the mouse tilt path once the device allows it.
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      isModalOpen ||
      !loaded ||
      prefersReducedMotion ||
      !("DeviceOrientationEvent" in window)
    ) {
      return;
    }

    const isLikelyTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (!isLikelyTouchDevice) return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (!gyroEnabledRef.current) return;
      updateTiltFromDeviceOrientation(event.beta, event.gamma);
    };

    window.addEventListener("deviceorientation", handleOrientation, {
      passive: true,
    });

    const DeviceOrientation =
      window.DeviceOrientationEvent as DeviceOrientationEventConstructor;
    if (typeof DeviceOrientation.requestPermission !== "function") {
      gyroEnabledRef.current = true;
      gyroOriginRef.current = null;
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [
    isModalOpen,
    loaded,
    prefersReducedMotion,
    updateTiltFromDeviceOrientation,
  ]);

  // When a modal opens, immediately relax the card to a neutral flat state.
  // This stops all tilt/parallax motion while the modal is visible.
  useEffect(() => {
    if (isModalOpen) {
      mouseX.set(0);
      mouseY.set(0);
      scale.set(1);
      glareOpacity.set(0.38);
    }
  }, [isModalOpen]);

  // Visual treatment depends on baseballMode
  const isBaseball = baseballMode;
  const cardStockClass = isBaseball
    ? "relative overflow-hidden rounded-[4px] bg-white p-[24px] shadow-2xl will-change-transform"
    : "relative overflow-hidden rounded-3xl bg-transparent p-0 shadow-none will-change-transform";

  const frameBorderClass = isBaseball
    ? "border-[12px] border-[#1E90FF]"
    : "border-0";

  const frameRadiusClass = isBaseball
    ? "rounded-tl-[56px] rounded-br-[56px] rounded-tr-[1px] rounded-bl-[1px]"
    : "rounded-3xl";

  const photoScale = isBaseball ? 1.018 : 1;

  return (
    <div className="relative w-full max-w-60 sm:max-w-[550px] lg:w-[clamp(350px,40vw,550px)] lg:max-w-none lg:flex-shrink-0">
      {/* Very subtle light source / glow emanating from behind the photo.
          Inspired by modern tasteful dark-mode hero treatments (soft radial
          ambient glow with heavy blur + low opacity, seen on premium portfolios). */}
      <div
        className="absolute -inset-10 bg-[radial-gradient(circle_at_50%_32%,rgba(255,255,255,0.13)_0%,transparent_62%)] blur-[62px] rounded-[4.5rem] -z-10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Perspective container — only the card tilts, glow stays flat behind it */}
      <div className="perspective-[1200px]">
        <motion.div
          ref={cardRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onPointerDown={enableGyroTilt}
          style={{
            ...(prefersReducedMotion || isModalOpen
              ? {}
              : { rotateX: rotateXSpring, rotateY: rotateYSpring }),
            scale: prefersReducedMotion || isModalOpen ? 1 : scale,
            transformStyle: "preserve-3d",
          }}
          initial={{ opacity: 0, filter: "blur(14px)" }}
          animate={
            loaded
              ? { opacity: 1, filter: "blur(0px)" }
              : { opacity: 0, filter: "blur(14px)" }
          }
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={cardStockClass}
        >
          {/* Inner frame: full baseball card border treatment when on, clean modern radius when off */}
          <div
            className={`relative overflow-hidden ${frameBorderClass} ${frameRadiusClass}`}
          >
            {/* Photo layer (bg image + Topps logo stamp + holographic guilloche).
                Light parallax + tiny scale bleed vs the blue frame / outer white card.
                This gives the subtle "printed photo plate" depth the user requested.
                The guilloche canvas is inside this wrapper → moves as one with the bg photo. */}
            <motion.div
              style={{
                ...(prefersReducedMotion || isModalOpen
                  ? {}
                  : {
                      rotateX: photoRotateX,
                      rotateY: photoRotateY,
                      x: photoParallaxX,
                      y: photoParallaxY,
                      scale: photoScale,
                    }),
                transformStyle: "preserve-3d",
              }}
              className="relative"
            >
              <Image
                src={nbaschezBg}
                alt="Nathan Baschez"
                width={550}
                height={646}
                className="w-full h-auto object-cover select-none"
                style={{ objectPosition: "10% 50%" }}
                priority
                placeholder="blur"
                onLoad={handleLoad}
              />

              {/* Topps logo only in full baseball card mode (printed/foil stamp treatment) */}
              {isBaseball && (
                <svg
                  viewBox="0 0 192.756 192.756"
                  className="absolute top-[12px] left-[18px] w-[36px] h-auto z-[3] pointer-events-none select-none mix-blend-multiply opacity-50"
                  aria-hidden="true"
                >
                  <g fill="#0f172a">
                    <path d="M27.92 117.616l9.662-24.675C41.629 82.757 53.38 81.06 56.905 81.06h59.404l5.354-13.839H47.635l5.614-14.1H37.19c-6.267 15.928-14.884 14.1-19.845 14.1H6.901l-5.484 13.84h24.937L9.512 123.883c-4.831 12.403 5.222 15.667 9.792 15.667h38.253l5.223-13.316H33.535c-7.573-.001-7.181-4.57-5.615-8.618z" />
                    <path d="M111.238 86.89H84.212l-20.628 52.745H76.64l7.795-19.957.038.112h14.101c4.83 0 9.66-3.655 10.967-7.05l7.18-18.017c1.306-3.525 1.306-7.833-5.483-7.833zm-10.445 15.667c-2.197 5.492-5.222 4.7-5.222 4.7h-6.283l3.672-9.4h6.136c1.828-.001 3.263.783 1.697 4.7zM151.127 86.89h-27.025l-20.629 52.745h13.057l7.832-20.05.002.205h14.1c4.83 0 9.662-3.655 10.967-7.05l7.182-18.017c1.303-3.525 1.303-7.833-5.486-7.833zm-10.443 15.667c-2.197 5.492-5.223 4.7-5.223 4.7h-6.283l3.672-9.4h6.137c1.825-.001 3.263.783 1.697 4.7zM71.433 86.84H52.828c-3.395 0-9.008.914-11.489 7.312.13 0-6.397 16.581-6.397 16.581-1.566 3.524-2.48 9.008 4.047 9.008h19.78c4.831 0 9.662-3.655 10.967-7.05l7.181-18.017c1.305-3.526 1.305-7.834-5.484-7.834zm-9.857 13.709l-2.089 5.483c-.522 1.436-2.351 2.741-3.786 2.741h-4.309c-1.566 0-2.22-1.044-1.306-3.395l1.828-4.83c.914-2.089 2.35-2.742 3.656-2.742h4.309c1.697.001 2.219 1.437 1.697 2.743z" />
                    <path d="M171.559 99.358c.521-.914 1.109-1.502 3.068-1.502h12.402l4.309-10.966h-20.105c-3.656 0-7.441 1.044-9.27 5.744l-5.484 14.1c-1.305 2.873-1.436 8.617 4.832 8.617h5.092c1.566 0 2.35 1.306 1.697 2.872l-1.895 5.026c-.783 1.566-2.023 3.068-4.504 3.068h-32.77l-5.223 13.316h39.689c3.787 0 8.748-.392 11.49-7.441l8.094-20.628c1.307-3.395.393-7.181-3.916-7.181h-6.92c-1.502 0-2.09-1.045-1.566-2.48l.98-2.545z" />
                  </g>
                </svg>
              )}

              {/* Holographic guilloche field — rotated ellipse rosettes for smooth, rich moiré patterns.
                Canvas for crisp per-frame control over the pattern. Lives inside the photo layer
                wrapper so it is locked to the bg image (they appear as a single printed layer). */}
              <canvas
                ref={holoCanvasRef}
                className={`absolute inset-0 z-[6] pointer-events-none ${frameRadiusClass}`}
                aria-hidden="true"
              />
            </motion.div>

            {/* Foreground subject cutout (transparent PNG).
                Positioned above the photo layer (bg + holo). Slightly oversized + reduced tilt + stronger parallax.
                This + the photo layer's own light differential vs frame gives layered parallax:
                frame (white+blue) → photo bg/holo → fg subject. */}
            <motion.img
              src="/nbaschez-full-fg.png"
              alt=""
              className={`absolute inset-0 z-[8] pointer-events-none select-none ${frameRadiusClass}`}
              style={{
                objectFit: "cover",
                objectPosition: "10% 50%",
                scale: prefersReducedMotion || isModalOpen ? 1 : 1.06,
                rotateX: prefersReducedMotion || isModalOpen ? 0 : fgRotateX,
                rotateY: prefersReducedMotion || isModalOpen ? 0 : fgRotateY,
                x: prefersReducedMotion || isModalOpen ? 0 : fgParallaxX,
                y: prefersReducedMotion || isModalOpen ? 0 : fgParallaxY,
              }}
              draggable={false}
            />

            {/* Overall sheen / glare on top — white moving highlight that follows card tilt.
                Sits above the triangles and foreground cutout for a nice specular foil effect. */}
            <motion.div
              className={`absolute inset-0 pointer-events-none z-10 ${frameRadiusClass}`}
              style={{
                background: glareBackground,
                opacity: prefersReducedMotion || isModalOpen ? 0 : glareOpacity,
              }}
            />
          </div>

          {/* NB Pennant — only in full baseball card mode, placed on top of the blue border */}
          {isBaseball && (
            <img
              src="/nb-pennant.svg"
              alt=""
              className="absolute bottom-[2px] right-[4px] w-[80%] z-30 pointer-events-none select-none"
              draggable={false}
              aria-hidden="true"
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}
