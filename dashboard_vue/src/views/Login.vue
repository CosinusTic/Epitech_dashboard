<template>
  <main>
  <button @click="connectGoogle">Connect via Gmail</button>
  <button onclick="window.location.href = 'https://console.firebase.google.com/project/dashboard-81464/authentication/users';"> Voir les gens connectés </button>
    <TheWelcome />
  </main> 
</template>

<script>
import TheWelcome from '../components/TheWelcome.vue'

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default {
  data() {
    return {
      auth: "",
      provider: "", 
      token: "", 
      user: {}, 
      access_token: ""
    }
  },
  methods: {
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
            body: JSON.stringify({email: user.email}),
            headers: { 'Content-Type': 'application/json' },
          }
          await fetch('http://localhost:3000/connection', requestOptions)
            .then(response => response.json())
            .then(response => {
              localStorage.setItem("access_token", response.access_token)
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
