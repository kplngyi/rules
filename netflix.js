async function request(method, params) {
  return new Promise((resolve) => {
    const m = method.toLowerCase();
    if (!$httpClient[m]) {
      resolve({ error: "Invalid method" });
      return;
    }
    $httpClient[m](params, (error, response, data) => {
      resolve({ error, response, data });
    });
  });
}

async function checkTitle(id) {
  const { error, response } = await request(
    "GET",
    `https://www.netflix.com/title/${id}`
  );

  if (error || !response || !response.headers) {
    return "";
  }

  const headers = response.headers;
  const url =
    headers["X-Originating-Url"] ||
    headers["x-originating-url"];

  if (!url) return "";

  const parts = url.split("/");
  const loc = parts[3] || "";

  if (loc === "title") return "us";
  return loc.split("-")[0];
}

async function main() {
  let country = await checkTitle(70143836);
  if (country) {
    $done({
      content: `No Restriction (${country.toUpperCase()})`,
      backgroundColor: "#2a2a2a",
    });
    return;
  }

  let country2 = await checkTitle(80197526);
  if (country2) {
    $done({
      content: `Originals Only (${country2.toUpperCase()})`,
      backgroundColor: "#2a2a2a",
    });
    return;
  }

  $done({
    content: "Not Available",
    backgroundColor: "#2a2a2a",
  });
}

main().catch(() => $done({}));