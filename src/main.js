import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import KeenUI from 'keen-ui'
import 'keen-ui/dist/keen-ui.css';

import VeeValidate from 'vee-validate'
import kaLocale from './assets/js/ka.js'
import {globalState} from './components/globalstate.js'

import 'flexboxgrid2/flexboxgrid2.css'
import './assets/css/font_bpg_arial.css'
import './assets/css/geowebfonts.css'
import './assets/css/style.css'


async function getUrl(url) {
    let link ;
    if (globalState.apiUrl==="/testData" ) {
        link = globalState.apiUrl + url + ".json";
    } else
        link = globalState.apiUrl + url;

    return await axios.get(link);
}

async function loadData() {
    try {
        let d = new Date;
        let response = await axios.get(globalState.baseUrl+"schedule.json");
        Vue.prototype.$globalState = Vue.observable(globalState);
        globalState.categories = [];
        globalState.subCategories = [];
        globalState.items = [];

        globalState.scheduleTable = response.data.scheduleTable;
        globalState.navMenu = response.data.navMenu;

        /*
        response = await getUrl("/GetCategories");
        globalState.categories = response.data;

        response = await getUrl("/GetSubCategories");
        globalState.subCategories = response.data;

        response = await getUrl("/GetItems");
        globalState.items = response.data;
        */


    } catch (e) {
        console.error(e.message);
    }
}


axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;
Vue.prototype.$getData = getUrl;


Vue.use(KeenUI);


let dict = {
    attributes: {
        'lastName': 'გვარი',
        'firstName': 'სახელი',
        'IDNum': 'პირადი ნომერი',
        'mobilePhone': 'მობილურის ნომერი',
        'birthDate': 'დაბადების თარიღი',
        'email': 'ელ. ფოსტა',
        'password': 'პაროლი',
        'passwordConfirm': 'პაროლი ხელმეორედ',
        'usernameType': 'მომხმარებლის სახელი'
    },
    custom: {
        'lastName': {
            regex: () => 'გვარი შეიტანეთ ქართულად.'
        },
        'firstName': {
            regex: () => 'სახელი შეიტანეთ ქართულად.'
        },
        'IDNum': {
            regex: () => 'პირადი ნომერი 11 ციფრი უნდა იყოს.'
        },
        'mobilePhone': {
            regex: () => 'მობილურის ნომერი უნდა შეიტანოთ ფირმატით: 5XXYYYYYY'
        },
        'password': {
            regex: () => 'პაროლი უნდა იყოს 5-12 სიმბოლო, აუცილებლად უნდა შეიცავდეს ერთ ციფრს მაინც. \n' +
                'დასაშვებია მხოლოდ ლათინური სიმბოლოები და ციფრები.'
        },
        'passwordConfirm': {
            regex: () => 'პაროლი ხელმეორედ არ ემთხვევეა პაროლს.'
        }
    }

};
VeeValidate.Validator.localize({[kaLocale.name]: kaLocale});
Vue.use(VeeValidate, {
    events: 'blur|change',
    locale: 'ka',
    dictionary: {
        ka: dict
    }

});
router.beforeEach((to, from, next) => {
    if (to.meta.role && globalState.user.role !== to.meta.role) {
        next({
            path: '/restricted',
        })
    } else {
        next()
    }
});

Vue.config.productionTip = false;

(async function start() {
    await loadData();

    new Vue({
        router,
        render: h => h(App)
    }).$mount('#app');

})();



