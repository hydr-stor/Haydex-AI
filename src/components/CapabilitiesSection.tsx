/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FadingVideo } from './FadingVideo';
import { AiSceneryIcon, BatchProductionIcon, SmartLightingIcon } from './Icons';

const CAPABILITIES_VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4';

interface CapabilityCardData {
  id: string;
  title: string;
  icon: React.ReactNode;
  tags: string[];
  body: string;
}

const CARDS: CapabilityCardData[] = [
  {
    id: 'scenery',
    title: 'AI Scenery',
    icon: <AiSceneryIcon className="h-6 w-6 text-white" />,
    tags: ['Natural Context', 'Photo Realism', 'Infinite Settings', 'Eco-Vibe'],
    body: 'AI analyzes your product to create indistinguishable natural environments — from Icelandic cliffs to misty forests.',
  },
  {
    id: 'batch',
    title: 'Batch Production',
    icon: <BatchProductionIcon className="h-6 w-6 text-white" />,
    tags: ['Scale Fast', 'Visual Consistency', 'Time Saver', 'Ready to Post'],
    body: 'Style your entire product line in minutes. Create a unified visual identity for catalogues and social media without weeks of retouching.',
  },
  {
    id: 'lighting',
    title: 'Smart Lighting',
    icon: <SmartLightingIcon className="h-6 w-6 text-white" />,
    tags: ['Ray Tracing', 'Physical Shadows', 'Studio Quality', 'Sunlight Sync'],
    body: 'Automatic lighting and material adjustment. Achieve flawless integration with realistic shadows and sunlight.',
  },
];

interface CapabilitiesSectionProps {
  onCardClick?: (card: CapabilityCardData) => void;
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({ onCardClick }) => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  return (
    <section
      id="capabilities"
      className="relative min-h-screen w-full bg-black overflow-hidden flex flex-col justify-between select-none"
    >
      {/* Background video (full-bleed, no 120% scale) */}
      <FadingVideo
        src={CAPABILITIES_VIDEO_SRC}
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 px-8 md:px-16 lg:px-20 pt-24 pb-12 flex flex-col min-h-screen justify-between">
        {/* Header (mb-auto) */}
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 30 }}
          whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-auto"
        >
          <div className="text-sm font-body text-white/80 mb-6 tracking-wide">
            // Capabilities
          </div>
          <h2 className="font-heading italic text-white text-6xl md:text-7xl lg:text-[6rem] leading-[0.9] tracking-[-3px]">
            Production
            <br />
            evolved
          </h2>
        </motion.div>

        {/* Three cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {CARDS.map((card, idx) => {
            const isSelected = activeCardId === card.id;

            return (
              <motion.div
                key={card.id}
                initial={{ filter: 'blur(10px)', opacity: 0, y: 40 }}
                whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, delay: idx * 0.15, ease: 'easeOut' }}
                onClick={() => {
                  setActiveCardId(card.id);
                  onCardClick?.(card);
                }}
                className={`liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col cursor-pointer transition-all duration-300 hover:-translate-y-1.5 ${
                  isSelected ? 'ring-1 ring-white/50 shadow-2xl' : 'hover:shadow-xl'
                }`}
              >
                {/* Top row of each card */}
                <div className="flex items-start justify-between gap-4">
                  {/* Left: 44x44 nested liquid-glass square (rounded-[0.75rem]) */}
                  <div className="liquid-glass w-11 h-11 rounded-[0.75rem] flex items-center justify-center shrink-0 shadow-inner">
                    {card.icon}
                  </div>

                  {/* Right: flex flex-wrap justify-end gap-1.5 max-w-[70%] */}
                  <div className="flex flex-wrap justify-end gap-1.5 max-w-[70%]">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 font-body whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Middle: flex-1 spacer */}
                <div className="flex-1 min-h-12" />

                {/* Bottom of each card */}
                <div className="mt-6">
                  <h3 className="font-heading italic text-white text-3xl md:text-4xl tracking-[-1px] leading-none">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm text-white/90 font-body font-light leading-snug max-w-[32ch]">
                    {card.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
