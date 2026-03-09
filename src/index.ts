import fetch from 'node-fetch';
import qs from 'qs';

const BASE_URL = 'https://pro-api.coinmarketcap.com';

/** Options for the CoinMarketCap constructor */
export interface CoinMarketCapOptions {
  /** API version to use. Defaults to 'v1'. */
  version?: string;
  /** Custom fetch function. Defaults to node-fetch. */
  fetcher?: (url: fetch.RequestInfo, init?: fetch.RequestInit) => Promise<fetch.Response>;
  /** Additional configuration for fetch requests. */
  config?: object;
}

/** Parameters for getIdMap */
export interface GetIdMapArgs {
  /** Only active or inactive coins. Defaults to 'active'. */
  listingStatus?: string;
  /** Offset the start (1-based) of the paginated list. */
  start?: number;
  /** How many results to return. */
  limit?: number;
  /** One or more symbols to filter. */
  symbol?: string | string[];
  /** Sort field. */
  sort?: string;
  /** Auxiliary fields to return. */
  aux?: string;
}

/** Parameters for getMetadata */
export interface GetMetadataArgs {
  /** One or more CoinMarketCap IDs. */
  id?: string | string[] | number | number[];
  /** One or more cryptocurrency symbols. */
  symbol?: string | string[];
  /** One or more slugs. */
  slug?: string | string[];
  /** Auxiliary fields to return. */
  aux?: string;
}

/** Parameters for getTickers */
export interface GetTickersArgs {
  /** Offset the start (1-based) of the paginated list. */
  start?: number;
  /**
   * How many results to return [1..5000]. Pass 0 to return all 5000.
   * @default 100
   */
  limit?: number;
  /** Price conversion target currency (e.g. 'USD', 'EUR'). */
  convert?: string | string[];
  /** Sort field. */
  sort?: string;
  /** Sort direction: 'asc' | 'desc'. */
  sortDir?: string;
  /** Type of cryptocurrency: 'all' | 'coins' | 'tokens'. */
  cryptocurrencyType?: 'all' | 'coins' | 'tokens';
  /** Market type: 'all' | 'spot' | 'derivatives'. */
  marketCap?: string;
  /** Auxiliary fields to return. */
  aux?: string;
}

/** Parameters for getHistoricalListings */
export interface GetHistoricalListingsArgs {
  /** Date to query (ISO 8601 or Unix timestamp). */
  date: string | number;
  /** Offset the start (1-based) of the paginated list. */
  start?: number;
  /** How many results to return [1..5000]. */
  limit?: number;
  /** Price conversion target currency. */
  convert?: string | string[];
  /** Sort field. */
  sort?: string;
  /** Sort direction: 'asc' | 'desc'. */
  sortDir?: string;
  /** Type of cryptocurrency: 'all' | 'coins' | 'tokens'. */
  cryptocurrencyType?: 'all' | 'coins' | 'tokens';
  /** Auxiliary fields to return. */
  aux?: string;
}

/** Parameters for getQuotes */
export interface GetQuotesArgs {
  /** One or more CoinMarketCap IDs. */
  id?: string | string[] | number | number[];
  /** One or more cryptocurrency symbols. */
  symbol?: string | string[];
  /** Price conversion target currency. */
  convert?: string | string[];
  /** Auxiliary fields to return. */
  aux?: string;
  /** Skip invalid symbols/IDs. */
  skipInvalid?: boolean;
}

/** Parameters for getHistoricalQuotes */
export interface GetHistoricalQuotesArgs {
  /** One or more CoinMarketCap IDs. */
  id?: string | string[] | number | number[];
  /** One or more cryptocurrency symbols. */
  symbol?: string | string[];
  /** Timestamp to start from. */
  timeStart?: string | number;
  /** Timestamp to end at. */
  timeEnd?: string | number;
  /** How many data points to return. */
  count?: number;
  /** Interval between data points. */
  interval?: string;
  /** Price conversion target currency. */
  convert?: string | string[];
  /** Auxiliary fields to return. */
  aux?: string;
  /** Skip invalid symbols/IDs. */
  skipInvalid?: boolean;
}

/** Parameters for getMarketPairs */
export interface GetMarketPairsArgs {
  /** CoinMarketCap ID. */
  id?: string | number;
  /** Cryptocurrency symbol. */
  symbol?: string;
  /** Cryptocurrency slug. */
  slug?: string;
  /** Offset the start (1-based) of the paginated list. */
  start?: number;
  /** How many results to return. */
  limit?: number;
  /** Sort field. */
  sort?: string;
  /** Sort direction: 'asc' | 'desc'. */
  sortDir?: string;
  /** Market category: 'all' | 'spot' | 'derivatives' | 'otc' | 'perpetual'. */
  category?: string;
  /** Fee type: 'all' | 'percentage' | 'no-fees' | 'transactional-mining' | 'unknown'. */
  feeType?: string;
  /** Matched currency ID. */
  matchedId?: string | number;
  /** Matched currency symbol. */
  matchedSymbol?: string;
  /** Price conversion target currency. */
  convert?: string | string[];
  /** Auxiliary fields to return. */
  aux?: string;
}

/** Parameters for getOhlcv */
export interface GetOhlcvArgs {
  /** One or more CoinMarketCap IDs. */
  id?: string | string[] | number | number[];
  /** One or more cryptocurrency symbols. */
  symbol?: string | string[];
  /** Price conversion target currency. */
  convert?: string | string[];
  /** Skip invalid symbols/IDs. */
  skipInvalid?: boolean;
}

/** Parameters for getHistoricalOhlcv */
export interface GetHistoricalOhlcvArgs {
  /** CoinMarketCap ID. */
  id?: string | number;
  /** Cryptocurrency symbol. */
  symbol?: string;
  /** Time period for OHLCV data: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'hourly'. */
  timePeriod?: string;
  /** Timestamp to start from. */
  timeStart?: string | number;
  /** Timestamp to end at. */
  timeEnd?: string | number;
  /** How many data points to return. */
  count?: number;
  /** Interval between data points. */
  interval?: string;
  /** Price conversion target currency. */
  convert?: string | string[];
}

/** Parameters for getPricePerformanceStats */
export interface GetPricePerformanceStatsArgs {
  /** One or more CoinMarketCap IDs. */
  id?: string | string[] | number | number[];
  /** One or more cryptocurrency symbols. */
  symbol?: string | string[];
  /** One or more slugs. */
  slug?: string | string[];
  /**
   * Time period for performance stats.
   * e.g. '1h','24h','7d','30d','60d','90d','365d','ytd','all_time','custom'
   */
  timePeriod?: string;
  /** Price conversion target currency. */
  convert?: string | string[];
  /** Skip invalid symbols/IDs. */
  skipInvalid?: boolean;
}

