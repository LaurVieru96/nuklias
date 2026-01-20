import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { X, Settings, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { LegalModal } from "@/components/LegalModal/LegalModal";
import { PrivacyPolicyContent } from "@/lib/legal-content";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const defaultPreferences: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
};

export function CookieConsent() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const [showCustomize, setShowCustomize] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  useEffect(() => {
    const savedConsent = localStorage.getItem("cookie_consent");
    if (!savedConsent) {
      // Small delay for better UX on initial load
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    } else {
      try {
        setPreferences(JSON.parse(savedConsent));
      } catch (e) {
        console.error("Failed to parse cookie preferences", e);
      }
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem("cookie_consent", JSON.stringify(prefs));
    setPreferences(prefs);
    setIsVisible(false);
    setShowCustomize(false);
  };

  const handleAcceptAll = () => {
    savePreferences({
      essential: true,
      analytics: true,
      marketing: true,
    });
  };

  const handleDeclineAll = () => {
    savePreferences({
      essential: true,
      analytics: false,
      marketing: false,
    });
  };

  const handleSaveCustom = () => {
    savePreferences(preferences);
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-[49] p-4 md:p-6 mb-16 md:mb-0" // mb-16 on mobile for the floating switcher
          >
            <div className="max-w-7xl mx-auto">
              <div className="bg-white/80 dark:bg-card/90 backdrop-blur-md border border-border shadow-2xl rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center justify-between">
                
                <div className="flex-1 space-y-2 text-center md:text-left">
                  <h3 className="text-lg font-bold font-display flex items-center justify-center md:justify-start gap-2">
                    <Shield className="w-5 h-5 text-accent" />
                    Cookie Preferences
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
                    {t('cookie.text')}
                    {" "}
                    <button 
                      onClick={() => setShowPrivacy(true)}
                      className="text-primary hover:underline font-bold"
                    >
                      {t('cookie.policy_link')}
                    </button>.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <Button 
                    variant="outline" 
                    onClick={handleDeclineAll}
                    className="order-2 sm:order-1 border-destructive/20 text-destructive hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
                  >
                    {t('cookie.refuse')}
                  </Button>
                  <Button 
                    variant="secondary"
                    onClick={() => setShowCustomize(true)}
                    className="order-3 sm:order-2 gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    {t('cookie.customize')}
                  </Button>
                  <Button 
                    onClick={handleAcceptAll}
                    className="order-1 sm:order-3 bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-lg shadow-accent/20"
                  >
                    {t('cookie.accept')}
                  </Button>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Customize Modal */}
      <Dialog open={showCustomize} onOpenChange={setShowCustomize}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t('cookie.customize')}</DialogTitle>
            <DialogDescription>
              Manage your cookie settings. Strictly necessary cookies are always enabled.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Strictly Necessary
                </label>
                <p className="text-xs text-muted-foreground">
                  Required for the website to function properly.
                </p>
              </div>
              <Switch checked disabled />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Analytics
                </label>
                <p className="text-xs text-muted-foreground">
                  Help us understand how visitors interact with the website.
                </p>
              </div>
              <Switch 
                checked={preferences.analytics}
                onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, analytics: checked }))}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Marketing
                </label>
                <p className="text-xs text-muted-foreground">
                  Used to deliver relevant advertisements and track performance.
                </p>
              </div>
              <Switch 
                checked={preferences.marketing}
                onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, marketing: checked }))}
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowCustomize(false)}>Cancel</Button>
            <Button onClick={handleSaveCustom} className="bg-primary text-primary-foreground">Save Preferences</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Privacy Policy Modal */}
      <LegalModal
        open={showPrivacy}
        onOpenChange={setShowPrivacy}
        title="Privacy Policy"
        content={<PrivacyPolicyContent />}
      />
    </>
  );
}
