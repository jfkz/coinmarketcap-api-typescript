# coinmarketcap-api-typescript

[![npm package version](https://img.shields.io/npm/v/coinmarketcap-api-typescript.svg?style=flat-square)](https://npmjs.org/package/coinmarketcap-api-typescript)
[![npm downloads](https://img.shields.io/npm/dm/coinmarketcap-api-typescript.svg?style=flat-square)](https://npmjs.org/package/coinmarketcap-api-typescript)
[![Standard JS linter](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)
[![project license](https://img.shields.io/npm/l/coinmarketcap-api-typescript.svg?style=flat-square)](https://github.com/jfkz/coinmarketcap-api-typescript/blob/master/LICENSE)
[![make a pull request](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

> Full-featured CoinMarketCap API v1 wrapper for TypeScript and Node.js

This wrapper covers all endpoints of the [CoinMarketCap Professional API](https://pro.coinmarketcap.com/api/v1).
Get your API key at [pro.coinmarketcap.com/pricing](https://pro.coinmarketcap.com/pricing).

## Table of Contents

- [Install](#install)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
  - [Constructor](#constructor)
  - [Cryptocurrency](#cryptocurrency)
  - [Fiat](#fiat)
  - [Exchange](#exchange)
  - [Global Metrics](#global-metrics)
  - [Tools](#tools)
  - [Blockchain](#blockchain)
  - [Key](#key)
- [TypeScript Types](#typescript-types)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Install

```sh
npm install coinmarketcap-api-typescript
# OR
yarn add coinmarketcap-api-typescript
```

## Quick Start

```typescript
import CoinMarketCap from 'coinmarketcap-api-typescript';

const client = new CoinMarketCap('your-api-key');

// Get top 10 cryptocurrencies
const tickers = await client.getTickers({ limit: 10 });

// Get Bitcoin price
const btc = await client.getQuotes({ symbol: 'BTC' });

// Get global market stats
const global = await client.getGlobal();

// Convert 1 BTC to USD, EUR and GBP
const conversion = await client.getPriceConversion({
  amount: 1,
  symbol: 'BTC',
  convert: ['USD', 'EUR', 'GBP'],
});
```

## API Reference

### Constructor

```typescript
new CoinMarketCap(apiKey: string, options?: CoinMarketCapOptions)
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `apiKey` | `string` | — | Your CoinMarketCap API key |
| `options.version` | `string` | `'v1'` | API version |
| `options.fetcher` | `function` | `node-fetch` | Custom fetch implementation |
| `options.config` | `object` | `{}` | Additional fetch request options |

---

### Cryptocurrency

#### `getIdMap(args?)`

Get a paginated list of all active cryptocurrencies with their CoinMarketCap IDs.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `listingStatus` | `string` | `'active'` | `'active'`, `'inactive'`, or `'untracked'` |
| `start` | `number` | `1` | Offset the start of the paginated list |
| `limit` | `number` | — | How many results to return |
| `symbol` | `string \| string[]` | — | Filter by symbol(s) |
| `sort` | `string` | `'id'` | Sort field: `'id'` or `'cmc_rank'` |
| `aux` | `string` | — | Comma-separated auxiliary fields |

```typescript
client.getIdMap().then(console.log);
client.getIdMap({ listingStatus: 'inactive', limit: 10 }).then(console.log);
client.getIdMap({ symbol: ['BTC', 'ETH'] }).then(console.log);
```

---

#### `getMetadata(args?)`

Get static metadata for cryptocurrencies (logo, description, website URLs, social links, etc.).

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `string \| string[] \| number \| number[]` | CoinMarketCap ID(s) |
| `symbol` | `string \| string[]` | Cryptocurrency symbol(s) |
| `slug` | `string \| string[]` | Cryptocurrency slug(s) |
| `aux` | `string` | Comma-separated auxiliary fields |

```typescript
client.getMetadata({ id: 1 }).then(console.log);
client.getMetadata({ id: [1, 2] }).then(console.log);
client.getMetadata({ symbol: ['BTC', 'ETH'] }).then(console.log);
client.getMetadata({ slug: 'bitcoin' }).then(console.log);
```

---

#### `getTickers(args?)`

Get latest cryptocurrency listings with market data (price, volume, market cap, etc.).

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `start` | `number` | `1` | Offset the start of the paginated list |
| `limit` | `number` | `100` | Results to return [1–5000]; pass `0` for all 5000 |
| `convert` | `string \| string[]` | `'USD'` | Price conversion currency |
| `sort` | `string` | `'market_cap'` | Sort field |
| `sortDir` | `string` | — | `'asc'` or `'desc'` |
| `cryptocurrencyType` | `string` | `'all'` | `'all'`, `'coins'`, or `'tokens'` |
| `aux` | `string` | — | Comma-separated auxiliary fields |

```typescript
client.getTickers({ limit: 10 }).then(console.log);
client.getTickers({ convert: 'EUR' }).then(console.log);
client.getTickers({ cryptocurrencyType: 'coins', sort: 'volume_24h' }).then(console.log);
```

---

#### `getHistoricalListings(args)` *(paid plan)*

Get a historical snapshot of all cryptocurrencies for a given date.

| Parameter | Type | Description |
|-----------|------|-------------|
| `date` | `string \| number` | **Required.** Date (ISO 8601 or Unix timestamp) |
| `start` | `number` | Offset |
| `limit` | `number` | Results to return |
| `convert` | `string \| string[]` | Price conversion currency |
| `sort` | `string` | Sort field |
| `sortDir` | `string` | `'asc'` or `'desc'` |
| `cryptocurrencyType` | `string` | `'all'`, `'coins'`, or `'tokens'` |

```typescript
client.getHistoricalListings({ date: '2021-01-01' }).then(console.log);
client.getHistoricalListings({ date: '2021-01-01', limit: 100, convert: 'EUR' }).then(console.log);
```

---

#### `getQuotes(args?)`

Get the latest market quotes for one or more cryptocurrencies.
Either `id` or `symbol` is required.

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `string \| string[] \| number \| number[]` | CoinMarketCap ID(s) |
| `symbol` | `string \| string[]` | Cryptocurrency symbol(s) |
| `convert` | `string \| string[]` | Price conversion currency |
| `aux` | `string` | Comma-separated auxiliary fields |
| `skipInvalid` | `boolean` | Skip invalid IDs/symbols |

```typescript
client.getQuotes({ symbol: 'BTC' }).then(console.log);
client.getQuotes({ id: [1, 2], convert: ['USD', 'EUR'] }).then(console.log);
```

---

#### `getHistoricalQuotes(args?)` *(paid plan)*

Get historical price quotes for cryptocurrencies over an interval of time.
Either `id` or `symbol` is required.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `id` | `string \| string[] \| number \| number[]` | — | CoinMarketCap ID(s) |
| `symbol` | `string \| string[]` | — | Symbol(s) |
| `timeStart` | `string \| number` | — | Start timestamp |
| `timeEnd` | `string \| number` | — | End timestamp |
| `count` | `number` | `10` | Data points to return [1–10000] |
| `interval` | `string` | `'5m'` | Time interval: `'5m'`, `'1h'`, `'1d'`, etc. |
| `convert` | `string \| string[]` | `'USD'` | Price conversion currency |

```typescript
client.getHistoricalQuotes({ symbol: 'BTC', timeStart: '2021-01-01', count: 30, interval: '1d' }).then(console.log);
```

---

#### `getMarketPairs(args?)`

Get all active market pairs for a cryptocurrency.
One of `id`, `symbol`, or `slug` is required.

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `string \| number` | CoinMarketCap ID |
| `symbol` | `string` | Cryptocurrency symbol |
| `slug` | `string` | Cryptocurrency slug |
| `start` | `number` | Offset |
| `limit` | `number` | Results to return |
| `category` | `string` | `'all'`, `'spot'`, `'derivatives'`, `'otc'`, `'perpetual'` |
| `feeType` | `string` | Fee type filter |
| `convert` | `string \| string[]` | Price conversion currency |

```typescript
client.getMarketPairs({ symbol: 'BTC', limit: 10 }).then(console.log);
client.getMarketPairs({ id: 1, category: 'spot', convert: 'EUR' }).then(console.log);
```

---

#### `getOhlcv(args?)` *(paid plan)*

Get the latest OHLCV (open/high/low/close/volume) data.
Either `id` or `symbol` is required.

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `string \| string[] \| number \| number[]` | CoinMarketCap ID(s) |
| `symbol` | `string \| string[]` | Symbol(s) |
| `convert` | `string \| string[]` | Price conversion currency |
| `skipInvalid` | `boolean` | Skip invalid entries |

```typescript
client.getOhlcv({ symbol: 'BTC' }).then(console.log);
client.getOhlcv({ id: [1, 1027], convert: 'EUR' }).then(console.log);
```

---

#### `getHistoricalOhlcv(args?)` *(paid plan)*

Get historical OHLCV data for a cryptocurrency.
Either `id` or `symbol` is required.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `id` | `string \| number` | — | CoinMarketCap ID |
| `symbol` | `string` | — | Cryptocurrency symbol |
| `timePeriod` | `string` | `'daily'` | `'hourly'`, `'daily'`, `'weekly'`, `'monthly'`, `'yearly'` |
| `timeStart` | `string \| number` | — | Start timestamp |
| `timeEnd` | `string \| number` | — | End timestamp |
| `count` | `number` | `10` | Data points to return |
| `interval` | `string` | — | Time interval |
| `convert` | `string \| string[]` | `'USD'` | Price conversion currency |

```typescript
client.getHistoricalOhlcv({ symbol: 'BTC', timeStart: '2021-01-01', count: 30 }).then(console.log);
```

---

#### `getPricePerformanceStats(args?)` *(paid plan)*

Get price performance statistics for cryptocurrencies.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `id` | `string \| string[] \| number \| number[]` | — | CoinMarketCap ID(s) |
| `symbol` | `string \| string[]` | — | Symbol(s) |
| `slug` | `string \| string[]` | — | Slug(s) |
| `timePeriod` | `string` | `'all_time'` | `'1h'`, `'24h'`, `'7d'`, `'30d'`, `'365d'`, `'all_time'` |
| `convert` | `string \| string[]` | `'USD'` | Price conversion currency |

```typescript
client.getPricePerformanceStats({ symbol: 'BTC', timePeriod: '7d,30d,365d' }).then(console.log);
```

---

#### `getCategories(args?)`

Get all cryptocurrency categories (DeFi, NFT, Layer 1, etc.).

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `start` | `number` | `1` | Offset |
| `limit` | `number` | `100` | Results to return |
| `id` | `string \| number` | — | Filter by category ID |
| `slug` | `string` | — | Filter by category slug |
| `symbol` | `string \| string[]` | — | Filter by symbol |

```typescript
client.getCategories({ limit: 20 }).then(console.log);
```

---

#### `getCategory(args)`

Get information about a single category, including its cryptocurrencies.

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `string` | **Required.** Category ID |
| `start` | `number` | Offset |
| `limit` | `number` | Results to return |
| `convert` | `string \| string[]` | Price conversion currency |

```typescript
client.getCategory({ id: '6053d9545778035c15d9e4be' }).then(console.log);
```

---

#### `getAirdrops(args?)`

Get a list of airdrops.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `start` | `number` | `1` | Offset |
| `limit` | `number` | `100` | Results to return |
| `status` | `string` | `'ongoing'` | `'upcoming'`, `'ongoing'`, or `'ended'` |
| `id` | `string \| number` | — | Filter by cryptocurrency ID |
| `slug` | `string` | — | Filter by slug |
| `symbol` | `string` | — | Filter by symbol |

```typescript
client.getAirdrops({ status: 'upcoming', limit: 10 }).then(console.log);
```

---

#### `getAirdrop(args)`

Get information about a specific airdrop.

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `string` | **Required.** Airdrop ID |

```typescript
client.getAirdrop({ id: '10050' }).then(console.log);
```

---

#### `getTrending(args?)` *(paid plan)*

Get the latest trending cryptocurrencies.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `start` | `number` | `1` | Offset |
| `limit` | `number` | `100` | Results to return |
| `timePeriod` | `string` | `'24h'` | `'24h'`, `'30d'`, or `'7d'` |
| `convert` | `string \| string[]` | `'USD'` | Price conversion currency |

```typescript
client.getTrending({ limit: 10 }).then(console.log);
client.getTrending({ timePeriod: '7d' }).then(console.log);
```

---

#### `getMostVisited(args?)` *(paid plan)*

Get the most visited cryptocurrencies on CoinMarketCap.

Same parameters as `getTrending`.

```typescript
client.getMostVisited({ limit: 10 }).then(console.log);
```

---

#### `getGainersLosers(args?)` *(paid plan)*

Get top cryptocurrency gainers or losers.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `start` | `number` | `1` | Offset |
| `limit` | `number` | `100` | Results to return |
| `timePeriod` | `string` | `'24h'` | `'1h'`, `'24h'`, `'7d'`, `'30d'` |
| `sort` | `string` | — | Sort field |
| `sortDir` | `string` | `'desc'` | `'asc'` or `'desc'` |
| `convert` | `string \| string[]` | `'USD'` | Price conversion currency |

```typescript
client.getGainersLosers({ timePeriod: '7d', limit: 10 }).then(console.log);
client.getGainersLosers({ sortDir: 'asc' }).then(console.log); // losers
```

---

### Fiat

#### `getFiatMap(args?)`

Get a mapping of all supported fiat currencies to CoinMarketCap IDs.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `start` | `number` | `1` | Offset |
| `limit` | `number` | `100` | Results to return |
| `sort` | `string` | `'id'` | `'id'` or `'name'` |
| `includeMetals` | `boolean` | `false` | Include precious metals |

```typescript
client.getFiatMap().then(console.log);
client.getFiatMap({ includeMetals: true }).then(console.log);
```

---

### Exchange

#### `getExchangeMap(args?)`

Get a mapping of all supported exchanges to CoinMarketCap IDs.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `listingStatus` | `string` | `'active'` | `'active'`, `'inactive'`, or `'untracked'` |
| `slug` | `string \| string[]` | — | Filter by slug(s) |
| `start` | `number` | `1` | Offset |
| `limit` | `number` | `100` | Results to return |
| `sort` | `string` | `'id'` | Sort field |
| `aux` | `string` | — | Auxiliary fields |
| `cryptoId` | `string \| number` | — | Filter by listed cryptocurrency ID |

```typescript
client.getExchangeMap({ limit: 10 }).then(console.log);
client.getExchangeMap({ slug: 'binance' }).then(console.log);
```

---

#### `getExchangeMetadata(args?)`

Get static metadata for exchanges (logo, description, website URLs, etc.).
Either `id` or `slug` is required.

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `string \| string[] \| number \| number[]` | Exchange ID(s) |
| `slug` | `string \| string[]` | Exchange slug(s) |
| `aux` | `string` | Auxiliary fields |

```typescript
client.getExchangeMetadata({ slug: 'binance' }).then(console.log);
client.getExchangeMetadata({ id: [270, 294] }).then(console.log);
```

---

#### `getExchangeListings(args?)`

Get latest exchange listings with volume and other market data.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `start` | `number` | `1` | Offset |
| `limit` | `number` | `100` | Results to return |
| `sort` | `string` | `'volume_24h'` | Sort field |
| `sortDir` | `string` | — | `'asc'` or `'desc'` |
| `marketType` | `string` | `'all'` | `'all'`, `'spot'`, `'derivatives'`, `'dex'`, `'otc'` |
| `convert` | `string \| string[]` | `'USD'` | Price conversion currency |
| `aux` | `string` | — | Auxiliary fields |

```typescript
client.getExchangeListings({ limit: 10, sort: 'volume_24h' }).then(console.log);
client.getExchangeListings({ marketType: 'spot' }).then(console.log);
```

---

#### `getExchangeQuotes(args?)`

Get the latest market quotes for one or more exchanges.
Either `id` or `slug` is required.

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `string \| string[] \| number \| number[]` | Exchange ID(s) |
| `slug` | `string \| string[]` | Exchange slug(s) |
| `convert` | `string \| string[]` | Price conversion currency |
| `aux` | `string` | Auxiliary fields |

```typescript
client.getExchangeQuotes({ slug: 'binance' }).then(console.log);
client.getExchangeQuotes({ id: [270, 294], convert: 'EUR' }).then(console.log);
```

---

#### `getExchangeMarketPairs(args?)`

Get active market pairs for an exchange.
Either `id` or `slug` is required.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `id` | `string \| number` | — | Exchange ID |
| `slug` | `string` | — | Exchange slug |
| `start` | `number` | `1` | Offset |
| `limit` | `number` | `100` | Results to return |
| `category` | `string` | `'all'` | `'all'`, `'spot'`, `'derivatives'`, `'otc'`, `'perpetual'` |
| `feeType` | `string` | — | Fee type filter |
| `matchedId` | `string \| number` | — | Restrict to pairs with this currency ID |
| `matchedSymbol` | `string` | — | Restrict to pairs with this currency symbol |
| `convert` | `string \| string[]` | `'USD'` | Price conversion currency |

```typescript
client.getExchangeMarketPairs({ slug: 'binance', limit: 10 }).then(console.log);
client.getExchangeMarketPairs({ slug: 'binance', matchedSymbol: 'BTC', category: 'spot' }).then(console.log);
```

---

### Global Metrics

#### `getGlobal(convert?)`

Get the latest global cryptocurrency market metrics.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `convert` | `string \| string[] \| { convert: string \| string[] }` | `'USD'` | Price conversion currency |

```typescript
client.getGlobal().then(console.log);
client.getGlobal('EUR').then(console.log);
client.getGlobal(['USD', 'EUR', 'GBP']).then(console.log);
client.getGlobal({ convert: 'EUR' }).then(console.log);
```

---

#### `getHistoricalGlobal(args?)` *(paid plan)*

Get historical global market metrics over a time interval.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `timeStart` | `string \| number` | — | Start timestamp |
| `timeEnd` | `string \| number` | — | End timestamp |
| `count` | `number` | `10` | Data points to return [1–10000] |
| `interval` | `string` | `'1d'` | Time interval: `'1h'`, `'6h'`, `'1d'`, `'7d'`, etc. |
| `convert` | `string \| string[]` | `'USD'` | Price conversion currency |
| `aux` | `string` | — | Auxiliary fields |

```typescript
client.getHistoricalGlobal({ timeStart: '2021-01-01', count: 30, interval: '1d' }).then(console.log);
```

---

### Tools

#### `getPriceConversion(args)`

Convert an amount of one cryptocurrency or fiat currency to another.
Either `id` or `symbol` is required.

| Parameter | Type | Description |
|-----------|------|-------------|
| `amount` | `number` | **Required.** Amount to convert |
| `id` | `string \| number` | Source currency CoinMarketCap ID |
| `symbol` | `string` | Source currency symbol |
| `time` | `string \| number` | Historical timestamp for conversion |
| `convert` | `string \| string[]` | Target currency/currencies |

```typescript
client.getPriceConversion({ amount: 1, symbol: 'BTC', convert: 'USD' }).then(console.log);
client.getPriceConversion({ amount: 1000, symbol: 'USD', convert: ['BTC', 'ETH'] }).then(console.log);
client.getPriceConversion({ amount: 1, id: 1, convert: ['USD', 'EUR', 'GBP'] }).then(console.log);
```

---

### Blockchain

#### `getBlockchainStats(args?)` *(paid plan)*

Get the latest blockchain statistics for one or more blockchains.
One of `id`, `symbol`, or `slug` is required.

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `string \| string[] \| number \| number[]` | CoinMarketCap ID(s) |
| `symbol` | `string \| string[]` | Symbol(s) |
| `slug` | `string \| string[]` | Slug(s) |

```typescript
client.getBlockchainStats({ symbol: 'BTC' }).then(console.log);
client.getBlockchainStats({ id: [1, 1027] }).then(console.log); // BTC and ETH
```

---

### Key

#### `getKeyInfo()`

Returns API key details and monthly usage statistics. Useful for monitoring your credit quota.

```typescript
client.getKeyInfo().then(console.log);
```

---

## TypeScript Types

All parameter interfaces are exported and available for import:

```typescript
import CoinMarketCap, {
  CoinMarketCapOptions,
  GetIdMapArgs,
  GetMetadataArgs,
  GetTickersArgs,
  GetHistoricalListingsArgs,
  GetQuotesArgs,
  GetHistoricalQuotesArgs,
  GetMarketPairsArgs,
  GetOhlcvArgs,
  GetHistoricalOhlcvArgs,
  GetPricePerformanceStatsArgs,
  GetCategoriesArgs,
  GetCategoryArgs,
  GetAirdropsArgs,
  GetAirdropArgs,
  GetTrendingArgs,
  GetGainersLosersArgs,
  GetFiatMapArgs,
  GetExchangeMapArgs,
  GetExchangeMetadataArgs,
  GetExchangeListingsArgs,
  GetExchangeQuotesArgs,
  GetExchangeMarketPairsArgs,
  GetHistoricalGlobalArgs,
  GetPriceConversionArgs,
  GetBlockchainStatsArgs,
} from 'coinmarketcap-api-typescript';
```

---

## Testing

Unit tests (no API key required):
```sh
npm test
# or just unit tests:
npx jest __tests__/unit.test.js
```

Integration tests (requires a valid API key):
```sh
COINMARKETCAP_API_KEY=your-key npx jest test.js
# or with a .env file:
echo "COINMARKETCAP_API_KEY=your-key" > .env
npx jest test.js
```

---

## Contributing

Contributions are welcome!

1. Fork it.
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

Or open up [an issue](https://github.com/jfkz/coinmarketcap-api-typescript/issues).

## License

Licensed under the MIT License.
