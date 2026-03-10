import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">

        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between">
            <h1 className="font-bold text-lg">Housing ML Portal</h1>

            <nav className="flex gap-6 text-blue-600">
              <Link href="/">Home</Link>
              <Link href="/estimator">Estimator</Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow max-w-6xl mx-auto w-full px-6 py-10">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t">
          <div className="max-w-6xl mx-auto px-6 py-4 text-sm text-gray-500 text-center">
            Housing ML Portal • Built with Next.js, FastAPI & ML
          </div>
        </footer>

      </body>
    </html>
  );
}