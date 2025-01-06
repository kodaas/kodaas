import { Metadata } from "next";
import NotFoundComponent from "./components/shared/NotFound";
import { Providers } from "@/app/providers";
import { NavBar } from "./components/global/Nav";
import { Footer } from "./components/global/Footer";
import { Fragment } from "react";
import Link from "next/link";
import { BiLinkExternal } from "react-icons/bi";

export const metadata: Metadata = {
  title: "Error 404",
};

export default function NotFound() {
  return (
    <Providers>
      <main className="bg-[length:100px_100px] md:bg-[length:200px_200px] dark:bg-zinc-900 bg-noise-reduced bg-white dark:text-white text-zinc-700">
        <NavBar />
        <section className="min-h-[50vh] max-w-7xl mx-auto md:px-16 px-6 pt-16 md:pt-32 space-y-32">
          <NotFoundComponent
            title="Error 404!"
            description={
              <Fragment>
                Oopsies! This page does not exist on{" "}
                <Link
                  href="/"
                  className="dark:text-blue-400 text-blue-500 hover:underline"
                >
                  kodaas-mu.vercel.app{" "}
                  <BiLinkExternal className="inline" aria-hidden="true" />
                </Link>
                . While you&apos;re here, you can read some featured post below.
              </Fragment>
            }
          />
        </section>
        <Footer />
      </main>
    </Providers>
  );
}
