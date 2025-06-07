import { useState, useEffect } from "react";
import { Workbox } from "workbox-window";
import UpdatePrompt from "./components/UpdatePrompt";

function App() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(
    null
  );
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Register service worker and handle updates
    if ("serviceWorker" in navigator) {
      const wb = new Workbox("/sw.js");

      wb.addEventListener("waiting", (event) => {
        if (!event.sw) return;
        setWaitingWorker(event.sw);
        setUpdateAvailable(true);
      });

      wb.addEventListener("controlling", () => {
        window.location.reload();
      });

      wb.register();
    }

    // Handle online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleUpdate = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: "SKIP_WAITING" });
      setUpdateAvailable(false);
    }
  };

  const handleDismissUpdate = () => {
    setUpdateAvailable(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Status Bar */}
      <div
        className={`w-full py-2 px-4 text-center text-sm font-medium ${
          isOnline ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}
      >
        {isOnline ? "🟢 Online" : "🔴 Offline"}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Vite v23
          </h1>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

          {/* Status Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              App Status
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Connection</span>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    isOnline
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">PWA</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Updates</span>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    updateAvailable
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {updateAvailable ? "Available" : "Current"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Update Prompt */}
      {updateAvailable && (
        <UpdatePrompt onUpdate={handleUpdate} onDismiss={handleDismissUpdate} />
      )}

    </div>
  );
}

export default App;
