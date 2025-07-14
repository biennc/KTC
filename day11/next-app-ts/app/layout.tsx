import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex flex-col sm:flex-row justify-between items-center py-4 gap-4">
              <div className="font-bold text-xl text-blue-600">NextJS App</div>
              <div className="flex flex-wrap gap-4">
                <Link href="/" className="px-4 py-2 rounded-md hover:bg-blue-100 transition-colors">
                  Home
                </Link>
                <Link href="/blog" className="px-4 py-2 rounded-md hover:bg-blue-100 transition-colors">
                  Blog
                </Link>
                <Link href="/contact" className="px-4 py-2 rounded-md hover:bg-blue-100 transition-colors">
                  Contact
                </Link>
                <Link href="/products" className="px-4 py-2 rounded-md hover:bg-blue-100 transition-colors">
                  Products
                </Link>
                <Link href="/login" className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                  Login
                </Link>
              </div>
            </nav>
          </div>
        </header>
        <main className="flex-grow">
          {children}
        </main>
        <footer className="bg-gray-800 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="mb-4 sm:mb-0">
                <p className="text-sm">© 2025 NextJS App. All rights reserved.</p>
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white">
                  Terms
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  Privacy
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

