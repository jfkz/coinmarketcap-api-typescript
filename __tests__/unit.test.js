/**
 * Unit tests for coinmarketcap-api-typescript.
 *
 * These tests use a mock fetcher so no real API key is required.
 * They verify that each method constructs the correct URL and
 * passes the expected query parameters.
 */

const { default: CoinMarketCap } = require('../dist/index.js');

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Creates a mock fetcher that records calls and returns a preset payload.
 */
function makeMockFetcher(response = { data: {}, status: { error_code: 0 } }) {
  const calls = [];
  const fetcher = jest.fn(async (url) => {
    calls.push(url);
    return { json: async () => response };
  });
  fetcher.calls = calls;
  return fetcher;
}

function makeClient(response) {
  const fetcher = makeMockFetcher(response);
  const client = new CoinMarketCap('test-api-key', { fetcher });
  return { client, fetcher };
}

// ─── Constructor ──────────────────────────────────────────────────────────────

describe('CoinMarketCap constructor', () => {
  test('module is defined', () => {
    expect(CoinMarketCap).toBeDefined();
  });

  test('creates a client with all expected methods', () => {
    const { client } = makeClient();
    // Cryptocurrency
    expect(typeof client.getIdMap).toBe('function');
    expect(typeof client.getMetadata).toBe('function');
    expect(typeof client.getTickers).toBe('function');
    expect(typeof client.getHistoricalListings).toBe('function');
    expect(typeof client.getQuotes).toBe('function');
    expect(typeof client.getHistoricalQuotes).toBe('function');
    expect(typeof client.getMarketPairs).toBe('function');
    expect(typeof client.getOhlcv).toBe('function');
    expect(typeof client.getHistoricalOhlcv).toBe('function');
    expect(typeof client.getPricePerformanceStats).toBe('function');
    expect(typeof client.getCategories).toBe('function');
    expect(typeof client.getCategory).toBe('function');
    expect(typeof client.getAirdrops).toBe('function');
    expect(typeof client.getAirdrop).toBe('function');
    expect(typeof client.getTrending).toBe('function');
    expect(typeof client.getMostVisited).toBe('function');
    expect(typeof client.getGainersLosers).toBe('function');
    // Fiat
    expect(typeof client.getFiatMap).toBe('function');
    // Exchange
    expect(typeof client.getExchangeMap).toBe('function');
    expect(typeof client.getExchangeMetadata).toBe('function');
    expect(typeof client.getExchangeListings).toBe('function');
    expect(typeof client.getExchangeQuotes).toBe('function');
    expect(typeof client.getExchangeMarketPairs).toBe('function');
    // Global Metrics
    expect(typeof client.getGlobal).toBe('function');
    expect(typeof client.getHistoricalGlobal).toBe('function');
    // Tools
    expect(typeof client.getPriceConversion).toBe('function');
    // Blockchain
    expect(typeof client.getBlockchainStats).toBe('function');
    // Key
    expect(typeof client.getKeyInfo).toBe('function');
  });

  test('uses custom version in URL', async () => {
    const fetcher = makeMockFetcher();
    const client = new CoinMarketCap('key', { fetcher, version: 'v2' });
    await client.getKeyInfo();
    expect(fetcher.calls[0]).toContain('https://pro-api.coinmarketcap.com/v2/key/info');
  });
});

// ─── getIdMap ─────────────────────────────────────────────────────────────────

describe('getIdMap', () => {
  test('calls the correct endpoint', async () => {
    const { client, fetcher } = makeClient();
    await client.getIdMap();
    expect(fetcher.calls[0]).toContain('/cryptocurrency/map');
  });

  test('sends listing_status, start, limit, sort parameters', async () => {
    const { client, fetcher } = makeClient();
    await client.getIdMap({ listingStatus: 'inactive', start: 2, limit: 10, sort: 'cmc_rank' });
    const url = fetcher.calls[0];
    expect(url).toContain('listing_status=inactive');
    expect(url).toContain('start=2');
    expect(url).toContain('limit=10');
    expect(url).toContain('sort=cmc_rank');
  });

  test('joins symbol array into comma-separated string', async () => {
    const { client, fetcher } = makeClient();
    await client.getIdMap({ symbol: ['BTC', 'ETH'] });
    expect(fetcher.calls[0]).toContain('symbol=BTC%2CETH');
  });
});

// ─── getMetadata ──────────────────────────────────────────────────────────────

