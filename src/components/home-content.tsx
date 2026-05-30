"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Portrait } from "./portrait";
import { SettingsMenu } from "./settings-menu";
import { Button, ButtonGroup } from "./ui/button";

export function HomeContent() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-12 xl:gap-14">
      {/* Large portrait on the left */}
      <Portrait onLoad={() => setImageLoaded(true)} />

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
        <h1 className="text-[2.85rem] font-semibold tracking-tight">
          Hi, I’m Nathan
        </h1>

        <h2 className="text-3xl font-semibold text-muted-foreground/70 mt-2 mb-10">
          I’m a founder, designer, and engineer building in AI
        </h2>

        <ButtonGroup>
          <Button
            variant="outline"
            size="icon-lg"
            aria-label="X"
            render={(props) => (
              <a
                href="https://x.com/nbaschez"
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              >
                <XIcon className="h-4 w-4" />
              </a>
            )}
            nativeButton={false}
            className="w-11 bg-background/30 backdrop-blur-sm hover:bg-muted/60"
          />
          <Button
            variant="outline"
            size="lg"
            render={(props) => (
              <Link href="/about" {...props}>
                About
              </Link>
            )}
            nativeButton={false}
            className="bg-background/30 px-4 text-sm backdrop-blur-sm hover:bg-muted/60"
          />
          <Button
            variant="outline"
            size="lg"
            render={(props) => (
              <Link href="/writing" {...props}>
                Writing
              </Link>
            )}
            nativeButton={false}
            className="bg-background/30 px-4 text-sm backdrop-blur-sm hover:bg-muted/60"
          />
          <Button
            variant="outline"
            size="lg"
            render={(props) => (
              <Link href="/work" {...props}>
                Work
              </Link>
            )}
            nativeButton={false}
            className="bg-background/30 px-4 text-sm backdrop-blur-sm hover:bg-muted/60"
          />
          <SettingsMenu placement="button-group" />
          {/* <Button
              variant="ghost"
              size="sm"
              render={(props) => (
                <Link href="/beliefs" {...props}>
                  Beliefs
                </Link>
              )}
            />
            <Button
              variant="ghost"
              size="sm"
              render={(props) => (
                <Link href="/books" {...props}>
                  Books
                </Link>
              )}
            /> */}
        </ButtonGroup>
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
