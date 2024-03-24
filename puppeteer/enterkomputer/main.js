const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.enterkomputer.com/category_brand/17/processor/AMD');

  // Wait for elements to load
  await page.waitForSelector('.ps-product--wide');

  // Extract product data
  const products = await page.evaluate(() => {
    const productElements = document.querySelectorAll('.ps-product--wide');
    return Array.from(productElements, product => ({
      ps_product__title: product.querySelector('.ps-product__title')?.textContent.trim() || "", // Use empty string if element is null
      ps_product__title_href: product.querySelector('.ps-product__title')?.href || "", // Use empty string if element is null
      ps_product__price: product.querySelector('.ps-product__price')?.textContent.trim() || "", // Use empty string if element is null
    }));
  });
  

  console.log(products);

  await browser.close();
})();
