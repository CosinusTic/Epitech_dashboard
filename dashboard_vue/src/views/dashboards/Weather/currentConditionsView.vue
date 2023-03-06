<template>
    <navbar></navbar>
    <h1>Get the current weather conditions for a city</h1>
    <div class="dropdown">
        <label for="pet-select">Country Code</label>
        <!-- v-on:change="getCategoryFromInput(countryCode)" -->
        <select id="countryCodes" name="countryCodes" v-model="countryCode">
            <option v-for="code in this.countryCodes" v-bind:value="code">{{ code }}</option>
        </select>
    </div>
    <div class="textInput">
        City name: <input type="text" v-model="cityName" />
    </div>
    <div class="submit">
        <button type="submit" v-on:click="getCurrentConditions();">Search</button>
    </div>

    <div class="forecasts" v-if="this.conditions != undefined"> 
        <p>Rain? {{ this.currentlyRaining }}</p>
        <p v-if="this.conditions[0].HasPrecipitation != false">Precpiptation type: {{ this.precipitationType }}</p>
        <p>Time of day: {{ this.isDayTime }}</p>
        <p>Conditions: {{ this.weatherText }}</p>
        <p>Temperature: {{ this.temperature }} °C</p>
    </div>
    <div v-else>
        <p>No forecast loaded, awaiting request...</p>
    </div>
</template>

<script>
import navbar from '../../../components/styling/navbar.vue';
export default {
    components:{
        navbar
    },
    data() {
        return {
            conditions: undefined,
            countryCodes: {
                "Switzerland": "CH", "Germany": "DE", "France": "FR", "Italy": "IT",
                "Belgium": "BE", "Netherlands": "NL", "Australia": "AU", "Bolivia": "BO",
                "Canada": "CA", "Croatia": "HR", "Denmark": "DK", "Egypt": "EG", "Spain": "ES",
                "United States": "US", "Finland": "FI", "Greece": "GR"
            },
            countryCode: undefined,
            cityName: undefined, 
            currentlyRaining: undefined,
            isDayTime: undefined,
            precipitationType: undefined, 
            weatherText: undefined, 
            temperature: undefined,
        }
    },
    methods: {
        async getCurrentConditions() {
            const response = await fetch('http://localhost:3001/currentCondition/' + this.countryCode + '/' + this.cityName)
                .then((response) => response.json());
            this.conditions = response;
            console.log(response[0]);

            if(response[0].HasPrecipitation == false){
                this.currentlyRaining = "Not currently raining";
            }
            else{
                this.currentlyRaining = "Currently raining";
                this.precipitationType = response[0].PrecipitationType;
            }
                
            
            if(response[0].isDayTime == false){
                this.isDayTime = "Nighttime"
            }
            else{
                this.isDayTime = "Daytime";
            }

            this.weatherText = response[0].WeatherText;
            this.temperature = response[0].Temperature.Metric.Value;
                


        },
        getCountryCodeFromInput(input) {
            this.countryCode = input;
            console.log(this.countryCode);
        }
    }
}
</script>