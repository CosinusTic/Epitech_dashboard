<template >
    <navbar />
    <div v-if="connectedUser != undefined">
        <h1>Hello {{ connectedUser.email }}</h1>
        

        <div class="redirect">
            <button class="button" v-on:click="redirectSpotifyDashboard();">Spotify Dashboard</button>
            <button class="button" v-on:click="redirectWeatherDashboard();">Weather Dashboard</button>
            <button class="button" v-on:click="redirectCurrenciesDashboard();">Currencies dashboard</button>
            <button class="button" v-on:click="redirectballonDorDashboard();">Ballon D'or dashboard</button>
        </div>
    </div>
    <div v-else>
        <p>Not signed in</p>
        <button v-on:click="redirectLogin();">Login</button>
    </div>

</template>

<script>
import navbar from '../components/styling/navbar.vue';
export default {
    components: {
        navbar
    },
    data() {
        return {
            connectedUser: undefined
        }
    },
    methods: {
        redirectSpotifyDashboard() {
            this.$router.push('/auth')
        },
        redirectWeatherDashboard() {
            this.$router.push('/weatherDashboard');
        },
        redirectCurrenciesDashboard() {
            this.$router.push('/currenciesDashboard');
        },
        redirectballonDorDashboard(){
            this.$router.push('/ballonDorDashboard');
        },
        redirectLogin(){
            this.$router.push('/login');
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
    async mounted() {
        await this.getLocalStorageToken();
    }
}
</script>

<style>
.button{
    margin:5px;
}

.redirect{
    display: grid;
    grid-template-columns: repeat(2, 60%);
}
</style>