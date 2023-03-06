<template>
    <h1>Your Profile</h1>
    <div class="primary">
        <h2>Primary information</h2>
        <p>Username: {{ this.username }}</p>
        <p>email: {{ this.userEmail }}</p>
        <p>Country: {{ this.country }}</p>
    </div>
    <div>
        <h2>Secondary information</h2>
        <p>Followers count: {{ this.followersCount }}</p>
        <p>Subscription type: {{ this.subscription }}</p>
        <p>Accout type: {{ this.accountType }}</p>
    </div>
    
</template>

<script>
export default{
    data()
    {
        return{
            country: undefined,
            username: undefined, 
            userEmail: undefined,
            followersCount: undefined,
            subscription: undefined,
            accountType: undefined
        }
    }, 
    methods:
    {
        async getSpotifyProfile()
        {
            const token = localStorage.getItem('access_token');
            const response = await fetch('http://localhost:3004/myProfile/' + token)
                .then(response => response.json())
            console.log(response);
            this.country = response.country;
            this.username = response.display_name;
            this.userEmail = response.email;
            this.followersCount = response.followers.total;
            this.subscription = response.product;
            this.accountType = response.type;
        }
    }, 
    async mounted()
    {
        await this.getSpotifyProfile();
    }
}
</script>

<style>

</style>