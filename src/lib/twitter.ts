import { Page } from 'puppeteer';
import { ALARM_MODAL_CLOSER, TWEETS } from '../selectors';
import { delay } from './puppeteer';

export const crawl = async (page: Page) => {
  await page.waitForSelector(ALARM_MODAL_CLOSER, { timeout: 30_000 });
  await page.click(ALARM_MODAL_CLOSER);
  await page.waitForSelector(TWEETS);
  const tweets: Tweet[] = [];

  while (tweets.length < 30) {
    // 데이터 insert는 최대 30개만 가능하도록
    // 광고, 이미지 트윗 제외하면 인기 게시물 30개면 충분해보임
    const tweet = await page.$eval(TWEETS, t => {
      const userName = t.querySelector('div[data-testid="User-Name"] span')?.textContent;
      const content = t.querySelector('div[data-testid="tweetText"]')?.textContent;
      const photoLinks = Array.from(t.querySelectorAll('a[href*="photo"]')).map(anchor => `https://twitter.com${anchor.getAttribute('href')}`);
      const images = Array.from(t.querySelectorAll('a[href*="photo"]')).map(anchor => anchor.querySelector('img')?.src);
      const datetime = t.querySelector('time')?.getAttribute('datetime');
      t.parentElement?.remove();
      return {
        userName,
        content,
        photoLinks,
        images,
        datetime,
      };
    });
    if (!tweet) break;

    // 이미지 없는건 제외
    // datetime이 없는것 (광고 트윗) 제외
    if (tweet.photoLinks.length && tweet.images.length && tweet.datetime) tweets.push(tweet);

    await delay();
  }
  return tweets;
};