describe('getMetadata', () => {
  test('calls the correct endpoint', async () => {
    const { client, fetcher } = makeClient();
    await client.getMetadata({ symbol: 'BTC' });
    expect(fetcher.calls[0]).toContain('/cryptocurrency/info');
  });

  test('passes symbol parameter', async () => {
    const { client, fetcher } = makeClient();
    await client.getMetadata({ symbol: 'BTC' });
    expect(fetcher.calls[0]).toContain('symbol=BTC');
  });

  test('passes id parameter', async () => {
    const { client, fetcher } = makeClient();
    await client.getMetadata({ id: 1 });
    expect(fetcher.calls[0]).toContain('id=1');
  });

  test('joins id array', async () => {
    const { client, fetcher } = makeClient();
    await client.getMetadata({ id: [1, 2] });
    expect(fetcher.calls[0]).toContain('id=1%2C2');
  });

  test('passes slug parameter', async () => {
    const { client, fetcher } = makeClient();
    await client.getMetadata({ slug: 'bitcoin' });
    expect(fetcher.calls[0]).toContain('slug=bitcoin');
  });

  test('throws when both id and symbol are provided', async () => {
    const { client } = makeClient();
    await expect(client.getMetadata({ id: 1, symbol: 'BTC' })).rejects.toThrow();
  });
});

// ─── getTickers ───────────────────────────────────────────────────────────────

describe('getTickers', () => {
  test('calls the correct endpoint', async () => {
    const { client, fetcher } = makeClient();
    await client.getTickers();
    expect(fetcher.calls[0]).toContain('/cryptocurrency/listings/latest');
  });

  test('sends limit and start parameters', async () => {
    const { client, fetcher } = makeClient();
    await client.getTickers({ start: 5, limit: 20 });
    const url = fetcher.calls[0];
    expect(url).toContain('start=5');
    expect(url).toContain('limit=20');
  });

  test('converts limit=0 to 5000', async () => {
    const { client, fetcher } = makeClient();
    await client.getTickers({ limit: 0 });
    expect(fetcher.calls[0]).toContain('limit=5000');
  });

  test('throws when start and limit=0 are combined', async () => {
    const { client } = makeClient();
    await expect(client.getTickers({ start: 2, limit: 0 })).rejects.toThrow();
  });

  test('joins convert array', async () => {
    const { client, fetcher } = makeClient();
    await client.getTickers({ convert: ['USD', 'EUR'] });
    expect(fetcher.calls[0]).toContain('convert=USD%2CEUR');
  });

  test('passes cryptocurrencyType and sortDir', async () => {
    const { client, fetcher } = makeClient();
    await client.getTickers({ cryptocurrencyType: 'coins', sortDir: 'asc' });
    const url = fetcher.calls[0];
    expect(url).toContain('cryptocurrency_type=coins');
    expect(url).toContain('sort_dir=asc');
  });
});

// ─── getHistoricalListings ────────────────────────────────────────────────────

describe('getHistoricalListings', () => {
  test('calls the correct endpoint', async () => {
    const { client, fetcher } = makeClient();
    await client.getHistoricalListings({ date: '2021-01-01' });
    expect(fetcher.calls[0]).toContain('/cryptocurrency/listings/historical');
  });

  test('passes the date parameter', async () => {
    const { client, fetcher } = makeClient();
    await client.getHistoricalListings({ date: '2021-01-01' });
    expect(fetcher.calls[0]).toContain('date=2021-01-01');
  });
});

// ─── getQuotes ────────────────────────────────────────────────────────────────

describe('getQuotes', () => {
  test('calls the correct endpoint', async () => {
    const { client, fetcher } = makeClient();
    await client.getQuotes({ symbol: 'BTC' });
    expect(fetcher.calls[0]).toContain('/cryptocurrency/quotes/latest');
  });

  test('passes symbol parameter', async () => {
    const { client, fetcher } = makeClient();
    await client.getQuotes({ symbol: 'BTC' });
    expect(fetcher.calls[0]).toContain('symbol=BTC');
  });

  test('passes id parameter', async () => {
    const { client, fetcher } = makeClient();
    await client.getQuotes({ id: 1 });
    expect(fetcher.calls[0]).toContain('id=1');
  });

  test('joins id array', async () => {
    const { client, fetcher } = makeClient();
    await client.getQuotes({ id: [1, 2] });
    expect(fetcher.calls[0]).toContain('id=1%2C2');
  });

  test('throws when no id or symbol provided', async () => {
    const { client } = makeClient();
    await expect(client.getQuotes()).rejects.toThrow('Either ID or symbol is required');
  });

  test('throws when both id and symbol are provided', async () => {
    const { client } = makeClient();
    await expect(client.getQuotes({ id: 1, symbol: 'BTC' })).rejects.toThrow('at the same time');
  });

  test('joins convert array', async () => {
    const { client, fetcher } = makeClient();
    await client.getQuotes({ id: 1, convert: ['USD', 'EUR'] });
    expect(fetcher.calls[0]).toContain('convert=USD%2CEUR');
  });
});

