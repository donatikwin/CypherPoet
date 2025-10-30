
import React from 'react';

interface FooterProps {
    texts: {
        footerQuote: string;
        footerAttribution: string;
    }
}

export const Footer: React.FC<FooterProps> = ({ texts }) => {
  return (
    <footer className="w-full text-center py-4 mt-8">
      <p className="text-xs text-gray-600">
        {texts.footerQuote}
      </p>
      <p className="text-xs text-cyan-500 mt-1">{texts.footerAttribution}</p>
    </footer>
  );
};
