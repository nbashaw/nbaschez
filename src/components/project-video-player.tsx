"use client";

import { Maximize } from "lucide-react";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

interface ProjectVideoPlayerProps {
  poster: string;
  src: string;
  title: string;
}

interface WebkitFullscreenVideoElement extends HTMLVideoElement {
  webkitEnterFullscreen?: () => void;
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

function PlayIcon() {
  return (
    <svg
      className="ml-0.5 size-4"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M4 2.5v11l9-5.5-9-5.5z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg
      className="size-4"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M3.5 2.5h3v11h-3v-11zM9.5 2.5h3v11h-3v-11z" />
    </svg>
  );
}

export function ProjectVideoPlayer({
  poster,
  src,
  title,
}: ProjectVideoPlayerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;
  const progressStyle = {
    "--progress-percent": `${progressPercent}%`,
  } as CSSProperties;

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const syncDuration = () => {
      setDuration(Number.isFinite(video.duration) ? video.duration : 0);
      setProgress(video.currentTime);
    };
    const handleEnded = () => setIsPlaying(false);
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handleTimeUpdate = () => setProgress(video.currentTime);

    video.addEventListener("ended", handleEnded);
    video.addEventListener("durationchange", syncDuration);
    video.addEventListener("loadedmetadata", syncDuration);
    video.addEventListener("pause", handlePause);
    video.addEventListener("play", handlePlay);
    video.addEventListener("timeupdate", handleTimeUpdate);
    syncDuration();
    setIsPlaying(!video.paused);

    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("durationchange", syncDuration);
      video.removeEventListener("loadedmetadata", syncDuration);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  const togglePlayback = async () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      await video.play();
    } else {
      video.pause();
    }
  };

  const seek = (value: string) => {
    const video = videoRef.current;
    const nextTime = Number(value);

    if (!video || !Number.isFinite(nextTime)) {
      return;
    }

    video.currentTime = nextTime;
    setProgress(nextTime);
  };

  const enterFullscreen = async () => {
    const wrapper = wrapperRef.current;
    const video = videoRef.current as WebkitFullscreenVideoElement | null;

    if (wrapper?.requestFullscreen) {
      await wrapper.requestFullscreen();
      return;
    }

    video?.webkitEnterFullscreen?.();
  };

  return (
    <div
      ref={wrapperRef}
      className="group relative overflow-hidden rounded-[3px] bg-muted/40"
    >
      <button
        type="button"
        className="block w-full cursor-pointer text-left"
        onClick={togglePlayback}
        aria-label={`${isPlaying ? "Pause" : "Play"} ${title} video`}
      >
        <video
          ref={videoRef}
          className="block h-auto w-full"
          poster={poster}
          preload="metadata"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={src} type="video/mp4" />
          <track
            kind="captions"
            src="/projects/tfl-vid-captions.vtt"
            srcLang="en"
            label="English"
          />
        </video>
      </button>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent px-3 pb-3 pt-10 opacity-100 transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
        <div className="flex items-center gap-2 text-white">
          <button
            type="button"
            className="grid size-8 flex-shrink-0 cursor-pointer place-items-center bg-transparent text-white/85 transition hover:scale-105 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            onClick={togglePlayback}
            aria-label={`${isPlaying ? "Pause" : "Play"} ${title} video`}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>

          <div className="min-w-[3.5rem] text-right font-mono text-[11px] tabular-nums text-white/80">
            {formatTime(progress)}
          </div>

          <div className="relative h-6 min-w-0 flex-1" style={progressStyle}>
            <div
              className="pointer-events-none absolute inset-x-0 top-1/2 h-4 -translate-y-1/2 overflow-hidden rounded-[2px]"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgb(255_255_255_/_0.34)_0_0.7px,transparent_0.85px)] bg-[length:6px_4px]" />
              <div className="absolute inset-y-0 left-0 w-[var(--progress-percent)] overflow-hidden bg-[radial-gradient(circle,rgb(255_255_255)_0_1.15px,transparent_1.25px)] bg-[length:4px_4px]" />
            </div>
            <input
              aria-label={`Seek ${title} video`}
              className="relative h-6 w-full cursor-pointer appearance-none bg-transparent disabled:cursor-default [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-2.5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-[1px] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-sm [&::-moz-range-track]:h-4 [&::-moz-range-track]:rounded-[2px] [&::-moz-range-track]:bg-transparent [&::-webkit-slider-runnable-track]:h-4 [&::-webkit-slider-runnable-track]:rounded-[2px] [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:mt-0 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-[1px] [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-sm"
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={Math.min(progress, duration || progress)}
              disabled={duration <= 0}
              onChange={(event) => seek(event.target.value)}
              onInput={(event) => seek(event.currentTarget.value)}
            />
          </div>

          <div className="hidden min-w-[3.5rem] font-mono text-[11px] tabular-nums text-white/55 sm:block">
            {formatTime(duration)}
          </div>

          <button
            type="button"
            className="grid size-8 flex-shrink-0 cursor-pointer place-items-center bg-transparent text-white/60 transition hover:scale-105 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            onClick={enterFullscreen}
            aria-label={`View ${title} video fullscreen`}
          >
            <Maximize className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
