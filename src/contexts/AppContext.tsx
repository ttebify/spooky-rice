import BigNumber from "bignumber.js";
import React, {
  useEffect,
  useState,
  createContext,
  useCallback,
  useContext,
} from "react";
import useActiveWeb3React from "../hooks/useActiveWeb3React";
import { useEagerConnect } from "../hooks/useEagerConnect";
import { useInactiveListener } from "../hooks/useInactiveListener";
import { BIG_TEN } from "../utils/bigNumber";
import handleDarkMode from "../utils/handleDarkmode";
import {
  connectorsByName,
  resetWalletConnectConnector,
} from "../utils/web3React";
import { RefreshContext } from "./RefreshContext";

export interface GlobalAppContext {
  wallet: {
    active: boolean;
    balance: string;
    isConnecting: boolean;
    error: Error | undefined;
    retry: () => void;
  };
  darkMode: boolean;
  toggleDarkmode: () => void;
  triggerFetchTokens: () => void;
}

const defaultValues: GlobalAppContext = {
  wallet: {
    active: false,
    balance: "0.0",
    isConnecting: true,
    error: undefined,
    retry: () => {},
  },
  darkMode: handleDarkMode(),
  toggleDarkmode: () => {},
  triggerFetchTokens: () => {},
};

export const GlobalAppContextProvider =
  createContext<GlobalAppContext>(defaultValues);

export default function AppContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isConnecting, setIsConnecting] = useState(false);
  const { deactivate, active, error, account, library, setError } =
    useActiveWeb3React();
  const { fast } = useContext(RefreshContext);
  // get wallet balance in bnb
  const [balance, setBalance] = useState("0.0");

  /* A workaround, I use this state to trigger an update on this context and
  Refetch the tokenBalances when it changes. */
  const [trigger, setTrigger] = useState(false);
  const [darkMode, setDarkmode] = useState(handleDarkMode());

  useEffect(() => {
    const checkUserNetwork = async () => {
      const approvedChainId = process.env.REACT_APP_CHAIN_ID;
      if (approvedChainId) {
        library?.getNetwork().then((network) => {
          if (network.chainId !== Number(approvedChainId)) {
            console.error(
              "You have connected to the wrong network. Please switch to the Fantom opera network"
            );
            setError(
              new Error(
                "You have connected to the wrong network. Please switch to the Fantom opera network"
              )
            );
          }
        });
      }
    };
    checkUserNetwork();
  }, [library, setError]);

  useEffect(() => {
    if (active) {
      setIsConnecting(true);
    } else {
      setIsConnecting(false);
    }
  }, [active, error]);

  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager);

  const handleRetry = () => {
    setIsConnecting(false);
    resetWalletConnectConnector(connectorsByName["walletconnect"]);
    deactivate();
  };

  useEffect(() => {
    (async () => {
      if (account && library) {
        library
          .getSigner()
          .getBalance()
          .then(({ _hex }: { _hex: string }) => {
            const bal = new BigNumber(_hex).div(BIG_TEN.pow(18)).toJSON();
            setBalance(bal);
          })
          .catch(() => {
            // console.error(e, "Error getting balance");
            // setBalance("0");
          });
      } else {
        setBalance("0");
      }
    })();
    // also add the fast and slow vars from the refresh context
  }, [library, account, trigger, fast, active]);

  const triggerFetchTokens = useCallback(() => setTrigger((p) => !p), []);

  // Dark mode
  const toggleDarkmode = useCallback(() => {
    const currentMode = darkMode;
    setDarkmode(!currentMode);
    handleDarkMode(!currentMode);
  }, [darkMode]);

  return (
    <GlobalAppContextProvider.Provider
      value={{
        wallet: {
          active,
          balance,
          isConnecting,
          error,
          retry: handleRetry,
        },
        darkMode,
        toggleDarkmode,
        triggerFetchTokens,
      }}
    >
      {children}
    </GlobalAppContextProvider.Provider>
  );
}
