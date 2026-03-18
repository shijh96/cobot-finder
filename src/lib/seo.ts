/**
 * SEO helpers — JSON-LD structured data generators for CobotFinder.
 * Use with Next.js Script tag or <script> in page head.
 */

const SITE_URL = "https://cobotfinder.com";
const ORGANIZATION_NAME = "CobotFinder";

// ─── Organization Schema ───────────────────────────────────────────────────────

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORGANIZATION_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      email: "hello@cobotfinder.com",
    },
  };
}

// ─── Article Schema ────────────────────────────────────────────────────────────

interface ArticleSchemaOptions {
  title: string;
  description: string;
  slug: string;
  publishedAt: string; // ISO 8601
  updatedAt?: string;
  authorName?: string;
  imageUrl?: string;
}

export function generateArticleSchema({
  title,
  description,
  slug,
  publishedAt,
  updatedAt,
  authorName = ORGANIZATION_NAME,
  imageUrl,
}: ArticleSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${SITE_URL}/guides/${slug}`,
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    author: {
      "@type": "Organization",
      name: authorName,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: ORGANIZATION_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    ...(imageUrl && {
      image: {
        "@type": "ImageObject",
        url: imageUrl,
      },
    }),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guides/${slug}`,
    },
  };
}

// ─── Product Schema ────────────────────────────────────────────────────────────

interface ProductSchemaOptions {
  brand: string;
  model: string;
  description: string;
  slug: string; // e.g. "universal-robots/ur5e"
  payload?: number;
  reach?: number;
  priceRangeLow?: number;
  priceRangeHigh?: number;
  imageUrl?: string;
}

export function generateProductSchema({
  brand,
  model,
  description,
  slug,
  payload,
  reach,
  priceRangeLow,
  priceRangeHigh,
  imageUrl,
}: ProductSchemaOptions) {
  const specs = [];
  if (payload !== undefined) {
    specs.push({ "@type": "PropertyValue", name: "Payload", value: `${payload} kg`, unitCode: "KGM" });
  }
  if (reach !== undefined) {
    specs.push({ "@type": "PropertyValue", name: "Reach", value: `${reach} mm`, unitCode: "MMT" });
  }

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${brand} ${model}`,
    description,
    url: `${SITE_URL}/cobots/${slug}`,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    ...(imageUrl && { image: imageUrl }),
    ...(specs.length > 0 && { additionalProperty: specs }),
    ...(priceRangeLow !== undefined && priceRangeHigh !== undefined && {
      offers: {
        "@type": "AggregateOffer",
        lowPrice: priceRangeLow,
        highPrice: priceRangeHigh,
        priceCurrency: "USD",
        offerCount: "1+",
      },
    }),
  };
}

// ─── FAQ Schema ───────────────────────────────────────────────────────────────

interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

// ─── Breadcrumb Schema ───────────────────────────────────────────────────────

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ─── Helper: render schema in <script> tag ─────────────────────────────────────

export function schemaToScript(schema: Record<string, unknown>): string {
  return JSON.stringify(schema, null, 2);
}
