"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
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

  const handleLoad = () => {
    setLoaded(true);
    onLoad?.();
  };

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
              height={684}
              className="w-full h-auto object-cover"
              priority
              placeholder="blur"
              onLoad={handleLoad}
            />

            {/* Sheen / glare layer — visible at all times, follows the cursor globally */}
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
