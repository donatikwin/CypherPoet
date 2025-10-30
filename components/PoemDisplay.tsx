
import React from 'react';

interface PoemDisplayProps {
  poem: string[];
  onMint: (index: number, text: string) => void;
  isLoading: boolean;
  texts: {
    mintButton: string;
  };
}

const Line: React.FC<{ text: string; index: number; onMint: (index: number, text: string) => void; mintButtonText: string; }> = ({ text, index, onMint, mintButtonText }) => (
    <div className="group flex flex-col sm:flex-row items-center justify-between w-full mb-3 p-3 border border-transparent hover:border-cyan-500/50 hover:bg-gray-900/50 transition-all duration-300">
        <p className="text-lg md:text-xl flex-grow text-left mb-2 sm:mb-0">
            <span className="text-cyan-400 mr-3">{`> `}</span>
            {text}
        </p>
        <button
            onClick={() => onMint(index, text)}
            className="w-full sm:w-auto text-sm font-bold text-black bg-cyan-400 px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white hover:text-cyan-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 focus:ring-offset-black"
        >
            {mintButtonText}
        </button>
    </div>
);


const SkeletonLine: React.FC = () => (
  <div className="w-full mb-3 p-3">
    <div className="h-6 bg-gray-800 rounded w-3/4 animate-pulse"></div>
  </div>
);

export const PoemDisplay: React.FC<PoemDisplayProps> = ({ poem, onMint, isLoading, texts }) => {
  return (
    <div className="w-full max-w-4xl my-8 p-4 border-2 border-dashed border-cyan-500/30 bg-black/20 backdrop-blur-sm">
      <div className="min-h-[200px]">
        {isLoading ? (
          <>
            <SkeletonLine />
            <SkeletonLine />
            <SkeletonLine />
            <SkeletonLine />
          </>
        ) : (
          poem.map((line, index) => (
            <Line key={index} text={line} index={index} onMint={onMint} mintButtonText={texts.mintButton} />
          ))
        )}
      </div>
    </div>
  );
};
