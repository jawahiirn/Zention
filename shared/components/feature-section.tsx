import { getTranslations } from 'next-intl/server';
import { Search, Info, BarChart } from 'lucide-react';

export async function FeatureSection() {
  const t = await getTranslations('Index');

  const features = [
    { key: 'search', Icon: Search },
    { key: 'details', Icon: Info },
    { key: 'compare', Icon: BarChart },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
      {features.map(({ key, Icon }) => (
        <div 
          key={key} 
          className="p-6 rounded-xl border bg-card/50 hover:bg-card hover:shadow-lg transition-all duration-300 group cursor-default"
        >
          <div className="mb-4 size-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Icon className="size-5 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2 tracking-tight">
            {t(`features.${key}`)}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
             Seamlessly browse the entire world of Pokemon with high performance and real-time validation.
          </p>
        </div>
      ))}
    </section>
  );
}
