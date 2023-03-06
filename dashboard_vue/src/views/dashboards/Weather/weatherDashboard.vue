<template>
    <navbar></navbar>
    <h1>Weather dashboard</h1>
    <div class="redirection">
        <button v-on:click="redirectForecasts();">Get forecasts</button>
        <button v-on:click="redirectCurrentConditions();">Get current conditions</button>
        <button v-on:click="redirectLocations();">Get a location</button>
    </div>
</template>

<script>
import navbar from '../../../components/styling/navbar.vue';
export default{
    components:{
        navbar
    },
    methods:{
        redirectForecasts()
        {
            this.$router.push('/forecasts');
        }, 
        redirectCurrentConditions()
        {
            this.$router.push('/currentConditions');
        }, 
        redirectLocations()
        {
            this.$router.push('/locations');
        }
    }
}
</script>

<!-- {
    path: '/currentConditions', 
    name: 'currentConditions', 
    component: currentConditions
  }, 
  {
    path: '/forecasts', 
    name: 'forecasts', 
    component: forecasts
  }, 
  {
    path: '/locations', 
    name: 'locations', 
    component: locations
  } -->