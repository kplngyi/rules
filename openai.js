async function request(method, params) {
  return new Promise((resolve, reject) => {
    const httpMethod = $httpClient[method.toLowerCase()];
    httpMethod(params, (error, response, data) => {
      resolve({ error, response, data });
    });
  });
}

async function main() {
  const { error, response, data } = await request(
    "GET",
    "https://openai.com"
  );

  const status = response && response.status;

  if (error) {
    $done({
      content: "Network Error",
      backgroundColor: "",
    });
    return;
  }

  if (status === 200 || status === 301 || status === 302) {
    $done({
      content: `Available (${status})`,
      backgroundColor: "#412991",
    });
    return;
  }

  if (status === 403 || status === 451) {
    $done({
      content: `Not Available (${status})`,
      backgroundColor: "",
    });
    return;
  }

  $done({
    content: status ? `Status ${status}` : "Unknown Error",
    backgroundColor: "",
  });
}

(async () => {
  main()
    .then((_) => {})
    .catch((error) => {
      $done({});
    });
})();
