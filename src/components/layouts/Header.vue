<template>
  <b-navbar class="mb-5">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="@/assets/images/logo-carsome.png" alt="logo" class="logo image" />
      </b-navbar-item>
    </template>
    <template slot="start"> </template>

    <template slot="end"> </template>
  </b-navbar>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style lang="scss" scoped>
.logo.image {
  max-height: 75%;
}
</style>
