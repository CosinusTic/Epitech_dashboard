<template>
    <navbar></navbar>
    <h1>Look for locations</h1>
    <input type="text" v-model="searchInput"/>
    <button v-on:click="getAllLocations();">Search</button>
    <div class="response" v-if="locations != undefined">
        <div lass="locations" v-for="location in this.locations">
            <location :location="location"/>
        </div>
    </div>
    <p v-if="locations == undefined">Awaiting request...</p>
    <p v-else>No match found</p>
</template>

<script>
import location from "../../../components/widgets/weather/location.vue";
import navbar from '../../../components/styling/navbar.vue';
export default{
    components: {
        location, 
        navbar
    },
    data(){
        return{
            locations: undefined, 
            searchInput: undefined
        }
    }, 
    methods: {
        async getAllLocations()
        {
            const response = await fetch('http://localhost:3001/getCities/' + this.searchInput)
                .then((response) => response.json());
            this.locations = response;
            console.log(response);
            console.log(typeof response);
        }
    }
}
</script>