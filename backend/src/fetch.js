const fetch = async () => {
  const response = await fetch(
    "https://ipfs.io/ipfs/QmUttGTuPbQkuroyGqrX3gS2b9SPdtYvyXLtxZjLHhgGuZ"
  );
  console.log(await response.json());
};
fetch();
