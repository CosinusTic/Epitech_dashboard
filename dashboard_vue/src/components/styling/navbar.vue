<template>
    <nav class="navbar navbar-expand-lg" style="background-color: #a6a6a6">
        <a class="rabbit1" href="/home">Home</a>
        <button v-if="this.connectedUser == undefined" class="btn custom1" v-on:click="redirectLogin();">Log in</button>
        <button v-else class="btn custom1" v-on:click="logout();">Logout</button>
        <button class="btn custom1" v-on:click="redirectRegister();">Register</button>
    </nav>
</template>

<script>
export default {
    data(){
        return{
            connectedUser: undefined
        }
    },
    methods: {
        redirectLogin() {
            this.$router.push('/login');
        },
        redirectRegister() {
            this.$router.push('/register');
        }, 
        async getLocalStorageToken() {
            const now = new Date().getTime();
            const token = JSON.parse(localStorage.getItem("access_token"));
            if (!token) {
                console.log("User is not logged in");
                this.connectedUser = undefined;
                return;
            } else {
                if (now > token.expiry) {
                    localStorage.removeItem("access_token");
                    this.connectedUser = undefined;
                } else {
                    console.log("user is logged in");
                    const response = await fetch('http://localhost:3000/usersWithToken/' + token.access_token)
                        .then(response => response.json())
                    this.connectedUser = response;
                }
            }
        }, 
        logout(){
            localStorage.removeItem('access_token');
            this.$router.push('/');
        }
    }, 
    async mounted(){
        await this.getLocalStorageToken();
    }
}
</script>

<style>
.navbar {
    top: 0px;
    left: 0px;
    margin: 0px;
    padding: 0px;
}

.custom1{
background-color: brown;
margin-right: 2%;
border-radius:1em;
width:5.5%;
}   

btn:hover{
    background-color: #a6a6a6;
    opacity: 80%;
}
</style>