Vue.component('CoinDetail', {
    props: [
        'coin'
    ],
    data() {
        return {
            showPrices: false,
            value: 0
        }
    },
    methods: {
        toggleShowPrices() {
            this.showPrices = !this.showPrices
        }
    },
    computed: {
        title() {
            return `${this.coin.name} - ${this.coin.symbol}`
        },
        convertedValue() {
            if (!this.value) {
                return 0
            }

            return this.value / this.coin.currentPrice
        }
    },
    template: `
    <div>
        <img v-on:mouseover="toggleShowPrices"
             v-on:mouseout="toggleShowPrices"
             v-bind:src="coin.img" v-bind:alt="coin.name" height="128px" width="128px">

        <h1 v-bind:class="coin.changePercent > 0 ? 'green' : 'red'">
            {{ title }}
            <span v-if="coin.changePercent > 0">🤙🏼</span>
            <span v-else-if="coin.changePercent < 0">😨</span>
            <span v-else>🙈</span>

            <br>

            <span v-on:click="toggleShowPrices">
                {{ showPrices ? "🙈" : "🙊" }}
            </span>
        </h1>

        <input type="number" v-model="value">
        <br>
        <span>{{ convertedValue }}</span>

        <ul v-show="showPrices">
            <li v-for="(price, i) in coin.pricesWithDays"
                v-bind:key="'price' + i"
                v-bind:class="{
                    orange: price.value === coin.currentPrice,
                    red: price.value < coin.currentPrice,
                    green: price.value > coin.currentPrice
                }"
                class="uppercase">
                {{ price.day + ' - ' + price.value }}
            </li>
        </ul>
    </div>
    `
})

new Vue({
    el: "#app",
    data() {
        return {
            btc: {
                name: "Bitcoin",
                symbol: 'BTC',
                img: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
                changePercent: 0,
                currentPrice: 8400,
                pricesWithDays: [
                    { day: 'Lunes', value: 8400 },
                    { day: 'Martes', value: 7900 },
                    { day: 'Miercoles', value: 8200 },
                    { day: 'Jueves', value: 9000 },
                    { day: 'Viernes', value: 9400 },
                    { day: 'Sabado', value: 10000 },
                    { day: 'Domingo', value: 10200 }
                ]
            },
            backgroundColor: 'f4f4f4',
        }
    },
    /* methods: {
        toggleShowPrices() {
            this.showPrices = !this.showPrices

            this.backgroundColor = this.backgroundColor.split('').reverse().join('')
        }
    } */
})