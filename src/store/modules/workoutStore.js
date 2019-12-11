import axios from "axios";

const state = {
  workout_state: [],
  workout_selected: [],
  user_token: "",
  user_isAuthenticated: false,
  user_name: "",
  loading: ""
};

const getters = {
  workout_get: state => {
    return state.workout_state;
  },

  workout_selectedGET: state => {
    return state.workout_selected;
  },

  workouts_Number: state => {
    return state.workout_selected.length;
  },

  getUser: state => {
    return state.user_name;
  }
};

const actions = {
  getWorkouts({ commit }, { workout, token }) {
    let bearerToken = "Bearer " + token;
    console.log(token);
    axios({
      method: "get",
      url: "https://localhost:5001/api/muscle/" + workout,
      Authorization: bearerToken,
      headers: {
        Authorization: bearerToken
      }
    }).then(response => {
      commit("FETCH_API", response.data);
    });
  },

  addSelectedWorkout({ commit }, { workout }) {
    commit("Store_Selected_Workout", workout);
  },
  removeSelectedWorkout({ commit }, { workout }) {
    commit("Remove_Selected_Workout", workout);
  },
  clearWorkout({ commit }) {
    commit("Clear_Workout_Mutation");
  },
  setUser({ commit }, { user }) {
    commit("Set_User_Mutation", user);
  },

  setToken({ commit }, { token }) {
    commit("Set_Token_Mutation", token);
  },

  setLoading({ commit }, { loading }) {
    commit("Set_Loading_Mutation", loading);
  }
};

const mutations = {
  FETCH_API(state, workout_state) {
    console.log(state.workout_state);
    state.workout_state = workout_state;
  },

  Store_Selected_Workout(state, workout) {
    state.workout_selected.push(workout);
  },
  Set_User_Mutation(state, user) {
    state.user_name = user;
    state.user_isAuthenticated = true;
  },
  setToken(state, token) {
    state.user_token = token;
  },
  setLoading(state, loading) {
    state.loading = loading;
  },

  Clear_Workout_Mutation(state) {
    state.workout_selected = [];
  },

  Remove_Selected_Workout(state, workout) {
    console.log("Removing Workout");
    console.log(workout);
    for (var i = 0; i < state.workout_selected.length; i++) {
      if (state.workout_selected[i] === workout) {
        state.workout_selected.splice(i, 1);
      }
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
