
import React from 'react';

interface ControlsProps {
  onGenerate: () => void;
  isLoading: boolean;
  texts: {
    generateButton: string;
    connectingStatus: string;
  };
}

export const Controls: React.FC<ControlsProps> = ({ onGenerate, isLoading, texts }) => {
  return (
    <div className="mt-4">
      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="relative px-8 py-3 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          {isLoading ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {texts.connectingStatus}
            </div>
          ) : (
            texts.generateButton
          )}
        </span>
      </button>
    </div>
  );
};
