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
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
          Cobot Guides &amp; Articles
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Everything you need to know about collaborative robots &mdash; from
          fundamentals to in-depth buying guides and ROI analysis.
        </p>
      </header>

      {/* Category filter */}
      {categories.length > 0 && (
        <nav className="mb-8 flex flex-wrap gap-2" aria-label="Filter by category">
          <a
            href="/guides"
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              !activeCategory
                ? 'bg-blue-600 text-white'
                : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
            }`}
          >
            All
          </a>
          {categories.map((cat) => (
            <a
              key={cat}
              href={`/guides?category=${cat}`}
              className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
              }`}
            >
              {cat}
            </a>
          ))}
        </nav>
      )}

      {/* Post grid */}
      {filteredPosts.length === 0 ? (
        <p className="py-12 text-center text-zinc-500 dark:text-zinc-400">
          No guides found. Check back soon!
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <a
              key={post.slug}
              href={`/guides/${post.slug}`}
              className="group flex flex-col rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800"
            >
              {/* Category badge */}
              <span className="mb-3 w-fit rounded-full bg-blue-50 px-3 py-0.5 text-xs font-medium capitalize text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                {post.category}
              </span>

              {/* Title */}
              <h2 className="text-lg font-bold text-zinc-900 group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-400">
                {post.title}
              </h2>

              {/* Description */}
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {post.description}
              </p>

              {/* Meta */}
              <div className="mt-4 flex items-center gap-3 text-xs text-zinc-400 dark:text-zinc-500">
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
