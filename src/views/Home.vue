<template>
  <div class="container">
    <HomeComponent />
  </div>
</template>

<script>
import HomeComponent from "@/components/home";

export default {
  name: "Home",
  components: {
    HomeComponent
  },
  mounted() {
    this.$http.get("ping");
  }
};
</script>
