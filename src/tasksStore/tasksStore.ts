import { defineStore } from 'pinia'

export const useTaskStore = defineStore('task', {

  state: () => ({
    addNewTask: false,
    editCurrentTask: 0,
    tasksArray: JSON.parse(localStorage.getItem("tasks") || "[]")
  }),
  getters: {
    // postDetailArray: (state) => {
    //   return state.users.map((user) => {
    //     return {
    //       ...user,
    //       photos: state.photos.find((photo, index) => index + 1 === user.id),
    //     }
    //   })
    // }
  },
  actions: {
    addTask(task: Object) {
      const newTask = {
        id: Date.now(),
        name: task?.name,
        date: task?.date,
        completed: false
      }
      this.tasksArray.push(newTask)
      this.saveTasks()
      console.log(this.tasksArray)
    },
    removeTask(index: number) {
      let consentToDelete = confirm('Do you want to delete this task?');
      if (!consentToDelete) return
      else {
        this.tasksArray = this.tasksArray.filter(t => t.id !== index);
        //idea to create a whole new array that does not include element with one specific id

        this.saveTasks()
      }
    },
    updateTask(index: number, updatedTask: any) {
      const newDate = new Date(updatedTask.date)
      this.tasksArray = this.tasksArray.map((task) =>
        task.id === index ? { ...task, name: updatedTask.name, date: newDate } : task
      )
      this.saveTasks()
    },
    saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(this.tasksArray))
    }
  }
})