/** Parameters for getCategories */
export interface GetCategoriesArgs {
  /** Offset the start (1-based) of the paginated list. */
  start?: number;
  /** How many results to return. */
  limit?: number;
  /** Filter by category ID. */
  id?: string | number;
  /** Filter by category slug. */
  slug?: string;
  /** Filter by symbol. */
  symbol?: string | string[];
}

/** Parameters for getCategory */
export interface GetCategoryArgs {
  /** Category ID (required). */
  id: string;
  /** Offset the start (1-based) of the paginated list. */
  start?: number;
  /** How many results to return. */
  limit?: number;
  /** Price conversion target currency. */
  convert?: string | string[];
}

/** Parameters for getAirdrops */
export interface GetAirdropsArgs {
  /** Offset the start (1-based) of the paginated list. */
  start?: number;
  /** How many results to return. */
  limit?: number;
  /** Status filter: 'ongoing' | 'ended' | 'upcoming'. */
  status?: string;
  /** Filter by CoinMarketCap ID. */
  id?: string | number;
  /** Filter by cryptocurrency slug. */
  slug?: string;
  /** Filter by symbol. */
  symbol?: string;
}

/** Parameters for getAirdrop */
export interface GetAirdropArgs {
  /** Airdrop ID (required). */
  id: string;
}

/** Parameters for getTrending */
export interface GetTrendingArgs {
  /** Offset the start (1-based) of the paginated list. */
  start?: number;
  /** How many results to return. */
  limit?: number;
  /**
   * Time period for trending data.
   * e.g. '24h','30d','7d'
   */
  timePeriod?: string;
  /** Price conversion target currency. */
  convert?: string | string[];
}

/** Parameters for getGainersLosers */
export interface GetGainersLosersArgs {
  /** Offset the start (1-based) of the paginated list. */
  start?: number;
  /** How many results to return. */
  limit?: number;
  /**
   * Time period.
   * e.g. '1h','24h','7d','30d'
   */
  timePeriod?: string;
  /** Sort field. */
  sort?: string;
  /** Sort direction: 'asc' | 'desc'. */
  sortDir?: string;
  /** Price conversion target currency. */
  convert?: string | string[];
}

/** Parameters for getFiatMap */
export interface GetFiatMapArgs {
  /** Offset the start (1-based) of the paginated list. */
  start?: number;
  /** How many results to return. */
  limit?: number;
  /** Sort field. */
  sort?: string;
  /** Include precious metals. */
  includeMetals?: boolean;
}

/** Parameters for getExchangeMap */
export interface GetExchangeMapArgs {
  /** Filter by listing status: 'active' | 'inactive' | 'untracked'. */
  listingStatus?: string;
  /** Filter by exchange slug. */
  slug?: string | string[];
  /** Offset the start (1-based) of the paginated list. */
  start?: number;
  /** How many results to return. */
  limit?: number;
  /** Sort field. */
  sort?: string;
  /** Auxiliary fields to return. */
  aux?: string;
  /** Filter by cryptocurrency ID listed on the exchange. */
  cryptoId?: string | number;
}

/** Parameters for getExchangeMetadata */
export interface GetExchangeMetadataArgs {
  /** One or more exchange IDs. */
  id?: string | string[] | number | number[];
  /** One or more exchange slugs. */
  slug?: string | string[];
  /** Auxiliary fields to return. */
  aux?: string;
}

/** Parameters for getExchangeListings */
export interface GetExchangeListingsArgs {
  /** Offset the start (1-based) of the paginated list. */
  start?: number;
  /** How many results to return. */
  limit?: number;
  /** Sort field. */
  sort?: string;
  /** Sort direction: 'asc' | 'desc'. */
  sortDir?: string;
  /** Market type: 'all' | 'spot' | 'derivatives' | 'dex' | 'otc'. */
  marketType?: string;
  /** Auxiliary fields to return. */
  aux?: string;
  /** Price conversion target currency. */
  convert?: string | string[];
}

/** Parameters for getExchangeQuotes */
export interface GetExchangeQuotesArgs {
  /** One or more exchange IDs. */
  id?: string | string[] | number | number[];
  /** One or more exchange slugs. */
  slug?: string | string[];
  /** Price conversion target currency. */
  convert?: string | string[];
  /** Auxiliary fields to return. */
  aux?: string;
}

/** Parameters for getExchangeMarketPairs */
export interface GetExchangeMarketPairsArgs {
  /** Exchange ID. */
  id?: string | number;
  /** Exchange slug. */
  slug?: string;
  /** Offset the start (1-based) of the paginated list. */
  start?: number;
  /** How many results to return. */
  limit?: number;
  /** Auxiliary fields to return. */
  aux?: string;
  /** Matched cryptocurrency ID. */
  matchedId?: string | number;
  /** Matched cryptocurrency symbol. */
  matchedSymbol?: string;
  /** Market category: 'all' | 'spot' | 'derivatives' | 'otc' | 'perpetual'. */
  category?: string;
  /** Fee type. */
  feeType?: string;
  /** Price conversion target currency. */
  convert?: string | string[];
}

/** Parameters for getHistoricalGlobal */
export interface GetHistoricalGlobalArgs {
  /** Timestamp to start from. */
  timeStart?: string | number;
  /** Timestamp to end at. */
  timeEnd?: string | number;
  /** How many data points to return. */
  count?: number;
  /** Interval between data points. */
  interval?: string;
  /** Price conversion target currency. */
  convert?: string | string[];
  /** Auxiliary fields to return. */
  aux?: string;
}

/** Parameters for getPriceConversion */
export interface GetPriceConversionArgs {
  /** Amount to convert (required). */
  amount: number;
  /** ID of the currency to convert from. */
  id?: string | number;
  /** Symbol of the currency to convert from. */
  symbol?: string;
  /** Optional historical timestamp. */
  time?: string | number;
  /** Target currency or currencies to convert to. */
  convert?: string | string[];
}

/** Parameters for getBlockchainStats */
export interface GetBlockchainStatsArgs {
  /** One or more CoinMarketCap IDs. */
  id?: string | string[] | number | number[];
  /** One or more cryptocurrency symbols. */
  symbol?: string | string[];
  /** One or more cryptocurrency slugs. */
  slug?: string | string[];
}

class CoinMarketCap {
  private readonly apiKey: string;
  private readonly config: object;
  private readonly fetcher: (url: fetch.RequestInfo, init?: fetch.RequestInit) => Promise<fetch.Response>;
  private readonly url: string;

