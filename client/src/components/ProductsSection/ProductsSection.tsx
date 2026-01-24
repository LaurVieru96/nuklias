import { useTranslation } from "react-i18next";
import { ServiceCard } from "@/components/ServiceCard/ServiceCard";
import { useMemo } from "react";

export function ProductsSection() {
  const { t } = useTranslation();

  const tiers = useMemo(() => ([
    {
      tier: "bronze" as const,
      delay: 0,
      features: [
        t('products_section.tiers.bronze.features.1'),
        t('products_section.tiers.bronze.features.2'),
        t('products_section.tiers.bronze.features.3'),
        t('products_section.tiers.bronze.features.4'),
        t('products_section.tiers.bronze.features.5')
      ]
    },
    {
      tier: "silver" as const,
      delay: 0.1,
      features: [
        t('products_section.tiers.silver.features.1'),
        t('products_section.tiers.silver.features.2'),
        t('products_section.tiers.silver.features.3'),
        t('products_section.tiers.silver.features.4'),
        t('products_section.tiers.silver.features.5')
      ]
    },
    {
      tier: "gold" as const,
      delay: 0.2,
      features: [
        t('products_section.tiers.gold.features.1'),
        t('products_section.tiers.gold.features.2'),
        t('products_section.tiers.gold.features.3'),
        t('products_section.tiers.gold.features.4'),
        t('products_section.tiers.gold.features.5')
      ]
    },
    {
      tier: "talent" as const,
      delay: 0.3,
      features: [
        t('products_section.tiers.talent.features.1'),
        t('products_section.tiers.talent.features.2'),
        t('products_section.tiers.talent.features.3'),
        t('products_section.tiers.talent.features.4'),
        t('products_section.tiers.talent.features.5')
      ]
    }
  ]), [t]);

  return (
    <section className="py-24 bg-gray-50 dark:bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold font-display text-accent mb-4 md:text-5xl">
            {t('products_section.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t('products_section.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {tiers.map((item) => (
            <ServiceCard
              key={item.tier}
              title={t(`products_section.tiers.${item.tier}.title`)}
              subtitle={t(`products_section.tiers.${item.tier}.subtitle`)}
              tier={item.tier}
              delay={item.delay}
              features={item.features}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
