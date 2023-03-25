const axios = require("axios");
const ipfsUrl = "ipfs://QmUttGTuPbQkuroyGqrX3gS2b9SPdtYvyXLtxZjLHhgGuZ";
const gatewayUrl = "https://ipfs.io/ipfs/";
const apiUrl = gatewayUrl + ipfsUrl.substr(7);
// ipfs://QmUttGTuPbQkuroyGqrX3gS2b9SPdtYvyXLtxZjLHhgGuZ
axios
  .get(apiUrl)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });
