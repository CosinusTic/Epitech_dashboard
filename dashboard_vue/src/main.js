import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANZDX6cO58M2FtKOdWsy0NlyOVvedhqD4",
  authDomain: "dashboard-81464.firebaseapp.com",
  projectId: "dashboard-81464",
  storageBucket: "dashboard-81464.appspot.com",
  messagingSenderId: "1088028463255",
  appId: "1:1088028463255:web:596ba1e775cb925553d9d2",
  measurementId: "G-KDQJ6W39FL"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const app = createApp(App)


app.use(router)

app.mount('#app')
