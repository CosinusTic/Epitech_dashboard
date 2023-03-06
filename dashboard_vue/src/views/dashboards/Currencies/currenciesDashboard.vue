<template>
    <navbar></navbar>
    <h1>Currencies dashboard</h1>
    <div v-if="this.connectedUser != undefined" class="container">
        <div class="conversionRate">
            <h3>Get a conversion rate</h3>
            <p>Convert: </p>
            <select id="currencyCodes" name="currencyCodes" v-model="firstCode">
                <option v-for="code in this.currencyCodes" v-bind:value="code">{{ code }}</option>
            </select>
            <p>To: </p>
            <select id="currencyCodes" name="currencyCodes" v-model="secondCode">
                <option v-for="code in this.currencyCodes" v-bind:value="code">{{ code }}</option>
            </select>
            <button v-on:click="getConversionRate();">Convert</button>
            <p v-if="this.conversionRate != undefined">Conversion rate: {{ this.conversionRate }}</p>
        </div>
        <div class="convertedAmount">
            <h3>Convert a certain amount</h3>
            <p>Convert: </p>
            <select id="currencyCodes" name="currencyCodes" v-model="firstCodeAmnt">
                <option v-for="code in this.currencyCodes" v-bind:value="code">{{ code }}</option>
            </select>
            <p>To: </p>
            <select id="currencyCodes" name="currencyCodes" v-model="secondCodeAmnt">
                <option v-for="code in this.currencyCodes" v-bind:value="code">{{ code }}</option>
            </select>
            Amount: <input type="number" v-model="amountToConvert"/>
            <button v-on:click="this.getCovertedAmount();">Convert</button>
            <p v-if="this.convertedAmount != undefined">Converted amount: {{ this.convertedAmount }}</p>
        </div>
    </div>
    <div v-else>
        <p>User is not signed in</p>
    </div>


</template>

<script>
import navbar from '../../../components/styling/navbar.vue';
export default {
    components: {
        navbar
    },
    data() {
        return {
            connectedUser: undefined,
            currencyCodes: ["EUR", "USD", "GBP", "JPY", "CHF", "AUD", "CAD", "CNY", "NZD", "INR", "BZR", "SEK", "ZAR", "HKD"], 
            conversionRate: undefined, 
            firstCode: undefined, 
            secondCode: undefined, 
            firstCodeAmnt: undefined, 
            secondCodeAmnt: undefined, 
            convertedAmount: undefined, 
            amountToConvert: undefined
        }
    },
    methods: {
        async getLocalStorageToken() {
            const now = new Date().getTime();
            const token = JSON.parse(localStorage.getItem("access_token"));
            if (!token) {
                console.log("User is not logged in");
                this.connectedUser = undefined;
                return;
            } else {
                if (now > token.expiry) {
                    localStorage.removeItem("access_token");
                    this.connectedUser = undefined;
                } else {
                    console.log("user is logged in");
                    const response = await fetch('http://localhost:3000/usersWithToken/' + token.access_token)
                        .then(response => response.json())
                    this.connectedUser = response;
                }
            }
        }, 
        async getConversionRate(){
            const response = await fetch('http://localhost:3002/conversionRate/' + this.firstCode + '/' + this.secondCode)
                .then(response => response.json());
            console.log(response);
            this.conversionRate = response.amount;
        }, 
        async getCovertedAmount(){
            const response = await fetch('http://localhost:3002/convertAmount/' + this.firstCodeAmnt + '/' + this.secondCodeAmnt + '/' + this.amountToConvert)
                .then(response => response.json());
            console.log(response);
            this.convertedAmount = response.amount;
        }
    },
    async mounted() {
        await this.getLocalStorageToken();
    }
}
</script>

<style>
.container{
    display:grid;
    grid-template-columns: repeat(2, 50%);
}
</style>