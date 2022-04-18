import React, { useCallback, useContext, useEffect, useState } from "react";
import Section from "../components/layouts/Section";
import ConnectWalletButton from "../components/Buttons/ConnectWalletButton";
import useActiveWeb3React from "../hooks/useActiveWeb3React";
import cls from "classnames";
import Button from "../components/Buttons";
import { reCookRice, eatRice, cookRice } from "../utils/calls";
import useToast from "../hooks/useToast";
import { useAppContext } from "../hooks/useAppContext";
import CopyToClipboard from "../components/Tools/CopyToClipboard";
import { getRiceContract } from "../utils/contractHelpers";
import BigNumber from "bignumber.js";
import { BIG_TEN } from "../utils/bigNumber";
import { RefreshContext } from "../contexts/RefreshContext";
import { getFullDisplayBalance } from "../utils/formatBalance";
import { RouteComponentProps } from "@reach/router";
import { isAddress } from "ethers/lib/utils";
import { useQuery } from "../hooks";
import ftmInputImage from "../images/ftm-input-image.png";

const IndexPage = (props: RouteComponentProps) => {
  const [amountToPay, setAmountToPay] = useState("");
  const [contractBal, setContractBal] = useState("0");
  const [riceBal, setRiceBal] = useState("0");
  const [reCooking, setReCooking] = useState(false);
  const [cooking, setCooking] = useState(false);
  const [avaxRewards, setAvaxRewards] = useState("0");
  const [eating, setEating] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    wallet: { balance },
    triggerFetchTokens,
  } = useAppContext();
  const { active, library, account } = useActiveWeb3React();
  const { toastError, toastSuccess } = useToast();
  const { fast } = useContext(RefreshContext);
  // Refferal
  const [refAddress, setRefAddress] = useState("");
  const refFromParams = useQuery().get("ref");

  useEffect(() => {
    if (account && refFromParams !== null && isAddress(refFromParams)) {
      setRefAddress(refFromParams);
    } else if (account) {
      setRefAddress(account);
    }
  }, [account, refFromParams]);

  // Get AVAX Balance in the contract
  useEffect(() => {
    (async () => {
      if (library) {
        const contract = getRiceContract(library.getSigner());
        try {
          const { _hex } = await contract.getBalance();
          const bal = new BigNumber(_hex).div(BIG_TEN.pow(18));
          setContractBal(bal.toJSON());
        } catch (err) {
          setContractBal("0");
        }
      } else {
        setContractBal("0");
      }
    })();
  }, [library, riceBal, balance, avaxRewards]);

  // Get User Rice and avax rewards
  useEffect(() => {
    (async () => {
      if (account && library) {
        const contract = getRiceContract(library.getSigner());
        try {
          // User rice bal
          const { _hex: myRice } = await contract.getMyMiners(account);
          const rice = new BigNumber(myRice).toJSON(); // How many decimals?
          // User rwards in avax
          const { _hex: riceForRewards } = await contract.getMyRice(account);
          const { _hex: avaxRewards } = await contract.calculateRiceSell(
            riceForRewards
          );
          const avax = getFullDisplayBalance(
            new BigNumber(avaxRewards),
            18,
            18
          );

          setRiceBal(rice);
          setAvaxRewards(avax);
        } catch (err) {
          console.error(err);
          setRiceBal("0");
          setAvaxRewards("0");
        }
      } else {
        setRiceBal("0");
        setAvaxRewards("0");
      }
    })();
  }, [account, library, contractBal, balance, fast, active]);

  const handleInputChange: React.FormEventHandler<HTMLInputElement> =
    useCallback(
      async (e) => {
        const val = e.currentTarget.value.replace(/,/g, ".");
        const pattern = /^[0-9]*[.,]?[0-9]{0,18}$/g;
        if (!pattern.test(val)) return;

        const amount = new BigNumber(val);
        const bal = new BigNumber(balance);
        // const bal = Number.parseFloat("100");

        if (amount.isGreaterThan(bal)) {
          setErrorMsg("Insufficient funds in your wallet");
        } else {
          setErrorMsg("");
        }
        setAmountToPay(val);
      },
      [balance]
    );

  const handleReCookRice = useCallback(async () => {
    if (library) {
      setReCooking(true);
      try {
        await reCookRice(refAddress, library.getSigner());
        toastSuccess("Success", "Your Rice has been re-cooked");
        triggerFetchTokens();
      } catch (err) {
        // console.error(err);
        toastError(
          "Error",
          "Something went wrong while trying to perform the transaction."
        );
      } finally {
        setReCooking(false);
      }
    }
  }, [library, refAddress, toastError, triggerFetchTokens, toastSuccess]);

  const handleCookRice = useCallback(async () => {
    if (library) {
      setCooking(true);
      try {
        await cookRice(amountToPay, refAddress, library.getSigner());
        toastSuccess(
          "Success",
          "Your Rice is cooking now, sit back and relax."
        );
        triggerFetchTokens();
        setAmountToPay("");
      } catch (err) {
        console.error(err);
        toastError(
          "Error",
          "Something went wrong while trying to perform the transaction."
        );
      } finally {
        setCooking(false);
      }
    }
  }, [
    library,
    amountToPay,
    refAddress,
    toastSuccess,
    toastError,
    triggerFetchTokens,
  ]);

  const handleEatRice = useCallback(async () => {
    if (library) {
      setEating(true);
      try {
        await eatRice(library.getSigner());
        toastSuccess("Success", "Enjoying your rice? Smile.");
        triggerFetchTokens();
      } catch (err) {
        console.error(err);
        toastError(
          "Error",
          "Something went wrong while trying to perform the transaction."
        );
      } finally {
        setEating(false);
      }
    }
  }, [library, toastError, triggerFetchTokens, toastSuccess]);

  // Can start video
  /* const canStart = useCallback(
    () => Number.parseFloat(riceBal) > 0,
    [riceBal, account, active, library]
  ); */

  const { location } = props; // Page props

  return (
    <main className="min-h-screen w-full bg-contain bg-bottom bg-no-repeat
      bg-[url('../images/Lovepik_com-400594108-paddy-fields-in-autumn.png')]">
      <Section className="pb-8">
        <div className="lg:flex lg:items-center lg:justify-between mt-8">
          <div className="max-w-xl lg:max-w-lg w-full mx-auto lg:mx-0">
            <p>The Fantom (FTM) Reward Pool with the lowest Dev fees</p>
            <div className="shadow my-6 bg-[#F2F4F8] rounded-2xl">
              <div className="p-5 lg:px-0 max-w-sm mx-auto">
                <BalanceTextBox
                  lable="Contract"
                  value={contractBal}
                  symbol="FTM"
                />
              </div>
              {active && (
                <React.Fragment>
                  <div className="px-2 lg:px-0 max-w-sm mx-auto">
                    <TextInput
                      errorMsg={errorMsg}
                      onChangeHandler={handleInputChange}
                      value={amountToPay}
                      onSubmit={handleCookRice}
                      trx={cooking}
                      walletBal={balance}
                      isDisabled={
                        cooking ||
                        errorMsg.length > 0 ||
                        Number.isNaN(Number.parseFloat(amountToPay))
                      }
                    />
                  </div>
                  <div className="p-5 lg:px-0 max-w-sm mx-auto">
                    <BalanceTextBox
                      lable="Your Rewards"
                      value={avaxRewards}
                      symbol="FTM"
                    />
                    <div className="space-x-8 flex items-center my-3">
                      <Button
                        onClick={handleReCookRice}
                        disabled={reCooking || !active}
                        loading={reCooking}
                      >
                        Re-Cook
                      </Button>
                      <Button
                        onClick={handleEatRice}
                        disabled={eating || !active}
                        loading={eating}
                      >
                        Eat Rice
                      </Button>
                    </div>
                  </div>
                </React.Fragment>
              )}
              {!active && (
                <div className="py-2 text-xs text-center bg-white flex flex-col items-center space-y-3">
                  <p>Please connect your wallet first</p>
                  <ConnectWalletButton />
                </div>
              )}
            </div>
          </div>
          <div className="w-full max-w-xl lg:max-w-xs mx-auto lg:mx-0 space-y-3">
            <div className="my-10 lg:my-0 bg-[#F2F4F8] p-4 rounded-2xl">
              <h2 className="text-[#7B8BA5]">Nutritional Facts</h2>
              <BalanceTextBox
                lable="Daily Return"
                value="8"
                symbol="%"
                divider
              />
              <BalanceTextBox lable="APR" value="2920" symbol="%" divider />
              <BalanceTextBox lable="Dev Fee" value="3" symbol="%" divider />
            </div>
            <div className="my-10 lg:my-0 bg-[#F2F4F8] p-4 rounded-2xl text-base">
              <h2 className="text-[#7B8BA5]">Referral Link</h2>
              <p>
                Earn 12% of the AVAX used to cook rice from anyone who uses your
                referral link
              </p>
              <CopyToClipboard
                title="Your Referral Link"
                content={
                  account == null
                    ? "Connect your wallet to see your referral address"
                    : `${location?.origin}/?ref=${account}`
                }
                canCopy={account != null}
              />
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
};