  /**
   * Creates a new CoinMarketCap API client.
   *
   * @param {String} apiKey API key for accessing the CoinMarketCap API
   * @param {CoinMarketCapOptions=} options Options for the CoinMarketCap instance
   * @param {String=} [options.version="v1"] Version of API
   * @param {Function=} options.fetcher Custom fetch function. Defaults to node-fetch
   * @param {Object=} options.config Additional configuration for fetch requests
   *
   * @example
   * import CoinMarketCap from 'coinmarketcap-api-typescript'
   * const client = new CoinMarketCap('your-api-key')
   */
  constructor(apiKey: string, { version = 'v1', fetcher = fetch, config = {} }: CoinMarketCapOptions = {}) {
    this.apiKey = apiKey;
    this.config = Object.assign(
      {},
      {
        method: 'GET',
        headers: {
          'X-CMC_PRO_API_KEY': this.apiKey,
          Accept: 'application/json',
          'Accept-Charset': 'utf-8',
          'Accept-Encoding': 'deflate, gzip',
        },
      },
      config,
    );

    this.fetcher = fetcher;
    this.url = `${BASE_URL}/${version}`;
  }

  // ─── Cryptocurrency ───────────────────────────────────────────────────────────

  /**
   * Get a paginated list of all active cryptocurrencies with their CoinMarketCap IDs.
   *
   * @param {GetIdMapArgs=} args Options for the request
   * @param {String=} [args.listingStatus="active"] Filter by listing status: 'active', 'inactive', or 'untracked'
   * @param {Number=} [args.start=1] Offset the start of the paginated list
   * @param {Number=} args.limit How many results to return
   * @param {String|String[]=} args.symbol Filter by one or more symbols
   * @param {String=} [args.sort="id"] Sort field: 'id' or 'cmc_rank'
   * @param {String=} args.aux Comma separated list of auxiliary fields to return
   *
   * @example
   * const client = new CoinMarketCap('api key')
   * client.getIdMap().then(console.log).catch(console.error)
   * client.getIdMap({listingStatus: 'inactive', limit: 10}).then(console.log).catch(console.error)
   * client.getIdMap({symbol: ['BTC', 'ETH']}).then(console.log).catch(console.error)
   * client.getIdMap({sort: 'cmc_rank'}).then(console.log).catch(console.error)
   */
  async getIdMap(args: GetIdMapArgs = {}) {
    let { listingStatus, start, limit, symbol, sort, aux } = args;

    if (symbol instanceof Array) {
      symbol = symbol.join(',');
    }

    return await createRequest({
      fetcher: this.fetcher,
      url: `${this.url}/cryptocurrency/map`,
      config: this.config,
      query: { listing_status: listingStatus, start, limit, symbol, sort, aux },
    });
  }

  /**
   * Get static metadata for one or more cryptocurrencies (logo, description, website URLs, etc.).
   * Either id, symbol, or slug is required, but only one may be passed at a time.
   *
   * @param {GetMetadataArgs=} args Options for the request
   * @param {String|String[]|Number|Number[]=} args.id One or more CoinMarketCap IDs
   * @param {String|String[]=} args.symbol One or more cryptocurrency symbols
   * @param {String|String[]=} args.slug One or more cryptocurrency slugs
   * @param {String=} args.aux Comma separated list of auxiliary fields to return
   *
   * @example
   * const client = new CoinMarketCap('api key')
   * client.getMetadata({id: '1'}).then(console.log).catch(console.error)
   * client.getMetadata({id: [1, 2]}).then(console.log).catch(console.error)
   * client.getMetadata({symbol: 'BTC,ETH'}).then(console.log).catch(console.error)
   * client.getMetadata({symbol: ['BTC', 'ETH']}).then(console.log).catch(console.error)
   * client.getMetadata({slug: 'bitcoin'}).then(console.log).catch(console.error)
   */
  async getMetadata(args: GetMetadataArgs = {}) {
    const { slug, aux, id, symbol } = args;

    if (id !== undefined && symbol !== undefined) {
      throw new Error('ID and symbol cannot be passed in at the same time.');
    }

    return await createRequest({
      fetcher: this.fetcher,
      url: `${this.url}/cryptocurrency/info`,
      config: this.config,
      query: { id: arrayToString(id), symbol: arrayToString(symbol), slug: arrayToString(slug), aux },
    });
  }

  /**
   * Get latest cryptocurrency listings with market data (price, volume, market cap, etc.).
   *
   * @param {GetTickersArgs=} args Options for the request
   * @param {Number=} [args.start=1] Offset the start of the paginated list
   * @param {Number=} [args.limit=100] How many results to return [1..5000]. Pass 0 for all 5000.
   * @param {String|String[]=} [args.convert="USD"] Price conversion currency
   * @param {String=} [args.sort="market_cap"] Sort field
   * @param {String=} args.sortDir Sort direction: 'asc' or 'desc'
   * @param {String=} [args.cryptocurrencyType="all"] Type: 'all', 'coins', or 'tokens'
   * @param {String=} args.aux Comma separated list of auxiliary fields to return
   *
   * @example
   * const client = new CoinMarketCap('api key')
   * client.getTickers({limit: 3}).then(console.log).catch(console.error)
   * client.getTickers({convert: 'EUR'}).then(console.log).catch(console.error)
   * client.getTickers({start: 0, limit: 5}).then(console.log).catch(console.error)
   * client.getTickers({sort: 'name'}).then(console.log).catch(console.error)
   */
  async getTickers(args: GetTickersArgs = {}) {
    let { start, limit, convert, sort, sortDir, cryptocurrencyType, aux } = args;

    if (start && limit === 0) {
      throw new Error('Start and limit = 0 cannot be passed in at the same time.');
    }

    if (limit === 0) {
      limit = 5000;
    }

    if (convert instanceof Array) {
      convert = convert.join(',');
    }

    return await createRequest({
      fetcher: this.fetcher,
      url: `${this.url}/cryptocurrency/listings/latest`,
      config: this.config,
      query: { start, limit, convert, sort, sort_dir: sortDir, cryptocurrency_type: cryptocurrencyType, aux },
    });
  }

