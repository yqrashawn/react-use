import { useState, useEffect } from 'react';
import { useInterval } from './';

function openHomePage() {
  window.open('https://portal.conflux-chain.org');
}

function validAddresses(addresses) {
  return Array.isArray(addresses) && addresses.length;
}

function useConfluxPortal() {
  const portalInstalled = window.conflux && window.conflux.isConfluxPortal;
  if (portalInstalled) window.conflux.autoRefreshOnNetworkChange = false;
  console.log(window.conflux.autoRefreshOnNetworkChange);
  const [address, setAddress] = useState(portalInstalled && window.conflux.selectedAddress);
  const [chainId, setChainId] = useState(portalInstalled && window.conflux.chainId);
  const login = () => {
    if (portalInstalled) {
      window.conflux.enable().then((addresses) => validAddresses(addresses) && setAddress(addresses[0]));
    }
  };

  useInterval(
    () => {
      setChainId(window.conflux.chainId);
    },
    portalInstalled && chainId && chainId !== 'loading' ? null : 100
  );

  useEffect(() => {
    if (portalInstalled) {
      const accountListener = (newAccounts) => {
        if (validAddresses(newAccounts)) {
          setAddress(newAccounts[0]);
        } else {
          setAddress(null);
        }
      };
      const networkListener = (chainId) => {
        setChainId(chainId);
      };
      window.conflux.on('accountsChanged', accountListener);
      window.conflux.on('networkChanged', networkListener);
      return () => {
        if (window.conflux) {
          window.conflux.off('accountsChanged', accountListener);
          window.conflux.off('networkChanged', networkListener);
        }
      };
    }
  }, [portalInstalled]);

  return [Boolean(portalInstalled), address, chainId, login, portalInstalled ? window.conflux : null];
}

useConfluxPortal.openHomePage = openHomePage;

export default useConfluxPortal;
