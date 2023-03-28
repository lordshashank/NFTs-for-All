import { MoralisProvider } from "react-moralis";
// import { NotificationProvider } from "@web3uikit/core";
import "../styles/globals.css";
import Head from "next/head";
import NavBar from "@/components/navigation/navBar";
import { Provider } from "react-redux";
import store from "@/store";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import Notifications from "@/components/Providers/Notifications";
import Modals from "@/components/Providers/Modals";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider activeChain="mumbai">
      <MoralisProvider initializeOnMount={false}>
        <Provider store={store}>
          {/* <NotificationProvider> */}
          <Notifications />
          <Modals />
          <Head>
            <link rel="icon" type="image/png" href="/logo.jpeg" />
          </Head>
          <Component {...pageProps} />
        </Provider>
        {/* </NotificationProvider> */}
      </MoralisProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