  /**
   * Get a historical snapshot of all cryptocurrencies for a given date.
   * Requires a paid API plan.
   *
   * @param {GetHistoricalListingsArgs} args Options for the request
   * @param {String|Number} args.date Date to query (ISO 8601 or Unix timestamp, required)
   * @param {Number=} [args.start=1] Offset the start of the paginated list
   * @param {Number=} [args.limit=100] How many results to return [1..5000]
   * @param {String|String[]=} [args.convert="USD"] Price conversion currency
   * @param {String=} args.sort Sort field
   * @param {String=} args.sortDir Sort direction: 'asc' or 'desc'
   * @param {String=} [args.cryptocurrencyType="all"] Type: 'all', 'coins', or 'tokens'
   * @param {String=} args.aux Comma separated list of auxiliary fields
   *
   * @example
   * const client = new CoinMarketCap('api key')
   * client.getHistoricalListings({date: '2021-01-01'}).then(console.log).catch(console.error)
   */
  async getHistoricalListings(args: GetHistoricalListingsArgs) {
    const { date, start, limit, convert, sort, sortDir, cryptocurrencyType, aux } = args;
    return await createRequest({
      fetcher: this.fetcher,
      url: `${this.url}/cryptocurrency/listings/historical`,
      config: this.config,
      query: {
        date,
        start,
        limit,
        convert: arrayToString(convert),
        sort,
        sort_dir: sortDir,
        cryptocurrency_type: cryptocurrencyType,
        aux,
      },
    });
  }

  /**
   * Get the latest market quote for one or more cryptocurrencies.
   * Either id or symbol is required.
   *
   * @param {GetQuotesArgs=} args Options for the request
   * @param {String|String[]|Number|Number[]=} args.id One or more CoinMarketCap IDs
   * @param {String|String[]=} args.symbol One or more cryptocurrency symbols
   * @param {String|String[]=} [args.convert="USD"] Price conversion currency
   * @param {String=} args.aux Comma separated list of auxiliary fields
   * @param {Boolean=} args.skipInvalid Skip invalid IDs/symbols instead of throwing
   *
   * @example
   * const client = new CoinMarketCap('api key')
   * client.getQuotes({id: '1'}).then(console.log).catch(console.error)
   * client.getQuotes({id: [1, 2], convert: 'USD,EUR'}).then(console.log).catch(console.error)
   * client.getQuotes({symbol: ['BTC', 'ETH']}).then(console.log).catch(console.error)
   */
  async getQuotes(args: GetQuotesArgs = {}) {
    const { aux, skipInvalid } = args;
    let convert = args.convert;
    const { id, symbol } = sanitizeIdAndSymbol(args.id, args.symbol);

    if (convert instanceof Array) {
      convert = convert.join(',');
    }

    return await createRequest({
      fetcher: this.fetcher,
      url: `${this.url}/cryptocurrency/quotes/latest`,
      config: this.config,
      query: { id, symbol, convert, aux, skip_invalid: skipInvalid },
    });
  }

  /**
   * Get historical price quotes for one or more cryptocurrencies over an interval of time.
   * Either id or symbol is required.
   *
   * @param {GetHistoricalQuotesArgs=} args Options for the request
   * @param {String|String[]|Number|Number[]=} args.id One or more CoinMarketCap IDs
   * @param {String|String[]=} args.symbol One or more cryptocurrency symbols
   * @param {String|Number=} args.timeStart Timestamp to start from
   * @param {String|Number=} args.timeEnd Timestamp to end at
   * @param {Number=} [args.count=10] How many data points to return [1..10000]
   * @param {String=} [args.interval="5m"] Time interval: '5m','10m','15m','30m','45m','1h','2h','3h','4h','6h','12h','24h','1d','2d','3d','7d','14d','15d','30d','60d','90d','365d'
   * @param {String|String[]=} [args.convert="USD"] Price conversion currency
   * @param {String=} args.aux Comma separated list of auxiliary fields
   * @param {Boolean=} args.skipInvalid Skip invalid IDs/symbols instead of throwing
   *
   * @example
   * const client = new CoinMarketCap('api key')
   * client.getHistoricalQuotes({id: 1, timeStart: '2021-01-01', timeEnd: '2021-02-01'}).then(console.log).catch(console.error)
   * client.getHistoricalQuotes({symbol: 'BTC', count: 100, interval: '1d'}).then(console.log).catch(console.error)
   */
  async getHistoricalQuotes(args: GetHistoricalQuotesArgs = {}) {
    const { timeStart, timeEnd, count, interval, aux, skipInvalid } = args;
    const convert = arrayToString(args.convert);
    const { id, symbol } = sanitizeIdAndSymbol(args.id, args.symbol);
    return await createRequest({
      fetcher: this.fetcher,
      url: `${this.url}/cryptocurrency/quotes/historical`,
      config: this.config,
      query: {
        id,
        symbol,
        time_start: timeStart,
        time_end: timeEnd,
        count,
        interval,
        convert,
        aux,
        skip_invalid: skipInvalid,
      },
    });
  }

  /**
   * Get all active market pairs for one or more cryptocurrencies.
   * One of id, symbol, or slug is required.
   *
   * @param {GetMarketPairsArgs=} args Options for the request
   * @param {String|Number=} args.id CoinMarketCap ID
   * @param {String=} args.symbol Cryptocurrency symbol
   * @param {String=} args.slug Cryptocurrency slug
   * @param {Number=} [args.start=1] Offset the start of the paginated list
   * @param {Number=} [args.limit=100] How many results to return
   * @param {String=} args.sort Sort field
   * @param {String=} args.sortDir Sort direction: 'asc' or 'desc'
   * @param {String=} [args.category="all"] Market category: 'all','spot','derivatives','otc','perpetual'
   * @param {String=} [args.feeType="all"] Fee type filter
   * @param {String|Number=} args.matchedId Restrict to pairs containing this currency ID
   * @param {String=} args.matchedSymbol Restrict to pairs containing this currency symbol
   * @param {String|String[]=} [args.convert="USD"] Price conversion currency
   * @param {String=} args.aux Comma separated list of auxiliary fields
   *
   * @example
   * const client = new CoinMarketCap('api key')
   * client.getMarketPairs({symbol: 'BTC', limit: 10}).then(console.log).catch(console.error)
   * client.getMarketPairs({id: 1, convert: 'EUR'}).then(console.log).catch(console.error)
   */
  async getMarketPairs(args: GetMarketPairsArgs = {}) {
    const { id, symbol, slug, start, limit, sort, sortDir, category, feeType, matchedId, matchedSymbol, aux } = args;
    const convert = arrayToString(args.convert);
    return await createRequest({
      fetcher: this.fetcher,
      url: `${this.url}/cryptocurrency/market-pairs/latest`,
      config: this.config,
      query: {
        id,
        symbol,
        slug,
        start,
        limit,
        sort,
        sort_dir: sortDir,
        category,
        fee_type: feeType,
        matched_id: matchedId,
        matched_symbol: matchedSymbol,
        convert,
        aux,
      },
    });
  }

