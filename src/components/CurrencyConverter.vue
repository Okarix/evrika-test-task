<script setup lang="ts">
import { ref, watch } from 'vue'
import { useCurrencyStore } from '../store/currency'
import CurrencyTable from './CurrencyTable.vue'

const store = useCurrencyStore()

const amount = ref<number | null>(0)
const result = ref<number | null>(null)

const calculateRate = () => {
  const baseRate = store.rates[store.baseCurrency]?.Value || 1
  const targetRate = store.rates[store.targetCurrency]?.Value || 1
  const baseNominal = store.rates[store.baseCurrency]?.Nominal || 1
  const targetNominal = store.rates[store.targetCurrency]?.Nominal || 1

  const amountInRub = ((amount.value || 1) * baseRate) / baseNominal
  result.value = (amountInRub * targetNominal) / targetRate
}

watch([() => store.baseCurrency, () => store.targetCurrency, amount], calculateRate)

store.fetchRates()
</script>

<template>
  <main class="container">
    <div class="converter-wrapper">
      <div class="converter-top">
        <div class="field">
          <label for="amount">Amount</label>
          <input v-model="amount" type="number" name="amount" />
        </div>

        <div class="field">
          <label for="from">From</label>
          <select v-model="store.baseCurrency" name="from">
            <option v-for="currency in store.currencies" :key="currency" :value="currency">
              {{ currency }}
            </option>
          </select>
        </div>

        <button @click="store.swapCurrencies" class="converter-button">
          <img src="../assets/swap.svg" alt="Swap" />
        </button>

        <div class="field">
          <label for="to">To</label>
          <select v-model="store.targetCurrency" name="to">
            <option v-for="currency in store.currencies" :key="currency" :value="currency">
              {{ currency }}
            </option>
          </select>
        </div>
      </div>

      <div class="converter-bottom">
        <p>
          <span>{{ amount }} {{ store.baseCurrency }}</span> = {{ result }}
          {{ store.targetCurrency }}
        </p>
      </div>

      <CurrencyTable />
    </div>
  </main>
</template>

<style scoped lang="scss">
.container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.converter-wrapper {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  margin: 0 auto;

  .converter-top {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    gap: 20px;
    width: 100%;
    justify-content: center;

    .field {
      display: flex;
      flex-direction: column;
      flex: 1 1 200px;
      max-width: 240px;

      label {
        font-size: 13px;
        font-weight: 500;
        color: #666;
        margin-bottom: 5px;
      }

      input,
      select {
        width: 100%;
        height: 44px;
        border-radius: 8px;
        border: 1px solid #e0e0e0;
        padding: 0 12px;
        font-size: 16px;
        color: #333;
        background-color: #fff;
        transition: border 0.3s ease;
        &:focus {
          border-color: #0070f3;
          outline: none;
        }
      }
    }
  }

  .converter-button {
    border-radius: 50%;
    width: 44px;
    height: 44px;
    border: 1px solid #e0e0e0;
    background-color: #f9f9f9;
    cursor: pointer;
    transition:
      background-color 0.3s ease,
      border-color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background-color: #e6f0ff;
      border-color: #0070f3;
    }
  }

  .converter-bottom {
    margin-top: 40px;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    width: 100%;
    max-width: 500px;
    text-align: center;

    p {
      font-size: 16px;
      color: #333;
      margin: 0;

      span {
        font-weight: bold;
        color: #0070f3;
      }
    }
  }
}

@media (max-width: 768px) {
  .converter-wrapper {
    padding: 15px;

    .converter-top {
      gap: 10px;

      .field {
        flex: 1 1 100px;
        max-width: none;

        label {
          font-size: 11px;
        }

        input,
        select {
          height: 32px;
          font-size: 13px;
          padding: 0 8px;
        }
      }
    }

    .converter-button {
      width: 32px;
      height: 32px;

      img {
        width: 18px;
        height: 18px;
      }
    }

    .converter-bottom {
      margin-top: 20px;
      padding: 10px;

      p {
        font-size: 13px;
      }
    }
  }
}

@media (max-width: 480px) {
  .converter-wrapper {
    .converter-top {
      .field {
        flex: 1 1 80px;

        label {
          font-size: 10px;
        }

        input,
        select {
          height: 28px;
          font-size: 12px;
          padding: 0 6px;
        }
      }
    }

    .converter-button {
      width: 28px;
      height: 28px;

      img {
        width: 16px;
        height: 16px;
      }
    }
  }
}
</style>
