const { FetchWrap } = require("../tools/fetchTool");

async function _get_bid_bytype(collectionSlug, filterObj) {
  collectionSlug = "boredapeyachtclub";
  let bidUrl = ` https://core-api.prod.blur.io/v1/collections/${collectionSlug}/executable-bids?filters=${encodeURIComponent(
    JSON.stringify(filterObj)
  )}`;
  return await FetchWrap(bidUrl);
}