interface BalanceTextBoxProps {
  lable: string;
  value: string;
  symbol: string;
  divider?: boolean;
}

const BalanceTextBox = (props: BalanceTextBoxProps) => {
  return (
    <div
      className={cls("flex flex-col text-base space-y-0.5 my-3", {
        "!flex-row items-center space-x-2 !my-1": props.divider,
      })}
    >
      <div className="text-[#6c7c97]">{props.lable}</div>
      {props.divider && <div className="h-[1px] w-1/3 sm:w-20 bg-[#A2A5AB]" />}
      <div
        className={cls("text-[#575757]", {
          "text-xl font-medium !text-[#5b6a81] !-mt-0.5": !props.divider,
        })}
      >
        {props.value}{" "}
        <span className="font-light !text-lg">{props.symbol}</span>
      </div>
    </div>
  );
};

interface TextInputProps {
  errorMsg: string;
  onChangeHandler: (e: React.FormEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  value: string;
  isDisabled: boolean;
  trx: boolean; // transaction
  walletBal: string;
}

const TextInput = ({
  onChangeHandler,
  onSubmit,
  errorMsg,
  value,
  isDisabled,
  trx,
  walletBal,
}: TextInputProps) => {
  const hasError = errorMsg.length > 0;
  return (
    <div>
      <div
        className="max-w-sm w-full space-y-2 mx-auto p-2 rounded-md bg-[#E4E9F1] shadow-inner
      shadow-[#D5DBE5] text-[#617086] text-base"
      >
        <div>
          <div className="mb-2 text-sm">Amount</div>
          <div className="relative">
            <div className="w-[80px] h-[24px] bg-white absolute bottom-2 left-0 rounded-full z-10
              shadow-md">
                <img src={ftmInputImage} alt="" className="w-full h-full" />
              </div>
            <input
              type="text"
              className={cls(
                "placeholder-gray-400 outline-none border-b-2 border-[#7B8BA5] font-bold",
                "transition-all duration-200 text-[#7B8BA5] p-1 disabled:opacity-70 text-xl",
                "disabled:cursor-not-allowed block w-full bg-transparent text-right leading-none",
                {
                  "text-red-400": hasError,
                }
              )}
              placeholder="0.0"
              value={value}
              onChange={onChangeHandler}
            />
          </div>
          <div
            className={cls("flex justify-between text-opacity-80 py-0.5 text-sm", {
              "text-red-400 font-normal": hasError,
            })}
          >
            <span>Balance</span>
            <span>{hasError ? errorMsg : walletBal}</span>
          </div>
        </div>
      </div>
      <Button
        onClick={onSubmit}
        className="mt-4 !text-black"
        disabled={isDisabled}
        loading={trx}
      >
        Cook Rice
      </Button>
    </div>
  );
};
export default IndexPage;
