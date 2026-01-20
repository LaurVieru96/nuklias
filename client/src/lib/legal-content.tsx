import { useTranslation, Trans } from 'react-i18next';

export const PrivacyPolicyContent = () => {
  const { t } = useTranslation();
  
  // Helper to ensure lists are treated as arrays
  const getList = (key: string): string[] => {
    const list = t(key, { returnObjects: true });
    if (Array.isArray(list)) {
      return list.filter((item): item is string => typeof item === 'string');
    }
    return [];
  };

  return (
    <div className="space-y-8 text-foreground/90">
      {/* 1. Introduction */}
      <section>
        <h2 className="text-xl font-bold mb-3 text-foreground">{t('legal.privacy.intro.title')}</h2>
        <p className="leading-relaxed">{t('legal.privacy.intro.content')}</p>
      </section>

      {/* 2. Collection */}
      <section>
        <h2 className="text-xl font-bold mb-3 text-foreground">{t('legal.privacy.collection.title')}</h2>
        <p className="mb-4 leading-relaxed">{t('legal.privacy.collection.content')}</p>
        <ul className="list-disc pl-5 space-y-2">
          <li className="pl-1"><Trans i18nKey="legal.privacy.collection.list.personal" /></li>
          <li className="pl-1"><Trans i18nKey="legal.privacy.collection.list.usage" /></li>
          <li className="pl-1"><Trans i18nKey="legal.privacy.collection.list.cookies" /></li>
        </ul>
      </section>

      {/* 3. Usage */}
      <section>
        <h2 className="text-xl font-bold mb-3 text-foreground">{t('legal.privacy.usage.title')}</h2>
        <p className="mb-4 leading-relaxed">{t('legal.privacy.usage.content')}</p>
        <ul className="list-disc pl-5 space-y-2">
          {getList('legal.privacy.usage.list').map((item, i) => (
            <li key={i} className="pl-1">{item}</li>
          ))}
        </ul>
      </section>

      {/* 4. Retention */}
      <section>
        <h2 className="text-xl font-bold mb-3 text-foreground">{t('legal.privacy.retention.title')}</h2>
        <p className="leading-relaxed">{t('legal.privacy.retention.content')}</p>
      </section>

      {/* 5. Transfer */}
      <section>
        <h2 className="text-xl font-bold mb-3 text-foreground">{t('legal.privacy.transfer.title')}</h2>
        <p className="leading-relaxed">{t('legal.privacy.transfer.content')}</p>
      </section>

      {/* 6. Rights */}
      <section>
        <h2 className="text-xl font-bold mb-3 text-foreground">{t('legal.privacy.rights.title')}</h2>
        <p className="mb-4 leading-relaxed">{t('legal.privacy.rights.content')}</p>
        <ul className="list-disc pl-5 space-y-2">
          <li className="pl-1"><Trans i18nKey="legal.privacy.rights.list.access" /></li>
          <li className="pl-1"><Trans i18nKey="legal.privacy.rights.list.rectification" /></li>
          <li className="pl-1"><Trans i18nKey="legal.privacy.rights.list.erasure" /></li>
          <li className="pl-1"><Trans i18nKey="legal.privacy.rights.list.restrict" /></li>
          <li className="pl-1"><Trans i18nKey="legal.privacy.rights.list.portability" /></li>
          <li className="pl-1"><Trans i18nKey="legal.privacy.rights.list.object" /></li>
        </ul>
      </section>

      {/* 7. Security */}
      <section>
        <h2 className="text-xl font-bold mb-3 text-foreground">{t('legal.privacy.security.title')}</h2>
        <p className="leading-relaxed">{t('legal.privacy.security.content')}</p>
      </section>

      {/* 8. Contact */}
      <section>
        <h2 className="text-xl font-bold mb-3 text-foreground">{t('legal.privacy.contact.title')}</h2>
        <p className="leading-relaxed">{t('legal.privacy.contact.content')}</p>
      </section>
    </div>
  );
};

export const TermsOfServiceContent = () => {
  const { t } = useTranslation();

  // Helper to ensure lists are treated as arrays
  const getList = (key: string): string[] => {
    const list = t(key, { returnObjects: true });
    if (Array.isArray(list)) {
      return list.filter((item): item is string => typeof item === 'string');
    }
    return [];
  };

  return (
    <div className="space-y-8 text-foreground/90">
      {/* 1. Acceptance */}
      <section>
        <h2 className="text-xl font-bold mb-3 text-foreground">{t('legal.terms.intro.title')}</h2>
        <p className="leading-relaxed">{t('legal.terms.intro.content')}</p>
      </section>

      {/* 2. Services */}
      <section>
        <h2 className="text-xl font-bold mb-3 text-foreground">{t('legal.terms.services.title')}</h2>
        <p className="leading-relaxed">{t('legal.terms.services.content')}</p>
      </section>

      {/* 3. Responsibilities */}
      <section>
        <h2 className="text-xl font-bold mb-3 text-foreground">{t('legal.terms.responsibilities.title')}</h2>
        <p className="mb-4 leading-relaxed">{t('legal.terms.responsibilities.content')}</p>
        <ul className="list-disc pl-5 space-y-2">
          {getList('legal.terms.responsibilities.list').map((item, i) => (
             <li key={i} className="pl-1">{item}</li>
          ))}
        </ul>
      </section>

      {/* 4. IP */}
      <section>
        <h2 className="text-xl font-bold mb-3 text-foreground">{t('legal.terms.intellectual_property.title')}</h2>
        <p className="leading-relaxed">{t('legal.terms.intellectual_property.content')}</p>
      </section>

      {/* 5. Payment */}
      <section>
        <h2 className="text-xl font-bold mb-3 text-foreground">{t('legal.terms.payment.title')}</h2>
        <p className="leading-relaxed">{t('legal.terms.payment.content')}</p>
      </section>

      {/* 6. Liability */}
      <section>
        <h2 className="text-xl font-bold mb-3 text-foreground">{t('legal.terms.liability.title')}</h2>
        <p className="leading-relaxed">{t('legal.terms.liability.content')}</p>
      </section>

      {/* 7. Termination */}
      <section>
        <h2 className="text-xl font-bold mb-3 text-foreground">{t('legal.terms.termination.title')}</h2>
        <p className="leading-relaxed">{t('legal.terms.termination.content')}</p>
      </section>

      {/* 8. Governing */}
      <section>
        <h2 className="text-xl font-bold mb-3 text-foreground">{t('legal.terms.governing.title')}</h2>
        <p className="leading-relaxed">{t('legal.terms.governing.content')}</p>
      </section>

      {/* 9. Changes */}
      <section>
        <h2 className="text-xl font-bold mb-3 text-foreground">{t('legal.terms.changes.title')}</h2>
        <p className="leading-relaxed">{t('legal.terms.changes.content')}</p>
      </section>
    </div>
  );
};
