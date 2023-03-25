import { getNftsDataRoute } from "./getNftsDataRoute";
import { getPassNftsDataRoute } from "./getPassNftsDataRoute";
import { saveFractionalDataRoute } from "./saveFractionalDataRoute.js";
import { getFractionalContracts } from "./getFractionalContracts.js";
import { createNftRoute } from "./createNftRoute.js";
import { saveSubscriptionDataRoute } from "./saveSubscriptionDataRoute.js";
import { getSubscriptionContracts } from "./getSubscriptionContracts.js";
export const routes = [
  getNftsDataRoute,
  getPassNftsDataRoute,
  saveFractionalDataRoute,
  getFractionalContracts,
  createNftRoute,
  saveSubscriptionDataRoute,
  getSubscriptionContracts,
];
