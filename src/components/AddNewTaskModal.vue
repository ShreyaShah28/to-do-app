<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useTaskStore } from '../tasksStore/tasksStore'

const taskStore = useTaskStore()
const initialData = {
  name: '',
  date: '',
}
const formData = reactive({ ...initialData })
const errorMessage = ref('')
const props = defineProps({
  currentTaskId: {
    type: Number,
    required: true,
  },
})

function fillValues() {
  if (props.currentTaskId === 0) {
    return
  } else {
    let dataToEdit = taskStore.tasksArray.find((task) => task.id === props.currentTaskId)
    formData.name = dataToEdit.name
    formData.date = new Date(dataToEdit.date).toISOString().split('T')[0]
    console.log(dataToEdit.date)
  }
}

function addTask() {
  if (formData.name === '') {
    errorMessage.value = '* Please Enter Some Text'
    return
  } else if (formData.name.length > 25) {
    errorMessage.value = '* Character length can not exceed 25'
    return
  }
  if (!formData.date) {
    formData.date = new Date().toISOString().split('T')[0]
  }
  errorMessage.value = ''
  if (taskStore.addNewTask === true) {
    taskStore.addTask(formData)
    taskStore.addNewTask = false
  } else {
    formData.date = new Date(formData.date).toISOString()
    taskStore.updateTask(taskStore.editCurrentTask, formData)
    taskStore.editCurrentTask = 0
  }
}

function closeModal() {
  taskStore.addNewTask = false
  taskStore.editCurrentTask = 0
}

fillValues()
</script>
<template>
  <div
    class="flex flex-col items-center fixed z-10 left-0 top-0 w-full h-full overflow-auto bg-orange-300/75"
  >
    <div
      class="gap-3 flex flex-col items-center bg-orange-400 rounded-xl w-4/5 h-2/5 mt-[10%]"
    >
      <div class="flex justify-end w-full">
        <button type="button" @click="closeModal()" class="p-4">
          <span class="">&times;</span>
        </button>
      </div>
      <div class="flex flex-row w-4/5 h-1/2 items-center justify-between">
        <span class="w-full bg-orange-400 pt-10 p-5 overflow-hidden">
          <input
            type="text"
            placeholder="Enter New Task"
            v-model="formData.name"
            class="text-2xl bg-orange-300 text-white p-4 w-full border-none outline-none focus:outline-none rounded-full"
          />
          <p class="text-red-600 text-lg">{{ errorMessage }}</p>
          <br />
        </span>
        <button
          type="button"
          @click="addTask"
          class="text-2xl bg-orange-500 text-white p-4 ml-3 rounded-md hover:bg-orange-600 h-min"
        >
          Add
        </button>
      </div>
      <input
        type="date"
        v-model="formData.date"
        class="bg-orange-300 scheme-light text-black text-lg p-4 rounded-lg self-auto"
      />
    </div>
  </div>
</template>
