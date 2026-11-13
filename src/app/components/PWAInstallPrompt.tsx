import React, { useEffect, useState } from "react";

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [dismissed, setDismissed] = useState(false);
  const [showIOS, setShowIOS] = useState(false);

  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as any).standalone === true;

  const userAgent = window.navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(userAgent);
  const isAndroid = /android/.test(userAgent);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  if (dismissed || isStandalone) return null;

  const handleInstall = () => {
    if (isIOS) {
      setShowIOS(true);
      return;
    }
    if (deferredPrompt) {
      (deferredPrompt as any).prompt();
      (deferredPrompt as any).userChoice.then(() => {
        setDismissed(true);
        setDeferredPrompt(null);
      });
      return;
    }
    setDismissed(true);
  };

  const handleIOSGotIt = () => {
    setShowIOS(false);
    setDismissed(true);
  };
  return (
    <div className="fixed top-4 right-4 z-[70] w-full sm:w-80 transform transition-all duration-300">
      {showIOS && <IOSInstallGuide onClose={handleIOSGotIt} />}
      <div className="flex flex-col gap-2">
        <InstallCard onDismiss={() => setDismissed(true)} />
        <InstallButton onInstall={handleInstall} isIOS={isIOS} isAndroid={isAndroid} deferredPrompt={deferredPrompt} />
      </div>
    </div>
  );
}

