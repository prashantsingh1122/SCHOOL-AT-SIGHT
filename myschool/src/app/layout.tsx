import './globals.css';
import { ReactNode } from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'SCHOOL-AT-SIGHT',
  description: 'Add and browse schools',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <header className="sticky top-0 z-40 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-950/70 backdrop-blur">
          <nav className="mx-auto max-w-6xl px-4 h-14 flex items-center">
            <Link href="/" className="inline-flex items-center gap-2 font-semibold">
              <span className="h-6 w-6 rounded bg-indigo-600"></span>
              <span>SCHOOL-AT-SIGHT</span>
            </Link>
            <div className="flex-1 flex items-center justify-center">
              <div className="flex items-center gap-3 text-sm">
                <a className="px-4 py-2 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:-translate-y-0.5 hover:shadow-sm transition duration-200" href="/showSchools">Show Schools</a>
                <a className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-0.5 shadow-sm hover:shadow transition duration-200" href="/addSchool">Add School</a>
              </div>
            </div>
            <div className="w-8" aria-hidden></div>
          </nav>
        </header>
        <main className="mx-auto max-w-6xl px-4">{children}</main>
        <footer className="mx-auto max-w-6xl px-4 py-10 text-sm text-neutral-600 dark:text-neutral-400">© {new Date().getFullYear()} School Directory</footer>
      </body>
    </html>
  );
}