import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LegalModal } from "@/components/LegalModal/LegalModal";
import { PrivacyPolicyContent, TermsOfServiceContent } from "@/lib/legal-content";

export function Footer() {
  const { t } = useTranslation();
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <>
      <footer className="bg-primary dark:bg-primary/90 text-white py-12 border-t border-white/10 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-2 font-display font-bold text-xl">
              <div className="w-8 h-8 rounded-lg bg-accent text-accent-foreground flex items-center justify-center">
                N
              </div>
              {t('footer.marketing')}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-white/60">
              <button
                onClick={() => setPrivacyOpen(true)}
                className="hover:text-white transition-colors underline-offset-4 hover:underline cursor-pointer"
              >
                {t('footer.privacy')}
              </button>
              <span className="text-white/30">•</span>
              <button
                onClick={() => setTermsOpen(true)}
                className="hover:text-white transition-colors underline-offset-4 hover:underline cursor-pointer"
              >
                {t('footer.terms')}
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-white/60">
              <span className="text-white/40">
                {t('footer.copyright')}
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Modals */}
      <LegalModal
        open={privacyOpen}
        onOpenChange={setPrivacyOpen}
        title="Privacy Policy"
        content={<PrivacyPolicyContent />}
      />
      <LegalModal
        open={termsOpen}
        onOpenChange={setTermsOpen}
        title="Terms of Service"
        content={<TermsOfServiceContent />}
      />
    </>
  );
}
