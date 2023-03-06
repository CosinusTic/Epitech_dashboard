<template>
    <navbar></navbar>
    <p>not signed in</p>
    <button v-on:click="redirectLogin();">Login</button>
</template>

<script>
import navbar from '../components/styling/navbar.vue';
export default{
    components:{
        navbar
    },
    methods:
    {
        redirectLogin(){
            this.$router.push("/login")
        }
    }
}
</script>