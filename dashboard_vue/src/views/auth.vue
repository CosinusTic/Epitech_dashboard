<template>
    <div>
        <button v-on:click="redirect();">Connect with Spotify</button>
    </div>
</template>


<script>
export default{
    data(){
        return{
            url: ""
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
        }
    }, 
    async mounted()
    {
        await this.getUrl();
    }
}
</script>