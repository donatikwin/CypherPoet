
import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { PoemDisplay } from './components/PoemDisplay';
import { Controls } from './components/Controls';
import { MintModal } from './components/MintModal';
import { generateCyberpunkPoem } from './services/geminiService';
import { Footer } from './components/Footer';
import { translations } from './lib/translations';

interface MintingLine {
  index: number;
  text: string;
}

type Language = 'en' | 'ru';

const App: React.FC = () => {
  const [poem, setPoem] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [mintingLine, setMintingLine] = useState<MintingLine | null>(null);
  const [language, setLanguage] = useState<Language>('en');

  const texts = translations[language];

  const handleGeneratePoem = useCallback(async (lang: Language) => {
    setIsLoading(true);
    setError(null);
    try {
      const newPoem = await generateCyberpunkPoem(lang);
      setPoem(newPoem);
    } catch (err) {
      setError(texts.errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [texts.errorMessage]);
  
  // Generate a poem on initial load and when language changes
  useEffect(() => {
    handleGeneratePoem(language);
  }, [language, handleGeneratePoem]);

  const handleMint = (index: number, text: string) => {
    setMintingLine({ index, text });
  };

  const handleCloseModal = () => {
    setMintingLine(null);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col p-4 sm:p-6 lg:p-8 selection:bg-fuchsia-500 selection:text-white">
      <div 
        className="absolute inset-0 bg-grid-cyan opacity-10" 
        style={{
          backgroundImage: 'linear-gradient(to right, #00f0ff 1px, transparent 1px), linear-gradient(to bottom, #00f0ff 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
      ></div>
      <div className="relative z-10 flex flex-col flex-grow">
        <Header language={language} setLanguage={setLanguage} texts={texts}/>
        <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
          <PoemDisplay poem={poem} onMint={handleMint} isLoading={isLoading} texts={texts} />
          <Controls onGenerate={() => handleGeneratePoem(language)} isLoading={isLoading} texts={texts} />
          {error && <p className="text-red-500 mt-4 animate-pulse">{error}</p>}
        </main>
        <Footer texts={texts} />
      </div>
      {mintingLine && (
        <MintModal line={mintingLine} onClose={handleCloseModal} texts={texts}/>
      )}
    </div>
  );
};

export default App;
