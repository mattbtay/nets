<template>

  <b-container>
    <b-row>
      <b-col>
        <div class="pb-2">
        <h1 class="text-center pb-2 pt-5 px-5">Are there any nets today?</h1>
        <h1 v-if="events.length > 0" class="text-center pb-2 mainText" style="font-size:8rem">YES!</h1>
        <h1 v-if="events.length == 0" class="text-center pb-2 mainText sad" style="font-size:8rem">Nope</h1>
        <!-- <p class="text-center pb-5">If you have a net you would like to submit, please let us know.</p> -->
        </div>
      </b-col>
    </b-row>
    <b-row v-if="!events">
      <b-col>
        loading...
      </b-col>
    </b-row>
    <b-row>
      <table v-if="events" class="table table-striped">
        <thead class="thead-dark">
          <th>Time</th>
          <th>Name</th>
          <th>Location</th>
          <th>Description</th>
          <th>Organization</th>
        </thead>
        <tbody>
          <tr v-for="(event, index) in events" :key="index">
            <td>{{getDate(event.start.dateTime)}}</td>
            <td>{{event.summary}}</td>
            <td>{{makeColumn(formatContent(event.description), 0)}}</td>
            <td>{{makeColumn(formatContent(event.description), 2)}}</td>
            <td v-html="makeColumn(formatContent(event.description), 3)"></td>

          </tr>
        </tbody>
      </table>
      <!-- <b-col v-for="(event, index) in events" :key="index">
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
      </b-col> -->
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
    formatContent: function(content){
      // section breakdown FQ | Net Control | Description | org | link to org
      return content.split(" | ");
    },
    makeColumn: function(data, index){
      return data[index]
    },
    isPastTime: function(date){
      return isPast(new Date(date))
    }
  }
  
  }
</script>

<style scoped>

.mainText {
  color:#3D8EB9;
}

.mainText.sad {
  color:#CF000F;
}

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