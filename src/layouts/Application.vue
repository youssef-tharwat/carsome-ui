<template>
  <div class="pb-10">
    <header>
      <Header />
    </header>
    <main>
      <slot></slot>
    </main>
  </div>
</template>

<script>
import Header from "../components/layouts/Header";
export default {
  name: "Layout",
  components: {
    Header
  }
};
</script>
