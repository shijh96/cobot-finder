/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://cobotfinder.com",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,

  // Exclude non-indexable routes
  exclude: [
    "/api/*",
    "/quote/thank-you",
    "/privacy",
    "/terms",
    "/contact",
  ],

  // Add static pages with higher priority
  additionalPaths: async () => [
    {
      loc: "/",
      priority: 1.0,
      changefreq: "daily",
    },
    {
      loc: "/compare",
      priority: 0.9,
      changefreq: "weekly",
    },
    {
      loc: "/calculator",
      priority: 0.9,
      changefreq: "monthly",
    },
    {
      loc: "/quote",
      priority: 0.8,
      changefreq: "monthly",
    },
    // Use case guides
    ...[
      "cobots-for-welding",
      "cobots-for-palletizing",
      "cobots-for-assembly",
      "cobots-for-machine-tending",
      "cobot-buyers-guide",
      "cobot-cost-pricing",
      "ur5e-vs-ur10e",
    ].map((slug) => ({
      loc: `/guides/${slug}`,
      priority: 0.85,
      changefreq: "weekly",
    })),
    // Brand pages
    ...[
      "universal-robots",
      "fanuc",
      "abb",
      "kuka",
      "doosan",
      "techman",
    ].map((brand) => ({
      loc: `/brands/${brand}`,
      priority: 0.8,
      changefreq: "weekly",
    })),
  ],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/quote/thank-you"],
      },
    ],
  },
};
