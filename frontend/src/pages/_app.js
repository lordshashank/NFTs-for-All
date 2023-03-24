import { MoralisProvider } from "react-moralis";
// import { NotificationProvider } from "@web3uikit/core";
import "../styles/globals.css";
import NavBar from "@/components/navigation/navBar";
import { Provider } from "react-redux";
import store from "@/store";
import { ThirdwebProvider } from "@thirdweb-dev/react";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider activeChain="mumbai">
      <MoralisProvider initializeOnMount={false}>
        <Provider store={store}>
          {/* <NotificationProvider> */}
          <Component {...pageProps} />
        </Provider>
        {/* </NotificationProvider> */}
      </MoralisProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
