export const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36';
export const TARGET_URL = (since: string, q: string = '(@SnapDecks)'): string =>
  `https://twitter.com/search?q=${encodeURIComponent(q)}%20${since}&src=typed_query&f=live`;
// q=since%3A2023-04-16%20검색어