// ─── getHistoricalQuotes ──────────────────────────────────────────────────────

describe('getHistoricalQuotes', () => {
  test('calls the correct endpoint', async () => {
    const { client, fetcher } = makeClient();
    await client.getHistoricalQuotes({ symbol: 'BTC' });
    expect(fetcher.calls[0]).toContain('/cryptocurrency/quotes/historical');
  });

  test('passes time_start, time_end, count, and interval', async () => {
    const { client, fetcher } = makeClient();
    await client.getHistoricalQuotes({
      symbol: 'BTC',
      timeStart: '2021-01-01',
      timeEnd: '2021-02-01',
      count: 30,
      interval: '1d',
    });
    const url = fetcher.calls[0];
    expect(url).toContain('time_start=2021-01-01');
    expect(url).toContain('time_end=2021-02-01');
    expect(url).toContain('count=30');
    expect(url).toContain('interval=1d');
  });

  test('throws when no id or symbol provided', async () => {
    const { client } = makeClient();
    await expect(client.getHistoricalQuotes()).rejects.toThrow('Either ID or symbol is required');
  });
});

// ─── getMarketPairs ───────────────────────────────────────────────────────────

describe('getMarketPairs', () => {
  test('calls the correct endpoint', async () => {
    const { client, fetcher } = makeClient();
    await client.getMarketPairs({ symbol: 'BTC' });
    expect(fetcher.calls[0]).toContain('/cryptocurrency/market-pairs/latest');
  });

  test('passes pagination and filter parameters', async () => {
    const { client, fetcher } = makeClient();
    await client.getMarketPairs({ id: 1, start: 1, limit: 10, category: 'spot' });
    const url = fetcher.calls[0];
    expect(url).toContain('id=1');
    expect(url).toContain('start=1');
    expect(url).toContain('limit=10');
    expect(url).toContain('category=spot');
  });
});

// ─── getOhlcv ─────────────────────────────────────────────────────────────────

describe('getOhlcv', () => {
  test('calls the correct endpoint', async () => {
    const { client, fetcher } = makeClient();
    await client.getOhlcv({ symbol: 'BTC' });
    expect(fetcher.calls[0]).toContain('/cryptocurrency/ohlcv/latest');
  });

  test('passes symbol parameter', async () => {
    const { client, fetcher } = makeClient();
    await client.getOhlcv({ symbol: 'BTC' });
    expect(fetcher.calls[0]).toContain('symbol=BTC');
  });

  test('throws when no id or symbol provided', async () => {
    const { client } = makeClient();
    await expect(client.getOhlcv()).rejects.toThrow('Either ID or symbol is required');
  });
});

// ─── getHistoricalOhlcv ───────────────────────────────────────────────────────

describe('getHistoricalOhlcv', () => {
  test('calls the correct endpoint', async () => {
    const { client, fetcher } = makeClient();
    await client.getHistoricalOhlcv({ symbol: 'BTC' });
    expect(fetcher.calls[0]).toContain('/cryptocurrency/ohlcv/historical');
  });

  test('passes time_period and count', async () => {
    const { client, fetcher } = makeClient();
    await client.getHistoricalOhlcv({ symbol: 'BTC', timePeriod: 'daily', count: 30 });
    const url = fetcher.calls[0];
    expect(url).toContain('time_period=daily');
    expect(url).toContain('count=30');
  });
});

// ─── getPricePerformanceStats ─────────────────────────────────────────────────

