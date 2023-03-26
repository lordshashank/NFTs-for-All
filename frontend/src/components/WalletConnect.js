import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { BiWallet } from "react-icons/bi";

const WalletConnect = (props) => {
  const buttonClassName = props.buttonClassName;
  const [connectCheck, setConnectCheck] = useState("1");
  const {
    enableWeb3,
    isWeb3Enabled,
    isWeb3EnableLoading,
    account,
    Moralis,
    authenticate,
    deactivateWeb3,
    user,
    isAuthenticated,
  } = useMoralis();

  // if (!isAuthenticated) {
  //   return (
  //     <div>
  //       <button onClick={() => authenticate()}>Authenticate</button>
  //     </div>
  //   );
  // }
  useEffect(() => {
    // console.log(connectCheck);
    if (
      // connectCheck &&
      !isWeb3Enabled &&
      typeof window !== "undefined" &&
      window.localStorage.getItem("connected")
    ) {
      enableWeb3();
      // enableWeb3({provider: window.localStorage.getItem("connected")}) // add walletconnect
    }
  }, [isWeb3Enabled]);
  // no array, run on every render
  // empty array, run once
  // dependency array, run when the stuff in it changesan

  useEffect(() => {
    Moralis.onAccountChanged((account) => {
      console.log(`Account changed to ${account}`);
      if (account == null) {
        window.localStorage.removeItem("connected");
        deactivateWeb3();
        console.log("Null Account found");
      }
    });
  }, []);

  return (
    <nav className={props.className}>
      {account ? (
        <button
          onClick={async () => {
            // await walletModal.connect()
            await deactivateWeb3();
            setConnectCheck("0");
            // depends on what button they picked
            if (typeof window !== "undefined") {
              window.localStorage.removeItem("connected");
              // window.localStorage.setItem("connected", "walletconnect")
            }
          }}
          className="wallet-disconnect"
        >
          <BiWallet style={{ color: "white" }} size={28} />
        </button>
      ) : (
        <button
          onClick={async () => {
            // await walletModal.connect()
            const ret = await enableWeb3();
            setConnectCheck("1");
            if (typeof ret !== "undefined") {
              // depends on what button they picked
              if (typeof window !== "undefined") {
                window.localStorage.setItem("connected", "injected");
                // window.localStorage.setItem("connected", "walletconnect")
              }
            }
          }}
          disabled={isWeb3EnableLoading}
          className="wallet-connect"
        >
          <BiWallet style={{ color: "#aaa" }} size={28} />
        </button>
      )}
    </nav>
  );
};

export default WalletConnect;
