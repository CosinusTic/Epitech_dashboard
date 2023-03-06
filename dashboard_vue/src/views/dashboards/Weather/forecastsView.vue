<template>
    <navbar></navbar>
    <h1>Get the weather conditions forecasts for tomorrow for a city</h1>
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

    <div class="forecasts" v-if="this.forecasts != undefined">
        <p>Forecasts fetched</p>
        <p>{{ this.dayPhrase }}</p>
        <p>{{ this.nightPhrase }}</p>
        <p>{{ this.minTemperatureDegrees }} °C</p>
        <p>{{ this.maxTemperatureDegrees }} °C</p>
    </div>
    <div v-else>
        <p>Forecasts not fetched</p>
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
            forecasts: undefined,
            countryCodes: {
                "Switzerland": "CH", "Germany": "DE", "France": "FR", "Italy": "IT",
                "Belgium": "BE", "Netherlands": "NL", "Australia": "AU", "Bolivia": "BO",
                "Canada": "CA", "Croatia": "HR", "Denmark": "DK", "Egypt": "EG", "Spain": "ES",
                "United States": "US", "Finland": "FI", "Greece": "GR"
            },
            countryCode: undefined,
            cityName: undefined, 
            dayPhrase: undefined, 
            nightPhrase: undefined,
            minTemperatureDegrees: undefined, 
            maxTemperatureDegrees: undefined
        }
    },
    methods: {
        async getCurrentConditions() {
            const response = await fetch('http://localhost:3001/forecasts/' + this.countryCode + '/' + this.cityName)
                .then((response) => response.json());
            this.forecasts = response;
            console.log(response.DailyForecasts[0]);

            this.dayPhrase = response.DailyForecasts[0].Day.IconPhrase;
            this.nightPhrase = response.DailyForecasts[0].Night.IconPhrase;
            this.maxTemperatureDegrees = (response.DailyForecasts[0].Temperature.Maximum.Value - 32) * 5/9;
            this.minTemperatureDegrees = (response.DailyForecasts[0].Temperature.Minimum.Value - 32) * 5/9;

        },
        getCountryCodeFromInput(input) {
            this.countryCode = input;
            console.log(this.countryCode);
        }
    }
}
</script>