function IOSInstallGuide({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in zoom-in duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white text-black rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-yellow-200 animate-in slide-in-from-top-4 duration-300">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-yellow-100 flex items-center justify-center overflow-hidden flex-shrink-0">
            <svg className="w-6 h-6 text-yellow-800" viewBox="0 0 1024 1024" fill="currentColor">
              <path d="M512 1024C226.2 1024 0 797.8 0 512S226.2 0 512 0s512 226.2 512 512-226.2 512-512 512z" />
              <path d="M512 230c-16.2 0-31.2 6.6-42.3 17.5L332 363v129h160v-102c0-26.5 12.7-49.9 32.2-65.3 19.4-15.3 45.6-23 73.5-23 45.7 0 83.7 32.4 83.7 83.8v74c0 16.2-6.6 31.2-17.5 42.3l85.6 85.6c10.9 10.9 17.5 26 17.5 42.3v20.5c0 16.2-6.6 31.2-17.5 42.3l-102 102c-10.9 10.9-26 17.5-42.3 17.5h-20.5c-16.2 0-31.2-6.6-42.3-17.5l-85.6-85.6c-10.9-10.9-17.5-26-17.5-42.3v-74c0-26.5 12.7-49.9 32.2-65.3 19.4-15.3 45.6-23 73.5-23 27.9 0 54.1 7.7 73.5 23 19.4 15.3 32.2 38.8 32.2 65.3v102h160v-129l-37.7-113.5c-11.1-10.9-26.2-17.5-42.3-17.5-16.2 0-31.2 6.6-42.3 17.5l-85.6 85.6c-10.9 10.9-17.5 26-17.5 42.3v20.5c0 16.2-6.6 31.2-17.5 42.3l-102 102c-10.9 10.9-26 17.5-42.3 17.5h-20.5c-16.2 0-31.2-6.6-42.3-17.5l-85.6-85.6c-10.9-10.9-17.5-26-17.5-42.3v-74c0-26.5 12.7-49.9 32.2-65.3 19.4-15.3 45.6-23 73.5-23 27.9 0 54.1 7.7 73.5 23 19.4 15.3 32.2 38.8 32.2 65.3v102h160v-129l-37.7-113.5c-11.1-10.9-26.2-17.5-42.3-17.5" />
            </svg>
          </div>
          <h2 className="font-black text-lg sm:text-xl">Add to Home Screen</h2>
        </div>
        <p className="text-sm sm:text-base text-black/80 mb-6 leading-relaxed">
          To install Vibe District on your iPhone:
        </p>
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-yellow-600 font-black text-lg shrink-0">1</span>
            <p className="text-sm sm:text-base text-black/90 leading-snug">
              Tap <span className="font-black text-yellow-700">Share</span> (the
              square with an arrow pointing up) at the bottom of Safari.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-yellow-600 font-black text-lg shrink-0">2</span>
            <p className="text-sm sm:text-base text-black/90 leading-snug">
              Scroll down and tap{" "}
              <span className="font-black text-yellow-700">"Add to Home Screen"</span>.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-yellow-600 font-black text-lg shrink-0">3</span>
            <p className="text-sm sm:text-base text-black/90 leading-snug">
              Confirm the name{" "}
              <span className="font-black text-yellow-700">"Vibe District"</span>{" "}
              and tap <span className="font-black text-yellow-700">Add</span>.
            </p>
          </div>
        </div>
        <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
          <p className="text-xs sm:text-sm font-black text-yellow-800 uppercase tracking-wider leading-snug">
            The Vibe District app icon will appear on your home screen — just like a real app.
          </p>
        </div>
        <div className="mt-6 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 bg-white text-black px-4 py-3 rounded-xl font-black text-sm sm:text-base border border-black shadow-lg hover:bg-gray-50 transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
function InstallCard({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="flex items-start gap-3 p-4 sm:p-5 rounded-2xl bg-white text-black shadow-2xl border border-yellow-200 animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-yellow-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-800" viewBox="0 0 1024 1024" fill="currentColor">
          <path d="M512 1024C226.2 1024 0 797.8 0 512S226.2 0 512 0s512 226.2 512 512-226.2 512-512 512z" />
          <path d="M512 230c-16.2 0-31.2 6.6-42.3 17.5L332 363v129h160v-102c0-26.5 12.7-49.9 32.2-65.3 19.4-15.3 45.6-23 73.5-23 45.7 0 83.7 32.4 83.7 83.8v74c0 16.2-6.6 31.2-17.5 42.3l85.6 85.6c10.9 10.9 17.5 26 17.5 42.3v20.5c0 16.2-6.6 31.2-17.5 42.3l-102 102c-10.9 10.9-26 17.5-42.3 17.5h-20.5c-16.2 0-31.2-6.6-42.3-17.5l-85.6-85.6c-10.9-10.9-17.5-26-17.5-42.3v-74c0-26.5 12.7-49.9 32.2-65.3 19.4-15.3 45.6-23 73.5-23 27.9 0 54.1 7.7 73.5 23 19.4 15.3 32.2 38.8 32.2 65.3v102h160v-129l-37.7-113.5c-11.1-10.9-26.2-17.5-42.3-17.5" />
        </svg>
      </div>
      <div className="flex-1">
        <h3 className="font-black text-sm sm:text-base mb-1">Install Vibe District</h3>
        <p className="text-xs sm:text-sm text-black/70 leading-snug">
          Add Vibe District to your home screen for a fast app-like experience —
          shop press-on nails & accessories even offline.
        </p>
      </div>
      <button
        onClick={onDismiss}
        className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/90 flex items-center justify-center text-black hover:bg-gray-100 transition-colors flex-shrink-0 mt-0.5"
        aria-label="Close"
      >
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

function InstallButton({
  onInstall,
  isIOS,
  isAndroid,
  deferredPrompt,
}: {
  onInstall: () => void;
  isIOS: boolean;
  isAndroid: boolean;
  deferredPrompt: any;
}) {
  return (
    <button
      onClick={onInstall}
      className="w-full bg-black text-white px-4 py-3.5 rounded-xl font-black text-sm sm:text-base uppercase tracking-wider shadow-lg shadow-yellow-900/20 hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 border border-yellow-900/30"
    >
      {isIOS ? (
        <>
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Add to Home Screen
        </>
      ) : isAndroid && deferredPrompt ? (
        <>
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Install App — One Click
        </>
      ) : (
        <>
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Install App
        </>
      )}
    </button>
  );
}
