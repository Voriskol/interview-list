<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore'
import { useUserStore } from '@/stores/user'
import type { IStage, IInterview } from '@/interfaces'
import dayjs from 'dayjs'

const database = getFirestore()
const userStore = useUserStore()
const route = useRoute()

const isLoading = ref<boolean>(true)
const interview = ref<IInterview>()

const docref = doc(database, `users/${userStore.userId}/interviews`, route.params.id as string)

const getData = async (): Promise<void> => {
  isLoading.value = true
  const docSnap = await getDoc(docref)
  interview.value = docSnap.data() as IInterview
  isLoading.value = false
}

const addStage = () => {
  if (interview.value) {
    if (!interview.value.stages) {
      interview.value.stages = []
    }
    interview.value.stages.push({ name: '', date: '', description: '' })
  }
}

const saveInterview = async (): Promise<void> => {
  isLoading.value = true
  if (interview.value?.stages && interview.value.stages.length) {
    interview.value.stages = interview.value.stages.map((stage: IStage) => {
      return {
        ...stage,
        date: dayjs(stage.date).format('DD.MM.YYYY')
      }
    })
  }
  await updateDoc(docref, { ...interview.value })
  await getData()
  isLoading.value = false
}

const removeStage = (index: number) => {
  if (interview.value) {
    if (interview.value.stages) {
      interview.value.stages.splice(index, 1)
    }
  }
}

const saveDateStage = (index: number) => {
  if (interview.value?.stages && interview.value.stages.length) {
    const date = interview.value.stages[index].date
    interview.value.stages[index].date = dayjs(date).format('DD.MM.YYYY')
  }
}

onMounted(async () => await getData())
</script>

<template>
  <app-progress v-if="isLoading"></app-progress>
  <div class="content-interview" v-else-if="interview?.id && !isLoading">
    <app-card>
      <template #title>Собеседование в компанию {{ interview.company }}</template>
      <template #content>
        <div class="flex flex-column gap-2">
          <label for="company">Компания</label>
          <app-input-text
            class="input mb-3"
            id="company"
            v-model="interview.company"
          ></app-input-text>
        </div>
        <div class="flex flex-column gap-2">
          <label for="vacancyLink">Описание вакансии (ссылка)</label>
          <app-input-text
            class="input mb-3"
            id="vacancyLink"
            v-model="interview.vacancyLink"
          ></app-input-text>
        </div>
        <div class="flex flex-column gap-2">
          <label for="hrName">Контакт (имя)</label>
          <app-input-text
            class="input mb-3"
            id="hrName"
            v-model="interview.hrName"
          ></app-input-text>
        </div>
        <div class="flex flex-column gap-2">
          <label for="contactTelegram">Telegram username HR</label>
          <app-input-text
            class="input mb-3"
            id="contactTelegram"
            v-model="interview.contactTelegram"
          ></app-input-text>
        </div>
        <div class="flex flex-column gap-2">
          <label for="contactWhatsApp">WhatsApp HR</label>
          <app-input-text
            class="input mb-3"
            id="contactWhatsApp"
            v-model="interview.contactWhatsApp"
          ></app-input-text>
        </div>
        <div class="flex flex-column gap-2">
          <label for="contactPhone">Телефон HR</label>
          <app-input-text
            class="input mb-3"
            id="contactPhone"
            v-model="interview.contactPhone"
          ></app-input-text>
        </div>
        <div class="flex flex-wrap gap-3 p-fluid mb-3">
          <div class="flex-auto">
            <app-input-number
              inputId="salaryFrom"
              placeholder="Зарплатная вилка, от"
              v-model="interview.salaryFrom"
            ></app-input-number>
          </div>
          <div class="flex-auto">
            <app-input-number
              inputId="salaryTo"
              placeholder="Зарплатная вилка, до"
              v-model="interview.salaryTo"
            ></app-input-number>
          </div>
        </div>

        <app-button
          label="Добавить этап"
          severity="info"
          icon="pi pi-plus"
          class="mb-3"
          @click="addStage"
        ></app-button>
        <template v-if="interview.stages">
          <div v-for="(stage, index) in interview.stages" :key="index" class="interview-stage">
            <div class="flex flex-column gap-2">
              <label :for="`stage-name-${index}`">Название этапа</label>
              <app-input-text
                class="input mb-3"
                :id="`stage-name-${index}`"
                v-model="stage.name"
              ></app-input-text>
            </div>
            <div class="flex flex-column gap-2">
              <label :for="`stage-date-${index}`">Дата прохождения этапа</label>
              <app-calendar
                class="input mb-3"
                :id="`stage-date-${index}`"
                dateFormat="dd.mm.yy"
                @date-select="saveDateStage(index)"
                v-model="stage.date"
              ></app-calendar>
            </div>
            <div class="flex flex-column gap-2">
              <label :for="`stage-description-${index}`">Комментарий</label>
              <app-textarea
                :id="`stage-description-${index}`"
                class="input mb-3"
                rows="5"
              ></app-textarea>
            </div>
            <app-button
              label="Удалить этап"
              severity="danger"
              icon="pi pi-minus"
              class="mb-3"
              v-model="stage.description"
              @click="removeStage"
            ></app-button>
          </div>
        </template>

        <div class="flex flex-wrap gap-2">
          <div class="flex align-items-center">
            <app-radio
              inputId="interviewResult1"
              name="result"
              value="Refusal"
              v-model="interview.result"
            ></app-radio>
            <label for="interviewResult1" class="ml-2">Отказ</label>
            <app-radio
              class="ml-5"
              inputId="interviewResult1"
              name="result"
              value="Offer"
              v-model="interview.result"
            ></app-radio>
            <label for="interviewResult2" class="ml-2">Оффер</label>
          </div>
        </div>
        <div>
          <app-button
            label="Сохранить"
            severity="info"
            icon="pi pi-save"
            class="mt-5"
            @click="saveInterview"
          ></app-button>
        </div>
      </template>
    </app-card>
  </div>
</template>

<style scoped>
.content-interview {
  max-width: 600px;
  margin: auto;
}
.input {
  width: 100%;
}
.interview-stage {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
