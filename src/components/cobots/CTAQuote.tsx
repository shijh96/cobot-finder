interface CTAQuoteProps {
  variant?: "inline" | "banner";
  cobotModel?: string;
  cobotBrand?: string;
  className?: string;
}

// Quote page is not live yet — hide all CTAs until distributor network is ready
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function CTAQuote(_props: CTAQuoteProps) {
  return null;
}
