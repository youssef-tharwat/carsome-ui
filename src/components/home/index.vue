<template>
  <div>
    <div class="level">
      <div class="level-item">
        <h2 class="mb-5">Book an appointment by selecting a day below</h2>
      </div>
    </div>
    <div class="level overflow-x-auto">
      <div class="level-item">
        <home-calendar></home-calendar>
      </div>
    </div>
  </div>
</template>

<script>
import HomeCalendar from "./Calender";
export default {
  name: "HomeComponent",
  components: {
    HomeCalendar
  }
};
</script>
