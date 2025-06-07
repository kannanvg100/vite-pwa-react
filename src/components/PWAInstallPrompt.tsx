import React from "react";

interface PWAInstallPromptProps {
  onInstall: () => void;
  onDismiss: () => void;
}

const PWAInstallPrompt: React.FC<PWAInstallPromptProps> = ({
  onInstall,
  onDismiss,
}) => {
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white rounded-lg shadow-xl border p-4 z-40">
      <div className="flex items-start">
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-gray-800 mb-1">
            Install App
          </h4>
          <p className="text-xs text-gray-600 mb-3">
            Install this app for a better experience with offline access and
            quick launch.
          </p>

          <div className="flex space-x-2">
            <button
              onClick={onInstall}
              className="bg-green-500 hover:bg-green-600 text-white text-xs font-medium py-1.5 px-3 rounded transition-colors"
            >
              Install
            </button>
            <button
              onClick={onDismiss}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-medium py-1.5 px-3 rounded transition-colors"
            >
              Not now
            </button>
          </div>
        </div>

        <button
          onClick={onDismiss}
          className="text-gray-400 hover:text-gray-600 ml-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
