// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method

const { google } = require("./googleapis");

const { OAuth2 } = google.auth;

const oAuth2Client = new OAuth2("xxx");

oAuth2Client.setCredentials({
  refresh_token: "xxx"
});

const calendar = google.calendar({ version: "v3", auth: oAuth2Client });



const handler = function(event, context, callback) {
  var start = new Date();
  start.setHours(0, 0, 1, 0);

  const end = new Date();
  end.setDate(end.getDate() + 1);
  end.setHours(00, 00, 00, 000);

  calendar.events.list(
    {
      auth: oAuth2Client,
      calendarId: "xxx",
      singleEvents: true,
      timeMin: start,
      timeMax: end
      // orderBy: 'startTime'
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
        body: JSON.stringify(response.data.items)
      });
    }
  );
};

module.exports = { handler };
