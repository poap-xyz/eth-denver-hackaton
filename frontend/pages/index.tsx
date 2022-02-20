import type { NextPage } from 'next'
import styles from "../styles/Home.module.scss";
import Searchbar from './components/Searchbar';

const Home: NextPage = () => {
  return (
    <>
            <Searchbar/>
    </>
  );
};

export default Home
