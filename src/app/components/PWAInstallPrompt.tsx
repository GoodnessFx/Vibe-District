import React, { useEffect, useState } from "react";

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [dismissed, setDismissed] = useState(false);

  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as any).standalone === true;

  const userAgent = window.navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(userAgent);
  const isAndroid = /android/.test(userAgent);

  useEffect(() => {
    // Capture the beforeinstallprompt event (Android/Chrome) so the button can trigger it
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  // Hide if already installed as a standalone app, or if the user dismissed it
  if (dismissed || isStandalone) return null;

  const handleInstall = () => {
    if (deferredPrompt) {
      (deferredPrompt as any).prompt();
      (deferredPrompt as any).userChoice.then(() => {
        setDismissed(true);
        setDeferredPrompt(null);
      });
      return;
    }
    // No beforeinstallprompt (e.g. iOS / desktop): guide the user manually
    setDismissed(true);
  };

  return (
    <div className="fixed top-4 right-4 z-[70] w-full sm:w-80 transform transition-all duration-300">
      <div className="flex flex-col gap-2">
        <div
          className="flex items-start gap-3 p-4 sm:p-5 rounded-2xl bg-white text-black shadow-2xl border border-yellow-200 animate-in fade-in slide-in-from-top-4 duration-300"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-yellow-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-800" viewBox="0 0 1024 1024" fill="currentColor">
              <path d="M512 1024C226.2 1024 0 797.8 0 512S226.2 0 512 0s512 226.2 512 512-226.2 512-512 512z" />
              <path d="M512 230c-16.2 0-31.2 6.6-42.3 17.5L332 363v129h160v-102c0-26.5 12.7-49.9 32.2-65.3 19.4-15.3 45.6-23 73.5-23 45.7 0 83.7 32.4 83.7 83.8v74c0 16.2-6.6 31.2-17.5 42.3l85.6 85.6c10.9 10.9 17.5 26 17.5 42.3v20.5c0 16.2-6.6 31.2-17.5 42.3l-102 102c-10.9 10.9-26 17.5-42.3 17.5h-20.5c-16.2 0-31.2-6.6-42.3-17.5l-85.6-85.6c-10.9-10.9-17.5-26-17.5-42.3v-74c0-26.5 12.7-49.9 32.2-65.3 19.4-15.3 45.6-23 73.5-23 27.9 0 54.1 7.7 73.5 23 19.4 15.3 32.2 38.8 32.2 65.3v102h160v-129l-37.7-113.5c-11.1-10.9-26.2-17.5-42.3-17.5-16.2 0-31.2 6.6-42.3 17.5l-85.6 85.6c-10.9 10.9-17.5 26-17.5 42.3v20.5c0 16.2-6.6 31.2-17.5 42.3l-102 102c-10.9 10.9-26 17.5-42.3 17.5h-20.5c-16.2 0-31.2-6.6-42.3-17.5l-85.6-85.6c-10.9-10.9-17.5-26-17.5-42.3v-74c0-26.5 12.7-49.9 32.2-65.3 19.4-15.3 45.6-23 73.5-23 27.9 0 54.1 7.7 73.5 23 19.4 15.3 32.2 38.8 32.2 65.3v102h160v-129l-37.7-113.5c-11.1-10.9-26.2-17.5-42.3-17.5" />
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
            onClick={() => setDismissed(true)}
            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/90 flex items-center justify-center text-black hover:bg-gray-100 transition-colors flex-shrink-0 mt-0.5"
            aria-label="Close"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <button
          onClick={handleInstall}
          className="w-full bg-black text-white px-4 py-3 rounded-xl font-black text-sm sm:text-base uppercase tracking-wider shadow-lg hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
        >
          {isAndroid && deferredPrompt ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Install App
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              {isIOS ? "Add to Home Screen" : "Install App"}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