  /**
   * Get the latest OHLCV (open/high/low/close/volume) data for one or more cryptocurrencies.
   * Either id or symbol is required.
   *
   * @param {GetOhlcvArgs=} args Options for the request
   * @param {String|String[]|Number|Number[]=} args.id One or more CoinMarketCap IDs
   * @param {String|String[]=} args.symbol One or more cryptocurrency symbols
   * @param {String|String[]=} [args.convert="USD"] Price conversion currency
   * @param {Boolean=} args.skipInvalid Skip invalid IDs/symbols instead of throwing
   *
   * @example
   * const client = new CoinMarketCap('api key')
   * client.getOhlcv({symbol: 'BTC'}).then(console.log).catch(console.error)
   * client.getOhlcv({id: [1, 2], convert: 'EUR'}).then(console.log).catch(console.error)
   */
  async getOhlcv(args: GetOhlcvArgs = {}) {
    const { skipInvalid } = args;
    const convert = arrayToString(args.convert);
    const { id, symbol } = sanitizeIdAndSymbol(args.id, args.symbol);
    return await createRequest({
      fetcher: this.fetcher,
      url: `${this.url}/cryptocurrency/ohlcv/latest`,
      config: this.config,
      query: { id, symbol, convert, skip_invalid: skipInvalid },
    });
  }

  /**
   * Get historical OHLCV (open/high/low/close/volume) data for a cryptocurrency.
   * Either id or symbol is required.
   *
   * @param {GetHistoricalOhlcvArgs=} args Options for the request
   * @param {String|Number=} args.id CoinMarketCap ID
   * @param {String=} args.symbol Cryptocurrency symbol
   * @param {String=} [args.timePeriod="daily"] OHLCV period: 'hourly','daily','weekly','monthly','yearly'
   * @param {String|Number=} args.timeStart Timestamp to start from
   * @param {String|Number=} args.timeEnd Timestamp to end at
   * @param {Number=} [args.count=10] How many data points to return [1..10000]
   * @param {String=} args.interval Time interval between data points
   * @param {String|String[]=} [args.convert="USD"] Price conversion currency
   *
   * @example
   * const client = new CoinMarketCap('api key')
   * client.getHistoricalOhlcv({symbol: 'BTC', timeStart: '2021-01-01', count: 30}).then(console.log).catch(console.error)
   */
  async getHistoricalOhlcv(args: GetHistoricalOhlcvArgs = {}) {
    const { id, symbol, timePeriod, timeStart, timeEnd, count, interval } = args;
    const convert = arrayToString(args.convert);
    return await createRequest({
      fetcher: this.fetcher,
      url: `${this.url}/cryptocurrency/ohlcv/historical`,
      config: this.config,
      query: {
        id,
        symbol,
        time_period: timePeriod,
        time_start: timeStart,
        time_end: timeEnd,
        count,
        interval,
        convert,
      },
    });
  }

  /**
   * Get price performance statistics for one or more cryptocurrencies.
   * Either id, symbol, or slug is required.
   *
   * @param {GetPricePerformanceStatsArgs=} args Options for the request
   * @param {String|String[]|Number|Number[]=} args.id One or more CoinMarketCap IDs
   * @param {String|String[]=} args.symbol One or more cryptocurrency symbols
   * @param {String|String[]=} args.slug One or more cryptocurrency slugs
   * @param {String=} [args.timePeriod="all_time"] Time periods (comma-separated): '1h','24h','7d','30d','365d','all_time','custom'
   * @param {String|String[]=} [args.convert="USD"] Price conversion currency
   * @param {Boolean=} args.skipInvalid Skip invalid IDs/symbols instead of throwing
   *
   * @example
   * const client = new CoinMarketCap('api key')
   * client.getPricePerformanceStats({symbol: 'BTC', timePeriod: '7d,30d,365d'}).then(console.log).catch(console.error)
   */
  async getPricePerformanceStats(args: GetPricePerformanceStatsArgs = {}) {
    const { slug, timePeriod, skipInvalid, id, symbol } = args;
    const convert = arrayToString(args.convert);

    if (id !== undefined && symbol !== undefined) {
      throw new Error('ID and symbol cannot be passed in at the same time.');
    }

    return await createRequest({
      fetcher: this.fetcher,
      url: `${this.url}/cryptocurrency/price-performance-stats/latest`,
      config: this.config,
      query: {
        id: arrayToString(id),
        symbol: arrayToString(symbol),
        slug: arrayToString(slug),
        time_period: timePeriod,
        convert,
        skip_invalid: skipInvalid,
      },
    });
  }

  /**
   * Get information on all coin categories (DeFi, NFT, Layer 1, etc.) available on CoinMarketCap.
   *
   * @param {GetCategoriesArgs=} args Options for the request
   * @param {Number=} [args.start=1] Offset the start of the paginated list
   * @param {Number=} [args.limit=100] How many results to return
   * @param {String|Number=} args.id Filter to a specific category by ID
   * @param {String=} args.slug Filter to a specific category by slug
   * @param {String|String[]=} args.symbol Filter by cryptocurrency symbol
   *
   * @example
   * const client = new CoinMarketCap('api key')
   * client.getCategories({limit: 10}).then(console.log).catch(console.error)
   * client.getCategories({symbol: 'BTC'}).then(console.log).catch(console.error)
   */
  async getCategories(args: GetCategoriesArgs = {}) {
    const { start, limit, id, slug, symbol } = args;
    return await createRequest({
      fetcher: this.fetcher,
      url: `${this.url}/cryptocurrency/categories`,
      config: this.config,
      query: { start, limit, id, slug, symbol: arrayToString(symbol) },
    });
  }

  /**
   * Get information about a single coin category, including its constituent cryptocurrencies.
   *
   * @param {GetCategoryArgs} args Options for the request
   * @param {String} args.id Category ID (required)
   * @param {Number=} [args.start=1] Offset the start of the paginated list
   * @param {Number=} [args.limit=100] How many results to return
   * @param {String|String[]=} [args.convert="USD"] Price conversion currency
   *
   * @example
   * const client = new CoinMarketCap('api key')
   * client.getCategory({id: '6053d9545778035c15d9e4be'}).then(console.log).catch(console.error)
   */
  async getCategory(args: GetCategoryArgs) {
    const { id, start, limit } = args;
    const convert = arrayToString(args.convert);
    return await createRequest({
      fetcher: this.fetcher,
      url: `${this.url}/cryptocurrency/category`,
      config: this.config,
      query: { id, start, limit, convert },
    });
  }

