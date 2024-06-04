<template>
  <h1>Статистика</h1>
  <div class="card flex justify-content-center filters">
    <app-chart
      type="doughnut"
      :data="chartData"
      :options="chartOptions"
      class="w-full md:w-30rem"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getFirestore, collection, query, orderBy, getDocs } from 'firebase/firestore'
import { useUserStore } from '@/stores/user'
import type { IInterview } from '@/interfaces'

const userStore = useUserStore()
const db = getFirestore()
const interviews = ref<IInterview[]>([])
const chartData = ref()
const chartOptions = ref(null)

const getAllInterviews = async <T extends IInterview>(): Promise<T[]> => {
  const getData = query(
    collection(db, `users/${userStore.userId}/interviews`),
    orderBy('createdAt', 'desc')
  )
  const listDocs = await getDocs(getData)
  return listDocs.docs.map((doc) => doc.data() as T)
}

onMounted(async () => {
  interviews.value = await getAllInterviews()
  chartData.value = setChartData()
})

const setChartData = () => {
  const documentStyle = getComputedStyle(document.body)

  const data: number[] = [0, 0, 0]
  interviews.value.forEach((interview: IInterview) => {
    if (interview.result == 'Offer') {
      data[0]++
    } else if (interview.result == 'Refusal') {
      data[1]++
    } else {
      data[2]++
    }
  })

  return {
    labels: ['Оффер', 'Отказ', 'Егор Крид'],
    datasets: [
      {
        data,
        backgroundColor: [
          documentStyle.getPropertyValue('--cyan-500'),
          documentStyle.getPropertyValue('--orange-500'),
          documentStyle.getPropertyValue('--gray-500')
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue('--cyan-400'),
          documentStyle.getPropertyValue('--orange-400'),
          documentStyle.getPropertyValue('--gray-400')
        ]
      }
    ]
  }
}
</script>

<style scoped>
.filters {
  background-color: #fff;
  padding: 10px;
  border-radius: 3px;
  opacity: 0.9;
}
</style>
