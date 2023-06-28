import hyRequest from '@/service'

export function reqAmountListData() {
  return hyRequest.get({ url: '/goods/amount/list' })
}
export function reqGoodsCategoryCount() {
  return hyRequest.get({ url: '/goods/category/count' })
}
