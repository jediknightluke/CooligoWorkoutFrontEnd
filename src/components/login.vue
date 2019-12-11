<template>
  <div class="login">
    <!-- Check that the SDK client is not currently loading before accessing is methods -->
    <h1>Why is this not loading?</h1>
    <div v-if="!$auth.loading">
      <!-- show login when not authenticated -->
      <v-btn green large v-if="!$auth.isAuthenticated" @click="login"
        >Log in</v-btn
      >
      <!-- show logout when authenticated -->
      <v-btn v-if="$auth.isAuthenticated" @click="logout">Log out</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  components: {},
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
      this.setToken();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    },
    setToken() {
        console.log(this.$auth.auth0Client.getUser())
      this.$store.dispatch(
        "workoutStore/setUser",
        this.$auth.auth0Client.getUser()
      );
      this.$store.dispatch("workoutStore/setLoading", "Loading");
      this.$store.dispatch(
        "workoutStore/setToken",
        this.$auth.getTokenSilently()
      );
    }
  }
};
</script>
