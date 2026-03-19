interface TOCItem {
  label: string;
  href: string;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  if (!items?.length) return null;
  return (
    <nav className="not-prose bg-gray-50 rounded-lg border border-gray-200 px-5 py-4 my-6 xl:hidden">
      <p className="text-sm font-semibold text-gray-800 mb-3">
        In this guide:
      </p>
      <ol className="space-y-1.5">
        {items.map((item, i) => (
          <li key={item.href} className="text-sm">
            <a
              href={item.href}
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              <span className="text-gray-400 mr-2">{i + 1}.</span>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
