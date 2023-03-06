import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/Login.vue';
import auth from "../views/auth.vue";
import userOK from "../views/userOK.vue";
import homeNotConnected from "../views/homeNotConnected.vue";
import home from '../views/home.vue';
import Register from '../views/Register.vue';

//spotify views
import spotifyDashboard from '../views/dashboards/Spotify/spotifyDashboard.vue';
import spotifyProfileView from '../views/dashboards/Spotify/spotifyProfileView.vue';
import spotifyFollowedArtists from '../views/dashboards/Spotify/spotifyFollowedArtistsView.vue';

//weather views
import weatherDashboard from '../views/dashboards/Weather/weatherDashboard.vue';
import currentConditions from '../views/dashboards/Weather/currentConditionsView.vue';
import forecasts from '../views/dashboards/Weather/forecastsView.vue';
import locations from '../views/dashboards/Weather/locationsView.vue';

//currencies views
import currencyDashboard from '../views/dashboards/Currencies/currenciesDashboard.vue';


//ballon d'or views
import ballonDor from '../views/dashboards/ballon_dor/ballonDorDashboard.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",  //home view not connected
      name: "homeNotConnected",
      component: homeNotConnected
    },
    {
      path: '/home', 
      name: 'home', 
      component: home
    },
    {
      path: '/login', //home view
      name: 'login',
      component: LoginView
    },
    {
      path: '/auth',
      name: 'auth', 
      component: auth
    }, 
    {
      path: '/connectionSuccessful/', 
      name: 'connectionSuccessful', 
      component: userOK
    }, 
    {
      path: "/spotifyDashboard", 
      name: "spotifyDashboard", 
      component: spotifyDashboard
    },
    {
      path: '/spotifyProfile', 
      name: 'spotifyProfile', 
      component: spotifyProfileView
    }, 
    {
      path: '/spotifyFollowedArtists', 
      name: 'spotifyFollowedArtists', 
      component: spotifyFollowedArtists
    }, 
    {
      path: '/weatherDashboard', 
      name: 'weatherDashboard', 
      component: weatherDashboard
    }, 
    {
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
    }, 
    {
      path: '/currenciesDashboard', 
      name: 'currenciesDashboard', 
      component: currencyDashboard
    }, 
    {
      path: '/ballonDorDashboard',
      name: 'ballonDorDashboard', 
      component: ballonDor
    }, 
    {
      path: '/register', 
      name: 'register', 
      component: Register
    }

  ]
})

export default router
