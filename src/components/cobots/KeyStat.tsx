interface Stat {
  value: string;
  label: string;
}

interface KeyStatProps {
  stats: Stat[];
}

export default function KeyStat({ stats }: KeyStatProps) {
  if (!stats?.length) return null;
  return (
    <div className="not-prose grid grid-cols-2 sm:grid-cols-3 gap-4 my-6 bg-gray-50 rounded-lg border border-gray-200 p-5">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
          <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
