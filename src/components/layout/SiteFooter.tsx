import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-[#0a0a0a] border-t border-[#eee] dark:border-[#222]">
      <div className="max-w-[1100px] mx-auto px-6 md:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 mb-2">
              <span className="grid w-7 h-7 place-items-center bg-red text-white text-xs font-black">
                K
              </span>
              <span className="text-sm font-bold text-ink dark:text-white">KENAG</span>
            </Link>
            <p className="text-muted text-xs">
              Vehicle imports and spare parts in Kumasi, Ghana.
            </p>
          </div>
          <div className="flex flex-wrap gap-6">
            <Link href="/#inventory" className="text-muted text-sm hover:text-ink dark:hover:text-white transition-colors">Inventory</Link>
            <Link href="/arriving-soon" className="text-muted text-sm hover:text-ink dark:hover:text-white transition-colors">Arriving Soon</Link>
            <Link href="/#sourcing" className="text-muted text-sm hover:text-ink dark:hover:text-white transition-colors">Request Import</Link>
            <Link href="tel:+233241234567" className="text-muted text-sm hover:text-ink dark:hover:text-white transition-colors">+233 24 123 4567</Link>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-[#eee] dark:border-[#222] flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-muted text-xs">© {year} KENAG Spare Parts & Motors</p>
          <Link href="#top" className="text-muted text-xs hover:text-ink dark:hover:text-white transition-colors">Back to top</Link>
        </div>
      </div>
    </footer>
  );
}
