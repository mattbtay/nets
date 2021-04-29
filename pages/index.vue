<template>

  <b-container>
    <b-row>
      <b-col>
       <div class="pb-2">
        <h1 class="text-center pb-2 pt-5 px-5">Are there any nets today?</h1>
        <h1 v-if="eventStatus == 2" class="text-center pb-2 mainText" style="font-size:8rem">YES!</h1>
        <Spinner v-if="eventStatus == 0" />
        <h1 v-if="eventStatus == 1" class="text-center pb-2 mainText sad" style="font-size:8rem">Nope</h1>
        <!-- <p class="text-center pb-5">If you have a net you would like to submit, please let us know.</p> -->
        </div>
      </b-col>
    </b-row>
    <b-row v-if="eventStatus == 0">
      <b-col>
        <Spinner />
      </b-col>
    </b-row>
    <b-row>
      <b-table head-variant="dark" stacked="sm" striped :items="events" :fields="fields" :busy="isBusy">

        <template #table-busy>
        <div class="text-center text-default my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>

      <template #cell(start)="data">
         <div :class="[isPastTime(data.value.dateTime) ? 'past' : '']" v-html="getDate(data.value.dateTime)"></div>
        </template>

        <template #cell(freq)="data">
          <div :class="[isPastTime(data.item.start.dateTime) ? 'past' : '']" v-html="data.item.summary"></div>
        </template>

        <!-- A virtual composite column -->
      <template #cell(loc)="data">
        <div :class="[isPastTime(data.item.start.dateTime) ? 'past' : '']" v-html="makeColumn(formatContent(data.item.description), 0)"></div>
      </template>

      <!-- A virtual composite column -->
      <template #cell(desc)="data">
        <div :class="[isPastTime(data.item.start.dateTime) ? 'past' : '']" v-html="makeColumn(formatContent(data.item.description), 1)"></div>
      </template>

      <!-- A virtual composite column -->
      <template #cell(org)="data">
        <div :class="[isPastTime(data.item.start.dateTime) ? 'past' : '']" v-html="makeColumn(formatContent(data.item.description), 2)" />
      </template>

     


      </b-table>
            
      
    </b-row>
     <b-row>
      <b-col>
        <p class="text-center">If you have a net you'd like to add, please reach out to <a href="http://qrz.com/db/ki5nda"  target="_blank">KI5NDA</a> on QRZ or on <a href="http://twitter.com/mattbtay" target="_blank">twitter</a></p>
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
        isBusy: true,
        eventStatus: 0, // 0 = loading, 1 = no events, 2 = some events
        fields: [
          {key: 'start', label: 'Time'},
          {key: 'freq', label: 'Name'},
          {key: 'loc', label: 'Location'},
          {key: 'desc', label: 'Description'},
          {key: 'org', lable: 'Org.'}
        ],
        events: []
      }
    },
    mounted (){
      try{
      var url = ''
      axios.get('/api/getEvents', {
				  headers: {
					   "Access-Control-Allow-Origin": "*",
					   'Access-Control-Allow-Methods': 'GET', 
				  }
			  }).then(res => {
          //debugger;
          this.events = res.data.items
           this.isBusy = false;
          if(res.data.items.length > 0) {
            this.eventStatus = 2
          } else if (res.data.length = 0) {
            this.eventStatus = 1
          } else {
            this.eventStatus = 0
          }
        })
      } catch(error){
        if(error) console.log(error)
      } 
  },
  methods: {
    getDate: function(date){
      var dateF = new Date(date);
      var hours = dateF.getHours();
      var minutes = dateF.getMinutes();
      if(minutes == "0") minutes = '00';
      var strTime = hours + ':' + minutes
      //debugger
      return strTime;
    },
    formatContent: function(content){
      // section breakdown FQ | Description | org | link to org
      return content.split("|");
    },
    makeColumn: function(data, index){
      //debugger;
      return data[index]
    },
    isPastTime: function(date){
      return isPast(new Date(date))
    }
  },
  
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
.past {
  text-decoration:line-through;
  text-decoration-color: red;
  opacity:.3
}


</style>