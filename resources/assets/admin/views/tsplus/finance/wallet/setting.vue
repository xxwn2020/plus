<template>
  <div class="setting">
    <wallet-switch class="setting-child"/>
    <pay-option class="setting-child"/>
    <wallet-rule class="setting-child"/>
    <wallet-ratio class="setting-child"/>
  </div>
</template>

<script>
  import WalletSwitch from '../components/walletSwitch'
  import PayOption from '../components/payOption'
  import WalletRule from '../components/walletRule'
  import WalletRatio from '../components/walletRatio'

  export default {
    components: {
      WalletRule,
      PayOption,
      WalletSwitch,
      WalletRatio
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
