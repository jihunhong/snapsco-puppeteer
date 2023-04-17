import { TARGET_URL } from './src/config';
import { create } from './src/lib/api';
import { launchBrowser } from './src/lib/puppeteer';
import { getPrevDay } from './src/lib/time';
import { crawl } from './src/lib/twitter';

(async () => {
  const [browser, page] = await launchBrowser();

  try {
    const { range: lastDay } = getPrevDay();
    await page.goto(TARGET_URL(lastDay));
    console.log(`started crawl this url : ${TARGET_URL(lastDay)}`);
    const tweets = await crawl(page);
    for (const t of tweets) {
      await create(t);
    }
    page.close();
    browser.close();
  } catch (err: any) {
    console.error(err?.message);
  } finally {
    page.close();
    browser.close();
  }
})();
