import React, { useState, useEffect } from "react";
import {useStateContext} from "../../utils/web3";
import Jazzicon from "./Layout/Jazzicon"
import styles from "../../styles/WalletHeader.module.scss"


function WalletDisplay(){
  const { ens, account } = useStateContext();

  return (
    <div className={styles.uiWalletDisplay}>
      <div className={styles.uiWalletDisplayImg}>
        <Jazzicon
            address={account}
            size={account.length}
          />
      </div>
      <div className={styles.uiWalletDisplayAddress}>
        {ens ? ens : `${account.substr(0, 6)}...${account.substr(-4)}`}
      </div>
    </div>
  )
}

export default WalletDisplay