<script lang="ts" setup>
import { useTaskStore } from '../tasksStore/tasksStore'

const taskStore = useTaskStore()
const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
})
let statusText = ''
let taskDate = ''

function taskStatus() {
  const today = new Date(Date.now())
  today.setDate(today.getDate() + 1)
  today.setHours(0, 0, 0, 0)
  const date = new Date(props.task.date)
  date.setDate(date.getDate() + 1)
  date.setHours(0, 0, 0, 0)

  if (date.getTime() === today.getTime()) {
    return (statusText = 'Due Today')
  } else if (date.getTime() < today.getTime()) {
    return (statusText = 'Overdue')
  } else {
    return (statusText = 'Pending')
  }
}

function taskDateText() {
  const dateObj = new Date(props.task.date)

  const day = String(dateObj.getDate()).padStart(2, '0')
  const month = String(dateObj.getMonth() + 1).padStart(2, '0')
  const year = dateObj.getFullYear()
  return (taskDate = `${day}-${month}-${year}`)
}

function deleteTaskFunction(deleteId: number) {
  taskStore.removeTask(deleteId)
}

function toggleComplete(toggleId: number) {
  taskStore.tasksArray = taskStore.tasksArray.map((task) =>
    task.id === toggleId ? { ...task, completed: !task.completed } : task
  )
  taskStore.saveTasks()
}

function editCurrentTask(editId: number) {
  taskStore.editCurrentTask = editId
}

taskStatus()
taskDateText()
</script>
<template>
  <input
    type="checkbox"
    :checked="props.task.completed"
    @change="toggleComplete(props.task.id)"
  />
  <p>{{ props.task.name }}</p>
  <p>{{ taskStatus() }}</p>
  <p>{{ taskDateText() }}</p>
  <div class="flex flex-row justify-around">
    <button @click="editCurrentTask(props.task.id)">
      <i class="fa-solid fa-pen"></i>
    </button>
    <button @click.stop="deleteTaskFunction(props.task.id)">
      <i class="fa-solid fa-trash-alt"></i>
    </button>
  </div>
</template>
