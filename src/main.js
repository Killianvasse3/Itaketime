import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VueTextAreaAutosize from 'vue-textarea-autosize';
import firebase from 'firebase/app';
import 'firebase/firestore';
import VueClock from '@dangvanthanh/vue-clock';

Vue.use(VueClock);

Vue.use(VueTextAreaAutosize);

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: "AIzaSyB5FzXvjP_Kfo68jBnDZzN8oMvQUg2_WMs",
  authDomain: "itaketime.firebaseapp.com",
  databaseURL: "https://itaketime-default-rtdb.firebaseio.com",
  projectId: "itaketime",
  storageBucket: "itaketime.appspot.com",
  messagingSenderId: "281875234283",
  appId: "1:281875234283:web:3df76ba15972a60af5adae",
  measurementId: "G-T599RS059W"
});
export const db = firebase.firestore();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
