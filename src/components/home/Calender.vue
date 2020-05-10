<template>
  <div class="calender-container w-full">
    <FullCalendar
      class="fullCalendar"
      ref="fullCalendar"
      defaultView="resourceTimeGridDay"
      :header="{
        left: 'prev,next today',
        center: 'title',
        right: 'resourceTimeGridDay, dayGridMonth'
      }"
      :firstDay="1"
      :selectable="true"
      :selectConstraint="selectConstraint"
      :nowIndicator="true"
      :plugins="calendarPlugins"
      :businessHours="businessHours"
      :selectOverlap="false"
      :slotEventOverlap="false"
      :eventOverlap="false"
      :events="bookings"
      :hiddenDays="hiddenDays"
      @dateClick="handleDateClick"
      :schedulerLicenseKey="schedulerLicenseKey"
      :datesAboveResources="true"
      :resources="resources"
      :eventLimit="6"
      :views="views"
      :columnHeaderFormat="{ weekday: 'long' }"
      :defaultTimedEventDuration="'00:30'"
      :datesRender="refreshSlots"
      :allDaySlot="false"
    />
    <BookingConfirmationModal />
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import resourceTimeGrid from "@fullcalendar/resource-timegrid";
import interaction from "@fullcalendar/interaction";

import BookingConfirmationModal from "./BookingConfirmationModal";

export default {
  name: "HomeCalender",
  components: {
    FullCalendar,
    BookingConfirmationModal
  },
  computed: {
    bookings() {
      return this.$store.getters["booking/getBookings"];
    },
    calendarApi() {
      return this.$refs.fullCalendar.getApi();
    }
  },
  data: function() {
    return {
      today: new Date().getDay(),
      openModal: false,
      calendarPlugins: [dayGridPlugin, interaction, resourceTimeGrid],
      businessHours: {
        daysOfWeek: [1, 2, 3, 4, 5, 6],
        startTime: "09:00",
        endTime: "18:00"
      },
      selectConstraint: {
        start: new Date(),
        end: new Date(Date.now() + 6.04e8 * 3)
      },
      hiddenDays: [0],
      schedulerLicenseKey: "GPL-My-Project-Is-Open-Source",
      resources: [],
      views: {
        month: {
          selectable: false
        },
        day: {
          titleFormat: { weekday: "long", day: "numeric", month: "short", year: "numeric" }
        }
      }
    };
  },
  methods: {
    refreshSlots(day) {
      const date = new Date(day.view.currentStart).getDay();
      this.getResources(date);
    },
    handleDateClick(selectedBooking) {
      if (selectedBooking.view.type !== "dayGridMonth" && this.dateCheck(selectedBooking)) {
        this.$store.commit("booking/SET_SELECTED_BOOKING", selectedBooking);
        this.$store.commit("booking/SET_CONFIRMATION_MODAL_ACTIVE", true);
      } else {
        this.calendarApi.changeView("resourceTimeGridDay", selectedBooking.dateStr);
      }
    },
    getResources(today = this.today) {
      if (today === 6) {
        this.resources = [
          { id: "1", title: "Slot 1" },
          { id: "2", title: "Slot 2" },
          { id: "3", title: "Slot 3" },
          { id: "4", title: "Slot 4" }
        ];
      } else {
        this.resources = [
          { id: "1", title: "Slot 1" },
          { id: "2", title: "Slot 2" }
        ];
      }
    },
    dateCheck(date) {
      const time = date.date.getHours();
      const localStartTime = 8;
      const localEndTime = 18;

      if (
        date.date < this.selectConstraint.start ||
        date.date > this.selectConstraint.end ||
        time <= localStartTime ||
        time >= localEndTime
      ) {
        return false;
      } else {
        return true;
      }
    }
  },
  created() {
    this.getResources();
  }
};
</script>

<style lang="scss">
@import "~@fullcalendar/core/main.css";
@import "~@fullcalendar/timegrid/main.css";

.calender-container {
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.fullCalendar {
  margin: 0 auto;
  max-width: 900px;
}
.fc-resourceTimeGridDay-view {
  .fc-today {
    background: #fff !important;
    border-top: 1px solid #ddd !important;
    font-weight: bold;
  }
}

.fc-nonbusiness {
  cursor: not-allowed;
}
.fc-event {
  cursor: default;
}
.fc-unselectable {
  .fc-highlight {
    background: transparent;
  }
}
.fc-time-grid .fc-event-container {
  margin: 0 !important;
}
</style>
