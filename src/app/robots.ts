import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://cvolt-resume-builder.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'], // Block API routes from being indexed to reduce search spam
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
