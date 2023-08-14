async function FetchWrap(url, options = {}) {
  let response = {};
  try {
    if (options.method == "POST") {
      // @ts-ignore
      response = await fetch(url, {
        method: "POST",
        headers: options.headers || {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options.body),
      });
    } else {
      // @ts-ignore
      response = await fetch(url, {
        method: "GET",
        headers: options.headers || {},
      });
    }
    if (!response.ok) {
      if (response.status == 403) {
        // 出现人机验证要取消全部,取消后要正常跑程序
        return Promise.reject("需要人机验证");
      }
      if (response.status == 429) {
        console.log("429接口频繁  ", url);
        return Promise.reject("429接口频繁");
      }
      return Promise.reject(
        "接口出错：" + response.status + response.statusText
      );
    }
    return response.json();
  } catch (error) {
    return Promise.reject("接口网络出错了" + error);
  }
}

async function _get_bid_bytype(collectionSlug, filterObj) {
  collectionSlug = "boredapeyachtclub";
  let bidUrl = ` https://core-api.prod.blur.io/v1/collections/${collectionSlug}/executable-bids?filters=${encodeURIComponent(
    JSON.stringify(filterObj)
  )}`;
  let { priceLevels, success } = await FetchWrap(bidUrl);
  if (success) {
    return priceLevels;
  }
  return null;
}

async function _get_traits(contractAddress) {
  contractAddress = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";
  let traitUrl = `https://core-api.prod.blur.io/v1/traits/${contractAddress}`;
  let { traits, success } = await FetchWrap(traitUrl);
  if (success) {
    return traits;
  }
  return null;
}

async function start() {
  //   let res = await _get_traits();
  let res = await _get_bid_bytype("boredapeyachtclub",{
    criteria: { type: "TRAIT", value: { Background: "Gray" } },
  });
  // let res = await _get_bid_bytype({
  //   criteria: { type: "COLLECTION", value: {} },
  // });
  console.log(res);
}

start();