describe('getPricePerformanceStats', () => {
  test('calls the correct endpoint', async () => {
    const { client, fetcher } = makeClient();
    await client.getPricePerformanceStats({ symbol: 'BTC' });
    expect(fetcher.calls[0]).toContain('/cryptocurrency/price-performance-stats/latest');
  });

  test('passes timePeriod parameter', async () => {
    const { client, fetcher } = makeClient();
    await client.getPricePerformanceStats({ symbol: 'BTC', timePeriod: '7d' });
    expect(fetcher.calls[0]).toContain('time_period=7d');
  });

  test('throws when both id and symbol are provided', async () => {
    const { client } = makeClient();
    await expect(client.getPricePerformanceStats({ id: 1, symbol: 'BTC' })).rejects.toThrow();
  });
});

// ─── getCategories ────────────────────────────────────────────────────────────

describe('getCategories', () => {
  test('calls the correct endpoint', async () => {
    const { client, fetcher } = makeClient();
    await client.getCategories();
    expect(fetcher.calls[0]).toContain('/cryptocurrency/categories');
  });

  test('passes start, limit parameters', async () => {
    const { client, fetcher } = makeClient();
    await client.getCategories({ start: 1, limit: 5 });
    const url = fetcher.calls[0];
    expect(url).toContain('start=1');
    expect(url).toContain('limit=5');
  });
});

// ─── getCategory ──────────────────────────────────────────────────────────────

describe('getCategory', () => {
  test('calls the correct endpoint', async () => {
    const { client, fetcher } = makeClient();
    await client.getCategory({ id: '6053d9545778035c15d9e4be' });
    expect(fetcher.calls[0]).toContain('/cryptocurrency/category');
  });

  test('passes id parameter', async () => {
    const { client, fetcher } = makeClient();
    await client.getCategory({ id: '6053d9545778035c15d9e4be' });
    expect(fetcher.calls[0]).toContain('id=6053d9545778035c15d9e4be');
  });
});

// ─── getAirdrops ──────────────────────────────────────────────────────────────

describe('getAirdrops', () => {
  test('calls the correct endpoint', async () => {
    const { client, fetcher } = makeClient();
    await client.getAirdrops();
    expect(fetcher.calls[0]).toContain('/cryptocurrency/airdrops');
  });

  test('passes status parameter', async () => {
    const { client, fetcher } = makeClient();
    await client.getAirdrops({ status: 'ongoing' });
    expect(fetcher.calls[0]).toContain('status=ongoing');
  });
});

// ─── getAirdrop ───────────────────────────────────────────────────────────────

describe('getAirdrop', () => {
  test('calls the correct endpoint', async () => {
    const { client, fetcher } = makeClient();
    await client.getAirdrop({ id: '10050' });
    expect(fetcher.calls[0]).toContain('/cryptocurrency/airdrop');
  });

  test('passes id parameter', async () => {
    const { client, fetcher } = makeClient();
    await client.getAirdrop({ id: '10050' });
    expect(fetcher.calls[0]).toContain('id=10050');
  });
});

// ─── getTrending ──────────────────────────────────────────────────────────────

describe('getTrending', () => {
  test('calls the correct endpoint', async () => {
    const { client, fetcher } = makeClient();
    await client.getTrending();
    expect(fetcher.calls[0]).toContain('/cryptocurrency/trending/latest');
  });

  test('passes timePeriod parameter', async () => {
    const { client, fetcher } = makeClient();
    await client.getTrending({ timePeriod: '7d' });
    expect(fetcher.calls[0]).toContain('time_period=7d');
  });
});

// ─── getMostVisited ───────────────────────────────────────────────────────────

describe('getMostVisited', () => {
  test('calls the correct endpoint', async () => {
    const { client, fetcher } = makeClient();
    await client.getMostVisited();
    expect(fetcher.calls[0]).toContain('/cryptocurrency/trending/most-visited');
  });
});

// ─── getGainersLosers ─────────────────────────────────────────────────────────

describe('getGainersLosers', () => {
  test('calls the correct endpoint', async () => {
    const { client, fetcher } = makeClient();
    await client.getGainersLosers();
    expect(fetcher.calls[0]).toContain('/cryptocurrency/trending/gainers-losers');
  });

  test('passes timePeriod, sort, and sortDir', async () => {
    const { client, fetcher } = makeClient();
    await client.getGainersLosers({ timePeriod: '7d', sort: 'percent_change_7d', sortDir: 'asc' });
    const url = fetcher.calls[0];
    expect(url).toContain('time_period=7d');
    expect(url).toContain('sort=percent_change_7d');
    expect(url).toContain('sort_dir=asc');
  });
});

// ─── getFiatMap ───────────────────────────────────────────────────────────────

