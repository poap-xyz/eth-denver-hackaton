import type { NextPage } from 'next'
import { Navbar } from './components/Navbar'
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <>
    <Navbar></Navbar>
      <h1 className={styles.title}>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>
    </>
  );
};

export default Home
