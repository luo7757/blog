import Vuex from 'vuex';
import Vue from "vue";

import banner from './banner.js';
import setting from './setting.js';
import about from './about.js';
import project from './project.js';


if(!window.Vuex){
    Vue.use(Vuex);
}

export default new Vuex.Store({
    modules : {
        banner,
        setting,
        about,
        project,
    },
    strict : true,
})

