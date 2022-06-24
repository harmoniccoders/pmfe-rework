/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: 'Property Mataaz',
  titleTemplate: '%s | Buy, Rent, Relief',
  defaultTitle: 'Property Mataaz',
  description: 'Buy, Rent, Relief',
  canonical: 'https://propertymataaz.com',
  openGraph: {
    url: 'https://propertymataaz.com',
    title: 'Property Mataaz',
    description: 'Buy, Rent, Relief',
    images: [
      {
        url: '/assets/Buy_Illustration.png',
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
