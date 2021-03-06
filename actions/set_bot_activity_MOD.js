module.exports = {

    name: "Set Bot Activity",

    section: "Bot Client Control",

    author: "Lasse",

    version: "1.9.6",

    short_description: "Set bots activity and status.",

    subtitle: function (data) {
        const activities = ["Playing", "Listening to", "Watching", "Streaming Twitch", "Keep"];

        const stats = ["Online", "Idle", "Invisible", "Do Not Disturb", "Keep"];

        return `${stats[data.stat]}, ${activities[data.activity]} ${data.nameText}`;
    },

    fields: ["activity", "nameText", "url", "stat"],

    html: function (isEvent, data) {
        return `
    <div id="mod-container">
        <div id="main-body">
            <div>
                <p>
                    <u>Mod Info:</u><br>
                    Created by Lasse!<br>
                    Edited by General Wrex and SeikiMatt<br><br>
                </p>
            </div>
            <div style="display: flex;">
                <div style="width: 50%; padding-right: 10px">
                    Activity:<br>
                    <select id="activity" class="round" style="width: 100%;">
                        <option value="0">Playing</option>
                        <option value="1">Listening to</option>
                        <option value="2">Watching</option>
                        <option value="3">Streaming Twitch</option>
                        <option value="4">Keep Activity</option>
                    </select>
                </div>
            <div style="width: 50%; padding-left: 10px">
                Status:<br>
                <select id="stat" class="round" style="width: 100%;">
                    <option value="0">Online</option>
                    <option value="1">Idle</option>
                    <option value="2">Invisible</option>
                    <option value="3">Do Not Disturb</option>
                    <option value="3">Keep Activity</option>
                </select>
            </div>
        </div><br>
            Activity Name:<br>
            <input id="nameText" class="round" type="text" style="width: 100%;"><br>
            <div id="urlArea" class="hidden">
                Twitch Stream URL:<br>
                <input id="url" class="round" type="text" autofocus="autofocus" placeholder='Leave blank for none' style="width: 100%;">
            </div>
        </div>
    </div>
      <style>
        #mod-container {
          width: 570px;
          height: 359px;
          overflow-y: scroll;
        }

        #main-body {
          padding: 15px;
        }

        .action-input {
          margin: 0 !important;
          padding: 0 !important;
        }

        body {
          margin: 0;
        }

        .hidden {
          display: none;
        }
      </style>`;
  },

  init: function () {
      const {glob, document} = this;

      let selector = document.getElementById("activity");
      let targetfield = document.getElementById("urlArea");

      if (selector[selector.selectedIndex].value === "3") {
          targetfield.classList.remove("hidden");
          alert("bengis");
      } else {
          targetfield.classList.add("hidden");
      }

      function showUrl() {
          if (selector[selector.selectedIndex].value === "3") {
              targetfield.classList.remove("hidden");
          } else {
              targetfield.classList.add("hidden");
          }
      }

      selector.onclick = () => showUrl();
  },

action: function (cache) {
    const botClient = this.getDBM().Bot.bot.user;
    const data = cache.actions[cache.index];
    const nameText = this.evalMessage(data.nameText, cache);
    const url = this.evalMessage(data.url, cache);
    const activity = parseInt(data.activity);
    const stat = parseInt(data.stat);

    let target, statustarget;
    switch (activity) {
        case 0:
            target = "PLAYING";
            break;
        case 1:
            target = "LISTENING";
            break;
        case 2:
            target = "WATCHING";
            break;
        case 3:
            target = "STREAMING";
            break;
    }
    switch (stat) {
        case 0:
            statustarget = "online";
            break;
        case 1:
            statustarget = "idle";
            break;
        case 2:
            statustarget = "invisible";
            break;
        case 3:
            statustarget = "dnd";
            break;
    }

    let obj = {};
    if (nameText) {
        obj.activity = {};
        obj.activity.name = nameText;
    }
    if (target) {
        obj.activity.type = target;
        if (target == "STREAMING" && url) {
            obj.activity.url = url;
        }
    }
    if (statustarget) {
        obj.status = statustarget;
    }
    botClient.setPresence(obj).then(() => {
        this.callNextAction(cache);
    }).catch(err => this.displayError(data, cache, err));
  },

  mod: function (DBM) {
  }
  
};