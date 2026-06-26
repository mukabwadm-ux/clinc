export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://clincorp.co.ke/#organization',
        name: 'Clin-Corp Limited',
        alternateName: 'Clin-Corp',
        url: 'https://clincorp.co.ke',
        logo: {
          '@type': 'ImageObject',
          url: 'https://clincorp.co.ke/clincorp_logo.png',
          width: 160,
          height: 48,
        },
        description:
          "Kenya's Authorized Distributor for Hempel Industrial and Marine Coatings, serving East Africa from Nairobi since 2024.",
        foundingDate: '2024',
        areaServed: {
          '@type': 'GeoCircle',
          geoMidpoint: {
            '@type': 'GeoCoordinates',
            latitude: -1.2921,
            longitude: 36.8219,
          },
          name: 'East Africa',
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Britam Towers, Upper Hill',
          addressLocality: 'Nairobi',
          postalCode: '00100',
          addressCountry: 'KE',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+254-723-887-417',
          contactType: 'sales',
          email: 'clinton@clincorp.co.ke',
          areaServed: 'KE',
          availableLanguage: 'English',
        },
        sameAs: ['https://github.com/mukabwadm-ux/clinc'],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://clincorp.co.ke/#website',
        url: 'https://clincorp.co.ke',
        name: 'Clin-Corp',
        description: 'Authorized Hempel Industrial & Marine Coatings Distributor — Kenya',
        publisher: { '@id': 'https://clincorp.co.ke/#organization' },
        inLanguage: 'en-KE',
      },
      {
        '@type': 'LocalBusiness',
        '@id': 'https://clincorp.co.ke/#localbusiness',
        name: 'Clin-Corp Limited',
        image: 'https://clincorp.co.ke/clincorp_logo.png',
        telephone: '+254723887417',
        email: 'clinton@clincorp.co.ke',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Britam Towers, Upper Hill',
          addressLocality: 'Nairobi',
          postalCode: '00100',
          addressCountry: 'KE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: -1.2921,
          longitude: 36.8219,
        },
        url: 'https://clincorp.co.ke',
        priceRange: '$$',
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '17:00',
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
