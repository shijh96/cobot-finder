/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://cobotfinder.com",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,

  // Exclude non-indexable and unfinished routes
  exclude: [
    "/api/*",
    "/quote/thank-you",
    "/privacy",
    "/terms",
    "/contact",
    "/compare",
    "/quote",
    "/brands/*",
    "/cobots/*",
  ],

  // Add static pages with higher priority
  additionalPaths: async () => [
    {
      loc: "/",
      priority: 1.0,
      changefreq: "daily",
    },
    {
      loc: "/calculator",
      priority: 0.9,
      changefreq: "monthly",
    },
  ],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/quote", "/compare", "/brands/", "/cobots/"],
      },
    ],
  },
};
