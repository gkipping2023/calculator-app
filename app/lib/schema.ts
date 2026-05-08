export function calculatorSchema(name: string, description: string, slug: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yourdomain.com';
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url: `${siteUrl}/calculators/${slug}`,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    creator: {
      '@type': 'Organization',
      name: 'Calculator Pro',
      url: siteUrl,
    },
  };
}

export function websiteSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yourdomain.com';
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Calculator Pro',
    url: siteUrl,
    description: 'Fast, accurate online calculators for finance, health, fitness, math, and more.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/calculators?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
