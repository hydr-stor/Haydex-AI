/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowUpRightIcon } from './Icons';

interface NavbarProps {
  onClaimSpot: () => void;
  onOpenPlanLaunch: () => void;
  onOpenWorlds: () => void;
  onOpenVoyages: () => void;
  onOpenDownload?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onClaimSpot,
  onOpenPlanLaunch,
  onOpenWorlds,
  onOpenVoyages,
  onOpenDownload,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToHero = () => {
    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const scrollToCapabilities = () => {
    document.getElementById('capabilities')?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-4 left-0 right-0 px-6 md:px-8 lg:px-16 z-50 flex items-center justify-between pointer-events-none">
      {/* Left: 48x48 liquid-glass circle with italic serif lowercase "a" (Instrument Serif) */}
      <a
        href="#hero"
        onClick={(e) => {
          e.preventDefault();
          scrollToHero();
        }}
        className="liquid-glass w-12 h-12 rounded-full flex items-center justify-center text-white font-heading italic text-2xl cursor-pointer pointer-events-auto transition-transform hover:scale-105 active:scale-95 shadow-lg select-none"
        aria-label="Aetheria Space Home"
      >
        a
      </a>

      {/* Center (desktop only): liquid-glass pill holding 5 text links + Claim a Spot button */}
      <nav
        className="hidden md:flex liquid-glass items-center gap-1 px-1.5 py-1.5 rounded-full pointer-events-auto shadow-2xl backdrop-blur-md"
        aria-label="Main Navigation"
      >
        <button
          onClick={scrollToHero}
          className="px-3 py-2 text-sm font-medium text-white/90 font-body hover:text-white transition-colors cursor-pointer rounded-full"
        >
          Home
        </button>
        <button
          onClick={onOpenVoyages}
          className="px-3 py-2 text-sm font-medium text-white/90 font-body hover:text-white transition-colors cursor-pointer rounded-full"
        >
          Voyages
        </button>
        <button
          onClick={onOpenWorlds}
          className="px-3 py-2 text-sm font-medium text-white/90 font-body hover:text-white transition-colors cursor-pointer rounded-full"
        >
          Worlds
        </button>
        <button
          onClick={scrollToCapabilities}
          className="px-3 py-2 text-sm font-medium text-white/90 font-body hover:text-white transition-colors cursor-pointer rounded-full"
        >
          Innovation
        </button>
        <button
          onClick={onOpenPlanLaunch}
          className="px-3 py-2 text-sm font-medium text-white/90 font-body hover:text-white transition-colors cursor-pointer rounded-full"
        >
          Plan Launch
        </button>

        {/* Claim a Spot + ArrowUpRight icon */}
        <button
          onClick={onClaimSpot}
          className="bg-white text-black font-body font-semibold text-sm px-4 py-2 rounded-full flex items-center gap-1.5 whitespace-nowrap ml-1 cursor-pointer hover:bg-neutral-100 active:scale-98 transition-all shadow-md"
        >
          <span>Claim a Spot</span>
          <ArrowUpRightIcon className="w-4 h-4 stroke-[2.5]" />
        </button>
      </nav>

      {/* Mobile Right: Menu button + Claim quick pill */}
      <div className="flex md:hidden items-center gap-2 pointer-events-auto">
        <button
          onClick={onClaimSpot}
          className="bg-white text-black font-body font-semibold text-xs px-3 py-2 rounded-full flex items-center gap-1 whitespace-nowrap shadow-sm"
        >
          <span>Claim</span>
          <ArrowUpRightIcon className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center text-white text-sm"
          aria-label="Toggle Navigation Menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Right (Desktop): 48x48 invisible spacer to balance logo */}
      <div className="hidden md:block w-12 h-12 invisible pointer-events-none" aria-hidden="true" />

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-4 top-20 liquid-glass-strong rounded-2xl p-5 flex flex-col gap-3 pointer-events-auto md:hidden z-50 border border-white/10 shadow-2xl">
          <button
            onClick={scrollToHero}
            className="text-left text-sm font-medium text-white/90 py-2 border-b border-white/5"
          >
            Home
          </button>
          <button
            onClick={() => {
              onOpenVoyages();
              setMobileMenuOpen(false);
            }}
            className="text-left text-sm font-medium text-white/90 py-2 border-b border-white/5"
          >
            Voyages
          </button>
          <button
            onClick={() => {
              onOpenWorlds();
              setMobileMenuOpen(false);
            }}
            className="text-left text-sm font-medium text-white/90 py-2 border-b border-white/5"
          >
            Worlds
          </button>
          <button
            onClick={scrollToCapabilities}
            className="text-left text-sm font-medium text-white/90 py-2 border-b border-white/5"
          >
            Innovation
          </button>
          <button
            onClick={() => {
              onOpenPlanLaunch();
              setMobileMenuOpen(false);
            }}
            className="text-left text-sm font-medium text-white/90 py-2"
          >
            Plan Launch
          </button>
          <button
            onClick={() => {
              onClaimSpot();
              setMobileMenuOpen(false);
            }}
            className="bg-white text-black font-body font-semibold text-sm py-2.5 rounded-full flex items-center justify-center gap-1.5 mt-2 shadow-sm"
          >
            <span>Claim a Spot</span>
            <ArrowUpRightIcon className="w-4 h-4" />
          </button>
          {onOpenDownload && (
            <button
              onClick={() => {
                onOpenDownload();
                setMobileMenuOpen(false);
              }}
              className="liquid-glass text-emerald-400 font-body font-medium text-xs py-2 rounded-full flex items-center justify-center gap-1.5 border border-emerald-400/30"
            >
              <span>📥 تحميل ملفات الموقع للآيفون (ZIP)</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
