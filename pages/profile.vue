<template>
  <div class="profile">
    <h1>This is the profile page for {{ profileName }}</h1>
    <div class="notes-screen">
      <button @click="createNew">Create New</button>
    </div>
    <div class="display-notes" v-for="(todo, index) in todoList" :key="index">
      {{ todo.id }}
      <input placeholder="title" type="text" v-model="todo.title" />
      <input placeholder="text" type="text" v-model="todo.text" />
      <button @click="addTodo(todo)" class="save">save</button>
      <button @click="deleteTodo(todo)" class="delete">X</button>
    </div>
  </div>
</template>

<script>
import { API, Auth } from 'aws-amplify'

export default {
  name: 'Profile',
  data() {
    return {
      id: 'signIn',
      todoList: [],
      profileName: '',
    }
  },
  meta: {
    requiresAuth: true,
  },
  mounted() {
    Auth.currentAuthenticatedUser()
      .then((data) => {
        this.profileName = data?.attributes?.email
        this.id = data.username
        API.get('amplifyNuxtNotes', `/notes/${data.username}`, {}).then(
          (result) => {
            this.todoList = result
          }
        )
      })
      .catch((e) => {
        console.log(e)
      })
  },
  methods: {
    addTodo: function (item) {
      console.log(item)
      API.post('amplifyNuxtNotes', `/notes`, {
        body: {
          userid: item.userid,
          id: item.id.toString(),
          title: item.title,
          text: item.text,
        },
      }).catch((err) => {
        console.log(err)
      })
    },
    deleteTodo: function (item) {
      console.log(item)
      console.log(`deleteTodo-${item.id}`)
      API.del('amplifyNuxtNotes', `/notes/object/${item.userid}/${item.id}`, {})
        .then((result) => {
          this.todoList = this.todoList.filter((note) => note.id !== item.id)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    createNew() {
      const newIndex = this.todoList.length
        ? Math.max(...this.todoList.map((item) => item.id))
        : 0
      const newItem = {
        id: newIndex + 1,
        title: '',
        text: '',
        userid: this.id,
      }
      this.todoList.push(newItem)
    },
  },
}
</script>
<style scoped>
button {
  margin: 10px;
  background-color: #ffac31;
  color: white;
  letter-spacing: 0.75px;
  padding: 16px;
  border: none;
  cursor: pointer;
  min-width: 120px;
  border-radius: 5px;
  text-transform: uppercase;
}
.save {
  background-color: #537be5;
}
.delete {
  background-color: #dd3f5b;
}
.notes-screen {
  display: flex;
  margin: 0 auto;
  justify-content: center;
}
.display-notes {
  margin: 20px auto;
}
input {
  padding: 15px;
  margin: 0px 0px 20px 0;
  box-sizing: border-box;
  border: 1px solid rgb(196, 196, 196);
  border-radius: 3px;
  margin: 0 10px;
}
.input:focus {
  outline: none;
  border-color: rgb(255, 153, 0);
}
</style>