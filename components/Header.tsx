
import React from 'react';

interface HeaderProps {
    language: 'en' | 'ru';
    setLanguage: (lang: 'en' | 'ru') => void;
    texts: {
        headerSubtitle: string;
    };
}

export const Header: React.FC<HeaderProps> = ({ language, setLanguage, texts }) => {
  return (
    <header className="w-full text-center py-4 md:py-6">
      <h1 className="text-4xl md:text-6xl font-orbitron font-bold glitch" data-text="CypherPoet">
        CypherPoet
      </h1>
      <p className="text-sm md:text-base text-cyan-300 mt-2">
        {texts.headerSubtitle}
      </p>
       <div className="mt-4">
        <button 
          onClick={() => setLanguage('en')} 
          className={`px-2 py-1 text-sm font-orbitron transition-colors ${language === 'en' ? 'text-cyan-400 text-glow' : 'text-gray-600 hover:text-cyan-400'}`}
          aria-pressed={language === 'en'}
        >
          EN
        </button>
        <span className="text-gray-600">/</span>
        <button 
          onClick={() => setLanguage('ru')} 
          className={`px-2 py-1 text-sm font-orbitron transition-colors ${language === 'ru' ? 'text-cyan-400 text-glow' : 'text-gray-600 hover:text-cyan-400'}`}
          aria-pressed={language === 'ru'}
        >
          RU
        </button>
      </div>
    </header>
  );
};
