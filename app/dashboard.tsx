import classNames from 'classnames'
import { ArrowSmUpIcon, ArrowSmDownIcon } from '@heroicons/react/solid'
import { useState, useEffect } from 'react'
// @ts-ignore
import * as CoinGeckoClient from 'coingecko-api'
import useSWR from 'swr'

const coinGeckoClient = new CoinGeckoClient()

const Item = ({ item }: { item: BalanceItem }) => {
  const isIncrease = item.changeType === Changes.increase

  return (
    <div className="relative flex bg-white p-3 shadow rounded-lg overflow-hidden">
      <div className="rounded-md p-3">
        <img src="/btc.svg" className="h-6 w-6 text-white" aria-hidden="true" />
      </div>

      <div className="flex flex-col w-full">
        <div className="flex w-full">
          <p className="text-sm font-medium truncate">
            {item.name}
            <span className="text-gray-400"> {item.startValue}¥</span>
          </p>

          <div className="flex justify-end flex-1">
            <p
              className={classNames(
                isIncrease ? 'text-primary-400' : 'text-secondary-600',
                'ml-2 flex items-baseline text-sm font-semibold',
              )}
            >
              <span className="sr-only">{isIncrease ? 'Increased' : 'Decreased'} by</span>
              {isIncrease ? '+' : '-'}
              {item.change?.toFixed(2) ?? 0}¥{' | '}
              {/* {isIncrease ? (
                <ArrowSmUpIcon className="self-center flex-shrink-0 h-5 w-5 text-primary-300" aria-hidden="true" />
              ) : (
                <ArrowSmDownIcon className="self-center flex-shrink-0 h-5 w-5 text-secondary-200" aria-hidden="true" />
              )} */}
              {item.changeRate?.toFixed(2) ?? 0}%
            </p>
          </div>
        </div>
        <div className="flex items-baseline">
          <p className="text-2xl font-semibold text-gray-900">
            {item.balance} <span className="text-gray-400 text-sm">≈{item.currentValue}¥</span>
          </p>
        </div>
      </div>
    </div>
  )
}

enum Changes {
  increase,
  decrease,
}

interface BalanceItem {
  name: string
  type: string
  balance: number
  startValue: number
  change?: number
  currentValue?: number
  changeType?: Changes
  changeRate?: number
}

const Dashboard = ({}) => {
  const [item, setItem] = useState<BalanceItem>({
    name: 'Bit Coin',
    type: 'btc',
    balance: 0.04059079,
    startValue: 14267.0661043,
  })

  const originalItem = {
    type: 'btc',
    balance: 0.04059079,
  }

  const aitem = {
    changeType: 'increase',
    change: '2',
    type: 'btc',
    name: 'BitCoin',
    balance: 123,
    price: 2,
  }

  const priceItem = useCoinGecko('bitcoin')

  useEffect(() => {
    if (!(priceItem?.status === CoingeckoStatus.Success)) return

    const { balance, startValue } = item
    const { price: currentPrice } = priceItem.coinInfo!
    const currentValue = currentPrice * balance
    const change = currentValue - startValue
    const changeRate = (change / startValue) * 100
    const changeType = !!change ? Changes.increase : Changes.decrease
    setItem({
      ...item,
      change,
      changeRate,
      changeType,
      currentValue,
    })
  }, [priceItem?.coinInfo])

  return (
    <div className="p-4">
      <div>
        <h3 className="text-base leading-6 font-medium text-gray-400">Net Value</h3>
        <h3 className="text-3xl leading-6 font-semibold text-gray-900">{item.currentValue}</h3>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Item item={item} />
      </div>
    </div>
  )
}

export default Dashboard

enum CoingeckoStatus {
  Success,
  FetchFailed,
}

const PRICE_REFRESH = 10000

interface CoinInfo {
  price: number
  last_updated: Date
}

type CoinGeckoResult = {
  coinInfo?: CoinInfo
  status: CoingeckoStatus
}

function useCoinGecko(coinId = 'bitcoin', currency = 'cny'): CoinGeckoResult | undefined {
  const [coinInfo, setCoinInfo] = useState<CoinGeckoResult>()

  const { data: coinGeckoResponse, error } = useSWR(`https://api.coingecko.com/api/v3/coins/${coinId}`)

  useEffect(() => {
    if (error) {
      return setCoinInfo({ status: CoingeckoStatus.FetchFailed })
    }

    if (coinGeckoResponse) {
      setCoinInfo({
        coinInfo: {
          price: coinGeckoResponse.market_data.current_price[currency] ?? 0,
          last_updated: new Date(coinGeckoResponse.last_updated ?? 0),
        },
        status: CoingeckoStatus.Success,
      })
    }
  }, [coinGeckoResponse, error])

  return coinInfo
}
