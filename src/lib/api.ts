import axios from 'axios';

/**
 * API insert
 * @param tweet
 */
export const create = async (tweet: Tweet) => {
  try {
    await axios.post('https://api.snapsco.net/api/collections/tweets/records', {
      ...tweet,
      photoUrls: JSON.stringify(tweet.photoLinks),
      images: JSON.stringify(tweet.images),
    });
  } catch (err: any) {
    if (err.response.data.data.url) {
      console.error('Duplicated Element');
    }
  }
};

/**
 * DB내에 수집한 트윗들을 시간 내림차순으로 반환
 * @returns {Array}
 */
export const getFirstItem = async () => {
  const response = await axios.get('https://api.snapsco.net/api/collections/tweets/records?sort=-created');
  return response.data?.items;
};
