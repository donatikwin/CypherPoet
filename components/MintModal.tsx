
import React, { useState, useEffect } from 'react';

interface MintModalProps {
  line: {
    index: number;
    text: string;
  };
  onClose: () => void;
  texts: {
    mintingTitle: string;
    statusLabel: string;
    txHashLabel: string;
    closeButton: string;
    mintingStatus: Record<number, string>;
  };
}

enum MintingStatus {
  Idle,
  Connecting,
  Uploading,
  Confirming,
  Success,
  Failed
}

export const MintModal: React.FC<MintModalProps> = ({ line, onClose, texts }) => {
  const [status, setStatus] = useState<MintingStatus>(MintingStatus.Idle);
  const statusMessages = texts.mintingStatus;

  useEffect(() => {
    const steps = [
      MintingStatus.Connecting,
      MintingStatus.Uploading,
      MintingStatus.Confirming,
      MintingStatus.Success,
    ];
    let currentStep = 0;
    
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setStatus(steps[currentStep]);
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-gray-900 border-2 border-fuchsia-500/50 p-6 shadow-lg shadow-fuchsia-500/20">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-orbitron text-fuchsia-400">{texts.mintingTitle} #{line.index + 1}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl" aria-label={texts.closeButton}>&times;</button>
        </div>
        
        <div className="mb-6 p-4 border border-gray-700 bg-black">
          <p className="text-cyan-300 text-lg break-words">{`> ${line.text}`}</p>
        </div>
        
        <div className="font-mono">
          <p className="text-lg mb-2">{texts.statusLabel}</p>
          <div className="p-4 bg-black text-green-400 flex items-center">
            {status !== MintingStatus.Success && status !== MintingStatus.Failed && (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
             <span className={status === MintingStatus.Success ? 'text-cyan-400' : status === MintingStatus.Failed ? 'text-red-500' : ''}>
               {statusMessages[status]}
             </span>
          </div>
        </div>

        {status === MintingStatus.Success && (
            <div className="mt-4 break-all text-xs">
                <p className="text-gray-400">{texts.txHashLabel}</p>
                <p className="text-white">0x{Array.from({length: 64}, () => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('')}</p>
            </div>
        )}
        
        {status === MintingStatus.Success && (
            <button onClick={onClose} className="mt-6 w-full bg-fuchsia-500 text-black font-bold py-2 hover:bg-fuchsia-300">
                {texts.closeButton}
            </button>
        )}
      </div>
    </div>
  );
};
