<template>
  <div class="count-card">
    <header>
      <span>{{ title }}</span>
      <ElIcon><Warning /></ElIcon>
    </header>
    <div class="content">
      <h2 ref="count1Ref">{{ number1 }}</h2>
    </div>
    <footer>
      <span>{{ subtitle }}</span>
      <p>{{ number2 }}</p>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { CountUp } from 'countup.js'
import { ref, onMounted } from 'vue'
interface IProps {
  title?: string
  number1?: number
  subtitle?: string
  number2?: number
}
const props = withDefaults(defineProps<IProps>(), {
  title: '商品总销量',
  number1: 50999,
  number2: 50999,
  subtitle: '商品总销量'
})
const count1Ref = ref<HTMLElement>()
onMounted(() => {
  // 参数一：执行动画的元素
  // 参数二:数字增加
  const countup1 = new CountUp(count1Ref.value!, props.number1, {})
  countup1.start() //开始动画
})
</script>

<style lang="less" scoped>
.count-card {
  background-color: #fff;
  padding: 10px;
  header {
    display: flex;
    justify-content: space-between;
    span {
      font-size: 13px;
      color: #555;
    }
  }
  .content {
    h2 {
      font-size: 25px;
      font-weight: 400;
    }
    line-height: 55px;
    border-bottom: 1px solid #ccc;
  }
  footer {
    margin-top: 8px;
    display: flex;
    justify-content: start;
    span {
      color: #555;
      margin-right: 20px;
    }
  }
}
</style>
