async function _get_traits(contractAddress) {
  contractAddress = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";
  let traitUrl = `https://core-api.prod.blur.io/v1/traits/${contractAddress}`;
  return await FetchWrap(traitUrl);
}
