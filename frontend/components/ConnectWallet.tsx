import React from "react";
import { useStateContext } from "../pages/utils/web3";

function ConnectWallet() {
  const { connectWallet } = useStateContext();
  return (
    <div className="flex ow-90 oh-90 m-auto relative">
      <div className="relative flex flex-row items-center justify-between overflow-hidden nonconformistducks-bg h-full w-full rounded-3xl">
        <div className="flex flex-col items-center h-full w-full justify-center">
          <button onClick={connectWallet} className="h-1/4 md:h-2/6 mb-3">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConnectWallet;
