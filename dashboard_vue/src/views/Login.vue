<template>
  <navbar></navbar>
  <div class="loginForm">
    Email: <input type="email" v-model="email" placeholder="email@example.fr" />
    Password: <input type="password" v-model="password" placeholder="********" />
  </div>
  <div class="d-grid gap-2">
    <button class="btn btn-primary" type="button" v-on:click="Login();">Login</button>
    <p>Or</p>

  </div>
  <button @click="connectGoogle();">Connect via Gmail</button>

  <p>Not registered yet? <a href="/register">register now</a></p>
</template>

<script>

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import navbar from '../components/styling/navbar.vue';
export default {
  components: {
    navbar
  },
  data() {
    return {
      auth: "",
      provider: "",
      token: "",
      user: {},
      access_token: "",
      email: undefined,
      password: undefined
    }
  },
  methods: {
    addToLocalStorage(token, duration) {
      let now = new Date().getTime();

      item = {
        access_token: token,
        expiry: now + duration
      }
      localStorage.setItem("access_token", JSON.stringify(item));
    },
    connectGoogle() {
      signInWithPopup(this.auth, this.provider)
        .then(async (result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          this.token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log(user.email)
          const requestOptions = {
            method: 'POST',
            body: JSON.stringify({ email: user.email }),
            headers: { 'Content-Type': 'application/json' },
          }
          await fetch('http://localhost:3000/connection', requestOptions)
            .then(response => response.json())
            .then(response => {

              let now = new Date().getTime();
              let duration = 600000;

              let item = {
                access_token: response.access_token,
                expiry: now + duration
              }
              localStorage.setItem("access_token", JSON.stringify(item));
              // localStorage.setItem("access_token", response.access_token)

              console.log("access token", response.access_token)
            })
          this.$router.push("/home")

        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // add the user to db
        });
    },
    async Login() {

      const options = {
        method: 'POST',
        body: JSON.stringify({ email: this.email, password: this.password }),
        headers: { "Content-Type": "application/json" }
      }

      const response = await fetch('http://localhost:3000/login', options)
        .then(response => response.json())
        .then(response => {
          if(response[0].access_token){
            let now = new Date().getTime();
            let duration = 600000;

            let item = {
              access_token: response[0].access_token,
              expiry: now + duration
            }
            localStorage.setItem("access_token", JSON.stringify(item));
            // localStorage.setItem("access_token", response.access_token)

            console.log("access token", response[0].access_token)
            alert("Login successful");
            this.$router.push('/home');
          }else{
            alert("wrong credentials");
          }
          

          // let now = new Date().getTime();
          // let duration = 600000;

          // let item = {
          //   access_token: response.access_token,
          //   expiry: now + duration
          // }
          // localStorage.setItem("access_token", JSON.stringify(item));
        })
    }

  },
    mounted() {
      this.provider = new GoogleAuthProvider();
      this.auth = getAuth();
      this.auth.languageCode = 'fr';
      this.token = ""
    }
  }



</script>

<style>
*{
  margin:10px;
}
</style>
