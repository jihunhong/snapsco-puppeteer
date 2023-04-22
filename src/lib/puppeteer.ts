import { Browser, Page } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import fs from 'fs';
import path from 'path';
import { USER_AGENT } from '../config';

puppeteer.use(StealthPlugin());

export async function launchBrowser(): Promise<[Browser, Page]> {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  const exist = fs.existsSync(path.join(__dirname, '../../cookies.json'));
  console.log(exist);
  if (exist) {
    const cookies = fs.readFileSync(path.join(__dirname, '../../cookies.json'), { encoding: 'utf8'});
    const deserializedCookies = JSON.parse(cookies);
    await page.setCookie(...deserializedCookies);
  }
  await page.setUserAgent(USER_AGENT);
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'ko',
  });
  return [browser, page];
}

/**
 * 크롤링시 딜레이 주기위해 이용하는 함수.
 * 1.5초 + 2.xx랜덤초를 딜레이
 * @param ms 1500 defaultValue
 * @returns
 */
export const delay = (ms: number = 1500): Promise<void> => {
  return new Promise(res => {
    setTimeout(() => res(), ms + Math.random() * 2000);
  });
};
