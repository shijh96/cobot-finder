import Link from "next/link";

const footerLinks = {
  "Buying Guides": [
    { label: "What is a Cobot?", href: "/guides/what-is-a-cobot" },
    { label: "Cobots in Manufacturing", href: "/guides/cobots-in-manufacturing" },
    { label: "Advantages of Cobots", href: "/guides/advantages-of-cobots" },
    { label: "Cobot ROI Calculator", href: "/guides/cobot-roi-calculator" },
  ],
  "By Application": [
    { label: "Welding Cobots", href: "/guides/cobots-for-welding" },
    { label: "Palletizing Cobots", href: "/guides/cobot-palletizer" },
    { label: "Best Cobot Arms", href: "/guides/best-cobot-arms" },
    { label: "RaaS Guide", href: "/guides/robotics-as-a-service" },
  ],
  "More Guides": [
    { label: "Robot Fleet Management", href: "/guides/robot-fleet-management" },
    { label: "RaaS Companies", href: "/guides/robotics-as-a-service-companies" },
    { label: "Cobot Palletizer", href: "/guides/cobot-palletizer" },
    { label: "What is a Cobot?", href: "/guides/what-is-a-cobot" },
  ],
  Tools: [
    { label: "ROI Calculator", href: "/calculator" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
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
        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center">
              <span className="text-white text-[9px] font-black">CF</span>
            </div>
            <span className="text-sm font-semibold text-gray-700">
              CobotFinder
            </span>
            <span className="text-xs text-gray-400">
              &copy; {currentYear}
            </span>
          </div>
          <p className="text-xs text-gray-400 text-center sm:text-right max-w-md">
            Independent cobot comparison platform. Not affiliated with any robot manufacturer.
          </p>
        </div>
      </div>
    </footer>
  );
}
