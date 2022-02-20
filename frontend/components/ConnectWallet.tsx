import React from "react";
import { useStateContext } from "../utils/web3";
import styles from '../styles/ConnectWallet.module.scss';

function ConnectWallet() {
  const { connectWallet } = useStateContext();
  return (
    <button onClick={connectWallet} className={styles.button}>
      Login
    </button>
  );
}

export default ConnectWallet;
