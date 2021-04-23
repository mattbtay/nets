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
      const events = await $axios.$get('/api/getEvents/', {
				  headers: {
					   "Access-Control-Allow-Origin": "*",
					   'Access-Control-Allow-Methods': 'GET', 
				  }
			  })
      return {events}
    }
    
  }
</script>

<style lang="scss" scoped>

</style>