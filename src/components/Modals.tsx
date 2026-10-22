/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRightIcon, CloseIcon } from './Icons';

interface ClaimSpotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClaimSpotModal: React.FC<ClaimSpotModalProps> = ({ isOpen, onClose }) => {
  const [mission, setMission] = useState('Mars Apex Transit 2026');
  const [cabinClass, setCabinClass] = useState('Observation Suite');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    const randomCode = 'AETH-' + Math.floor(100000 + Math.random() * 900000);
    setTicketId(randomCode);
    setConfirmed(true);
  };

  const reset = () => {
    setConfirmed(false);
    setName('');
    setEmail('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={reset}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative liquid-glass-strong rounded-3xl p-6 md:p-8 max-w-lg w-full text-white z-10 border border-white/20 shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={reset}
            className="absolute top-5 right-5 text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close Modal"
          >
            <CloseIcon className="w-5 h-5" />
          </button>

          {!confirmed ? (
            <div>
              <div className="inline-block liquid-glass rounded-full px-3 py-1 text-xs font-semibold mb-3">
                MISSION RESERVATION
              </div>
              <h2 className="font-heading italic text-3xl md:text-4xl tracking-tight mb-2">
                Claim Your Orbital Berth
              </h2>
              <p className="text-sm font-body text-white/80 font-light mb-6">
                Join the inaugural civilian cohort aboard our deep-space transport platform.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-body text-white/70 uppercase tracking-wider mb-1.5">
                    Target Voyage
                  </label>
                  <select
                    value={mission}
                    onChange={(e) => setMission(e.target.value)}
                    className="w-full bg-black/60 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm font-body text-white focus:outline-none focus:border-white/50"
                  >
                    <option value="Mars Apex Transit 2026">Mars Apex Transit (Departs Oct 2026)</option>
                    <option value="Lunar Gateway Odyssey">Lunar Gateway Orbit (Departs Jun 2026)</option>
                    <option value="Titan Deep Reconnaissance">Titan Deep Orbital Probe (2027)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-body text-white/70 uppercase tracking-wider mb-1.5">
                    Cabin Accommodation
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Observation Suite', 'Zero-G Science Pod'].map((tier) => (
                      <button
                        type="button"
                        key={tier}
                        onClick={() => setCabinClass(tier)}
                        className={`px-3 py-2 text-xs rounded-xl border text-left transition-all ${
                          cabinClass === tier
                            ? 'bg-white text-black font-semibold border-white'
                            : 'border-white/20 text-white/80 hover:bg-white/5'
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-body text-white/70 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Commander Sarah Connor"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black/60 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm font-body text-white placeholder-white/40 focus:outline-none focus:border-white/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-body text-white/70 uppercase tracking-wider mb-1.5">
                    Contact Dispatch Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@aetheria.space"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/60 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm font-body text-white placeholder-white/40 focus:outline-none focus:border-white/50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-black font-body font-semibold text-sm py-3 rounded-full flex items-center justify-center gap-2 hover:bg-neutral-100 active:scale-98 transition-all mt-6 shadow-lg"
                >
                  <span>Confirm Launch Manifest</span>
                  <ArrowUpRightIcon className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="liquid-glass w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="font-heading italic text-3xl md:text-4xl mb-1">
                Berth Manifest Confirmed
              </h2>
              <p className="text-xs font-mono text-emerald-400 tracking-wider mb-4">
                TRANSMISSION ID: {ticketId}
              </p>

              {/* Boarding Pass Box */}
              <div className="liquid-glass rounded-2xl p-4 text-left font-body text-xs space-y-2 mb-6 border border-white/10">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/60">PASSENGER:</span>
                  <span className="font-semibold text-white">{name}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/60">MISSION:</span>
                  <span className="font-semibold text-white">{mission}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/60">CABIN TIER:</span>
                  <span className="font-semibold text-white">{cabinClass}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-white/60">FLIGHT STATUS:</span>
                  <span className="text-emerald-400 font-mono">PRIORITY BOARDING CONFIRMED</span>
                </div>
              </div>

              <button
                onClick={reset}
                className="bg-white text-black font-body font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-neutral-200 transition-colors"
              >
                Done
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

interface LiftoffVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiftoffVideoModal: React.FC<LiftoffVideoModalProps> = ({ isOpen, onClose }) => {
  const [isMuted, setIsMuted] = useState(false);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        />

        {/* Video Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative max-w-4xl w-full rounded-3xl overflow-hidden liquid-glass-strong border border-white/20 shadow-2xl z-10"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between p-4 px-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="font-mono text-xs text-white/80 tracking-widest uppercase">
                Aetheria-IX Orbital Insertion Live Feed
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-xs text-white/70 hover:text-white font-mono uppercase px-2 py-1 rounded border border-white/20"
              >
                {isMuted ? 'Muted' : 'Sound On'}
              </button>
              <button
                onClick={onClose}
                className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10"
                aria-label="Close Liftoff Feed"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Video Player */}
          <div className="relative aspect-video bg-black flex items-center justify-center">
            <video
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4"
              autoPlay
              playsInline
              loop
              muted={isMuted}
              className="w-full h-full object-cover"
            />

            {/* Overlay Telemetry HUD */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none text-xs font-mono">
              <div className="liquid-glass rounded-xl p-3 space-y-1">
                <div className="text-white/60">ALTITUDE: <span className="text-white font-semibold">142.8 KM</span></div>
                <div className="text-white/60">VELOCITY: <span className="text-white font-semibold">Mach 7.84</span></div>
                <div className="text-white/60">CHAMBER: <span className="text-emerald-400 font-semibold">220 BAR (OPTIMAL)</span></div>
              </div>
              <div className="liquid-glass rounded-xl p-3 text-right">
                <div className="text-white/60">APOGEE TARGET: 420 KM</div>
                <div className="text-emerald-400 font-semibold">TRAJECTORY NOMINAL</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

interface InfoModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const InfoModal: React.FC<InfoModalProps> = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative liquid-glass-strong rounded-3xl p-6 md:p-8 max-w-lg w-full text-white z-10 border border-white/20 shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10"
            aria-label="Close"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
          <h2 className="font-heading italic text-3xl md:text-4xl tracking-tight mb-4">{title}</h2>
          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  if (!isOpen) return null;

  const triggerDownload = (filename: string) => {
    // Generate full URL based on current window location
    const fullUrl = `${window.location.origin}/${filename}`;
    
    // Create direct anchor with target="_blank"
    const a = document.createElement('a');
    a.href = fullUrl;
    a.download = filename;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
    }, 500);
  };

  const copyUrl = (filename: string) => {
    const fullUrl = `${window.location.origin}/${filename}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopiedLink(filename);
      setTimeout(() => setCopiedLink(null), 3000);
    }).catch(() => {
      // Fallback prompt
      window.prompt('انسخ الرابط التالي:', fullUrl);
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" dir="rtl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative liquid-glass-strong rounded-3xl p-6 md:p-8 max-w-lg w-full text-white z-10 border border-white/20 shadow-2xl text-right max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-5 left-5 text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10"
            aria-label="إغلاق"
          >
            <CloseIcon className="w-5 h-5" />
          </button>

          <div className="inline-block liquid-glass rounded-full px-3 py-1 text-xs font-semibold mb-3 text-emerald-400">
            تحميل مباشر للآيفون 📲
          </div>

          <h2 className="font-heading italic text-3xl md:text-4xl tracking-tight mb-2">
            تحميل ملفات الموقع كاملة
          </h2>
          <p className="text-sm font-body text-white/80 font-light mb-6">
            إذا لم يبدأ التنزيل تلقائياً داخل المعاينة، يمكنك الضغط على &quot;تنزيل&quot; أو &quot;نسخ الرابط المباشر&quot; ولصقه في شريط Safari.
          </p>

          <div className="space-y-4 mb-6">
            {/* Full Source Code ZIP */}
            <div className="liquid-glass p-4 rounded-2xl border border-white/10 hover:border-white/30 transition-all">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="font-semibold text-white flex items-center gap-2">
                    <span>💻 الكود المصدري الكامل (ZIP)</span>
                  </div>
                  <div className="text-xs text-white/60 mt-1">
                    كافة ملفات React و TypeScript والمكونات لربط الذكاء الاصطناعي بمستودعك.
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => triggerDownload('full-source-code.zip')}
                  className="bg-white text-black text-xs font-semibold px-4 py-2 rounded-full cursor-pointer hover:bg-neutral-200 transition-colors"
                >
                  تنزيل الكود المصدري
                </button>
                <button
                  onClick={() => copyUrl('full-source-code.zip')}
                  className="liquid-glass text-white text-xs font-medium px-3 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                >
                  {copiedLink === 'full-source-code.zip' ? '✓ تم نسخ الرابط' : 'نسخ الرابط المباشر'}
                </button>
              </div>
            </div>

            {/* Ready Website ZIP */}
            <div className="liquid-glass p-4 rounded-2xl border border-white/10 hover:border-white/30 transition-all">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="font-semibold text-white flex items-center gap-2">
                    <span>📦 ملفات الموقع الجاهزة للنشر (ZIP)</span>
                  </div>
                  <div className="text-xs text-white/60 mt-1">
                    تحتوي على index.html ومجلد assets — جاهزة لـ GitHub Pages مباشرة.
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => triggerDownload('github-website-ready.zip')}
                  className="bg-white/90 text-black text-xs font-semibold px-4 py-2 rounded-full cursor-pointer hover:bg-white transition-colors"
                >
                  تنزيل الموقع الجاهز
                </button>
                <button
                  onClick={() => copyUrl('github-website-ready.zip')}
                  className="liquid-glass text-white text-xs font-medium px-3 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                >
                  {copiedLink === 'github-website-ready.zip' ? '✓ تم نسخ الرابط' : 'نسخ الرابط المباشر'}
                </button>
              </div>
            </div>
          </div>

          {/* 3 Steps instructions for iPhone */}
          <div className="liquid-glass rounded-2xl p-4 text-xs space-y-2 border border-white/10 font-body">
            <div className="font-semibold text-white border-b border-white/10 pb-1.5 mb-2">
              طريقة التنزيل والرفع من الآيفون:
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-emerald-400">1.</span>
              <span>إذا لم يبدأ التنزيل، اضغط <strong>&quot;نسخ الرابط المباشر&quot;</strong> والصقه في شريط متصفح سفاري بالأعلى واضغط Go.</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-emerald-400">2.</span>
              <span>سيظهر تنبيه فوري: <em>&quot;هل ترغب في تنزيل...&quot;</em>، اضغط <strong>تنزيل</strong>.</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-emerald-400">3.</span>
              <span>افتح تطبيق <strong>الملفات (Files)</strong>، اضغط على الملف لفك ضغطه، ثم ارفعه لمستودعك بـ GitHub.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
