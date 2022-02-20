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
              Proof<br />
              Of<br />
              Attendance<br />
              Protocol
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
