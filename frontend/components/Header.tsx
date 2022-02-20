import type { NextComponentType } from "next";
import Image from "next/image";
import PoapLogo from "../assets/poap-logo.svg";
import styles from "../styles/Header.module.scss";

const Header: NextComponentType = ({ children }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src={PoapLogo} width={90} />
      </div>
    </header>
  );
};

export default Header;
