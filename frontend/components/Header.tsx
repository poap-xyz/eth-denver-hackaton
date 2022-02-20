import type { NextComponentType } from "next";
import Image from "next/image";
import PoapLogo from "../assets/poap-logo.svg";
import styles from "../styles/Header.module.scss";
import WalletDisplay from "../pages/components/WalletDisplay";

const Header: NextComponentType = ({ children }) => {
  return (
    
    <header className={styles.header}>
      <div className="navbar">
          <div className={styles.logo}>
            <Image src={PoapLogo} width={50} />
          </div>
          <div className="ui-wallet-header-wallet">
            <WalletDisplay/>
          </div>
      </div>
    </header>
  );
};

export default Header;
