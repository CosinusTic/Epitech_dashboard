<template>
    <navbar></navbar>
    <h1>Followed artists</h1>
    <div v-for="artist in artists">
        <Artist :artist="artist"/>
    </div>
</template>

<script>
import Artist from '../../../components/widgets/spotify/followedArtist.vue';
import navbar from '../../../components/styling/navbar.vue';
export default{
    components: {
        Artist, navbar
    },
    data()
    {
        return{
            artists: undefined
        }
    }, 
    methods:{
        async getFollowedArtists()
        {
            const token = localStorage.getItem('access_token');
            const response = await fetch("http://localhost:3004/getFollowedArtists/" + token)
                .then(response => response.json());
            
            this.artists = response.artists.items;
            console.log(this.artists);
        }
    }, 
    async mounted()
    {
        await this.getFollowedArtists();
    }
}
</script>