<template>
  <div class="header">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/profile" v-if="status === 'signIn'">
      Profile |</router-link
    >

    <a @click="logout" v-if="status === 'signIn'">Sign Out</a>
    <router-link to="/authpage" v-else>Sign In</router-link>
  </div>
</template>
<script>
import { Hub, Auth } from 'aws-amplify'
export default {
  data() {
    return {
      status: '',
    }
  },
  mounted() {
    Auth.currentAuthenticatedUser()
      .then(() => {
        this.status = 'signIn'
      })
      .catch((e) => {
        console.log(e)
      })
    Hub.listen('auth', (data) => {
      this.status = data?.payload?.event
    })
  },
  methods: {
    async logout() {
      try {
        await Auth.signOut()
      } catch (error) {
        console.log('error signing out: ', error)
      }
    },
  },
}
</script>
<style >
.header {
  display: flex;
  background-color: #f5f5f5;
  height: 50px;
  width: 100%;
  position: fixed;
  top: 0;
  justify-content: center;
}
</style>
