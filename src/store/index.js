import Vue from "vue";
import Vuex from "vuex";
import workoutStore from "./modules/workoutStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    workoutStore
  }
});
