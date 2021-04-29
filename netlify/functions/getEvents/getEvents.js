// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method

const {
  google
} = require("googleapis");

const {
  OAuth2
} = google.auth;

const oAuth2Client = new OAuth2(
  "526989770589-2n746t5hf2r30b7taodum5t6tfmh337k.apps.googleusercontent.com",
  "MoaFonse56qJHugijEAHNeMR"
);


oAuth2Client.setCredentials({
  refresh_token:
    "1//04wmJuQE1-WYqCgYIARAAGAQSNwF-L9Ir7sc-eu8x9gkn4bHm1h4-WkP7Uw8u_atElsgwz51NvAwOFeF5WbyKsLOh0uafYTWdLu8"
});

const calendar = google.calendar({
  version: "v3",
  auth: oAuth2Client
});

const {startOfToday, startOfTomorrow} = require('date-fns')
const today = startOfToday();
const tomorrow = startOfTomorrow();

const handler = function (event, context, callback) {
  
  
  calendar.events.list(
    {
      auth: oAuth2Client,
      calendarId: "8pv1frn7h2ml914el8cu7gb9a0@group.calendar.google.com",
      singleEvents: true,
      showDeleted: false,
      timeMin: "2021-04-29T00:00:00.000-05:00",
      timeMax: "2021-04-30T00:00:00.000-05:00",
      timeZone: "America/Chicago",
      orderBy: "startTime"
    },
    (error, response) => {
      if (error) {
        console.log(error);
        return;
      }
      callback(null, {
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        statusCode: 200,
        body: JSON.stringify(response.data)
      });
    }
  );
};

module.exports = {
  handler
};
