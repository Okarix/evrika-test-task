<script setup>
import { computed } from 'vue'
import { useCurrencyStore } from '../store/currency'

const store = useCurrencyStore()

const filteredRates = computed(() => {
  const baseRate = store.rates[store.baseCurrency]?.Value || 1
  const baseNominal = store.rates[store.baseCurrency]?.Nominal || 1

  return Object.entries(store.rates)
    .filter(([key]) => store.currencies.includes(key))
    .map(([key, currency]) => {
      const rate = baseRate / baseNominal / (currency.Value / currency.Nominal)
      return {
        key,
        rate: rate.toFixed(4)
      }
    })
    .sort((a, b) => b.rate - a.rate)
    .slice(0, 10)
})
</script>

<template>
  <div class="exchange-rates">
    <h2>Top 10 Exchange Rates</h2>
    <div class="table-container">
      <table class="rates-table">
        <thead>
          <tr>
            <th>Currency</th>
            <th>Rate (to {{ store.baseCurrency }})</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="currency in filteredRates" :key="currency.key">
            <td>{{ currency.key }}</td>
            <td>{{ currency.rate }} {{ store.baseCurrency }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.exchange-rates {
  margin-top: 40px;
  width: 100%;
  max-width: 600px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 20px;

  h2 {
    font-size: 18px;
    color: #333;
    text-align: center;
    margin-bottom: 20px;
  }

  .table-container {
    overflow-x: auto;
  }

  .rates-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;

    th,
    td {
      padding: 12px 15px;
      border-bottom: 1px solid #e0e0e0;
      font-size: 16px;
    }

    th {
      background-color: #f3f3f3;
      color: #666;
      text-transform: uppercase;
      font-weight: 500;
    }

    td {
      color: #333;
    }

    tbody tr:hover {
      background-color: #f9f9f9;
    }
  }
}

@media (max-width: 768px) {
  .exchange-rates {
    padding: 15px;
    margin-top: 30px;

    h2 {
      font-size: 16px;
      margin-bottom: 15px;
    }

    .rates-table {
      th,
      td {
        padding: 10px;
        font-size: 14px;
      }
    }
  }
}
</style>
