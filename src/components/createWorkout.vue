<template>
  <v-app id="inspire">
    <div id="createworkout">
      <v-container fluid>
        <h2>Welcome Back, {{ $auth.user.name }}</h2>
        <v-btn @click="logout()"> Logout </v-btn>
        <v-layout text-center>
          <v-flex xs12>
            <v-col class="d-flex" cols="12" sm="6">
              <v-select
                :items="WorkoutItems"
                :menu-props="{ top: true, offsetY: true }"
                label="Select A Muscle"
                v-model="workout_Select"
              ></v-select>

              <v-btn dark color="green" @click="getWorkouts()"> Update</v-btn>
            </v-col>
          </v-flex>
        </v-layout>
        <v-data-table
          :headers="Workoutheaders"
          :items="this.workout_get"
          class="elevation-1"
          show-expand
          :single-expand="singleExpand"
          :expanded.sync="expanded"
          item-key="workoutName"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Workout Select</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
          <template v-slot:item.select="{ item }">
            <v-btn
              color="blue lighten"
              dark
              small
              class="mr-2"
              @click="addWorkout(item)"
            >
              Select Workout
            </v-btn>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
          <template v-slot:expanded-item="{ headers }">
            <v-card class="d-inline-block mx-auto">
              <v-container>
                <v-row>
                  <v-col cols="auto">
                    <v-img
                      height="200"
                      width="200"
                      src="https://cdn.vuetifyjs.com/images/cards/store.jpg"
                    ></v-img>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </template>
        </v-data-table>
      </v-container>

      <v-container fluid>
        <v-layout>
          <v-flex xs12>
            <v-col class="d-flex" cols="12" sm="6">
              <v-card width="100%" height="100%">
                <template>
                  <v-toolbar flat color="white">
                    <v-toolbar-title
                      >Number of Workouts:
                      {{ this.workout_Number }}</v-toolbar-title
                    >
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-text-field label="Workout Name"></v-text-field>
                    <v-spacer></v-spacer>
                    <v-btn small color="green" dark> Save </v-btn>
                    <v-btn small color="red" dark @click="clearWorkout">
                      Clear
                    </v-btn>
                  </v-toolbar>
                </template>

                <ul>
                  <template
                    v-for="(item, index) in selected_workout_getter"
                    v-bind="index"
                  >
                    <li v-bind:key="item">
                      Workout {{ index }}

                      <template>
                        <v-toolbar flat color="white">
                          <v-icon @click="removeWorkout(item)">
                            mdi-close
                          </v-icon>
                          <v-toolbar-title>{{ item }}</v-toolbar-title>
                          <v-spacer></v-spacer>
                        </v-toolbar>
                      </template>
                    </li>
                  </template>
                </ul>
              </v-card>
            </v-col>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {},
  name: "createworkout",
  data() {
    return {
      expanded: [],
      singleExpand: false,
      Workoutheaders: [
        {
          text: "Workout Name",
          align: "left",
          sortable: true,
          value: "workoutName"
        },
        { text: "Main Muscle Group", value: "mainMuscleGroup" },
        { text: "Detailed Muscle Group", value: "detailedMuscleGroup" },
        { text: "Other Muscle Group", value: "otherMuscleGroup" },
        { text: "Type", value: "type" },
        { text: "Mechanics", value: "mechanics" },
        { text: "Equipment", value: "equipment" },
        { text: "Difficulty", value: "difficulty" },
        { text: "Select", value: "select" }
      ],
      WorkoutItems: [
        "Glutes",
        "Lower Legs",
        "Abs",
        "Triceps",
        "Cardio",
        "Chest",
        "Forearm",
        "Shoulders",
        "Back",
        "Upper Legs",
        "Biceps"
      ]
    };
  },

  computed: {
    ...mapGetters({
      workout_get: "workoutStore/workout_get",
      selected_workout_getter: "workoutStore/workout_selectedGET",
      workout_Number: "workoutStore/workouts_Number",
      user: "workoutStore/getUser"
    })
  },

  created() {
  },

  methods: {
    async getWorkouts() {
      console.log(this.workout_Select);
      const token = await this.$auth.getTokenSilently();

      let workoutName = {
        workout: this.workout_Select,
        token: token
      };
      this.$store.dispatch("workoutStore/getWorkouts", workoutName);
    },

    addWorkout(workoutItem) {
      console.log("You Selected: ");
      console.log(workoutItem.workoutName);

      let workout = {
        workout: workoutItem.workoutName
      };

      this.$store.dispatch("workoutStore/addSelectedWorkout", workout);
    },

    removeWorkout(workoutItem) {
      console.log("You Removed: ");
      console.log(workoutItem);
      let workout = {
        workout: workoutItem
      };

      this.$store.dispatch("workoutStore/removeSelectedWorkout", workout);
    },

    clearWorkout() {
      this.$store.dispatch("workoutStore/clearWorkout");
    },
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
};
</script>
