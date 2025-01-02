import { Providers } from "../providers";
import { NavBar } from "../components/global/Nav";
import { Footer } from "../components/global/Footer";
import NextTopLoader from "nextjs-toploader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`dark:bg-zinc-900 motion-reduce:bg-noise-reduced bg-white dark:text-white text-zinc-700`}
      >
        <NextTopLoader color="#fbbf24" />
        <div className="noise bg-noise"></div>

        <Providers>
          <NavBar />
          <main className="min-h-[50vh] max-w-7xl mx-auto md:px-16 px-6 pt-16 md:pt-44 space-y-32">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
