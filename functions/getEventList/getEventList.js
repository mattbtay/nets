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

const calendar = google.calendar({
  version: "v3",
  auth: oAuth2Client
});

const handler = function(event, context, callback) {
  var start = new Date();
  start.setHours(0, 0, 1, 0);

  const end = new Date();
  end.setDate(end.getDate() + 1);
  end.setHours(00, 00, 00, 000);

  calendar.events.list(
    {
      auth: oAuth2Client,
      calendarId: "8pv1frn7h2ml914el8cu7gb9a0@group.calendar.google.com",
      singleEvents: true,
      timeMin: start,
      timeMax: end
      // orderBy: 'startTime'
    },
    (error, response) => {
      if (error) {
        console.log(error);
        return {
          statusCode: 500,
          body: JSON.stringify({ error: error })
        };
      }
      callback(null, {
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        statusCode: 200,
        body: JSON.stringify(response.data.items)
      });
    }
  );
};

module.exports = {
  handler
};
