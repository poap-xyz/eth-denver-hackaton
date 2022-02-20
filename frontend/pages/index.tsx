import type { NextPage } from 'next'
import styles from "../styles/Home.module.scss";
import Searchbar from './components/Searchbar';

const Home: NextPage = () => {
  return (
    <section>
      <div className={styles.container}>
        <div className={styles.homeBox}>
          <div>
            <h1>
              POAP<br />
              Moments<br />
            </h1>
          </div>
          <div>
            <Searchbar />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home
