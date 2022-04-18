import React from "react";
import { useAppContext } from "../../hooks/useAppContext";
import useWallet from "../../hooks/useWallet";
import cls from "classnames";
import Button from "./";

interface ConnectWalletButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

const ConnectWalletButton = ({
  className,
  ...props
}: ConnectWalletButtonProps) => {
  const {
    wallet: { active, error, retry, isConnecting },
  } = useAppContext();
  const { onPresentConnectModal } = useWallet();

  const openModal = () => {
    onPresentConnectModal();
  };

  return (
    <React.Fragment>
      {!active && !error && (
        <Button
          disabled={isConnecting}
          onClick={openModal}
          className={cls(
            "inline-block transition-all duration-300 text-base",
            {
              "cursor-not-allowed hover:text-opacity-80": isConnecting,
            },
            className
          )}
          {...props}
        >
          {isConnecting ? "..." : "Connect wallet"}
        </Button>
      )}
      {!active && error && (
        <Button
          className="text-red-600"
          onClick={retry}
        >
          Retry to Connect
        </Button>
      )}
    </React.Fragment>
  );
};

export default ConnectWalletButton;
