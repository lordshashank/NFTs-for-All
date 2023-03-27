import { useState, useEffect } from "react";
import { Inter } from "@next/font/google";
import classes from "@/styles/Home.module.css";
import WalletConnect from "../components/navigation/WalletConnect";
import { abi, contractAddress, bytecode } from "../../constants";
import { useMoralis, useWeb3Contract } from "react-moralis";
import NavBar from "@/components/navigation/navBar";
// import Web3 from "@alch/alchemy-web3";

import useWeb3 from "../components/hooks/useWeb3";
import DiscoverItems from "@/components/home/DiscoverItems";
import { useRouter } from "next/router";
import Page from "@/components/ui/Page";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // const web3 = new Web3(
  //   process.env.ALCHEMY_ENDPOINT_URL,
  //   process.env.ALCHEMY_API_KEY
  // );
  const router = useRouter();
  const { chainId, userAccount, Moralis, isWeb3Enabled } = useWeb3();
  const [error, setError] = useState({ error: false, msg: "" });
  const [tokenCounter, setTokenCounter] = useState(0);
  // async function deployContract() {
  //   const MyContract = new matic.web3.eth.Contract(abi);
  //   const gasPrice = await matic.web3.eth.getGasPrice();
  //   const gasLimit = 500000;
  //   const deployTx = MyContract.deploy({
  //     data: bytecode.fractional,
  //     arguments: [
  //       "1000",
  //       contractAddress.nft,
  //       "1000000000000000",
  //       "virat",
  //       "fractions",
  //     ],
  //   });
  //   const accounts = await matic.web3.eth.getAccounts();
  //   const account = accounts[0];
  //   console.log(account);
  //   const gasEstimate = await deployTx.estimateGas({ from: account });
  //   const result = await deployTx.send({
  //     from: account,
  //     gas: gasEstimate,
  //     gasPrice,
  //     gasLimit,
  //   });
  //   const contractAddress = result.options.address;
  //   console.log(contractAddress);
  //   return contractAddress;
  // }
  const {
    runContractFunction: mintNft,
    isLoading: mintNFTIsLoading,
    isFetching: mintNFTIsFetching,
  } = useWeb3Contract({
    abi: abi.nft,
    contractAddress: contractAddress.nft,
    functionName: "mintNft",
    params: {
      tokenUri: "ipfs://QmZYmH5iDbD6v3U2ixoVAjioSzvWJszDzYdbeCLquGSpVm",
    },
  });
  const {
    runContractFunction: getTokenCounter,
    isLoading: getTokenCounterIsLoading,
    isFetching: getTokenCounterIsFetching,
    data: getTokenCounterData,
  } = useWeb3Contract({
    abi: abi.nft,
    contractAddress: contractAddress.nft,
    functionName: "getTokenCounter",
    params: {},
  });

  console.log(getTokenCounterData);
  useEffect(() => {
    updateUIValues();
    console.log(tokenCounter);
  }, [isWeb3Enabled]);

  async function updateUIValues() {
    // await Moralis.enableWeb3();
    // setTimeout(async () => {
    const tokenCounterFromCall = Number(await getTokenCounter());
    setTokenCounter(tokenCounterFromCall);
    console.log(tokenCounterFromCall);
    // }, 1000);
  }
  // console.log(abi.nft);
  // console.log(contractAddress.nft);
  const handleSuccess = async (tx) => {
    try {
      await tx.wait(1);
      //   updateUIValues();
      //   handleNewNotification(tx);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   dispatch(dealsActions.addNftData({ nftData: data }));
  // }, []);

  return (
    // <WalletConnect />

    // <div>token counter is {tokenCounter}</div>
    <Page>
      <div className={classes.intro}>
        <h1>
          Discover rate <br /> Collection or{" "}
          <span className={classes["text-bg"]}>Arts & NFTs</span>
        </h1>
        <p>We are a huge marketplace dedicated to connecting great artists</p>
        <button
          className={classes["explore-button"]}
          onClick={() => {
            router.push("/nfts");
          }}
        >
          Explore now
        </button>
      </div>
      <DiscoverItems />
    </Page>
  );
}
