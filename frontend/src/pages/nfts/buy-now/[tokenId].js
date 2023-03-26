import BuyNow from "@/components/buy/buyNow";
import useWeb3 from "@/components/useWeb3";
import { useEffect, useInsertionEffect, useState } from "react";
import { abi, contractAddress, bytecode } from "../../../../constants";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Web3 from "web3";
import React from "react";
const buyNow = () => {
  const router = useRouter();
  console.log(router.asPath);
  const { tokenId } = router.query;
  const { account } = useMoralis();
  // console.log(account);
  const { userAccount, connectWallet, isWeb3Enabled, Moralis } = useWeb3();
  const nftData = useSelector((state) => state.deals.nftsData);
  const [check, setCheck] = useState(false);
  const [buyPrice, setBuyPrice] = useState(0);
  const [contract, setContract] = useState("contract");

  //not checked for matic network
  const provider = new Web3(Web3.givenProvider);
  const MyContract = new provider.eth.Contract(abi.fractionalNft);
  const deployContract = async () => {
    const gasPrice = await provider.eth.getGasPrice();
    console.log(gasPrice);
    console.log(gasPrice);
    // const gasEstimate = await MyContract.deploy({
    //   data: bytecode.fractionalNft,
    //   arguments: [
    //     1000,
    //     "0x7c40c393dc0f283f318791d746d894ddd3693572",
    //     1,
    //     10000000000000,
    //     "virat",
    //   ],
    // }).estimateGas();
    // console.log(gasEstimate);
    console.log(userAccount);
    const newContractInstance = await MyContract.deploy({
      data: bytecode.fractionalNft,
      arguments: [
        1000,
        "0x7c40c393dc0f283f318791d746d894ddd3693572",
        1,
        10000000000000,
        "virat",
      ],
    }).send({
      from: userAccount,
      gas: 3000000,
      gasPrice: gasPrice,
    });
    console.log(newContractInstance);
    setContract(newContractInstance.options.address);
    console.log(contract);
    console.log(
      `Contract deployed at address ${newContractInstance.options.address}`
    );
  };
  const fractionalize = async (
    initialSupply,
    token,
    tokenId,
    listPrice,
    name
  ) => {
    const gasPrice = await provider.eth.getGasPrice();
    console.log(gasPrice);
    // const gasEstimate = await MyContract.deploy({
    //   data: bytecode.fractionalNft,
    //   arguments: [initialSupply, token, tokenId, listPrice, name, symbol],
    // }).estimateGas();
    // console.log(gasEstimate);
    const newContractInstance = await MyContract.deploy({
      data: bytecode.fractionalNft,
      arguments: [initialSupply, token, tokenId, listPrice, name],
    }).send({
      from: userAccount,
      gas: 3000000,
      gasPrice: gasPrice,
    });
    console.log(newContractInstance);
    setContract(newContractInstance.options.address);
    console.log(contract);
    console.log(
      `Contract deployed at address ${newContractInstance.options.address}`
    );
    return newContractInstance.options.address;
  };
  // contract info sent to backend

  let activateBuy;
  // let buyPrice;
  const { runContractFunction: getPrice } = useWeb3Contract({
    abi: abi.nft,
    contractAddress: contractAddress.nft,
    functionName: "getPrice",
    params: { tokenId: tokenId },
  });
  const { runContractFunction: buyTokens } = useWeb3Contract({
    abi: abi.nft,
    contractAddress: contractAddress.nft,
    functionName: "buyTokens",
    msgValue: buyPrice,
    params: { tokenId: tokenId },
  });
  const { runContractFunction: checkSale } = useWeb3Contract({
    abi: abi.nft,
    contractAddress: contractAddress.nft,
    functionName: "checkSale",
    params: { tokenId: tokenId },
  });

  useEffect(() => {
    if (router.asPath === "/nfts/buy-now") {
      router.push("/nfts");
    }
  }, [router]);
  useEffect(() => {
    async function buy() {
      await buyTokens({
        onSuccess: handleSuccess,
        onError: (err) => {
          console.log(err);
        },
      });
    }
    if (check) {
      console.log(buyPrice);
      buy();
      setBuyPrice(10000000000000000);
    }
    setCheck(false);
  }, [buyPrice]);

  const checkoutBuy = async () => {
    setCheck(true);
    console.log("This is nfts buy button.");
    const tokenId = 1;
    const bigNumber = await getPrice();
    setBuyPrice(Number(bigNumber));
    console.log(buyPrice);

    activateBuy = await checkSale();
    console.log(activateBuy);
  };
  const handleSuccess = async (tx) => {
    try {
      await tx.wait(1);
      //   updateUIValues();
      //   handleNewNotification(tx);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <BuyNow
        showInput={false}
        showFractionalize={true}
        onCheckout={checkoutBuy}
        onFractionalize={fractionalize}
        activateBuy={activateBuy}
        nftData={nftData[Number(tokenId) - 1]}
      />
      {/* <button
        onClick={async () => {
          // setError({ error: false, msg: "" });
          // await Moralis.enableWeb3();

          await buyTokens({
            onSuccess: handleSuccess,
            onError: (err) => {
              console.log(err);
              // setError({
              //   error: true,
              //   msg: "Please try again later.",
              // });
            },
          });
        }}
      >
        Mint NFT
      </button> */}
      <button
        onClick={async () => {
          try {
            // await Moralis.enableWeb3();
            await deployContract();
          } catch (err) {
            console.log(err);
          }
        }}
      >
        Deploy Contract
      </button>

      <button
        onClick={async () => {
          await sendContractInfo();
        }}
      >
        Send Contract Info
      </button>
    </>
  );
};
export async function getServerSideProps(context) {
  const { req, res } = context;
  if (req.url.includes("/nfts/buy-now")) {
    res.writeHead(302, { Location: "/nfts" });
    res.end();
  }
  return { props: {} };
}
export default buyNow;
