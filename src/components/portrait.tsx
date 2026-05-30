"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";

import nbaschezFull from "../../public/nbaschez-full.jpg";

interface PortraitProps {
  onLoad?: () => void;
}

export function Portrait({ onLoad }: PortraitProps) {
  const [loaded, setLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const prefersReducedMotion = useReducedMotion();

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

  // Sheen / glare that tracks the cursor at all times
  const glareX = useTransform(mouseX, [-0.5, 0.5], [26, 74]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], [22, 62]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 36%, transparent 70%)`;

  // Glare intensity — always present, stronger when cursor is closer or hovering
  const glareOpacity = useSpring(0.36, { stiffness: 140, damping: 22 });

  // Holographic uniform triangle field canvas
  const holoCanvasRef = useRef<HTMLCanvasElement>(null);
  const tiltRef = useRef({ tx: 0, ty: 0 });
  const canvasReadyRef = useRef(false);

  // Uniform holographic triangle field — dense geometric pattern like premium foil trading cards
  // Alternating up/down equilateral triangles in offset rows for proper tessellation
  const triangles = useMemo(() => {
    const arr: Array<{
      x: number; y: number; size: number; rot: number;
      hue: number; depth: number; baseAlpha: number; phase: number;
    }> = [];

    const TRI_SIZE = 5.1;                  // base size in percent-of-card units (visible facets)
    const ROW_H = TRI_SIZE * 0.91;         // vertical row spacing — leaves a little breathing room
    const COL_W = TRI_SIZE * 1.03;

    // Over-generate slightly for full coverage inside the rounded blue frame
    const ROWS = Math.ceil(102 / ROW_H) + 1;
    const COLS = Math.ceil(102 / COL_W) + 2;

    let idx = 0;
    for (let r = -1; r < ROWS; r++) {
      const y = -3 + r * ROW_H;
      const rowOffset = (r % 2) * (COL_W * 0.5);
      const isEvenRow = r % 2 === 0;

      for (let c = -2; c < COLS; c++) {
        const x = -5 + c * COL_W + rowOffset;

        // Tiny deterministic jitter so it doesn't feel robotic while staying very uniform
        const j = ((idx * 41) % 9) / 36 - 0.11;
        const size = TRI_SIZE * (0.975 + j * 0.05);

        // Controlled hue flow across the grid (cyan → teal → warm amber, similar to the ref)
        const hue = (192 + (((r * 13 + c * 9) % 168 + 168) % 168)) % 360;

        // Very subtle surface undulation instead of strong layered parallax
        const depth = Math.sin(r * 0.71 + c * 1.19) * 0.48;

        const baseAlpha = 0.215 + ((idx % 5) * 0.012);

        // Stable per-triangle phase for traveling sparkles as you tilt
        const phase = (r * 0.91 + c * 1.53) * 0.85;

        arr.push({
          x: x + j * 0.4,
          y: y + j * 0.28,
          size,
          rot: (isEvenRow ? 0 : 180) + ((idx % 7) - 3) * 1.4, // mostly aligned, tiny rotation variety
          hue,
          depth,
          baseAlpha,
          phase,
        });
        idx++;
      }
    }
    return arr;
  }, []);

  function drawHolo(
    ctx: CanvasRenderingContext2D,
    logicalW: number,
    logicalH: number,
    tx: number,
    ty: number,
    mx: number,
    my: number
  ) {
    ctx.clearRect(0, 0, logicalW, logicalH);

    const globalPhase = (mx * 95 + my * 71) % 360;
    const tiltMag = Math.hypot(tx, ty);

    for (const tri of triangles) {
      // Very light parallax so the geometric pattern feels printed on the surface
      // rather than individual floating pieces (strong parallax fights the uniform look)
      const px = (tri.x / 100) * logicalW + ty * tri.depth * 0.36;
      const py = (tri.y / 100) * logicalH - tx * tri.depth * 0.29;

      // Angle-dependent sparkle — tuned for traveling highlight bands across the grid.
      // Higher floor so the geometric pattern stays visible everywhere, not just where the wash is.
      const sparkle =
        Math.max(
          0.38,
          Math.sin((tx * 1.55 + ty * 1.38 + tri.phase) * 0.061) * 0.32 + 0.68
        ) * (0.88 + tiltMag * 0.32);

      const alpha = tri.baseAlpha * sparkle * (0.96 + tiltMag * 0.18);

      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(((tri.rot + ty * 0.18) * Math.PI) / 180);

      const s = tri.size;
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.58);
      ctx.lineTo(-s * 0.52, s * 0.48);
      ctx.lineTo(s * 0.52, s * 0.48);
      ctx.closePath();

      // Iridescent color that shifts with tilt + global mouse phase
      const hue = (tri.hue + globalPhase * 0.6 + (tx + ty) * 11) % 360;
      ctx.fillStyle = `hsla(${hue}, 82%, 82%, ${alpha})`;
      ctx.fill();

      // Bright holographic rim — appears on triangles currently catching the light
      if (sparkle > 0.47) {
        ctx.strokeStyle = `hsla(${(hue + 22) % 360}, 78%, 96%, ${alpha * 1.04})`;
        ctx.lineWidth = Math.max(0.65, s * 0.082);
        ctx.stroke();
      }

      ctx.restore();
    }

    // Soft holographic bloom / wash that moves with tilt and cursor.
    // Stronger and wider so it helps reveal the geometric pattern across more of the card.
    const washX = (mx * 0.62 + 0.5) * logicalW;
    const washY = (my * 0.62 + 0.5) * logicalH;
    const washGrad = ctx.createRadialGradient(
      washX - tx * 7,
      washY - ty * 5,
      4,
      washX + tx * 12,
      washY + ty * 9,
      105
    );
    washGrad.addColorStop(0, `hsla(${(195 + globalPhase * 0.45) % 360}, 78%, 79%, ${0.18 + tiltMag * 0.06})`);
    washGrad.addColorStop(0.38, `hsla(${(278 + globalPhase * 0.35) % 360}, 74%, 82%, ${0.12 + tiltMag * 0.042})`);
    washGrad.addColorStop(1, "transparent");
    ctx.fillStyle = washGrad;
    ctx.fillRect(0, 0, logicalW, logicalH);
  }

  function resizeAndDrawHolo() {
    const canvas = holoCanvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const rect = parent.getBoundingClientRect();
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
    if (!prefersReducedMotion && canvasReadyRef.current) {
      const canvas = holoCanvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const parent = canvas.parentElement;
          if (parent) {
            const r = parent.getBoundingClientRect();
            drawHolo(ctx, r.width, r.height, v, tiltRef.current.ty, mouseX.get(), mouseY.get());
          }
        }
      }
    }
  });

  useMotionValueEvent(rotateYSpring, "change", (v) => {
    tiltRef.current.ty = v;
    if (!prefersReducedMotion && canvasReadyRef.current) {
      const canvas = holoCanvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const parent = canvas.parentElement;
          if (parent) {
            const r = parent.getBoundingClientRect();
            drawHolo(ctx, r.width, r.height, tiltRef.current.tx, v, mouseX.get(), mouseY.get());
          }
        }
      }
    }
  });

  useMotionValueEvent(glareOpacity, "change", () => {
    if (!prefersReducedMotion && canvasReadyRef.current) {
      const canvas = holoCanvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const parent = canvas.parentElement;
          if (parent) {
            const r = parent.getBoundingClientRect();
            drawHolo(
              ctx,
              r.width,
              r.height,
              tiltRef.current.tx,
              tiltRef.current.ty,
              mouseX.get(),
              mouseY.get()
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

    // For reduced motion, paint a very faint static geometric triangle field once
    if (prefersReducedMotion) {
      setTimeout(() => {
        const canvas = holoCanvasRef.current;
        if (!canvas) return;
        const parent = canvas.parentElement;
        if (!parent) return;
        const rect = parent.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        const ctx = canvas.getContext("2d", { alpha: true });
        if (ctx) {
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          // Very subtle static geometric field (no animation)
          ctx.clearRect(0, 0, rect.width, rect.height);
          for (const tri of triangles) {
            const px = (tri.x / 100) * rect.width;
            const py = (tri.y / 100) * rect.height;
            ctx.save();
            ctx.translate(px, py);
            ctx.rotate((tri.rot * Math.PI) / 180);
            const s = tri.size * 0.9;
            ctx.beginPath();
            ctx.moveTo(0, -s * 0.58);
            ctx.lineTo(-s * 0.52, s * 0.48);
            ctx.lineTo(s * 0.52, s * 0.48);
            ctx.closePath();
            ctx.fillStyle = `hsla(${tri.hue}, 70%, 85%, 0.13)`;
            ctx.fill();
            ctx.restore();
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
    if (!cardRef.current || !loaded || prefersReducedMotion) return;

    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    // Normalize relative to card size — gives nice range even when cursor is nearby
    const nx = (clientX - cx) / rect.width;
    const ny = (clientY - cy) / rect.height;

    mouseX.set(Math.max(Math.min(nx, 0.5), -0.5));
    mouseY.set(Math.max(Math.min(ny, 0.5), -0.5));

    // Distance-based sheen intensity (0 at center, higher farther out within our clamp)
    const dist = Math.hypot(nx, ny);
    // Base ambient sheen + a bit more presence when the cursor is offset
    const targetOpacity = 0.32 + Math.min(dist, 0.55) * 0.42; // ~0.32 → ~0.55 range
    glareOpacity.set(targetOpacity);
  }

  function handleMouseEnter() {
    if (!loaded || prefersReducedMotion) return;
    setIsHovering(true);
    scale.set(1.008);
    // Boost the sheen when the cursor is directly on the card
    glareOpacity.set(0.92);
  }

  function handleMouseLeave() {
    setIsHovering(false);
    // Note: we do NOT reset mouseX/mouseY here anymore.
    // The global listener will continue updating tilt + sheen from wherever the cursor is.
    scale.set(1);
    // Drop back to a pleasant ambient sheen level (will be corrected by next global move)
    glareOpacity.set(0.42);
  }

  // Global mouse tracking — the card follows the cursor anywhere on screen
  useEffect(() => {
    if (!loaded || prefersReducedMotion) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      updateTilt(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", handleGlobalMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
    };
  }, [loaded, prefersReducedMotion]);

  return (
    <div className="relative w-full max-w-[550px] lg:w-[clamp(350px,40vw,550px)] lg:max-w-none lg:flex-shrink-0">
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
          style={{
            ...(prefersReducedMotion
              ? {}
              : { rotateX: rotateXSpring, rotateY: rotateYSpring }),
            scale: prefersReducedMotion ? 1 : scale,
            transformStyle: "preserve-3d",
          }}
          initial={{ opacity: 0, filter: "blur(14px)" }}
          animate={
            loaded
              ? { opacity: 1, filter: "blur(0px)" }
              : { opacity: 0, filter: "blur(14px)" }
          }
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[4px] bg-white p-[24px] shadow-2xl will-change-transform"
        >
          {/* Blue inner frame with baseball-card corner treatment (rounded NW + SE) */}
          <div
            className="relative overflow-hidden border-[12px] border-[#1E90FF]
                       rounded-tl-[56px] rounded-br-[56px] rounded-tr-[1px] rounded-bl-[1px]"
          >
            <Image
              src={nbaschezFull}
              alt="Nathan Baschez"
              width={550}
              height={646}
              className="w-full h-auto object-cover select-none"
              style={{ objectPosition: '10% 50%' }}
              priority
              placeholder="blur"
              onLoad={handleLoad}
            />

            {/* Topps logo overlaid directly on the photo with blend mode (like a printed/foil stamp in Photoshop/Figma) */}
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

            {/* Holographic triangle field — dense uniform geometric pattern (like premium foil cards).
                Canvas for crisp per-frame control over tilt-responsive iridescence and sparkles. */}
            <canvas
              ref={holoCanvasRef}
              className="absolute inset-0 z-[6] pointer-events-none
                         rounded-tl-[56px] rounded-br-[56px] rounded-tr-[1px] rounded-bl-[1px]"
              aria-hidden="true"
            />

            {/* Sheen / glare layer — visible at all times, follows the cursor globally.
                Sits above the holographic field so the white glare interacts with the iridescent colors. */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-10
                         rounded-tl-[56px] rounded-br-[56px] rounded-tr-[1px] rounded-bl-[1px]"
              style={{
                background: glareBackground,
                opacity: prefersReducedMotion ? 0 : glareOpacity,
              }}
            />
          </div>

          {/* NB Pennant — placed on top of the blue border, not clipped by it */}
          <img
            src="/nb-pennant.svg"
            alt=""
            className="absolute bottom-[2px] right-[4px] w-[80%] z-30 pointer-events-none select-none"
            draggable={false}
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </div>
  );
}
