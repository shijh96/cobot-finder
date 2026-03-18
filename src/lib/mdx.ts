import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

// ----------------------------------------------------------------
// Types
// ----------------------------------------------------------------

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  keywords: string[];
  category: string;
  image?: string;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  readingTime: string;
}

export interface Post extends PostMeta {
  content: string;
}

// ----------------------------------------------------------------
// Paths
// ----------------------------------------------------------------

const GUIDES_DIR = path.join(process.cwd(), 'content', 'guides');

// ----------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------

function getGuideFiles(): string[] {
  if (!fs.existsSync(GUIDES_DIR)) return [];
  return fs.readdirSync(GUIDES_DIR).filter((f) => f.endsWith('.mdx'));
}

function slugFromFilename(filename: string): string {
  return filename.replace(/\.mdx$/, '');
}

// ----------------------------------------------------------------
// Public API
// ----------------------------------------------------------------

/**
 * Return metadata for every guide, sorted newest-first by date.
 */
export function getAllPosts(): PostMeta[] {
  const files = getGuideFiles();

  const posts: PostMeta[] = files.map((filename) => {
    const slug = slugFromFilename(filename);
    const filePath = path.join(GUIDES_DIR, filename);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    const fm = data as PostFrontmatter;
    const stats = readingTime(content);

    return {
      ...fm,
      slug,
      readingTime: stats.text,
    };
  });

  // Sort newest first
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Return a single post (metadata + raw MDX content) by slug.
 * Returns `null` if the file does not exist.
 */
export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(GUIDES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;
  const stats = readingTime(content);

  return {
    ...fm,
    slug,
    content,
    readingTime: stats.text,
  };
}

/**
 * Return all slugs (useful for generateStaticParams).
 */
export function getAllPostSlugs(): string[] {
  return getGuideFiles().map(slugFromFilename);
}

/**
 * Return the set of unique categories across all posts.
 */
export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map((p) => p.category));
  return Array.from(categories).sort();
}
