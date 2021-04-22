<template>
  <div>
hello world
  </div>
</template>

<script>
const ical = require('ical')
  export default {
    data() {
      events = {}
    },
     mounted(){
       this.events = ical.parseICS('https://calendar.google.com/calendar/ical/8pv1frn7h2ml914el8cu7gb9a0%40group.calendar.google.com/public/basic.ics')
    }  
  }
 
</script>

<style lang="scss" scoped>

</style>