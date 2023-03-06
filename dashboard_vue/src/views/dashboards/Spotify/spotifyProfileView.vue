<template>
    <navbar></navbar>
    <h1>spotify profile</h1>
    <div>
        <SpotifyProfile />
    </div>
</template>

<script>
import SpotifyProfile from '../../../components/widgets/spotify/userProfile.vue';
import navbar from '../../../components/styling/navbar.vue';
export default{
components: {
    SpotifyProfile, 
    navbar
}
}
</script>