<template>
    <navbar></navbar>
    <h3>Ballon D'or dashboard</h3>
    <div v-if="this.connectedUser != undefined" class="secondContainer">
        <div class="sorter">
            <input type="number" v-model="yearInput" />
            <button v-on:click="sortByYear();">Sort by year</button>
            <br>
        </div>
        <div class="sorter">
            <input type="text" v-model="playerInput" />
            <button v-on:click="sortByPlayer();">Sort by player</button>
            <br>
        </div>
        <div class="sorter">
            <input type="text" v-model="clubInput" />
            <button v-on:click="sortByClub();">Sort by club</button>
            <br>
        </div>
        <div class="sorter">
            <input type="text" v-model="nationalityInput" />
            <button v-on:click="sortByNationality();">Sort by nationality</button>
        </div>
        <div class="sorter">
            <button v-on:click="reset();">Reset filters</button>
        </div>
        
    </div>
    
    <div v-if="this.connectedUser != undefined" v-for="ballonDor in this.ballonDors" class="ballons">
        <div v-if="this.ballonDors">
            <ballonDorComponent :ballonDor="ballonDor" />
        </div>
        <div v-else>
            <p>No match found</p>
        </div>
    </div>
    <div v-else>
        <p>User not signed in</p>
        <button v-on:click="redirectLogin();">Login</button>
    </div>
</template>

<script>
import ballonDorComponent from '../../../components/widgets/ballon/ballonDor.vue';
import navbar from '../../../components/styling/navbar.vue';
export default {
    components: {
        ballonDorComponent, 
        navbar
    },
    data() {
        return {
            connectedUser: undefined,
            ballonDors: undefined,
            playerInput: undefined,
            yearInput: undefined,
            clubInput: undefined,
            nationalityInput: undefined
        }
    },
    methods: {
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
        async getBallonDors() {
            const response = await fetch('http://localhost:3005/all')
                .then(response => response.json());
            console.log(response);
            this.ballonDors = response;
        },
        async sortByPlayer(){
            this.ballonDors = this.ballonDors.filter(ballon => ballon.player == this.playerInput);
        },
        async sortByYear(){
            this.ballonDors = this.ballonDors.filter(ballon => ballon.year == this.yearInput);
        },
        async sortByClub(){
            this.ballonDors = this.ballonDors.filter(ballon => ballon.club == this.clubInput);
        }, 
        async sortByNationality(){
            this.ballonDors = this.ballonDors.filter(ballon => ballon.nationality == this.nationalityInput);
        },
        async reset()
        {
            const response = await fetch('http://localhost:3005/all')
                .then(response => response.json());
            this.ballonDors = response;
            this.playerInput = undefined;
            this.yearInput = undefined;
            this.clubInput = undefined;
            this.nationalityInput = undefined;
        },
        redirectLogin() {
            this.$router.push('/login');
        }
    },
    async mounted() {
        await this.getLocalStorageToken();
        await this.getBallonDors();
    }
}
</script>

<style>
.sorter{
    margin: 15px;
}
</style>
