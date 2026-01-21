import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

// Flag SVG Components
const RomaniaFlag = ({ className = "w-6 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 900 600" className={className}>
    <rect width="300" height="600" fill="#002B7F" />
    <rect x="300" width="300" height="600" fill="#FCD116" />
    <rect x="600" width="300" height="600" fill="#CE1126" />
  </svg>
);

const UKFlag = ({ className = "w-6 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 60 30" className={className}>
    <clipPath id="s">
      <path d="M0,0 v30 h60 v-30 z"/>
    </clipPath>
    <clipPath id="t">
      <path d="M30,15 h30 v15 z v-15 h-30 z h-30 v15 z v-15 h30 z"/>
    </clipPath>
    <g clipPath="url(#s)">
      <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
    </g>
  </svg>
);

const GermanyFlag = ({ className = "w-6 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 900 600" className={className}>
    <rect width="900" height="200" fill="#000" />
    <rect y="200" width="900" height="200" fill="#D00" />
    <rect y="400" width="900" height="200" fill="#FFCE00" />
  </svg>
);

const getFlagComponent = (lang: string) => {
  switch (lang) {
    case 'ro':
      return RomaniaFlag;
    case 'de':
      return GermanyFlag;
    case 'en':
    default:
      return UKFlag;
  }
};

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  if (!mounted) {
    return null;
  }

  const currentLanguage = i18n.resolvedLanguage || 'en';
  const CurrentFlag = getFlagComponent(currentLanguage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full w-10 h-10 bg-background/80 backdrop-blur-sm border-border shadow-sm">
          <CurrentFlag className="h-5 w-5 rounded-sm" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLanguage('en')} className={currentLanguage === 'en' ? 'bg-accent/20' : ''}>
          <UKFlag className="mr-2 h-4 w-6" />
          English (EN)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('ro')} className={currentLanguage === 'ro' ? 'bg-accent/20' : ''}>
          <RomaniaFlag className="mr-2 h-4 w-6" />
          Română (RO)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('de')} className={currentLanguage === 'de' ? 'bg-accent/20' : ''}>
          <GermanyFlag className="mr-2 h-4 w-6" />
          Deutsch (DE)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
