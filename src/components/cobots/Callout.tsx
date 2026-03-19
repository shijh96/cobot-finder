interface CalloutProps {
  variant?: 'info' | 'tip' | 'warning' | 'takeaway';
  title?: string;
  children: React.ReactNode;
}

const CONFIG = {
  info: {
    wrapper: 'bg-blue-50 border-l-4 border-blue-500',
    icon: 'ℹ️',
    defaultTitle: '',
    titleColor: 'text-blue-800',
  },
  tip: {
    wrapper: 'bg-gray-50 border-l-4 border-gray-300',
    icon: '💡',
    defaultTitle: 'Pro tip',
    titleColor: 'text-gray-800',
  },
  warning: {
    wrapper: 'bg-amber-50 border-l-4 border-amber-400',
    icon: '⚠️',
    defaultTitle: 'Important',
    titleColor: 'text-amber-800',
  },
  takeaway: {
    wrapper: 'bg-blue-50 border border-blue-200 rounded-lg',
    icon: '💡',
    defaultTitle: 'Key Takeaway',
    titleColor: 'text-blue-800',
  },
} as const;

export default function Callout({
  variant = 'info',
  title,
  children,
}: CalloutProps) {
  const cfg = CONFIG[variant];
  const displayTitle = title ?? cfg.defaultTitle;

  return (
    <aside
      className={`${cfg.wrapper} rounded-r-lg px-5 py-4 my-6 not-prose`}
      role="note"
    >
      {displayTitle && (
        <p className={`font-semibold text-sm mb-2 ${cfg.titleColor}`}>
          <span className="mr-1.5" aria-hidden="true">
            {cfg.icon}
          </span>
          {displayTitle}
        </p>
      )}
      <div className="text-sm text-gray-700 leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1">
        {children}
      </div>
    </aside>
  );
}
