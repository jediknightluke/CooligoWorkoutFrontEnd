<template>
<v-app>
  <div>
  <v-container>
    <v-layout text-center wrap>
      <v-flex xs12>
        <v-row>
          <v-col class="d-flex" cols="12" sm="6">
            <v-select
              :items="WorkoutItems"
              :menu-props="{ top: true, offsetY: true }"
              label="Select A Muscle"
              v-model="workout_Select"
            ></v-select>
          </v-col>

          <v-col class="d-flex" cols="12" sm="6">
            <v-btn dark color="green" @click="getWorkouts()"> Update</v-btn>
          </v-col>

          <v-col class="d-flex" cols="12" sm="6">
            <v-btn dark color="red" @click="createWorkout()">
              Create Workout</v-btn
            >
          </v-col>
        </v-row>
      </v-flex>
      <v-flex xs12>
        <v-data-table
          :headers="Workoutheaders"
          :items="this.workout_get"
          item-key="index"
          class="elevation-1"
        ></v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
  </div>
</v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "HelloWorld",

  data: () => ({
    workout_Select: "Chest",

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
      { text: "Difficulty", value: "difficulty" }
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
  }),

  created() {
    //console.log("Sending API Request");
    //this.$store.dispatch("workoutStore/getWorkouts");
  },
  computed: {
    ...mapGetters({
      workout_get: "workoutStore/workout_get"
    })
  },

  methods: {
    getWorkouts() {
      console.log(this.workout_Select);
      let workoutName = {
        workout: this.workout_Select
      };
      this.$store.dispatch("workoutStore/getWorkouts", workoutName);
    },

    createWorkout() {
      this.$router.push("/createworkout");
    }
  }
};
</script>