describe('getFiatMap', () => {
  test('calls the correct endpoint', async () => {
    const { client, fetcher } = makeClient();
    await client.getFiatMap();
    expect(fetcher.calls[0]).toContain('/fiat/map');
  });

  test('passes includeMetals parameter', async () => {
    const { client, fetcher } = makeClient();
    await client.getFiatMap({ includeMetals: true });
    expect(fetcher.calls[0]).toContain('include_metals=true');
  });
});

// ─── getExchangeMap ───────────────────────────────────────────────────────────

describe('getExchangeMap', () => {
  test('calls the correct endpoint', async () => {
    const { client, fetcher } = makeClient();
    await client.getExchangeMap();
    expect(fetcher.calls[0]).toContain('/exchange/map');
  });

  test('passes listingStatus, start, limit', async () => {
    const { client, fetcher } = makeClient();
    await client.getExchangeMap({ listingStatus: 'active', start: 1, limit: 10 });
    const url = fetcher.calls[0];
    expect(url).toContain('listing_status=active');
    expect(url).toContain('start=1');
    expect(url).toContain('limit=10');
  });
});

// ─── getExchangeMetadata ──────────────────────────────────────────────────────

describe('getExchangeMetadata', () => {
  test('calls the correct endpoint', async () => {
    const { client, fetcher } = makeClient();
    await client.getExchangeMetadata({ slug: 'binance' });
    expect(fetcher.calls[0]).toContain('/exchange/info');
  });

  test('passes slug parameter', async () => {
    const { client, fetcher } = makeClient();
    await client.getExchangeMetadata({ slug: 'binance' });
    expect(fetcher.calls[0]).toContain('slug=binance');
  });

  test('joins id array', async () => {
    const { client, fetcher } = makeClient();
    await client.getExchangeMetadata({ id: [270, 294] });
    expect(fetcher.calls[0]).toContain('id=270%2C294');
  });
});

// ─── getExchangeListings ──────────────────────────────────────────────────────

describe('getExchangeListings', () => {
  test('calls the correct endpoint', async () => {
    const { client, fetcher } = makeClient();
    await client.getExchangeListings();
    expect(fetcher.calls[0]).toContain('/exchange/listings/latest');
  });

  test('passes sort, sortDir, marketType', async () => {
    const { client, fetcher } = makeClient();
    await client.getExchangeListings({ sort: 'volume_24h', sortDir: 'desc', marketType: 'spot' });
    const url = fetcher.calls[0];
    expect(url).toContain('sort=volume_24h');
    expect(url).toContain('sort_dir=desc');
    expect(url).toContain('market_type=spot');
  });
});

// ─── getExchangeQuotes ────────────────────────────────────────────────────────

describe('getExchangeQuotes', () => {
  test('calls the correct endpoint', async () => {
    const { client, fetcher } = makeClient();
    await client.getExchangeQuotes({ slug: 'binance' });
    expect(fetcher.calls[0]).toContain('/exchange/quotes/latest');
  });

  test('passes slug and convert parameters', async () => {
    const { client, fetcher } = makeClient();
    await client.getExchangeQuotes({ slug: 'binance', convert: 'EUR' });
    const url = fetcher.calls[0];
    expect(url).toContain('slug=binance');
    expect(url).toContain('convert=EUR');
  });
});

// ─── getExchangeMarketPairs ───────────────────────────────────────────────────

describe('getExchangeMarketPairs', () => {
  test('calls the correct endpoint', async () => {
    const { client, fetcher } = makeClient();
    await client.getExchangeMarketPairs({ slug: 'binance' });
    expect(fetcher.calls[0]).toContain('/exchange/market-pairs/latest');
  });

  test('passes slug, limit and category parameters', async () => {
    const { client, fetcher } = makeClient();
    await client.getExchangeMarketPairs({ slug: 'binance', limit: 10, category: 'spot' });
    const url = fetcher.calls[0];
    expect(url).toContain('slug=binance');
    expect(url).toContain('limit=10');
    expect(url).toContain('category=spot');
  });
});

// ─── getGlobal ────────────────────────────────────────────────────────────────