  /**
   * Get a list of all ongoing, upcoming, or ended cryptocurrency airdrops.
   *
   * @param {GetAirdropsArgs=} args Options for the request
   * @param {Number=} [args.start=1] Offset the start of the paginated list
   * @param {Number=} [args.limit=100] How many results to return
   * @param {String=} [args.status="ongoing"] Status filter: 'upcoming', 'ongoing', or 'ended'
   * @param {String|Number=} args.id Filter to a specific cryptocurrency by ID
   * @param {String=} args.slug Filter to a specific cryptocurrency by slug
   * @param {String=} args.symbol Filter to a specific cryptocurrency by symbol
   *
   * @example
   * const client = new CoinMarketCap('api key')
   * client.getAirdrops({status: 'ongoing', limit: 10}).then(console.log).catch(console.error)
   */
  async getAirdrops(args: GetAirdropsArgs = {}) {
    const { start, limit, status, id, slug, symbol } = args;
    return await createRequest({
      fetcher: this.fetcher,
      url: `${this.url}/cryptocurrency/airdrops`,
      config: this.config,
      query: { start, limit, status, id, slug, symbol },
    });
  }

  /**
   * Get information about a single airdrop by its unique CoinMarketCap ID.
   *
   * @param {GetAirdropArgs} args Options for the request
   * @param {String} args.id Airdrop ID (required)
   *
   * @example
   * const client = new CoinMarketCap('api key')
   * client.getAirdrop({id: '10050'}).then(console.log).catch(console.error)
   */
  async getAirdrop(args: GetAirdropArgs) {
    const { id } = args;
    return await createRequest({
      fetcher: this.fetcher,
      url: `${this.url}/cryptocurrency/airdrop`,
      config: this.config,
      query: { id },
    });
  }

  /**
   * Get the latest trending cryptocurrencies on CoinMarketCap.
   *
   * @param {GetTrendingArgs=} args Options for the request
   * @param {Number=} [args.start=1] Offset the start of the paginated list
   * @param {Number=} [args.limit=100] How many results to return
   * @param {String=} [args.timePeriod="24h"] Trending time period: '24h', '30d', or '7d'
   * @param {String|String[]=} [args.convert="USD"] Price conversion currency
   *
   * @example
   * const client = new CoinMarketCap('api key')
   * client.getTrending({limit: 10}).then(console.log).catch(console.error)
   * client.getTrending({timePeriod: '7d'}).then(console.log).catch(console.error)
   */
  async getTrending(args: GetTrendingArgs = {}) {
    const { start, limit, timePeriod } = args;
    const convert = arrayToString(args.convert);
    return await createRequest({
      fetcher: this.fetcher,
      url: `${this.url}/cryptocurrency/trending/latest`,
      config: this.config,
      query: { start, limit, time_period: timePeriod, convert },
    });
  }

  /**
   * Get the most visited cryptocurrencies on CoinMarketCap.
   *
   * @param {GetTrendingArgs=} args Options for the request
   * @param {Number=} [args.start=1] Offset the start of the paginated list
   * @param {Number=} [args.limit=100] How many results to return
   * @param {String=} [args.timePeriod="24h"] Time period: '24h', '30d', or '7d'
   * @param {String|String[]=} [args.convert="USD"] Price conversion currency
   *
   * @example
   * const client = new CoinMarketCap('api key')
   * client.getMostVisited({limit: 10}).then(console.log).catch(console.error)
   */
  async getMostVisited(args: GetTrendingArgs = {}) {
    const { start, limit, timePeriod } = args;
    const convert = arrayToString(args.convert);
    return await createRequest({
      fetcher: this.fetcher,
      url: `${this.url}/cryptocurrency/trending/most-visited`,
      config: this.config,
      query: { start, limit, time_period: timePeriod, convert },
    });
  }

  /**
   * Get top cryptocurrency gainers or losers.
   *
   * @param {GetGainersLosersArgs=} args Options for the request
   * @param {Number=} [args.start=1] Offset the start of the paginated list
   * @param {Number=} [args.limit=100] How many results to return
   * @param {String=} [args.timePeriod="24h"] Time period: '1h','24h','7d','30d'
   * @param {String=} [args.sort="percent_change_24h"] Sort field
   * @param {String=} [args.sortDir="desc"] Sort direction: 'asc' or 'desc'
   * @param {String|String[]=} [args.convert="USD"] Price conversion currency
   *
   * @example
   * const client = new CoinMarketCap('api key')
   * client.getGainersLosers({timePeriod: '7d', limit: 10}).then(console.log).catch(console.error)
   * client.getGainersLosers({sort: 'percent_change_24h', sortDir: 'asc'}).then(console.log).catch(console.error)
   */
  async getGainersLosers(args: GetGainersLosersArgs = {}) {
    const { start, limit, timePeriod, sort, sortDir } = args;
    const convert = arrayToString(args.convert);
    return await createRequest({
      fetcher: this.fetcher,
      url: `${this.url}/cryptocurrency/trending/gainers-losers`,
      config: this.config,
      query: { start, limit, time_period: timePeriod, sort, sort_dir: sortDir, convert },
    });
  }

  // ─── Fiat ─────────────────────────────────────────────────────────────────────

  /**
   * Get a mapping of all supported fiat currencies to CoinMarketCap IDs.
   *
   * @param {GetFiatMapArgs=} args Options for the request
   * @param {Number=} [args.start=1] Offset the start of the paginated list
   * @param {Number=} [args.limit=100] How many results to return
   * @param {String=} [args.sort="id"] Sort field: 'id' or 'name'
   * @param {Boolean=} args.includeMetals Include precious metals
   *
   * @example
   * const client = new CoinMarketCap('api key')
   * client.getFiatMap().then(console.log).catch(console.error)
   * client.getFiatMap({includeMetals: true}).then(console.log).catch(console.error)
   */
  async getFiatMap(args: GetFiatMapArgs = {}) {
    const { start, limit, sort, includeMetals } = args;
    return await createRequest({
      fetcher: this.fetcher,
      url: `${this.url}/fiat/map`,
      config: this.config,
      query: { start, limit, sort, include_metals: includeMetals },
    });
  }

  // ─── Exchange ─────────────────────────────────────────────────────────────────

