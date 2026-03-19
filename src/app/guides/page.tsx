import type { Metadata } from 'next';
import { getAllPosts, getAllCategories } from '@/lib/mdx';

// ----------------------------------------------------------------
// Metadata
// ----------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Cobot Guides & Articles | Cobot Finder',
  description:
    'In-depth guides on collaborative robots (cobots): comparisons, buying guides, ROI analysis, and application-specific recommendations for manufacturing.',
  alternates: { canonical: '/guides' },
};

// Category color map — keeps pills visually distinct without being loud
const categoryColors: Record<string, string> = {
  'buying-guide': 'bg-blue-50 text-blue-700',
  'comparison': 'bg-violet-50 text-violet-700',
  'roi': 'bg-green-50 text-green-700',
  'applications': 'bg-amber-50 text-amber-700',
  'safety': 'bg-red-50 text-red-700',
};

function categoryColor(cat: string): string {
  return categoryColors[cat] ?? 'bg-gray-100 text-gray-600';
}

// ----------------------------------------------------------------
// Page
// ----------------------------------------------------------------

export default async function GuidesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: activeCategory } = await searchParams;
  const allPosts = getAllPosts();
  const categories = getAllCategories();

  const filteredPosts = activeCategory
    ? allPosts.filter((p) => p.category === activeCategory)
    : allPosts;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-8 border-b border-gray-200 pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Cobot Guides &amp; Articles
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-gray-500">
          In-depth resources on collaborative robots — comparisons, buying guides, ROI analysis,
          and application-specific recommendations for manufacturing teams.
        </p>
      </header>

      {/* Category filter pills */}
      {categories.length > 0 && (
        <nav className="mb-6 flex flex-wrap gap-2" aria-label="Filter by category">
          <a
            href="/guides"
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              !activeCategory
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </a>
          {categories.map((cat) => (
            <a
              key={cat}
              href={`/guides?category=${cat}`}
              className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.replace(/-/g, ' ')}
            </a>
          ))}
        </nav>
      )}

      {/* Result count */}
      <p className="mb-4 text-xs text-gray-400">
        {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
        {activeCategory ? ` in "${activeCategory.replace(/-/g, ' ')}"` : ''}
      </p>

      {/* Post grid */}
      {filteredPosts.length === 0 ? (
        <p className="py-12 text-center text-sm text-gray-400">
          No guides found for this category. Check back soon.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <a
              key={post.slug}
              href={`/guides/${post.slug}`}
              className="group flex flex-col rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-blue-300"
            >
              {/* Category pill */}
              <span
                className={`mb-2.5 w-fit rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${categoryColor(post.category)}`}
              >
                {post.category.replace(/-/g, ' ')}
              </span>

              {/* Title */}
              <h2 className="text-base font-semibold leading-snug text-gray-900 group-hover:text-blue-600">
                {post.title}
              </h2>

              {/* Description */}
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-gray-500 line-clamp-2">
                {post.description}
              </p>

              {/* Meta */}
              <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
                <span aria-hidden="true">&middot;</span>
                <span>{post.readingTime}</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </main>
  );
}
