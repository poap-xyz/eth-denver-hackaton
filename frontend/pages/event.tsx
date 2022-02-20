import type { NextPage } from "next";
import Layout from "../components/Layout";

import styles from "../styles/Event.module.scss";

const Event: NextPage = () => {
  return (
    <>
      <h1 className={styles.title}>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>

      <div className={styles.grid}></div>
    </>
  );
};

export default Event;
