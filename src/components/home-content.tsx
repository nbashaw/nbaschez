"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import nbaschezFull from "../../public/nbaschez-full.jpg";

export function HomeContent() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-12 xl:gap-14">
      {/* Large portrait on the left */}
      <div className="relative w-full max-w-[550px] lg:w-[clamp(350px,40vw,550px)] lg:max-w-none lg:flex-shrink-0">
        {/* Very subtle light source / glow emanating from behind the photo.
            Inspired by modern tasteful dark-mode hero treatments (soft radial
            ambient glow with heavy blur + low opacity, seen on premium portfolios). */}
        <div
          className="absolute -inset-10 bg-[radial-gradient(circle_at_50%_32%,rgba(255,255,255,0.13)_0%,transparent_62%)] blur-[62px] rounded-[4.5rem] -z-10 pointer-events-none"
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, filter: "blur(14px)" }}
          animate={
            imageLoaded
              ? { opacity: 1, filter: "blur(0px)" }
              : { opacity: 0, filter: "blur(14px)" }
          }
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[3px] border-t-2 border-white"
        >
          <Image
            src={nbaschezFull}
            alt="Nathan Baschez"
            width={550}
            height={684}
            className="w-full h-auto object-cover"
            priority
            placeholder="blur"
            onLoad={() => setImageLoaded(true)}
          />
        </motion.div>
      </div>

      {/* Content on the right */}
      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={
          imageLoaded
            ? { opacity: 1, filter: "blur(0px)" }
            : { opacity: 0, filter: "blur(10px)" }
        }
        transition={{
          duration: 0.75,
          delay: imageLoaded ? 0.12 : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="flex-1 min-w-0 max-w-[38ch] lg:max-w-[42ch]"
      >
        <h1 className="text-3xl font-semibold tracking-tight">
          Hi, I'm Nathan.
        </h1>

        <p className="text-2xl font-semibold text-muted-foreground mt-4 mb-10">
          I'm an entrepreneur and interface designer living in California. I
          enjoy programming, writing, and strategy, too.
        </p>

        <div className="flex items-center gap-6 text-base">
          <a
            href="https://x.com/nbaschez"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            className="opacity-50 hover:opacity-100 transition-opacity"
          >
            <XIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://www.linkedin.com/in/nbashaw"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="opacity-50 hover:opacity-100 transition-opacity"
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
          </a>
          <Link
            href="/lore"
            className="opacity-50 hover:opacity-100 transition-opacity hover:underline"
          >
            About
          </Link>
          <Link
            href="/writing"
            className="opacity-50 hover:opacity-100 transition-opacity hover:underline"
          >
            Writing
          </Link>
          {/* <Link
            href="/work"
            className="opacity-50 hover:opacity-100 transition-opacity hover:underline"
          >
            Work
          </Link>
          <Link
            href="/beliefs"
            className="opacity-50 hover:opacity-100 transition-opacity hover:underline"
          >
            Beliefs
          </Link>
          <Link
            href="/books"
            className="opacity-50 hover:opacity-100 transition-opacity hover:underline"
          >
            Books
          </Link> */}
        </div>
      </motion.div>
    </div>
  );
}

// Icon components (moved here for reusability)
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 1227"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.266 2.37 4.266 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.064 0-1.14.92-2.064 2.063-2.064 1.14 0 2.064.925 2.064 2.064 0 1.139-.925 2.064-2.064 2.064zM6.977 20.452H3.69V9h3.287v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
