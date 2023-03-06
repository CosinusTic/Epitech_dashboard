<template>
    <navbar />
    <h1>Register</h1>
    Email <input type="email" v-model="email"/><br />
    Password: <input type="password" v-model="password"/>
    Password confirmation: <input type="password" v-model="password_confirmation"/>
    <div class="d-grid gap-2">
    <button class="btn btn-primary" type="button" v-on:click="register();">Register</button>
  </div>

</template>

<script>
import navbar from '../components/styling/navbar.vue';
export default{
    components: {
        navbar
    },
    data(){
        return{
            email: undefined, 
            password: undefined, 
            password_confirmation: undefined
        }
    }, 
    methods:{
        async register(){
            const options = {
                method: "POST", 
                body: JSON.stringify({ email: this.email, password: this.password }),
                headers: { "Content-Type": "application/json" }
            }

            const response = await fetch('http://localhost:3000/register', options)
                .then((response) => response.json())
            if(response.message == "user already exists")
            {
                alert("User already exists");
            }
            else{
                alert('Account successfully created!');
            }
        }
    }
}
</script>

<style>
*{
    margin: 30px;
}
</style>