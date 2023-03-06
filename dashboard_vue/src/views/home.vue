<template >
     
<div >
    <h1 v-if="connectedUser != undefined">Hello {{ connectedUser.email }}</h1>
    <h1 v-else> Not signed in</h1>
</div>

</template>

<script>
export default{
    data()
        {
            return{
                connectedUser: undefined
            }
        },
    methods: {
        async getUser()
        {
            const token = localStorage.getItem('access_token');
            console.log(token);
            const response = await fetch('http://localhost:3000/usersWithToken/' + token)
                .then(response => response.json())
            this.connectedUser = response;
            console.log(response);
        }
    }, 
    async mounted()
    {
        await this.getUser();
    }   
}
</script>

<style>

</style>