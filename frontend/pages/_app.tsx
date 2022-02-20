import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { StateProvider } from "../utils/web3";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StateProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StateProvider>
  );
}

export default MyApp;
