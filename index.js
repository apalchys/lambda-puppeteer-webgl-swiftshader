const puppeteer = require("puppeteer");

exports.handler = async (event, ctx, callback) => {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    args: [
      "--disable-dev-shm-usage",
      "--no-zygote",
      "--use-gl=swiftshader",
      "--enable-webgl",
      "--hide-scrollbars",
      "--mute-audio",
      "--no-sandbox",
      "--single-process",
      "--disable-breakpad",
      "--ignore-gpu-blacklist",
      "--headless"
    ],
    executablePath: "./headless_chromium/headless_shell"
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 600 });
  await page.goto("https://get.webgl.org/");
  const screenshot = await page.screenshot();

  const body = screenshot.toString("base64");
  const response = {
    statusCode: 200,
    headers: { "Content-Type": "image/png" },
    body,
    isBase64Encoded: true
  };
  await browser.close();

  callback(null, response);
};
