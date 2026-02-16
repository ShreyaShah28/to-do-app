<script setup lang="ts">
import TasksView from './components/TasksView.vue'
import AddNewTaskModal from './components/AddNewTaskModal.vue'
import { useTaskStore } from './tasksStore/tasksStore'
import { computed, ref } from 'vue'

const taskStore = useTaskStore()
const filterText = ref('All')
const searchText = ref('')
const filterTasksArray = computed(() => {
  if (filterText.value === 'All') {
    return taskStore.tasksArray.filter((t) =>
      t.name.toLowerCase().includes(searchText.value.toLowerCase())
    )
  } else if (filterText.value === 'Pending') {
    return taskStore.tasksArray.filter(
      (t) => !t.completed && t.name.toLowerCase().includes(searchText.value.toLowerCase())
    )
  } else if (filterText.value === 'Done') {
    return taskStore.tasksArray.filter(
      (t) => t.completed && t.name.toLowerCase().includes(searchText.value.toLowerCase())
    )
  }
})

function setFilterText(value: string) {
  filterText.value = value
}
</script>

<template>
  <div class="w-screen min-h-screen bg-yellow-100 p-20 text-white">
    <div class="bg-orange-400 w-full h-auto rounded-4xl p-10">
      <div class="flex flex-row justify-between items-center m-3">
        <p class="text-5xl">Tasks:</p>
        <div class="p-3 bg-orange-300 rounded-full">
          <button><i class="fa-solid fa-magnifying-glass text-2xl p-3"></i></button>
          <input
            type="text"
            v-model="searchText"
            class="border-none outline-none focus:outline-none text-2xl placeholder:text-gray-400"
            placeholder="Search..."
          />
        </div>
      </div>
      <hr />
      <button
        @click="taskStore.addNewTask = true"
        class="text-gray-600 p-4 rounded-2xl bg-orange-300 m-3 text-xl pl-20 pr-20 cursor-pointer"
      >
        <i class="fa-solid fa-plus text-xl"></i> Add Task
      </button>
      <AddNewTaskModal
        v-if="taskStore.addNewTask || taskStore.editCurrentTask"
        :currentTaskId="taskStore.editCurrentTask"
      />
      <div class="">
        <div class="flex flex-row justify-between m-3">
          <button
            class="px-4 py-1.5 w-28 rounded-full text-white hover:bg-orange-600 transition"
            :class="{ 'bg-orange-700 scale-105': filterText === 'All' }"
            @click="setFilterText('All')"
          >
            All
          </button>
          <button
            class="px-4 py-1.5 w-28 rounded-full text-white hover:bg-orange-600 transition"
            :class="{ 'bg-orange-700 scale-105': filterText === 'Pending' }"
            @click="setFilterText('Pending')"
          >
            Pending
          </button>
          <button
            class="px-4 py-1.5 w-28 rounded-full text-white hover:bg-orange-600 transition"
            :class="{ 'bg-orange-700 scale-105': filterText === 'Done' }"
            @click="setFilterText('Done')"
          >
            Done
          </button>
        </div>
        <div class="grid md:grid-cols-5 gap-5 text-center">
          <p></p>
          <p class="text-4xl font-semibold text-center">Title</p>
          <p class="text-4xl font-semibold text-center">Status</p>
          <p class="text-4xl font-semibold text-center">Due-Date</p>
          <p class="text-4xl font-semibold text-center">Actions</p>
          <TasksView v-for="task in filterTasksArray" :key="task.id" :task="task" />
        </div>
      </div>
    </div>
  </div>
</template>
