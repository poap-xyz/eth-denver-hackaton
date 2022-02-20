import type { NextComponentType } from "next";
import Image from "next/image";
import PoapLogo from "../assets/poap-logo.svg";
import styles from "../styles/Header.module.scss";
import WalletDisplay from "../pages/components/WalletDisplay";
import { useStateContext } from "../utils/web3";
import ConnectWallet from "./ConnectWallet";

const Header: NextComponentType = ({ children }) => {
  const { account } = useStateContext();

  return (
    <header className={styles.header}>
      <div className="navbar">
          <div className={styles.logo}>
            <Image src={PoapLogo} width={100} />
          </div>
          <div className={styles.uiWalletHeaderWallet}>
            {
              account ? (
                <WalletDisplay/>
              ) : (
                <ConnectWallet/>
              )
            }
          </div>
      </div>
    </header>
  );
};

export default Header;
