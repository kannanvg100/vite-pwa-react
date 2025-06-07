import React from "react";

interface UpdatePromptProps {
  onUpdate: () => void;
  onDismiss: () => void;
}

const UpdatePrompt: React.FC<UpdatePromptProps> = ({ onUpdate, onDismiss }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
        <div className="flex items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Update Available
          </h3>
        </div>

        <p className="text-gray-600 mb-6">
          A new version of the app is available. Update now to get the latest
          features and improvements.
        </p>

        <div className="flex space-x-3">
          <button
            onClick={onUpdate}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Update Now
          </button>
          <button
            onClick={onDismiss}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Later
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-3 text-center">
          The app will refresh automatically after updating
        </p>
      </div>
    </div>
  );
};

export default UpdatePrompt;
