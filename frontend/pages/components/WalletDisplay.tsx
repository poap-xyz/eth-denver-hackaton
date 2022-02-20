import React, {useState,useEffect} from "react";
import {useStateContext} from "../utils/web3";
import Jazzicon from "./Layout/Jazzicon"


function WalletDisplay(){

    const [ens, setEns] = useState<String>();
    const [address, setAddress] = useState<String>('');


  return (
    <div className='ui-wallet-display'>
      <div className="ui-wallet-display-img">
      <Jazzicon
          address={address}
          size={address.length}
        />
      </div>

      <div className='ui-wallet-display-address'>
        {ens ? ens : `${address.substr(0, 6)}...${address.substr(-4)}`}
      </div>
    </div>
  )
}

export default WalletDisplay