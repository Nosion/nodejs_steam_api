Steam = require('steam-webapi'),
dateFormat = require('dateformat');

function steamapi(response, postData) {
  console.log("Request handler 'steamapi' was called.");

  // Set global Steam API Key
  //Remember to change this to a valid key..
  Steam.key = "35628F6B0E674SDEC3545FE798C";

  Steam.ready(function(err)  {
      if (err) return console.log(err);
      var steam = new Steam();
      var mySteamId = "Jinja-DK";

      // Retrieve the steam ID from a steam username/communityID
      steam.resolveVanityURL({vanityurl:mySteamId}, function(err, data) {
          // data -> { steamid: '76561197968620915', success: 1 }
          data.steamids = data.steamid;
          steam.getPlayerSummaries(data, function (err, data) {
            var profileData = data;
            htmlResponse(profileData);
          });
      });
  });

  htmlResponse = function(profileData) {
    var profilecreated = new Date( 1079364144*1000 );
    var body = '<html>'+
      '<head>'+
      '<meta http-equiv="Content-Type" '+
      'content="text/html; charset=UTF-8" />'+
      '</head>'+
      '<body>'+
        '<div>' +
          '<img src="' + profileData.players[0].avatarmedium + '" border="2" align="left">' +
          '<h2>' + profileData.players[0].personaname + '</h2>' +
          '<div><b>Name: </b>' + profileData.players[0].realname + '</div>' +
          '<div><b>Country: </b>' + profileData.players[0].loccountrycode + '</div>' +
          '<div><b>Profile created: </b>' + dateFormat(profilecreated, "dddd, dS mmmm, yyyy") + '</div>' +
          '<div><a href="' + profileData.players[0].profileurl + '">Profile Link</a></div>' +
        '</div>' +
      '</body>' +
      '</html>';
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
  };
}

exports.steamapi = steamapi;
