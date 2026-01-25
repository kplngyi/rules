async function request(method, params) {
  return new Promise((resolve) => {
    const httpMethod = $httpClient[method.toLowerCase()];
    httpMethod(params, (error, response, data) => {
      resolve({ error, response, data });
    });
  });
}

async function main() {
  const { error, response } = await request("GET", {
    url: "https://www.openai.com",
  });

  if (error || !response) {
    $done({
      content: "Network Error",
      backgroundColor: "",
    });
    return;
  }

  const status = response.status || response.statusCode;

  if (status === 200 || status === 301 || status === 302) {
    $done({
      content: "Available",
      backgroundColor: "#412991",
    });
    return;
  }

  if (status === 403 || status === 451) {
    $done({
      content: "Not Available",
      backgroundColor: "",
    });
    return;
  }

  $done({
    content: `Status ${status}`,
    backgroundColor: "",
  });
}

(async () => {
  try {
    await main();
  } catch (e) {
    $done({
      content: "Script Error",
      backgroundColor: "",
    });
  }
})();