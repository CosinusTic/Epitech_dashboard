<template>
    <div class="grid" v-if="artist != null || artist!= undefined">
        <p>Artist name: {{ artist.name }}</p>
        <img class="artist_img" v-bind:src="artist.images[0].url" />
        <p>Popularity: {{ artist.popularity }}</p>
        <p>Followers: {{ artist.followers.total }}</p>
        <p>Genres: </p>
        <div v-for="genre in artist.genres">
            <p>{{genre}}</p>
        </div>
        <p>Artist page: {{ artist.external_urls.spotify }}</p>
        <p>----------------</p>
    </div>
    <p v-else>Not signed in</p>

</template>

<script>
export default {
    props: ["artist"]
}
</script>

<style>
.artist_img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
}

.grid{
    display:grid;
    grid-template-columns: repeat(2, 45%);
    margin: 10px;
    padding: 30px;
}

</style>

