<template>

  <b-container>
    <b-row>
      <b-col>
        <b-jumbotron header="BootstrapVue" lead="Bootstrap v4 Components for Vue.js 2">
    <p>For more information visit website</p>
    <b-button variant="primary" href="#">More Info</b-button>
  </b-jumbotron>
      </b-col>
    </b-row>
    <b-row>
      <b-col  v-for="(event, index) in events" :key="index">
      <b-card
    :title="event.summary"
    img-src="https://picsum.photos/600/300/?image=25"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
    v-bind:class="[isPastTime(event.start.dateTime) ? 'disabled' : '']"
  >
    <b-card-text>
      <div v-html="formatContent(event.description, getDate(event.start.dateTime))"></div>
    </b-card-text>

    <div class="finished" v-if="isPastTime(event.end.dateTime)">
      <div>Shoot! Ya missed it!</div>
    </div>

  </b-card>
      </b-col>
    </b-row>
  </b-container>

</template>

<script>
import axios from 'axios'
import {format, isPast} from 'date-fns'
  export default {
    data() {
      return {
        events: {}
      }
    },
    mounted (){
      try{
      axios.get('/api/getEvents', {
				  headers: {
					   "Access-Control-Allow-Origin": "*",
					   'Access-Control-Allow-Methods': 'GET', 
				  }
			  }).then(res => {
          this.events = res.data
        })
      } catch(error){
        if(error) console.log(error)
      } 
  },
  computed: {
    filteredEventsByToday: function(){
      // debugger;
      // return this.events.filter(event => !isToday(event))
    }
  },
  methods: {
    getDate: function(time){
      return format(new Date(time), "HH:MM")
    },
    formatContent: function(content, time){
      // section breakdown FQ | Net Control | Description | org | link to org
      var sections = content.split(" | ");
      return `<address>
      Time: ${time}<br>
      Location:  ${sections[0]}<br>
              Net Control: ${sections[1]}<br>
              Organizer: ${sections[3]}</br>
              ${sections[2] ? sections[2] : ''}</address>
              `
    },
    isPastTime: function(date){
      return isPast(new Date(date))
    }
  }
  
  }
</script>

<style scoped>

.card {
  position: relative;
}

.finished {
 position:absolute;
 top:0;
 left:0;
 display:flex;
 justify-content:center;
 align-items:center;
 width:100%;
 height: 100%;
}

.finished div {
  background:red;
  color:#fff;
  transform:rotate(-15deg);
  padding:10px 15px;
  box-shadow:2px 2px 4px rgba(0,0,0,.5)
}

.disabled {
  
}
</style>