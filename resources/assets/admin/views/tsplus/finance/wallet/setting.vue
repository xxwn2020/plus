<template>
  <div class="setting">
    <wallet-switch class="setting-child"/>
    <pay-option class="setting-child"/>
  </div>
</template>

<script>
  import WalletSwitch from '../components/walletSwitch'
  import PayOption from '../components/payOption'
  import CashSetting from '../components/cashSetting'

  export default {
    components: {
      CashSetting,
      PayOption,
      WalletSwitch
    },
    name: 'FinanceWalletSetting'
  }
</script>

<style scoped lang="scss">
  .setting {
    &-child {
      & + & {
        margin-top: 20px;
      }
    }
  }
</style>
