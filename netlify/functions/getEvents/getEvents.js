// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method

const { google } = require("googleapis");

const { OAuth2 } = google.auth;

const oAuth2Client = new OAuth2(
  "526989770589-2n746t5hf2r30b7taodum5t6tfmh337k.apps.googleusercontent.com",
  "5OnB48EwOV82XkrhEQNV-od9"
);


oAuth2Client.setCredentials({
  refresh_token:
    "1//04x5_ldyWu-hdCgYIARAAGAQSNwF-L9IrRG6enlngr3yV-Tmn6p3-OGz1TZa5qY8bwQ_ej-DiTrffnmtzp4qOpU0rQrxcUc0jNsE"
});

const calendar = google.calendar({ version: "v3", auth: oAuth2Client });



const handler = function( event, context, callback ){

  var datalist = []

calendar.events.list(
  {
    auth: oAuth2Client,
    calendarId:
      "8pv1frn7h2ml914el8cu7gb9a0@group.calendar.google.com"
  },
  (error, response) => {
    var compareDesc = require("date-fns/compareDesc");
                         if (error) {
                           console.log(error);
                           return;
                         }
                         datalist = response.data.items;
                         // need to filter the items for only today TODO
                         const netsToday = datalist.filter(
                           net =>
                             compareDesc(
                               new Date(),
                               new Date(net.start.dateTime)
                             ) === 1
                         );
                         callback(null, {
                           headers: {
                             "Access-Control-Allow-Origin": "*"
                           },
                           statusCode: 200,
                           body: JSON.stringify(netsToday)
                         });
                       }
  
)
  

};

module.exports = { handler };
