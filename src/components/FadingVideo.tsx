/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

interface FadingVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * FadingVideo component (custom JS crossfade, no CSS transitions)
 * Wraps a <video autoPlay muted playsInline preload="auto"> starting at opacity: 0.
 *
 * FADE_MS = 500, FADE_OUT_LEAD = 0.55 seconds.
 * fadeTo(target, duration) uses requestAnimationFrame; reads current opacity from video.style.opacity
 * so each new fade resumes from wherever the last one left off.
 * Each call calls cancelAnimationFrame on the previous rAF id before starting.
 * On loadeddata: set opacity 0, play(), fadeTo(1).
 * On timeupdate: if fadingOutRef not set and duration - currentTime <= 0.55 and > 0, flip the ref and fadeTo(0).
 * On ended: set opacity 0; after setTimeout(100ms) reset currentTime = 0, play(), clear fadingOutRef, fadeTo(1).
 * loop attribute is OFF (manual looping via ended event).
 */
export const FadingVideo: React.FC<FadingVideoProps> = ({ src, className, style }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const fadingOutRef = useRef<boolean>(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const FADE_MS = 500;
    const FADE_OUT_LEAD = 0.55;

    const fadeTo = (target: number, duration: number = FADE_MS) => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }

      const currentOpacityStr = video.style.opacity;
      const startOpacity = currentOpacityStr === '' ? 0 : parseFloat(currentOpacityStr);
      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const currentVal = startOpacity + (target - startOpacity) * progress;
        video.style.opacity = currentVal.toString();

        if (progress < 1) {
          rafIdRef.current = requestAnimationFrame(tick);
        } else {
          rafIdRef.current = null;
        }
      };

      rafIdRef.current = requestAnimationFrame(tick);
    };

    const handleLoadedData = () => {
      video.style.opacity = '0';
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
      fadeTo(1, FADE_MS);
    };

    const handleTimeUpdate = () => {
      if (
        !fadingOutRef.current &&
        video.duration &&
        video.duration - video.currentTime <= FADE_OUT_LEAD &&
        video.duration - video.currentTime > 0
      ) {
        fadingOutRef.current = true;
        fadeTo(0, FADE_MS);
      }
    };

    const handleEnded = () => {
      video.style.opacity = '0';
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => {
        video.currentTime = 0;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
        fadingOutRef.current = false;
        fadeTo(1, FADE_MS);
      }, 100);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    if (video.readyState >= 2) {
      handleLoadedData();
    }

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      playsInline
      preload="auto"
      className={className}
      style={{
        opacity: 0,
        ...style,
      }}
    />
  );
};
