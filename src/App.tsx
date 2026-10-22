/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { ClaimSpotModal, LiftoffVideoModal, InfoModal, DownloadModal } from './components/Modals';

export default function App() {
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [liftoffModalOpen, setLiftoffModalOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen bg-black text-white font-body selection:bg-white/20 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onClaimSpot={() => setClaimModalOpen(true)}
        onOpenPlanLaunch={() => setActiveModal('plan-launch')}
        onOpenWorlds={() => setActiveModal('worlds')}
        onOpenVoyages={() => setActiveModal('voyages')}
        onOpenDownload={() => setDownloadModalOpen(true)}
      />

      {/* Main Content: Two Full-Height Sections */}
      <main>
        {/* Section 1 — Hero */}
        <HeroSection
          onStartVoyage={() => setClaimModalOpen(true)}
          onViewLiftoff={() => setLiftoffModalOpen(true)}
          onSelectPartner={(partner) => setSelectedPartner(partner)}
        />

        {/* Section 2 — Capabilities */}
        <CapabilitiesSection
          onCardClick={(card) => {
            // Optional card detail inspection
            setActiveModal(`card-${card.id}`);
          }}
        />
      </main>

      {/* Interactive Modals */}
      <ClaimSpotModal
        isOpen={claimModalOpen}
        onClose={() => setClaimModalOpen(false)}
      />

      <LiftoffVideoModal
        isOpen={liftoffModalOpen}
        onClose={() => setLiftoffModalOpen(false)}
      />

      {/* Plan Launch Modal */}
      <InfoModal
        title="Plan Launch Trajectory"
        isOpen={activeModal === 'plan-launch'}
        onClose={() => setActiveModal(null)}
      >
        <p className="text-sm font-light text-white/80 mb-4">
          Calculate launch windows, delta-v orbital transfer stages, and interplanetary transit times.
        </p>
        <div className="space-y-3 font-mono text-xs">
          <div className="liquid-glass p-3 rounded-xl flex justify-between">
            <span className="text-white/60">NEXT LAUNCH WINDOW:</span>
            <span className="text-emerald-400 font-semibold">T-182 DAYS (OCT 2026)</span>
          </div>
          <div className="liquid-glass p-3 rounded-xl flex justify-between">
            <span className="text-white/60">PROPULSION SYSTEM:</span>
            <span className="text-white">PULSED NUCLEAR ION / CRYOGENIC METHALOX</span>
          </div>
          <div className="liquid-glass p-3 rounded-xl flex justify-between">
            <span className="text-white/60">PAYLOAD CAPACITY:</span>
            <span className="text-white">150 METRIC TONS TO TRANS-MARS INJECTION</span>
          </div>
        </div>
        <button
          onClick={() => {
            setActiveModal(null);
            setClaimModalOpen(true);
          }}
          className="mt-6 w-full bg-white text-black font-body font-semibold text-sm py-2.5 rounded-full hover:bg-neutral-200 transition-colors"
        >
          Reserve Launch Payload Slot
        </button>
      </InfoModal>

      {/* Worlds Modal */}
      <InfoModal
        title="Exploration Destinations"
        isOpen={activeModal === 'worlds'}
        onClose={() => setActiveModal(null)}
      >
        <div className="space-y-3 font-body text-xs">
          {[
            { name: 'Mars - Chryse Planitia', status: 'Inhabited Outpost Base Alpha', time: '180 Days' },
            { name: 'Europa - Subsurface Ocean', status: 'Autonomous Cryo-Submersible', time: '2.4 Years' },
            { name: 'Titan - Kraken Mare', status: 'Atmospheric Hydrocarbon Survey', time: '3.8 Years' },
          ].map((world) => (
            <div key={world.name} className="liquid-glass p-3.5 rounded-xl flex justify-between items-center">
              <div>
                <div className="font-heading italic text-base text-white">{world.name}</div>
                <div className="text-white/60 text-[11px] font-mono mt-0.5">{world.status}</div>
              </div>
              <div className="text-right">
                <span className="liquid-glass rounded-full px-2.5 py-1 text-[10px] text-white/90">
                  {world.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </InfoModal>

      {/* Voyages Modal */}
      <InfoModal
        title="Orbital Flight Schedule"
        isOpen={activeModal === 'voyages'}
        onClose={() => setActiveModal(null)}
      >
        <div className="space-y-3 text-xs font-body">
          {[
            { flight: 'VOYAGE-001', route: 'Earth LEO -> Lunar Gateway', date: 'June 14, 2026', seats: 'Sold Out' },
            { flight: 'VOYAGE-002', route: 'Earth -> Mars Valles Marineris', date: 'October 28, 2026', seats: '4 Berths Remaining' },
            { flight: 'VOYAGE-003', route: 'Mars Orbit -> Deep Cosmos Station', date: 'March 15, 2027', seats: 'Booking Open' },
          ].map((v) => (
            <div key={v.flight} className="liquid-glass p-3.5 rounded-xl flex justify-between items-center">
              <div>
                <span className="font-mono text-[10px] text-emerald-400">{v.flight}</span>
                <div className="font-semibold text-white mt-0.5">{v.route}</div>
                <div className="text-white/60 text-[11px]">{v.date}</div>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-mono text-white/80">{v.seats}</span>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            setActiveModal(null);
            setClaimModalOpen(true);
          }}
          className="mt-6 w-full bg-white text-black font-body font-semibold text-sm py-2.5 rounded-full hover:bg-neutral-200 transition-colors"
        >
          Claim a Seat on Voyage-002
        </button>
      </InfoModal>

      {/* Partner Modal */}
      <InfoModal
        title={`Partner: ${selectedPartner}`}
        isOpen={Boolean(selectedPartner)}
        onClose={() => setSelectedPartner(null)}
      >
        <p className="text-sm font-light text-white/80 mb-4">
          {selectedPartner} is an institutional aerospace partner providing mission-critical propulsion, orbital navigation systems, and deep-space life support architectures.
        </p>
        <div className="liquid-glass p-4 rounded-2xl text-xs font-mono space-y-2">
          <div className="text-emerald-400">STATUS: INTEGRATED ORBITAL ALLIANCE</div>
          <div className="text-white/70">SPECIALIZATION: DEEP-SPACE PROPULSION &amp; TELEMETRY</div>
          <div className="text-white/70">CERTIFICATION: LEVEL 5 INTERPLANETARY FLIGHT</div>
        </div>
      </InfoModal>

      {/* Card Details Modal */}
      <InfoModal
        title="Technical Specification"
        isOpen={Boolean(activeModal?.startsWith('card-'))}
        onClose={() => setActiveModal(null)}
      >
        <div className="space-y-4 text-xs font-body">
          <p className="text-sm font-light text-white/80">
            Powered by next-generation neural rendering matrices and real-time physical simulation.
          </p>
          <div className="liquid-glass p-4 rounded-2xl space-y-2 font-mono">
            <div className="text-emerald-400">RAY DENSITY: 64 SAMPLES/PIXEL</div>
            <div className="text-white/70">LATENCY: &lt; 14MS REALTIME INFERENCE</div>
            <div className="text-white/70">LIGHTING ENGINE: PHOTOMETRIC SUNLIGHT SYNC V4</div>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="w-full bg-white text-black font-body font-semibold text-sm py-2.5 rounded-full hover:bg-neutral-200 transition-colors"
          >
            Close Specification
          </button>
        </div>
      </InfoModal>

      {/* Download Modal for iPhone */}
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />

      {/* Floating Download Button (optimized for iPhone / mobile users) */}
      <button
        onClick={() => setDownloadModalOpen(true)}
        className="fixed bottom-5 right-5 z-40 liquid-glass-strong rounded-full px-4 py-2.5 text-xs font-semibold text-white flex items-center gap-2 border border-white/20 shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-xl"
        aria-label="تحميل ملفات الموقع"
      >
        <span className="text-sm">📥</span>
        <span className="font-body">تحميل لـ GitHub (ZIP)</span>
      </button>
    </div>
  );
}
