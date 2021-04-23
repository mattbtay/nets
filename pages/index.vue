<template>
  <div>
    <ul>
      <li v-for="(event, index) in events" :key="index">{{event.summary}}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    data() {
      return {
        events: {}
      }
    },
    mounted (){
      axios.get('/api/getEvents/', {
				  headers: {
					   "Access-Control-Allow-Origin": "*",
					   'Access-Control-Allow-Methods': 'GET', 
				  }
			  }).then(res => {
          this.events = res.data
        })
    
  }}
</script>

<style lang="scss" scoped>

</style>