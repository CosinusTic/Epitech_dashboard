<template>
    <navbar></navbar>
    <h1>Sotify Dashboard</h1>
    <div class="redirection">
        <button v-on:click="redirectProfile();">My Profile</button>
        <button v-on:click="redirectFollowedArtists();">My followed Artists</button>
    </div>
    
</template>

<script>
import navbar from '../../../components/styling/navbar.vue';
export default{
    components:{
        navbar
    },
    methods: {
        redirectProfile()
        {
            this.$router.push('/spotifyProfile')
        }, 
        redirectFollowedArtists()
        {
            this.$router.push('/spotifyFollowedArtists')
        }
    }
}
</script>