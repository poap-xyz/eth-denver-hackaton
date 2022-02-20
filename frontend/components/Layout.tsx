import type { NextComponentType } from "next";
import Head from "next/head";

import Header from "../components/Header";

import styles from "../styles/Layout.module.scss";

const Layout: NextComponentType = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>POAP Moments</title>
        <meta name="description" content="Preserve your memories forever" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
