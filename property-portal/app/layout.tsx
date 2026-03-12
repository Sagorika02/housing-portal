"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">

        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="font-bold text-lg sm:text-xl md:text-2xl">Housing ML Portal</h1>

            <nav className="flex gap-4 sm:gap-6 text-sm sm:text-base">
              <Link href="/" className={pathname === "/" ? "text-blue-800 font-semibold" : "text-blue-600"}>Home</Link>
              <Link href="/estimator" className={pathname === "/estimator" ? "text-blue-800 font-semibold" : "text-blue-600"}>Estimator</Link>
              <Link href="/market" className={pathname === "/market" ? "text-blue-800 font-semibold" : "text-blue-600"}>Market Analysis</Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t mt-auto">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm sm:text-base text-gray-500 text-center">
            Housing ML Portal • Built with Next.js, FastAPI & ML
          </div>
        </footer>

      </body>
    </html>
  );
}