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

const handler = async event => {
  try {
    var that = this;
    console.log("hi matt");
    calendar.events.list(
      {
        auth: oAuth2Client,
        calendarId: "8pv1frn7h2ml914el8cu7gb9a0@group.calendar.google.com"
      },
      function(error, response) {
        if (error) {
          console.log(error);
          return;
        }
        const events = response.data.items;
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify(events)
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
