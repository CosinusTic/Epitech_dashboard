<template>
    <navbar></navbar>
    <h1>Spotify anthentication page</h1>
    <p v-if="this.connectedUser">Hello {{ this.connectedUser.email }}, you need to sign in to your spotify Account in order to access this dashboard</p>
    <div>
        <button v-on:click="redirect();">Sign in to Spotify</button>
    </div>
</template>


<script>
import navbar from '../components/styling/navbar.vue';
export default{
    components:{
        navbar
    },
    data(){
        return{
            url: "", 
            connectedUser: undefined
        }
    }, 
    methods: {
        async getUrl(){
            console.log("function called")
            await fetch('http://localhost:3004/login', {method: 'GET'})
                .then(response => response.text())
                .then(response => this.url = response)
                .then(response => console.log(response))
        }, 
        redirect(){
            window.location.href = this.url;
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
        }
    }, 
    async mounted()
    {
        await this.getUrl();
        await this.getLocalStorageToken();
    }
}
</script>