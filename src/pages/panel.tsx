import { RouteComponentProps } from "@reach/router";
import React, { useCallback, useEffect, useState } from "react";
import Helmet from "react-helmet";
import Button from "../components/Buttons";
import Section from "../components/layouts/Section";
import useActiveWeb3React from "../hooks/useActiveWeb3React";
import cls from "classnames";
import { isAddress } from "ethers/lib/utils";
import useToast from "../hooks/useToast";
import { getRiceContract } from "../utils/contractHelpers";
import ConnectWalletButton from "../components/Buttons/ConnectWalletButton";
import Link from "../components/Link";

const AdminPanel = (_props: RouteComponentProps) => {
  const [authorized, setAuthorized] = useState(false);
  const [testAddress, setTestAddress] = useState("");
  const [transporting, setTransporting] = useState(false);
  const [checking, setChecking] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isBot, setIsBot] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { active, library, account } = useActiveWeb3React();
  const { toastInfo, toastSuccess, toastError } = useToast();

  // Show this for only authenticated users
  const isJudge = useCallback(async () => {
    if (account) {
      try {
        const contract = getRiceContract();
        const auth = await contract.isAuthorized(account);
        if (auth === true) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch (error) {
        setAuthorized(false);
      }
    }
  }, [account]);

  useEffect(() => {
    isJudge();
  }, [isJudge]);

  const checkIsBot = useCallback(async () => {
    setChecking(true);
    // check is testAddress is valid
    try {
      if (isAddress(testAddress)) {
        // check bot
        const contract = getRiceContract();
        const bot = await contract.isBot(testAddress);
        setChecked(true);
        if (bot === true) {
          setIsBot(true);
          toastSuccess(testAddress + " has been identified as a bot.");
        } else {
          setIsBot(false);
          toastSuccess(testAddress + " is not a bot.");
        }
      }
    } catch (error) {
      setChecked(false);
    } finally {
      setChecking(false);
    }
  }, [testAddress, toastSuccess]);

  const toTheUnderWorld = useCallback(async () => {
    setTransporting(true);
    try {
      // Please test if this user is a bot and alert that the panel is doing things wrongly
      if (isAddress(testAddress) && checked && isBot && library) {
        // Mark as bot
        const contract = getRiceContract(library.getSigner());
        const trx = await contract.setIsBot(testAddress, true);
        const receipt = await trx.wait();
        if (receipt.status === 1) {
          //   console.log(receipt);
          toastSuccess(testAddress + " is marked as bot");
        }
      } else if (!checked) {
        toastInfo(
          "Please check to see if he is a suspect first; he could be a good guy, you know?"
        );
      } else if (checked && !isBot) {
        toastInfo(
          "The ultimate authority, uh, could not prove that this account is a bot."
        );
      }
    } catch (error) {
      console.error(error);
      toastError(`You are most likely not authorised to make this call, or something went wrong.
      Confirm the transaction and make sure that you're paying enough gas.`);
    } finally {
      setTransporting(false);
    }
  }, [
    isBot,
    checked,
    testAddress,
    library,
    toastError,
    toastInfo,
    toastSuccess,
  ]);
  const handleInputChange: React.FormEventHandler<HTMLInputElement> =
    useCallback(async (e) => {
      const val = e.currentTarget.value;
      const pattern = /^(0x)?[0-9a-fA-F]{0,40}$/;
      if (!pattern.test(val)) return;
      setTestAddress(val);
      setErrorMsg("");
      // if address is different, reset check
    }, []);

  return (
    <main className="min-h-screen w-full flex flex-col py-10 items-center space-y-2 p-5">
      <Helmet>
        <title>
          {authorized
            ? "A Bot, is to be marked as one; We protect our community from spooked players."
            : "Redirecting..."}
        </title>
      </Helmet>
      <Section className="pb-8">
        <div className="flex flex-col items-center mt-8">
          <div className="max-w-xl lg:max-w-lg w-full mx-auto">
            {active && authorized ? (
              <React.Fragment>
                <h1>The Panel of Judges</h1>
                <p>
                  A Bot, is to be marked as one; We protect our community from
                  spooked players.
                </p>
                <div className="shadow my-10 bg-[#F2F4F8] dark:bg-[#192339] rounded-lg">
                  <div className="px-2 lg:px-0 max-w-sm mx-auto py-4">
                    <h2 className="mb-5 text-lg px-1 text-center">
                      The Round Table
                    </h2>
                    <TextInput
                      errorMsg={errorMsg}
                      onChangeHandler={handleInputChange}
                      checkBotHandler={checkIsBot}
                      underWorldHandler={toTheUnderWorld}
                      value={testAddress}
                      isDisabled={
                        !active ||
                        checking ||
                        transporting ||
                        !isAddress(testAddress) ||
                        errorMsg.length > 0
                      }
                      botTesting={checking}
                      transporting={transporting}
                    />
                  </div>
                </div>
              </React.Fragment>
            ) : (
              <div className="py-2 text-xs text-center bg-white dark:bg-[#556C8A] flex flex-col items-center space-y-3">
                <p>
                  We assure you that there is nothing to see here; you are
                  simply lost.
                </p>
                <p>But here is what you can do</p>
                <div className="flex justify-center">
                  <ConnectWalletButton />
                </div>
                <Link to="/" className="block">
                  <Button>Go home</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Section>
    </main>
  );
};

interface TextInputProps {
  errorMsg: string;
  onChangeHandler: (e: React.FormEvent<HTMLInputElement>) => void;
  checkBotHandler: () => Promise<void>;
  underWorldHandler: () => Promise<void>;
  value: string;
  isDisabled: boolean;
  botTesting: boolean;
  transporting: boolean;
}

const TextInput = ({
  onChangeHandler,
  checkBotHandler,
  underWorldHandler,
  errorMsg,
  value,
  isDisabled,
  botTesting,
  transporting,
}: TextInputProps) => {
  const hasError = errorMsg.length > 0;

  return (
    <div>
      <div
        className="max-w-sm w-full space-y-2 mx-auto p-2 rounded-md bg-[#E4E9F1] dark:bg-[#121122]
          shadow-inner shadow-[#D5DBE5] dark:shadow-[#121122] text-[#617086] dark:text-[#E2E2E4]
          text-base"
      >
        <div>
          <div className="relative">
            <div className="mb-2 text-sm px-1">Defaulter's address</div>
            <input
              type="text"
              className={cls(
                "placeholder-gray-400 outline-none border-b border-[#7B8BA5] font-bold",
                "transition-all duration-200 text-[#7B8BA5] p-1 disabled:opacity-70 text-xl",
                "disabled:cursor-not-allowed block w-full bg-transparent text-right leading-none",
                "placeholder:text-base",
                {
                  "text-red-400": hasError,
                }
              )}
              placeholder="address"
              value={value}
              onChange={onChangeHandler}
            />
          </div>
          {hasError && (
            <div
              className={cls(
                "flex justify-between text-opacity-80 py-0.5 px-1 text-sm",
                {
                  "text-red-400 font-normal": hasError,
                }
              )}
            >
              {errorMsg}
            </div>
          )}
        </div>
      </div>
      <div className="space-y-5 flex flex-col items-center py-3">
        <Button
          onClick={checkBotHandler}
          disabled={isDisabled} //
          loading={botTesting}
          className="block w-full"
        >
          Test him; he's most likely not a hero.
        </Button>
        <Button
          onClick={underWorldHandler}
          disabled={isDisabled}
          loading={transporting}
          className="block w-full"
        >
          Take him to the underworld. (If there was)
        </Button>
      </div>
    </div>
  );
};

export default AdminPanel;
