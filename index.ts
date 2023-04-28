import { TARGET_URL } from './src/config';
import { launchBrowser } from './src/lib/puppeteer';
import { getPrevDay } from './src/lib/time';
import { crawl } from './src/lib/twitter';

(async () => {
  const [browser, page] = await launchBrowser();

  try {
    const { range: lastDay } = getPrevDay();
    await page.goto(TARGET_URL(lastDay, 'marvelsnap deck'));
    console.log(`started crawl this url : ${TARGET_URL(lastDay)}`);
    await crawl(page);
  } catch (err: any) {
    console.error(err?.message);
  } finally {
    page.close();
    browser.close();
    process.exit(0);
  }
})();
