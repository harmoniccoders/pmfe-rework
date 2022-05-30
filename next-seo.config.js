/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: 'Property Mataaz',
  titleTemplate: '%s | Airline Solutions',
  defaultTitle: 'Property Mataaz',
  description: 'Airline solutions',
  canonical: 'https://propertymataaz.com',
  openGraph: {
    url: 'https://propertymataaz.com',
    title: 'Property Mataaz',
    description: 'Airline solutions',
    images: [
      {
        url: '/assets/logowhite.png',
        alt: 'Property Mataaz',
      },
    ],
    site_name: 'Property Mataaz',
  },
  twitter: {
    handle: '@sozonome',
    cardType: 'summary_large_image',
  },
};

export default defaultSEOConfig;
