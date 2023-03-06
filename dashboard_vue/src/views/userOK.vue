<template>Connection successful</template>

<script>
export default{
    data(){
        return{
            code: "", 
            access_token: ""
        }
    }, 
    methods: {
        getUrlParams()
        {
            this.access_token = localStorage.getItem('access_token');
            this.code = this.$router.currentRoute.value.query.code
            // console.log(this.$router.currentRoute.value.query.code)
            console.log("token: ", this.access_token)
            console.log("code: ", this.code);
        }, 
        async addToDb()
        {
            const requestOptions = {
                method: 'POST',
                body: JSON.stringify({"code": this.code, "access_token": this.access_token}),
                headers: { 'Content-Type': 'application/json' },
            }
            await fetch('http://localhost:3004/getToken/' + this.code + "/" + this.access_token, requestOptions)
                .then(response => response.json())
                .then(response => console.log(response));
        }, 
        redirectSpotifyDashboard()
        {
            this.$router.push('/spotifyDashboard');
        }
    }, 
    async mounted()
    {
        this.getUrlParams();
        await this.addToDb();
        this.redirectSpotifyDashboard();
    }
}
</script>