import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { useEffect, useState } from 'react';

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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full w-10 h-10 bg-background/80 backdrop-blur-sm border-border shadow-sm">
          <Globe className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLanguage('en')} className={currentLanguage === 'en' ? 'bg-accent/20' : ''}>
          English (EN)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('ro')} className={currentLanguage === 'ro' ? 'bg-accent/20' : ''}>
          Română (RO)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('de')} className={currentLanguage === 'de' ? 'bg-accent/20' : ''}>
          Deutsch (DE)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
