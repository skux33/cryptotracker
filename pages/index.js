import React, { useState } from 'react'
import axios from 'axios'

const API_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest'
const API_KEY = '53cdf82f-45c5-4433-ba9d-2a88ecfcb04f'

const CryptoPrice = () => {
  const [symbols, setSymbols] = useState('')
  const [prices, setPrices] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.get(`${API_URL}?symbol=${symbols}&CMC_PRO_API_KEY=${API_KEY}`)
      setPrices(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter symbols separated by commas (e.g. BTC,ETH,XRP)"
          value={symbols}
          onChange={(e) => setSymbols(e.target.value)}
        />
        <button type="submit">Get Prices</button>
      </form>
      {prices.map((price) => (
        <div key={price.symbol}>
          {price.symbol}: {price.quote.USD.price}
        </div>
      ))}
    </div>
  )
}

export default CryptoPrice
