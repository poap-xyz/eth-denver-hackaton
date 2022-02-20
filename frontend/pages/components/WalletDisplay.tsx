import React, { useState, useEffect } from "react";
import {useStateContext} from "../../utils/web3";
import Jazzicon from "./Layout/Jazzicon"


function WalletDisplay(){
  const { ens, account } = useStateContext();

  return (
    <div className='ui-wallet-display'>
      <div className="ui-wallet-display-img">
      <Jazzicon
          address={account}
          size={account.length}
        />
      </div>
      <div className='ui-wallet-display-address'>
        {ens ? ens : `${account.substring(0, 6)}...${account.substring(-4)}`}
      </div>
    </div>
  )
}

export default WalletDisplay