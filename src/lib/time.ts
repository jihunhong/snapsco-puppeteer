import { getFirstItem } from './api';

/**
 * 데이터 수집 범위를 구하기 위해 이용하는 함수
 * 트위터 페이지 접속시 url에 range를 붙여 언제부터의 데이터인지, 언제까지의 데이터인지를 지정
 * @returns {object}
 */
export const getPrevDay = () => {
  const current = new Date();
  const previousTime = new Date(current);
  console.log('current hour : ',current.getHours());
  if (current.getHours() + 9 <= 12) {
    previousTime.setDate(current.getDate() - 1);
    // 오전에는 어제 데이터 가져오기 위해
    return { range: `until%3A${previousTime.getFullYear()}-${previousTime.getMonth() + 1}-${previousTime.getDate()}`, date: previousTime };
  }
  if (current.getHours() + 9 > 12) {
    previousTime.setDate(current.getDate());
    // 오후에는 오늘 올라온 데이터 가져오기 위해
    return { range: `since%3A${previousTime.getFullYear()}-${previousTime.getMonth() + 1}-${previousTime.getDate()}`, date: previousTime };
  }
  return { range: `since%3A${previousTime.getFullYear()}-${previousTime.getMonth() + 1}-${previousTime.getDate()}`, date: previousTime };
};

/**
 * DB내에 존재하는 가장 최신의 데이터 datetime
 * @returns {string} datetime ex)"2022-01-01 10:00:00.123Z"
 */
export const getLastTweetTime = async (): Promise<string> => {
  const [lastItem] = await getFirstItem();
  return lastItem?.datetime;
};

export const untillTime = async () => {
  const { date: localTime } = getPrevDay();
  const lastTweet = await getLastTweetTime();
  if (lastTweet) {
    const lastTweetDate = new Date(lastTweet);
    return localTime > lastTweetDate ? localTime : lastTweetDate;
  }
  return localTime;
};
