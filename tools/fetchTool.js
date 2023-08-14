async function sendFeiTalk(text) {
  try {
    let res = await fetch(
      "https://open.feishu.cn/open-apis/bot/v2/hook/bf3f7b41-aeb2-4c2f-9669-8952a0b66879",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          msg_type: "text",
          content: { text },
        }),
      }
    );
  } catch (error) {
    console.log("飞书出问题：" + error);
  }
}
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
async function sleep(d) {
  await new Promise((resolve) => setTimeout(resolve, d));
}

module.exports = { sendFeiTalk, FetchWrap };