describe('getGlobal', () => {
  test('calls the correct endpoint', async () => {
    const { client, fetcher } = makeClient();
    await client.getGlobal();
    expect(fetcher.calls[0]).toContain('/global-metrics/quotes/latest');
  });

  test('uses USD by default', async () => {
    const { client, fetcher } = makeClient();
    await client.getGlobal();
    expect(fetcher.calls[0]).toContain('convert=USD');
  });

  test('accepts a string currency', async () => {
    const { client, fetcher } = makeClient();
    await client.getGlobal('gbp');
    expect(fetcher.calls[0]).toContain('convert=GBP');
  });

  test('accepts an array of currencies', async () => {
    const { client, fetcher } = makeClient();
    await client.getGlobal(['gbp', 'eur']);
    expect(fetcher.calls[0]).toContain('convert=GBP%2CEUR');
  });

  test('accepts an options object with convert string', async () => {
    const { client, fetcher } = makeClient();
    await client.getGlobal({ convert: 'gbp' });
    expect(fetcher.calls[0]).toContain('convert=GBP');
  });

  test('accepts an options object with convert array', async () => {
    const { client, fetcher } = makeClient();
    await client.getGlobal({ convert: ['gbp', 'eur'] });
    expect(fetcher.calls[0]).toContain('convert=GBP%2CEUR');
  });
});

// ─── getHistoricalGlobal ──────────────────────────────────────────────────────

describe('getHistoricalGlobal', () => {
  test('calls the correct endpoint', async () => {
    const { client, fetcher } = makeClient();
    await client.getHistoricalGlobal();
    expect(fetcher.calls[0]).toContain('/global-metrics/quotes/historical');
  });

  test('passes time_start, time_end, count, interval', async () => {
    const { client, fetcher } = makeClient();
    await client.getHistoricalGlobal({
      timeStart: '2021-01-01',
      timeEnd: '2021-02-01',
      count: 30,
      interval: '1d',
    });
    const url = fetcher.calls[0];
    expect(url).toContain('time_start=2021-01-01');
    expect(url).toContain('time_end=2021-02-01');
    expect(url).toContain('count=30');
    expect(url).toContain('interval=1d');
  });
});

// ─── getPriceConversion ───────────────────────────────────────────────────────

describe('getPriceConversion', () => {
  test('calls the correct endpoint', async () => {
    const { client, fetcher } = makeClient();
    await client.getPriceConversion({ amount: 1, symbol: 'BTC', convert: 'USD' });
    expect(fetcher.calls[0]).toContain('/tools/price-conversion');
  });

  test('passes amount, symbol and convert', async () => {
    const { client, fetcher } = makeClient();
    await client.getPriceConversion({ amount: 1.5, symbol: 'BTC', convert: 'USD' });
    const url = fetcher.calls[0];
    expect(url).toContain('amount=1.5');
    expect(url).toContain('symbol=BTC');
    expect(url).toContain('convert=USD');
  });

  test('passes id instead of symbol', async () => {
    const { client, fetcher } = makeClient();
    await client.getPriceConversion({ amount: 1, id: 1, convert: ['USD', 'EUR'] });
    const url = fetcher.calls[0];
    expect(url).toContain('id=1');
    expect(url).toContain('convert=USD%2CEUR');
  });
});

// ─── getBlockchainStats ───────────────────────────────────────────────────────

describe('getBlockchainStats', () => {
  test('calls the correct endpoint', async () => {
    const { client, fetcher } = makeClient();
    await client.getBlockchainStats({ symbol: 'BTC' });
    expect(fetcher.calls[0]).toContain('/blockchain/statistics/latest');
  });

  test('passes symbol parameter', async () => {
    const { client, fetcher } = makeClient();
    await client.getBlockchainStats({ symbol: 'BTC' });
    expect(fetcher.calls[0]).toContain('symbol=BTC');
  });

  test('joins id array', async () => {
    const { client, fetcher } = makeClient();
    await client.getBlockchainStats({ id: [1, 1027] });
    expect(fetcher.calls[0]).toContain('id=1%2C1027');
  });
});

// ─── getKeyInfo ───────────────────────────────────────────────────────────────

describe('getKeyInfo', () => {
  test('calls the correct endpoint', async () => {
    const { client, fetcher } = makeClient();
    await client.getKeyInfo();
    expect(fetcher.calls[0]).toContain('/key/info');
  });

  test('does not append a query string', async () => {
    const { client, fetcher } = makeClient();
    await client.getKeyInfo();
    expect(fetcher.calls[0]).not.toContain('?');
  });

  test('returns the mock response', async () => {
    const { client } = makeClient({ data: { plan: { name: 'Basic' } }, status: { error_code: 0 } });
    const result = await client.getKeyInfo();
    expect(result.data.plan.name).toBe('Basic');
  });
});
