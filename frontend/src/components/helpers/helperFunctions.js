import { abi, contractAddress } from "../../../constants";

export class helperFunctions {
  handleSuccess = async (tx) => {
    try {
      await tx.wait(1);
    } catch (error) {
      console.log(error);
    }
  };
  async getTokenIds(contractAddress, getTokenId) {
    const parameters = {
      abi: abi.fractionalNft,
      contractAddress: contractAddress,
      functionName: "getTokenId",
      params: {},
    };
    const result = await getTokenId({
      params: parameters,
      onSuccess: () => {
        console.log("success");
      },
      onError: (error) => {
        console.log(error);
      },
    });
    return Number(result);
  }
  async getownerOf(tokenId, userAccount, getOwnerOfToken) {
    const parameters = {
      abi: abi.nft,
      contractAddress: contractAddress.nft,
      functionName: "getOwnerOfToken",
      params: { tokenId: tokenId },
    };
    const result = await getOwnerOfToken({
      params: parameters,
      onSuccess: () => {
        console.log("success");
      },
      onError: (error) => {
        console.log(error);
      },
    });
    console.log(result);
    if (result === userAccount) return true;
    else return false;
  }
  getisOnSale = async (tokenId, checkSale) => {
    const parameters = {
      abi: abi.nft,
      contractAddress: contractAddress.nft,
      functionName: "checkSale",
      params: { tokenId: tokenId },
    };
    const result = await checkSale({
      params: parameters,
      onSuccess: () => {
        console.log("success");
      },
      onError: (error) => {
        console.log(error);
      },
    });
    console.log(result);
    return result;
  };
  getSell = async (tokenId, price, setOnSale) => {
    const parameters = {
      abi: abi.nft,
      contractAddress: contractAddress.nft,
      functionName: "setOnSale",
      params: { tokenId: tokenId, _price: price },
    };
    const result = await setOnSale({
      params: parameters,
      onSuccess: () => {
        console.log("success");
        this.handleSuccess();
      },
      onError: (error) => {
        console.log(error);
      },
    });
    console.log(result);
    return "NFT on Sale";
  };
  getIsOwner = async (userAccount, owner, contract) => {
    const parameters = {
      abi: abi.subscriptionNft,
      contractAddress: contract,
      functionName: "owner",
      params: {},
    };
    const result = await owner({
      params: parameters,
      onSuccess: () => {
        console.log("success");
      },
      onError: (error) => {
        console.log(error);
      },
    });
    console.log(result);
    if (result === userAccount) return true;
    else return false;
  };
  setChangePrice = async (newPrice, changeSubscriptionPrice) => {
    if ((await getOwner()) !== userAccount) return "not owner";
    const parameters = {
      abi: abi.subscriptionNft,
      contractAddress: contractAddress,
      functionName: "changeSubscriptionPrice",
      params: { _newPrice: newPrice },
    };
    const result = await changeSubscriptionPrice({
      params: parameters,
      onSuccess: () => {
        console.log("success");
      },
      onError: (error) => {
        console.log(error);
      },
    });
    console.log(result);
    return "price changed";
  };
  getSubscriptionPrice = async (subscriptionPrice, contract) => {
    const parameters = {
      abi: abi.subscriptionNft,
      contractAddress: contract,
      functionName: "subscriptionPrice",
      params: {},
    };
    const result = await subscriptionPrice({
      params: parameters,
      onSuccess: () => {
        console.log("success");
      },
      onError: (error) => {
        console.log(error);
      },
    });
    console.log(result);
    return Number(result);
  };
  getSubscription = async (subscriptionPrice, subscribe, contract) => {
    const value = await this.getSubscriptionPrice(subscriptionPrice, contract);
    const parameters = {
      abi: abi.subscriptionNft,
      contractAddress: contract,
      functionName: "subscribe",
      msgValue: value,
      params: {},
    };
    console.log(value);
    const result = await subscribe({
      params: parameters,
      onSuccess: () => {
        console.log("success");
        this.handleSuccess();
      },
      onError: (error) => {
        console.log(error);
      },
    });
    console.log(result);
    return "subscribed";
  };
  price = async (getPrice, contractAddress) => {
    // console.log("start");
    const parameters = {
      abi: abi.fractionalNft,
      contractAddress: contractAddress,
      functionName: "getPrice",
      params: {},
    };
    const result = await getPrice({
      params: parameters,
      onSuccess: () => {
        console.log("success");
      },
      onError: (error) => {
        console.log(error);
      },
    });
    console.log(result);
    return Number(result);
  };
  buyFractions = async (parts, contractAddress, buyTokens, getPrice) => {
    let buyPrice = await this.price(getPrice, contractAddress);
    buyPrice = buyPrice * parts;
    const parameters = {
      abi: abi.fractionalNft,
      contractAddress: contractAddress,
      functionName: "buyTokens",
      msgValue: buyPrice,
      params: { amount: parts },
    };
    await buyTokens({
      params: parameters,
      onSuccess: () => {
        this.handleSuccess();
      },
      onError: (err) => {
        console.log(err);
      },
    });
    return `${parts} tokens bought`;
  };
}
