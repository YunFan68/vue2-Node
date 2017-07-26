import Vue from "vue";
import Vuex from "vuex";
import App from "./app.vue";
import createLogger from "./logger/logger.js"
/*elm*/
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

Vue.use(Vuex);
Vue.use(ElementUI);


const store = new Vuex.Store({
    state: {
        data: {
            filterBox: [],
            listdata: []
        }
    },
    mutations: {
        ADDFILTER(state, payload){
            state.data.filterBox.push(payload);
        },
        HANDLECLOSE(state, payload){
            state.data.filterBox.splice(state.data.filterBox.indexOf(payload), 1);
        },
        FETCHDATA(state, payload){
            state.data.listdata = payload;
        }
    },
    actions: {
        ADDFILTER({dispatch,commit}, payload){
            commit("ADDFILTER",payload);
            dispatch('FETCHDATA', [payload])
        },
        HANDLECLOSE({dispatch,commit}, payload){
            commit("HANDLECLOSE",payload);
            dispatch('FETCHDATA', [payload])
        },
        FETCHDATA:function ({commit}, payload){
            fetch("/list",{
                "method" : "post" ,
                "headers": {
                    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                },
                "body" : "filter=" + encodeURI(JSON.stringify(payload))
            }).then((res)=>{
                res.json().then((data)=>{
                    commit("FETCHDATA",data)
                });
            });
        }
    },
    getters: {
        getFilter(state){
            return state.data.filterBox;
        }
    },
    strict: process.env.NODE_ENV !== 'production',
    plugins: [createLogger()]

});

new Vue({
    el: "#root",
    store,
    components: {
        App
    }
})