  /**
   * Get a mapping of all supported exchanges to CoinMarketCap IDs.
   *
   * @param {GetExchangeMapArgs=} args Options for the request
   * @param {String=} [args.listingStatus="active"] Filter by listing status: 'active', 'inactive', or 'untracked'
   * @param {String|String[]=} args.slug Filter by exchange slugs
   * @param {Number=} [args.start=1] Offset the start of the paginated list
   * @param {Number=} [args.limit=100] How many results to return
   * @param {String=} [args.sort="id"] Sort field
   * @param {String=} args.aux Comma separated list of auxiliary fields
   * @param {String|Number=} args.cryptoId Filter by cryptocurrency listed on the exchange
   *
   * @example
   * const client = new CoinMarketCap('api key')
   * client.getExchangeMap({limit: 10}).then(console.log).catch(console.error)
   * client.getExchangeMap({slug: 'binance'}).then(console.log).catch(console.error)
   */
  async getExchangeMap(args: GetExchangeMapArgs = {}) {
    const { listingStatus, slug, start, limit, sort, aux, cryptoId } = args;
    return await createRequest({
      fetcher: this.fetcher,
      url: `${this.url}/exchange/map`,
      config: this.config,
      query: {
        listing_status: listingStatus,
        slug: arrayToString(slug),
        start,
        limit,
        sort,
        aux,
        crypto_id: cryptoId,
      },
    });
  }

  /**
   * Get static metadata for one or more exchanges (logo, description, website URLs, etc.).
   * Either id or slug is required.
   *
   * @param {GetExchangeMetadataArgs=} args Options for the request
   * @param {String|String[]|Number|Number[]=} args.id One or more exchange IDs
   * @param {String|String[]=} args.slug One or more exchange slugs
   * @param {String=} args.aux Comma separated list of auxiliary fields
   *
   * @example
   * const client = new CoinMarketCap('api key')
   * client.getExchangeMetadata({slug: 'binance'}).then(console.log).catch(console.error)
   * client.getExchangeMetadata({id: [270, 294]}).then(console.log).catch(console.error)
   */
  async getExchangeMetadata(args: GetExchangeMetadataArgs = {}) {
    const { aux } = args;
    const id = arrayToString(args.id);
    const slug = arrayToString(args.slug);
    return await createRequest({
      fetcher: this.fetcher,
      url: `${this.url}/exchange/info`,
      config: this.config,
      query: { id, slug, aux },
    });
  }

  /**
   * Get latest exchange listings with market data (volume, number of pairs, etc.).
   *
   * @param {GetExchangeListingsArgs=} args Options for the request
   * @param {Number=} [args.start=1] Offset the start of the paginated list
   * @param {Number=} [args.limit=100] How many results to return
   * @param {String=} [args.sort="volume_24h"] Sort field
   * @param {String=} args.sortDir Sort direction: 'asc' or 'desc'
   * @param {String=} [args.marketType="all"] Market type: 'all','spot','derivatives','dex','otc'
   * @param {String=} args.aux Comma separated list of auxiliary fields
   * @param {String|String[]=} [args.convert="USD"] Price conversion currency
   *
   * @example
   * const client = new CoinMarketCap('api key')
   * client.getExchangeListings({limit: 10}).then(console.log).catch(console.error)
   * client.getExchangeListings({sort: 'volume_24h', sortDir: 'desc'}).then(console.log).catch(console.error)
   */
  async getExchangeListings(args: GetExchangeListingsArgs = {}) {
    const { start, limit, sort, sortDir, marketType, aux } = args;
    const convert = arrayToString(args.convert);
    return await createRequest({
      fetcher: this.fetcher,
      url: `${this.url}/exchange/listings/latest`,
      config: this.config,
      query: { start, limit, sort, sort_dir: sortDir, market_type: marketType, aux, convert },
    });
  }

  /**
   * Get the latest market quotes for one or more exchanges.
   * Either id or slug is required.
   *
   * @param {GetExchangeQuotesArgs=} args Options for the request
   * @param {String|String[]|Number|Number[]=} args.id One or more exchange IDs
   * @param {String|String[]=} args.slug One or more exchange slugs
   * @param {String|String[]=} [args.convert="USD"] Price conversion currency
   * @param {String=} args.aux Comma separated list of auxiliary fields
   *
   * @example
   * const client = new CoinMarketCap('api key')
   * client.getExchangeQuotes({slug: 'binance'}).then(console.log).catch(console.error)
   * client.getExchangeQuotes({id: [270, 294], convert: 'EUR'}).then(console.log).catch(console.error)
   */
  async getExchangeQuotes(args: GetExchangeQuotesArgs = {}) {
    const { aux } = args;
    const id = arrayToString(args.id);
    const slug = arrayToString(args.slug);
    const convert = arrayToString(args.convert);
    return await createRequest({
      fetcher: this.fetcher,
      url: `${this.url}/exchange/quotes/latest`,
      config: this.config,
      query: { id, slug, convert, aux },
    });
  }

  /**
   * Get the latest trading pairs and their market data for an exchange.
   * Either id or slug is required.
   *
   * @param {GetExchangeMarketPairsArgs=} args Options for the request
   * @param {String|Number=} args.id Exchange ID
   * @param {String=} args.slug Exchange slug
   * @param {Number=} [args.start=1] Offset the start of the paginated list
   * @param {Number=} [args.limit=100] How many results to return
   * @param {String=} args.aux Comma separated list of auxiliary fields
   * @param {String|Number=} args.matchedId Restrict results to pairs with this currency ID
   * @param {String=} args.matchedSymbol Restrict results to pairs with this currency symbol
   * @param {String=} [args.category="all"] Market category: 'all','spot','derivatives','otc','perpetual'
   * @param {String=} args.feeType Fee type filter
   * @param {String|String[]=} [args.convert="USD"] Price conversion currency
   *
   * @example
   * const client = new CoinMarketCap('api key')
   * client.getExchangeMarketPairs({slug: 'binance', limit: 10}).then(console.log).catch(console.error)
   */
  async getExchangeMarketPairs(args: GetExchangeMarketPairsArgs = {}) {
    const { id, slug, start, limit, aux, matchedId, matchedSymbol, category, feeType } = args;
    const convert = arrayToString(args.convert);
    return await createRequest({
      fetcher: this.fetcher,
      url: `${this.url}/exchange/market-pairs/latest`,
      config: this.config,
      query: {
        id,
        slug,
        start,
        limit,
        aux,
        matched_id: matchedId,
        matched_symbol: matchedSymbol,
        category,
        fee_type: feeType,
        convert,
      },
    });
  }

  // ─── Global Metrics ───────────────────────────────────────────────────────────

