import React, { useEffect, useState } from "react";

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [showing, setShowing] = useState(false);

  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as any).standalone === true;

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowing(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // If already installed as standalone, don't show prompt
    if (isStandalone) {
      setDismissed(true);
      setShowing(false);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, [isStandalone]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    (deferredPrompt as any).prompt();
    const { outcome } = await (deferredPrompt as any).userChoice;
    if (outcome === "accepted") {
      setDismissed(true);
      setShowing(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setDismissed(true);
    setShowing(false);
  };

  if (dismissed || isStandalone || !showing) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 sm:bottom-6 sm:left-[10%] sm:right-[10%] z-[60] flex items-center gap-3 sm:gap-4 px-3 sm:px-6 py-3 sm:py-4 rounded-2xl bg-white text-black shadow-2xl border border-white/80 animate-in fade-in slide-in-from-bottom-4 duration-300"
      role="alertdialog"
      aria-modal="true"
      aria-label="Install Vibe District app"
    >
      <div className="relative p-1 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-xl">
        <div className="p-1 bg-white rounded-lg flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-yellow-100 flex items-center justify-center overflow-hidden">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-800"
              viewBox="0 0 1024 1024"
              fill="currentColor"
            >
              <path d="M512 1024C226.2 1024 0 797.8 0 512S226.2 0 512 0s512 226.2 512 512-226.2 512-512 512z" />
              <path
                d="M512 230c-16.2 0-31.2 6.6-42.3 17.5L332 363v129h160v-102c0-26.5 12.7-49.9 32.2-65.3 19.4-15.3 45.6-23 73.5-23 45.7 0 83.7 32.4 83.7 83.8v74c0 16.2-6.6 31.2-17.5 42.3l85.6 85.6c10.9 10.9 17.5 26 17.5 42.3v20.5c0 16.2-6.6 31.2-17.5 42.3l-102 102c-10.9 10.9-26 17.5-42.3 17.5h-20.5c-16.2 0-31.2-6.6-42.3-17.5l-85.6-85.6c-10.9-10.9-17.5-26-17.5-42.3v-74c0-26.5 12.7-49.9 32.2-65.3 19.4-15.3 45.6-23 73.5-23 27.9 0 54.1 7.7 73.5 23 19.4 15.3 32.2 38.8 32.2 65.3v102h160v-129l-37.7-113.5c-11.1-10.9-26.2-17.5-42.3-17.5-16.2 0-31.2 6.6-42.3 17.5l-85.6 85.6c-10.9 10.9-17.5 26-17.5 42.3v20.5c0 16.2-6.6 31.2-17.5 42.3l-102 102c-10.9 10.9-26 17.5-42.3 17.5h-20.5c-16.2 0-31.2-6.6-42.3-17.5l-85.6-85.6c-10.9-10.9-17.5-26-17.5-42.3v-74c0-26.5 12.7-49.9 32.2-65.3 19.4-15.3 45.6-23 73.5-23 27.9 0 54.1 7.7 73.5 23 19.4 15.3 32.2 38.8 32.2 65.3v102h160v-129l-37.7-113.5c-11.1-10.9-26.2-17.5-42.3-17.5"
              />
            </svg>
          </div>
          <div className="text-sm sm:text-base font-black tracking-tight uppercase">
            Vibe District
          </div>
        </div>
      </div>
      <div className="flex-1">
        <h3 className="font-black text-sm sm:text-base mb-1">Install Vibe District</h3>
        <p className="text-xs sm:text-sm text-black/70 leading-snug">
          Add Vibe District to your home screen for a fast, app-like experience —
          shop press-on nails and accessories even when you're offline.
        </p>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={handleInstall}
          className="flex-1 sm:flex-none bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-black text-sm sm:text-base uppercase tracking-wider shadow-lg hover:bg-gray-900 transition-colors"
        >
          Install App
        </button>
        <button
          onClick={handleDismiss}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 flex items-center justify-center text-black hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
