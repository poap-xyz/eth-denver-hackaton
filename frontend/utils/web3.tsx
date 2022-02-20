import { useState, useEffect } from 'react';
import constate from 'constate';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
// @ts-ignore
import WalletConnectProvider from '@walletconnect/web3-provider';

import { getEns, loginWallet } from './api';

const useCustomState = () => {
  let _token;
  if (typeof window !== "undefined") {
    _token = localStorage.getItem('fcm-token');
  }

  const [web3Modal, setWeb3Modal] = useState<any>(null);

  const requiredNetworkId = 1;

  // Web3Modal
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: 'https://mainnet.infura.io/v3/9a5c8c3500654b0dba3912d17737222a',
      },
    },
  };

  useEffect(() => {
    setWeb3Modal(new Web3Modal({
      network: 'mainnet',
      providerOptions,
    }));
  }, []); //eslint-disable-line

  // State
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string>('');
  const [accessToken, setAccessToken] = useState<string>('');
  const [ens, setEns] = useState<string>();
  const [network, setNetwork] = useState<number>(0);
  // @ts-ignore
  const [, setProvider] = useState<any>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [token, setToken] = useState<string>(_token ? _token : '');

  useEffect(() => {
    const intervalNetwork = setInterval(function () {
      if (web3) {
        web3.eth.net.getId((err, currentNet) => {
          // No error and change in network
          if (!err && network > 0 && currentNet !== network) {
            if (currentNet === requiredNetworkId) {
              window.location.reload();
            } else if (network === requiredNetworkId) {
              //showNetworkErrorMessage();
            }
            setNetwork(currentNet);
          }
        });
      }
    }, 1000);

    return () => {
      clearInterval(intervalNetwork);
    };
  }, [network]); //eslint-disable-line

  const login = async (_provider: any, _web3: any) => {
    let _account = '';
    if (_provider && _provider.selectedAddress) {
      _account = _provider.selectedAddress;

    }
    if (!_account && _provider && _provider.accounts) {
      _account = _provider.accounts[0];
    }
    if (!account && _provider && _provider.address) {
      _account = _provider.address;
    }
    const message = "Welcome to POAP Moments";
    await _web3.eth.personal.sign(message, _account, '', async (err: any, res: any) => {
      if (res) {
        await loginWallet(message, _account, res);
        setAccount(_account);
        setIsConnected(true);
        const response = await ensResolve(_account);
        if (response.data && response.data.ens) {
          setEns(response.data.ens);
        }
      }
    });
  }

  const connectWallet = async () => {
    try {
      const _provider = await web3Modal.connect();
      const _web3: Web3 = new Web3(_provider);
      setWeb3(_web3);
      setProvider(_provider);
      login(_provider, _web3);
      // TODO - review why _web3.eth.getAccounts() is not working
      let netId = await _web3.eth.net.getId();
      setNetwork(netId);
      //if (requiredNetworkId !== netId) showNetworkErrorMessage();
    } catch (e) {
      console.log('Error > Connecting wallet');
      console.log(e);
    }
  };

  const disconnectWallet = () => {
    try {
      // @ts-ignore
      web3?.currentProvider.close();
    } catch (e) { }
    web3Modal.clearCachedProvider();
    setWeb3(null);
    setIsConnected(false);
    setAccount('');
  };

  const ensResolve = async (_account: string) => {
    return await getEns(_account)
  }

  // FCM notifications
  const saveToken = (_token: string) => {
    if (_token !== '') {
      setToken(_token);
      if (typeof window !== "undefined") {
        localStorage.setItem('fcm-token', _token);
      }
    }
  };

  return {
    web3,
    connectWallet,
    disconnectWallet,
    isConnected,
    account,
    token,
    saveToken,
    ens,
    accessToken
  };
};

const [StateProvider, useStateContext] = constate(useCustomState);

export { StateProvider, useStateContext };
