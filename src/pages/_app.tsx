import type { AppProps } from "next/app";
import GlobalLayout from "../components/global-layout";
import SearchableLayout from "@/components/searchable-layout";
import "@/styles/globals.css";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalLayout>
        <SearchableLayout>
          <Component {...pageProps} />
        </SearchableLayout>
      </GlobalLayout>
    </>
  );
}
