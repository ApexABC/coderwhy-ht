<template>
  <div class="base-echart">
    <div class="echart" ref="echartRef"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watchEffect } from 'vue'
import * as echarts from 'echarts'
const echartRef = ref<HTMLElement>()
interface IProps {
  showGoodsList: any[]
}
const props = defineProps<IProps>()
onMounted(() => {
  const echartInstance = echarts.init(echartRef.value!, 'light', { renderer: 'canvas' })
  watchEffect(() => {
    echartInstance.setOption({
      title: {
        text: 'Referer of a Website',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: props.showGoodsList,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })
  })
})
</script>

<style lang="less" scoped>
.base-echart {
  .echart {
    height: 300px;
  }
}
</style>
