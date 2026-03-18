import Link from "next/link";

const footerLinks = {
  Resources: [
    { label: "Buyer's Guide", href: "/guides/cobot-buyers-guide" },
    { label: "ROI Calculator", href: "/calculator" },
    { label: "Compare Cobots", href: "/compare" },
    { label: "Get a Quote", href: "/quote" },
  ],
  "Use Cases": [
    { label: "Welding", href: "/guides/cobots-for-welding" },
    { label: "Palletizing", href: "/guides/cobots-for-palletizing" },
    { label: "Assembly", href: "/guides/cobots-for-assembly" },
    { label: "Machine Tending", href: "/guides/cobots-for-machine-tending" },
  ],
  Brands: [
    { label: "Universal Robots", href: "/brands/universal-robots" },
    { label: "Fanuc", href: "/brands/fanuc" },
    { label: "ABB", href: "/brands/abb" },
    { label: "KUKA", href: "/brands/kuka" },
    { label: "Doosan Robotics", href: "/brands/doosan" },
    { label: "Techman Robot", href: "/brands/techman" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tagline row */}
        <div className="mb-10 pb-10 border-b border-gray-700">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl font-bold text-white">
              Cobot<span className="text-blue-400">Finder</span>
            </span>
          </div>
          <p className="text-gray-400 text-sm max-w-md">
            Find the Right Cobot for Your Factory. Independent guidance on collaborative robots — compare specs, calculate ROI, and connect with authorized distributors.
          </p>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-10">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>© {currentYear} CobotFinder. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms of Use</Link>
            <Link href="/contact" className="hover:text-gray-300 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
