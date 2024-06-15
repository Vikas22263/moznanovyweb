import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Providers } from "@/app/providers";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <main className="purple-dark container mx-auto">
          <Component {...pageProps} />
        </main>
      </NextThemesProvider>
    </Providers>
  );
}
