import { SITE_URL, SITE_NAME, CONTACT_EMAIL } from '@/lib/site'

export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Clincorps Limited',
        alternateName: SITE_NAME,
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/clincorp_logo.png`,
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
          email: CONTACT_EMAIL,
          areaServed: 'KE',
          availableLanguage: 'English',
        },
        sameAs: ['https://github.com/mukabwadm-ux/clinc'],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: 'Authorized Hempel Industrial & Marine Coatings Distributor — Kenya',
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'en-KE',
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/#localbusiness`,
        name: 'Clincorps Limited',
        image: `${SITE_URL}/clincorp_logo.png`,
        telephone: '+254723887417',
        email: CONTACT_EMAIL,
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
        url: SITE_URL,
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
