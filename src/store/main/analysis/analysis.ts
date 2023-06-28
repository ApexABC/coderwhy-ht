import { reqAmountListData, reqGoodsCategoryCount } from '@/service/main/analysis/analysis'
import { defineStore } from 'pinia'

interface IAnalysisState {
  amountList: any[]
  goodsCount: any[]
}
const useAnalysisStore = defineStore('analysis', {
  state: (): IAnalysisState => ({
    amountList: [],
    goodsCount: []
  }),
  actions: {
    async fetchAnalysisDataAction() {
      const amountResult = await reqAmountListData()
      this.amountList = amountResult.data
      const result = await reqGoodsCategoryCount()
      this.goodsCount = result.data
      console.log('store', this.goodsCount)
    }
  }
})

export default useAnalysisStore