  /**
   * Get the latest global cryptocurrency market metrics.
   *
   * @param {String|String[]|Object=} [convert="USD"] Currency to convert quotes to, or an options object with a convert property
   *
   * @example
   * const client = new CoinMarketCap('api key')
   * client.getGlobal().then(console.log).catch(console.error)
   * client.getGlobal('GBP').then(console.log).catch(console.error)
   * client.getGlobal(['USD', 'EUR']).then(console.log).catch(console.error)
   * client.getGlobal({convert: 'GBP'}).then(console.log).catch(console.error)
   */
  async getGlobal(convert: string | string[] | { convert?: string | string[] } = 'USD') {
    let convertValue: string | string[];

    if (convert !== null && typeof convert === 'object' && !Array.isArray(convert)) {
      convertValue = convert.convert ?? 'USD';
    } else {
      convertValue = convert;
    }

    const query: { convert: string } = {
      convert: (Array.isArray(convertValue) ? convertValue.join(',') : convertValue).toUpperCase(),
    };

    return await createRequest({
      fetcher: this.fetcher,
      url: `${this.url}/global-metrics/quotes/latest`,
      config: this.config,
      query,
    });
  }

  /**
   * Get historical global cryptocurrency market metrics over a time interval.
   *
   * @param {GetHistoricalGlobalArgs=} args Options for the request
   * @param {String|Number=} args.timeStart Timestamp to start from
   * @param {String|Number=} args.timeEnd Timestamp to end at
   * @param {Number=} [args.count=10] How many data points to return [1..10000]
   * @param {String=} [args.interval="1d"] Time interval: '1h','2h','3h','4h','6h','12h','1d','2d','3d','7d','14d','15d','30d','60d','90d','365d'
   * @param {String|String[]=} [args.convert="USD"] Price conversion currency
   * @param {String=} args.aux Comma separated list of auxiliary fields
   *
   * @example
   * const client = new CoinMarketCap('api key')
   * client.getHistoricalGlobal({timeStart: '2021-01-01', timeEnd: '2021-02-01'}).then(console.log).catch(console.error)
   * client.getHistoricalGlobal({count: 30, interval: '1d'}).then(console.log).catch(console.error)
   */
  async getHistoricalGlobal(args: GetHistoricalGlobalArgs = {}) {
    const { timeStart, timeEnd, count, interval, aux } = args;
    const convert = arrayToString(args.convert);
    return await createRequest({
      fetcher: this.fetcher,
      url: `${this.url}/global-metrics/quotes/historical`,
      config: this.config,
      query: { time_start: timeStart, time_end: timeEnd, count, interval, convert, aux },
    });
  }

  // ─── Tools ────────────────────────────────────────────────────────────────────

  /**
   * Convert an amount of one cryptocurrency or fiat currency into another.
   * Either id or symbol is required.
   *
   * @param {GetPriceConversionArgs} args Options for the request
   * @param {Number} args.amount Amount to convert (required)
   * @param {String|Number=} args.id ID of the currency to convert from
   * @param {String=} args.symbol Symbol of the currency to convert from
   * @param {String|Number=} args.time Optional historical date for conversion
   * @param {String|String[]=} [args.convert="USD"] Target currency or currencies
   *
   * @example
   * const client = new CoinMarketCap('api key')
   * client.getPriceConversion({amount: 1, symbol: 'BTC', convert: 'USD'}).then(console.log).catch(console.error)
   * client.getPriceConversion({amount: 1, id: 1, convert: ['USD','EUR','GBP']}).then(console.log).catch(console.error)
   */
  async getPriceConversion(args: GetPriceConversionArgs) {
    const { amount, id, symbol, time } = args;
    const convert = arrayToString(args.convert);
    return await createRequest({
      fetcher: this.fetcher,
      url: `${this.url}/tools/price-conversion`,
      config: this.config,
      query: { amount, id, symbol, time, convert },
    });
  }

  // ─── Blockchain ───────────────────────────────────────────────────────────────

  /**
   * Get the latest blockchain statistics data for one or more blockchains.
   * One of id, symbol, or slug is required.
   *
   * @param {GetBlockchainStatsArgs=} args Options for the request
   * @param {String|String[]|Number|Number[]=} args.id One or more CoinMarketCap IDs
   * @param {String|String[]=} args.symbol One or more cryptocurrency symbols
   * @param {String|String[]=} args.slug One or more cryptocurrency slugs
   *
   * @example
   * const client = new CoinMarketCap('api key')
   * client.getBlockchainStats({symbol: 'BTC'}).then(console.log).catch(console.error)
   * client.getBlockchainStats({id: [1, 1027]}).then(console.log).catch(console.error)
   */
  async getBlockchainStats(args: GetBlockchainStatsArgs = {}) {
    const id = arrayToString(args.id);
    const symbol = arrayToString(args.symbol);
    const slug = arrayToString(args.slug);
    return await createRequest({
      fetcher: this.fetcher,
      url: `${this.url}/blockchain/statistics/latest`,
      config: this.config,
      query: { id, symbol, slug },
    });
  }

  // ─── Key ──────────────────────────────────────────────────────────────────────

  /**
   * Returns API key details and usage stats. Useful for checking your monthly credit quota.
   *
   * @example
   * const client = new CoinMarketCap('api key')
   * client.getKeyInfo().then(console.log).catch(console.error)
   */
  async getKeyInfo() {
    return await createRequest({
      fetcher: this.fetcher,
      url: `${this.url}/key/info`,
      config: this.config,
      query: {},
    });
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Converts an array or scalar value to a comma-separated string, or returns undefined.
 */
const arrayToString = (value?: string | string[] | number | number[]): string | undefined => {
  if (value === undefined || value === null) return undefined;
  if (Array.isArray(value)) return value.join(',');
  return String(value);
};

/**
 * Validates that either id or symbol is provided (not both), and normalises them to strings.
 */
const sanitizeIdAndSymbol = (
  id?: string | string[] | number | number[],
  symbol?: string | string[],
): { id?: string; symbol?: string } => {
  if (id !== undefined && symbol !== undefined) {
    throw new Error('ID and symbol cannot be passed in at the same time.');
  }

  if (id === undefined && symbol === undefined) {
    throw new Error('Either ID or symbol is required to be passed in.');
  }

  return { id: arrayToString(id), symbol: arrayToString(symbol) };
};

const createRequest = async (args: {
  url: string;
  config: object;
  query: object;
  fetcher: (url: fetch.RequestInfo, init?: fetch.RequestInit) => Promise<fetch.Response>;
}) => {
  const { url, config, query, fetcher } = args;

  const queryString = qs.stringify(query, { skipNulls: true });
  return await fetcher(`${url}${queryString ? `?${queryString}` : ''}`, config).then((res: any) => res.json());
};

export default CoinMarketCap;
