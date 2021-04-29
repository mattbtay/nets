// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method

const {
  google
} = require("googleapis");

const {
  OAuth2
} = google.auth;

const oAuth2Client = new OAuth2(
  "526989770589-2n746t5hf2r30b7taodum5t6tfmh337k.apps.googleusercontent.com",
  "5OnB48EwOV82XkrhEQNV-od9"
);


oAuth2Client.setCredentials({
  refresh_token: "1//04x5_ldyWu-hdCgYIARAAGAQSNwF-L9IrRG6enlngr3yV-Tmn6p3-OGz1TZa5qY8bwQ_ej-DiTrffnmtzp4qOpU0rQrxcUc0jNsE"
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
      timeMin: today.toISOString(),
      timeMax: tomorrow.toISOString(),
      timeZone: 'America/Chicago',
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
