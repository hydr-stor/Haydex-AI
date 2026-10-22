/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { FadingVideo } from './FadingVideo';
import { BlurText } from './BlurText';
import { ArrowUpRightIcon, PlayIcon, ClockIcon, GlobeIcon } from './Icons';

interface HeroSectionProps {
  onStartVoyage: () => void;
  onViewLiftoff: () => void;
  onSelectPartner?: (partnerName: string) => void;
}

const HERO_VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4';

const PARTNERS = ['Aeon', 'Vela', 'Apex', 'Orbit', 'Zeno'];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartVoyage,
  onViewLiftoff,
  onSelectPartner,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full bg-black overflow-hidden flex flex-col justify-between select-none"
    >
      {/* Background video (120% width/height, top-aligned, centered horizontally — focal point is top of frame) */}
      <FadingVideo
        src={HERO_VIDEO_SRC}
        className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top z-0 pointer-events-none"
        style={{ width: '120%', height: '120%' }}
      />

      {/* Hero content (centered, pt-24 px-4, flex-1) */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center pt-28 md:pt-32 px-4 max-w-4xl mx-auto">
        {/* Badge (delay 0.4s) */}
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          className="liquid-glass rounded-full inline-flex items-center gap-2 p-1 pr-3.5 mb-6"
        >
          <span className="bg-white text-black px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider">
            New
          </span>
          <span className="text-sm text-white/90 font-body pr-1">
            Maiden Crewed Voyage to Mars Arrives 2026
          </span>
        </motion.div>

        {/* Headline — BlurText component */}
        <BlurText
          text="Venture Past Our Sky Across the Universe"
          className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.8] max-w-2xl justify-center tracking-[-4px]"
        />

        {/* Subheading (delay 0.8s) */}
        <motion.p
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
          className="mt-4 text-sm md:text-base text-white max-w-2xl font-body font-light leading-tight text-center px-2"
        >
          Discover the universe in ways once unimaginable. Our pioneering vessels and breakthrough engineering
          bring deep-space exploration within reach—secure and extraordinary.
        </motion.p>

        {/* CTAs (delay 1.1s) */}
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1, ease: 'easeOut' }}
          className="flex items-center gap-6 mt-6"
        >
          {/* Primary CTA */}
          <button
            onClick={onStartVoyage}
            className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium text-white flex items-center gap-2 cursor-pointer hover:bg-white/10 active:scale-95 transition-all shadow-xl group"
          >
            <span>Start Your Voyage</span>
            <ArrowUpRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          {/* Secondary CTA */}
          <button
            onClick={onViewLiftoff}
            className="flex items-center gap-2 text-sm text-white font-body hover:text-white/80 transition-colors cursor-pointer group"
          >
            <span>View Liftoff</span>
            <PlayIcon className="w-4 h-4 text-white transition-transform group-hover:scale-110" />
          </button>
        </motion.div>

        {/* Stats row (delay 1.3s) */}
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-stretch gap-4 mt-8"
        >
          {/* Card 1 */}
          <div className="liquid-glass p-5 w-[220px] rounded-[1.25rem] flex flex-col justify-between text-left min-h-[140px] shadow-lg">
            <div>
              <ClockIcon className="w-7 h-7 text-white" />
            </div>
            <div className="mt-4">
              <div className="text-4xl font-heading italic text-white tracking-[-1px] leading-none">
                34.5 Min
              </div>
              <p className="text-xs text-white font-body font-light mt-2">
                Average Videos Watch Time
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="liquid-glass p-5 w-[220px] rounded-[1.25rem] flex flex-col justify-between text-left min-h-[140px] shadow-lg">
            <div>
              <GlobeIcon className="w-7 h-7 text-white" />
            </div>
            <div className="mt-4">
              <div className="text-4xl font-heading italic text-white tracking-[-1px] leading-none">
                2.8B+
              </div>
              <p className="text-xs text-white font-body font-light mt-2">
                Users Across the Globe
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Partners (bottom of hero, delay 1.4s) */}
      <motion.div
        initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
        animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center gap-4 pb-8 pt-6 px-4"
      >
        <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white shadow-sm">
          Collaborating with top aerospace pioneers globally
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {PARTNERS.map((partner) => (
            <button
              key={partner}
              onClick={() => onSelectPartner?.(partner)}
              className="font-heading italic text-white text-2xl md:text-3xl tracking-tight opacity-90 hover:opacity-100 hover:scale-105 transition-all cursor-pointer"
            >
              {partner}
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
