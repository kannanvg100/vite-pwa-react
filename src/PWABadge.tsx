// import './PWABadge.css'

import { useRegisterSW } from "virtual:pwa-register/react";

function PWABadge() {
  // check for updates every hour
  const period = 30;

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      if (period <= 0) return;
      if (r?.active?.state === "activated") {
        registerPeriodicSync(period, swUrl, r);
      } else if (r?.installing) {
        r.installing.addEventListener("statechange", (e) => {
          const sw = e.target as ServiceWorker;
          if (sw.state === "activated") registerPeriodicSync(period, swUrl, r);
        });
      }
    },
  });

  function close() {
    setOfflineReady(false);
    setNeedRefresh(false);
  }

  return (
    <div className="mt-4" role="alert" aria-labelledby="toast-message">
      {offlineReady && <p>offlineReady ready</p>}
      {needRefresh && (
        <>
          <span id="toast-message">
            New content available, click on reload button to update.
          </span>

          <div className="PWABadge-buttons">
            {needRefresh && (
              <button
                className="PWABadge-toast-button"
                onClick={() => updateServiceWorker(true)}
              >
                Reload
              </button>
            )}
            <button className="PWABadge-toast-button" onClick={() => close()}>
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default PWABadge;

/**
 * This function will register a periodic sync check every hour, you can modify the interval as needed.
 */
function registerPeriodicSync(
  period: number,
  swUrl: string,
  r: ServiceWorkerRegistration
) {
  if (period <= 0) return;

  setInterval(async () => {
    if ("onLine" in navigator && !navigator.onLine) return;

    const resp = await fetch(swUrl, {
      cache: "no-store",
      headers: {
        cache: "no-store",
        "cache-control": "no-cache",
      },
    });

    if (resp?.status === 200) await r.update();
  }, period);
}
