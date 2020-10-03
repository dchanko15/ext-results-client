import Vue from 'vue';
import Router from 'vue-router';


import vIndex from './views/v-index';
import vHome from './views/v-home.vue';
import vRestricted from './views/v-restricted.vue';
import vCategoryItems from './views/v-categoryItems.vue';
import vRequestInfo from './views/v-requestInfo.vue';
import vInfoRequests from './views/v-infoRequests.vue';
import vLogin from './views/v-login.vue';
import vResults from './views/v-results.vue';

import v404 from './views/v-404'








Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {path: '/', name: 'login', component: vLogin},

        {path: '/results', name: 'results', component: vResults},

        {path: '/home', name: 'home', component: vHome},
        {path: '/item/:id', name: 'items', component: vCategoryItems},
        {path: '/request-info', name: 'request', component: vRequestInfo},
        {path: '/info-requests', name: 'infoRequests', component: vInfoRequests},
        {path: '/restricted', name: 'restricted', component: vRestricted},

        /*  {
              path: '/about',
              name: 'about',
              // route level code-splitting
              // this generates a separate chunk (about.[hash].js) for this route
              // which is lazy-loaded when the route is visited.
              component: () => import(/!* webpackChunkName: "about" *!/ './views/About.vue')
          }*/
        {path: '*', name: 'p404', component: v404}
    ]
})
