import { useRegisterSW } from "virtual:pwa-register/react";

function PWABadge() {
  // Check for updates every 30 seconds (for testing)
  const period = 20 * 1000; // 30 seconds

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      console.log('SW registered with URL:', swUrl);
      console.log('Registration:', r);
      
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
    onNeedRefresh() {
      console.log('Need refresh callback triggered');
    },
    onOfflineReady() {
      console.log('Offline ready callback triggered');
    }
  });

  function close() {
    setOfflineReady(false);
    setNeedRefresh(false);
  }

  // Handle reload with debug logging
  const handleReload = async () => {
    console.log('Reload button clicked');
    console.log('updateServiceWorker function:', updateServiceWorker);
    
    try {
      console.log('Calling updateServiceWorker...');
      await updateServiceWorker(true);
      console.log('updateServiceWorker completed');
    } catch (error) {
      console.error('Failed to update service worker:', error);
      console.log('Falling back to window.location.reload()');
      // Fallback to manual reload
      window.location.reload();
    }
  };

  return (
    <div className="mt-4" role="alert" aria-labelledby="toast-message">
      {offlineReady && (
        <div className="p-4 mb-4 bg-green-100 border border-green-200 rounded">
          <p className="text-green-800">App is ready to work offline!</p>
          <button 
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={close}
          >
            Close
          </button>
        </div>
      )}
      
      {needRefresh && (
        <div className="p-4 mb-4 bg-blue-100 border border-blue-200 rounded">
          <span id="toast-message" className="block mb-3 text-blue-800">
            New content available, click on reload button to update.
          </span>

          <div className="space-x-2">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={handleReload}
            >
              Reload
            </button>
            <button 
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700" 
              onClick={close}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PWABadge;

/**
 * Register periodic sync check - polls for updates at specified interval
 */
function registerPeriodicSync(
  period: number,
  swUrl: string,
  r: ServiceWorkerRegistration
) {
  if (period <= 0) return;

  console.log(`Setting up periodic sync every ${period}ms`);

  setInterval(async () => {
    // Skip if offline
    if ("onLine" in navigator && !navigator.onLine) {
      console.log('Skipping update check - offline');
      return;
    }

    console.log('Checking for updates...');
    
    try {
      const resp = await fetch(swUrl, {
        cache: "no-store",
        headers: {
          cache: "no-store",
          "cache-control": "no-cache",
        },
      });

      console.log('Update check response status:', resp?.status);

      if (resp?.status === 200) {
        console.log('Calling r.update()');
        await r.update();
        console.log('r.update() completed');
      }
    } catch (error) {
      console.error('Failed to check for updates:', error);
    }
  }, period);
}