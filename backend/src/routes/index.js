import { getNftsDataRoute } from "./getNftsDataRoute";
import { getPassNftsDataRoute } from "./getPassNftsDataRoute";
import { saveFractionalDataRoute } from "./saveFractionalDataRoute.js";
import { getFractionalContracts } from "./getFractionalContracts.js";
import { createNftRoute } from "./createNftRoute.js";
import { saveSubscriptionDataRoute } from "./saveSubscriptionDataRoute.js";
import { getSubscriptionContracts } from "./getSubscriptionContracts.js";
import { getContractRoute } from "./getContractRoute";
import { getFractionalNftsData } from "./getFractionalNftsDataRoute";
import { getAllNftsRoute } from "./getAllNftsRoute";
import { getAllFractionalContractsRoute } from "./getAllFractionalNftsRoute";
import { getAllSubscriptionalContractsRoute } from "./getAllSubscriptionalContractsRoute";
import { getAllSubscriptionalNftsRoute } from "./getAllSubscriptionalNftsRoute";
import { getProfileNftsRoute } from "./getProfileNftsRoute";
export const routes = [
  getNftsDataRoute,
  getPassNftsDataRoute,
  saveFractionalDataRoute,
  getFractionalContracts,
  createNftRoute,
  saveSubscriptionDataRoute,
  getSubscriptionContracts,
  getContractRoute,
  getFractionalNftsData,
  getAllNftsRoute,
  getAllFractionalContractsRoute,
  getAllSubscriptionalContractsRoute,
  getAllSubscriptionalNftsRoute,
  getProfileNftsRoute,
];
