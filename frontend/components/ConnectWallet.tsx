import React from "react";
import { useStateContext } from "../utils/web3";
import styles from '../styles/ConnectWallet.module.scss'
function ConnectWallet() {
  const { connectWallet } = useStateContext();
  return (
    <div className="flex ow-90 oh-90 m-auto relative">
      <div className="relative flex flex-row items-center justify-between overflow-hidden h-full w-full rounded-3xl">
        <div className="flex flex-col items-center h-full w-full justify-center">
          <button onClick={connectWallet} className={styles.button}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConnectWallet;
