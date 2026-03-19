import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import type { Metadata } from 'next';
import remarkGfm from 'remark-gfm';

import { getPostBySlug, getAllPostSlugs, getAllPosts } from '@/lib/mdx';
import CobotCard from '@/components/cobots/CobotCard';
import CobotCompareTable from '@/components/cobots/CobotCompareTable';
import CTAQuote from '@/components/cobots/CTAQuote';
import FAQ from '@/components/cobots/FAQ';
import { generateBreadcrumbSchema } from '@/lib/seo';
import { articleData } from '@/data/article-data';

// ----------------------------------------------------------------
// Custom MDX components available inside every article
// ----------------------------------------------------------------

const mdxComponents = {
  CobotCard,
  CobotCompareTable,
  CTAQuote,
  FAQ,
};

// ----------------------------------------------------------------
// Static params (SSG)
// ----------------------------------------------------------------

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

// ----------------------------------------------------------------
// Dynamic metadata
// ----------------------------------------------------------------

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata(
  { params }: PageProps,
): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      images: post.image ? [{ url: post.image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: `/guides/${slug}`,
    },
  };
}

// ----------------------------------------------------------------
// JSON-LD structured data
// ----------------------------------------------------------------

function ArticleJsonLd({
  title,
  description,
  date,
  slug,
  image,
}: {
  title: string;
  description: string;
  date: string;
  slug: string;
  image?: string;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished: date,
    dateModified: date,
    url: `https://cobotfinder.com/guides/${slug}`,
    image: image || 'https://cobotfinder.com/og-default.jpg',
    author: {
      '@type': 'Organization',
      name: 'Cobot Finder',
      url: 'https://cobotfinder.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cobot Finder',
      url: 'https://cobotfinder.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cobotfinder.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://cobotfinder.com/guides/${slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ----------------------------------------------------------------
// Breadcrumb
// ----------------------------------------------------------------

function Breadcrumb({ category, title }: { category: string; title: string }) {
  const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);
  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className="flex flex-wrap items-center gap-0.5 text-xs text-gray-500">
        <li>
          <Link href="/" className="hover:text-gray-600 transition-colors">
            Home
          </Link>
        </li>
        <li aria-hidden="true" className="mx-1 select-none">/</li>
        <li>
          <Link href="/guides" className="hover:text-gray-600 transition-colors">
            Guides
          </Link>
        </li>
        <li aria-hidden="true" className="mx-1 select-none">/</li>
        <li>
          <Link
            href={`/guides?category=${category}`}
            className="hover:text-gray-600 transition-colors"
          >
            {categoryLabel}
          </Link>
        </li>
        <li aria-hidden="true" className="mx-1 select-none">/</li>
        <li className="text-gray-500 truncate max-w-[180px] sm:max-w-xs" aria-current="page">
          {title}
        </li>
      </ol>
    </nav>
  );
}

// ----------------------------------------------------------------
// Category badge color map
// ----------------------------------------------------------------

const CATEGORY_COLORS: Record<string, string> = {
  buying:    'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  comparison: 'bg-violet-50 text-violet-700 ring-violet-600/20',
  industry:  'bg-amber-50  text-amber-700  ring-amber-600/20',
  safety:    'bg-red-50    text-red-700    ring-red-600/20',
  roi:       'bg-blue-50   text-blue-700   ring-blue-600/20',
};

function categoryBadgeClasses(category: string): string {
  return (
    CATEGORY_COLORS[category.toLowerCase()] ??
    'bg-blue-50 text-blue-700 ring-blue-600/20'
  );
}

// ----------------------------------------------------------------
// Related Articles
// ----------------------------------------------------------------

function RelatedArticles({
  currentSlug,
  currentCategory,
}: {
  currentSlug: string;
  currentCategory: string;
}) {
  const allPosts = getAllPosts();
  const otherPosts = allPosts.filter((p) => p.slug !== currentSlug);

  const sameCategory = otherPosts.filter((p) => p.category === currentCategory);
  const diffCategory = otherPosts.filter((p) => p.category !== currentCategory);
  const related = [...sameCategory, ...diffCategory].slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="mt-12 border-t border-gray-200 pt-8" aria-labelledby="related-heading">
      <h2
        id="related-heading"
        className="text-base font-semibold text-gray-900 tracking-tight mb-4"
      >
        Related Guides
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={`/guides/${post.slug}`}
            className="group flex flex-col gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-3 hover:border-blue-300 hover:bg-blue-50/30 transition-colors duration-150"
          >
            <div className="flex items-center gap-2">
              <span
                className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${categoryBadgeClasses(post.category)}`}
              >
                {post.category}
              </span>
              <span className="text-xs text-gray-400">{post.readingTime}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-800 group-hover:text-blue-700 leading-snug transition-colors">
              {post.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ----------------------------------------------------------------
// Page component
// ----------------------------------------------------------------

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const categoryLabel = post.category.charAt(0).toUpperCase() + post.category.slice(1);
  const breadcrumbItems = [
    { name: 'Home',        url: 'https://cobotfinder.com/' },
    { name: 'Guides',      url: 'https://cobotfinder.com/guides' },
    { name: categoryLabel, url: `https://cobotfinder.com/guides?category=${post.category}` },
    { name: post.title,    url: `https://cobotfinder.com/guides/${slug}` },
  ];

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.description}
        date={post.date}
        slug={post.slug}
        image={post.image}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbItems)),
        }}
      />

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <Breadcrumb category={post.category} title={post.title} />

        {/* Header */}
        <header className="mb-8 pb-7 border-b border-gray-200">
          {/* Meta row: category badge + reading time + date */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Link
              href={`/guides?category=${post.category}`}
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ring-1 ring-inset transition-opacity hover:opacity-80 ${categoryBadgeClasses(post.category)}`}
            >
              {categoryLabel}
            </Link>
            <span className="text-gray-300" aria-hidden="true">|</span>
            <span className="text-xs text-gray-500">{post.readingTime}</span>
            <span className="text-gray-300" aria-hidden="true">|</span>
            <time
              dateTime={post.date}
              className="text-xs text-gray-500"
            >
              {formattedDate}
            </time>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 leading-snug sm:text-3xl">
            {post.title}
          </h1>

          {/* Description */}
          <p className="mt-3 text-sm leading-relaxed text-gray-500 sm:text-base">
            {post.description}
          </p>
        </header>

        {/* MDX body */}
        <div
          className="
            prose prose-gray max-w-none
            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900
            prose-h2:text-xl prose-h3:text-lg
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
            prose-strong:text-gray-900
            prose-code:text-sm prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:font-mono
            prose-pre:bg-gray-900 prose-pre:text-gray-100
            prose-blockquote:border-l-blue-500 prose-blockquote:text-gray-600 prose-blockquote:not-italic
            prose-table:text-sm prose-th:bg-gray-50 prose-th:text-gray-700
            prose-img:rounded-lg prose-img:shadow-sm
            prose-hr:border-gray-200
            prose-li:text-gray-700
          "
        >
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              scope: articleData[slug] ?? {},
              mdxOptions: { remarkPlugins: [remarkGfm] },
            }}
          />
        </div>

        {/* Related Articles */}
        <RelatedArticles currentSlug={slug} currentCategory={post.category} />

        {/* Bottom CTA */}
        <div className="mt-10">
          <CTAQuote variant="banner" />
        </div>

      </article>
    </>
  );
}
