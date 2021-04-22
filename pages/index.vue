<template>
  <div>
    <ul>
      <li v-for="(event, index) in events" :key="index">{{event.summary}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    async asyncData( {$axios} ){
      const events = await $axios.$get('/.netlify/functions/getEvents')
      return {events}
    }
    
  }
</script>

<style lang="scss" scoped>

</style>