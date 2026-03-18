import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import type { Metadata } from 'next';

import { getPostBySlug, getAllPostSlugs, getAllPosts } from '@/lib/mdx';
import CobotCard from '@/components/cobots/CobotCard';
import CobotCompareTable from '@/components/cobots/CobotCompareTable';
import CTAQuote from '@/components/cobots/CTAQuote';
import FAQ from '@/components/cobots/FAQ';
import { generateBreadcrumbSchema } from '@/lib/seo';

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
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
        </li>
        <li aria-hidden="true" className="mx-1">/</li>
        <li>
          <Link href="/guides" className="hover:text-blue-600 transition-colors">Guides</Link>
        </li>
        <li aria-hidden="true" className="mx-1">/</li>
        <li>
          <Link href={`/guides?category=${category}`} className="hover:text-blue-600 transition-colors">
            {categoryLabel}
          </Link>
        </li>
        <li aria-hidden="true" className="mx-1">/</li>
        <li className="text-zinc-900 dark:text-zinc-100 font-medium truncate max-w-[200px] sm:max-w-none">
          {title}
        </li>
      </ol>
    </nav>
  );
}

// ----------------------------------------------------------------
// Related Articles
// ----------------------------------------------------------------

function RelatedArticles({ currentSlug, currentCategory }: { currentSlug: string; currentCategory: string }) {
  const allPosts = getAllPosts();
  const otherPosts = allPosts.filter((p) => p.slug !== currentSlug);

  // Prefer same category, then fill with other categories
  const sameCategory = otherPosts.filter((p) => p.category === currentCategory);
  const diffCategory = otherPosts.filter((p) => p.category !== currentCategory);
  const related = [...sameCategory, ...diffCategory].slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="mt-12 border-t border-zinc-200 pt-10 dark:border-zinc-700">
      <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">Related Guides</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={`/guides/${post.slug}`}
            className="group rounded-xl border border-zinc-200 p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200 dark:border-zinc-700"
          >
            <span className="inline-block px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium mb-2 dark:bg-blue-900/30 dark:text-blue-400">
              {post.category}
            </span>
            <h3 className="text-sm font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors leading-snug dark:text-zinc-100">
              {post.title}
            </h3>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{post.readingTime}</p>
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
    { name: 'Home', url: 'https://cobotfinder.com/' },
    { name: 'Guides', url: 'https://cobotfinder.com/guides' },
    { name: categoryLabel, url: `https://cobotfinder.com/guides?category=${post.category}` },
    { name: post.title, url: `https://cobotfinder.com/guides/${slug}` },
  ];

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbItems)) }}
      />

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb category={post.category} title={post.title} />

        {/* Header */}
        <header className="mb-10">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span aria-hidden="true">&middot;</span>
            <span>{post.readingTime}</span>
            <span aria-hidden="true">&middot;</span>
            <a
              href={`/guides?category=${post.category}`}
              className="rounded-full bg-blue-50 px-3 py-0.5 text-xs font-medium text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400"
            >
              {post.category}
            </a>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
            {post.title}
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            {post.description}
          </p>
        </header>

        {/* MDX body */}
        <div className="prose prose-zinc max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-a:text-blue-600 dark:prose-a:text-blue-400">
          <MDXRemote source={post.content} components={mdxComponents} />
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
