import type { NextPage } from 'next'
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <>
      <h1 className={styles.title}>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>
    </>
  );
};

export default Home
