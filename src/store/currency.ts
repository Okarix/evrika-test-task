import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Currency {
  ID: string
  NumCode: string
  CharCode: string
  Nominal: number
  Name: string
  Value: number
  Previous: number
}

interface Rates {
  [key: string]: Currency
}

export const useCurrencyStore = defineStore('currency', () => {
  const currencies = ref(['USD', 'EUR', 'KZT', 'RUB', 'GBP', 'CNY', 'JPY', 'AUD', 'CAD', 'CHF'])
  const rates = ref<Rates>({})
  const baseCurrency = ref('KZT')
  const targetCurrency = ref('USD')

  async function fetchRates() {
    try {
      const response = await axios.get('https://www.cbr-xml-daily.ru/daily_json.js')
      rates.value = response.data.Valute
    } catch (error) {
      console.error('Error fetching exchange rates:', error)
    }
  }

  function swapCurrencies() {
    const temp = baseCurrency.value
    baseCurrency.value = targetCurrency.value
    targetCurrency.value = temp
  }

  return {
    currencies,
    rates,
    baseCurrency,
    targetCurrency,
    fetchRates,
    swapCurrencies
  }
})
