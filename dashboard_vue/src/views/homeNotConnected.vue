<template>
    <p>not signed in</p>
    <button v-on:click="redirectLogin();">Login</button>
</template>

<script>
export default{
    methods:
    {
        redirectLogin(){
            this.$router.push("/login")
        }
    }
}
</script>