<template>
  <div class="authenticator">
    <div class="update-message" v-if="message">
      {{ message }}
    </div>
    <div class="auth">
      <sign-up
        :toggle="toggle"
        v-if="formState === 'signUp'"
        @update-auth="toggle"
        @update-message="updateMessage"
      ></sign-up>
      <sign-in
        v-if="formState === 'signIn'"
        @update-auth="toggle"
        @update-message="updateMessage"
      ></sign-in>
    </div>
  </div>
</template>
<script>
import SignUp from './SignUp'
import SignIn from './SignIn'
import { Auth } from 'aws-amplify'

export default {
  name: 'AuthPage',
  data() {
    return {
      formState: 'signIn',
      message: '',
    }
  },
  mounted() {
    Auth.currentAuthenticatedUser()
      .then(() => {
        this.$router.push({ path: `/profile` })
      })
      .catch((e) => {
        console.log(e)
      })
  },

  methods: {
    toggle() {
      this.formState === 'signUp'
        ? (this.formState = 'signIn')
        : (this.formState = 'signUp')
    },
    updateMessage(e) {
      this.message = e
      setTimeout(() => {
        this.message = ''
      }, 5000)
    },
  },
  components: {
    SignUp,
    SignIn,
  },
}
</script>
<style>
form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 40px;
  max-width: 380px;
  margin: 0 auto;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.19), 0 2px 4px rgba(0, 0, 0, 0.23);
  border-radius: 5px;
}
input {
  flex: 1;
  padding: 16px;
  margin: 0px 0px 20px 0;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid rgb(196, 196, 196);
  border-radius: 3px;
}
.input:focus {
  outline: none;
  border-color: rgb(255, 153, 0);
}
.container-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
  align-items: center;
}
.action {
  color: rgb(255, 153, 0);
  cursor: pointer;
}
.action:hover {
  text-decoration: underline;
}
button {
  background-color: rgb(255, 153, 0);
  color: white;
  letter-spacing: 0.75px;
  padding: 16px;
  border: none;
  cursor: pointer;
  min-width: 120px;
  border-radius: 2px;
}
button:hover {
  background-color: rgbA(245, 153, 0, 0.8);
}
.update-message {
  position: absolute;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
