module.exports = {

	name: "Store Twitch Info",

	section: "Other Stuff",

	subtitle: function (data) {
		const sourceType = parseInt(data.type);
		const inputType = parseInt(data.inputtype);

		const info1 = parseInt(data.info1);
		const info2 = parseInt(data.info2);
		const info3 = parseInt(data.info3);
		const info4 = parseInt(data.info4);

		const list1 = [ "User ID", "User Login Name", "User Display Name", "User Type", "Broadcaster Type", "Channel Description", "Channel Profile Picture", "Channel Offline Picture", "Channel View Count", "Channel Follower Count"];//User & Channel Info
		const list2 = ["Stream ID", "User ID", "User Display Name", "Game ID", "Community IDs", "Live Status", "Stream Title", "Viewer Count", "Started At Time", "Language Code", "Thumbnail URL", "Tag IDs"];//Stream Info
		const list3 = ["Video IDs", "User IDs", "User Display Names", "Video Titles", "Video Descriptions", "Video Creation Dates", "Video Publish Dates", "Video URLs", "Video Thumbnail URLs", "Videos Viewable?", "Video Viewcounts", "Video Languages", "Video Types", "Video Durations"];//Video Info
		const list4 = ["Game ID", "Game Name", "Game Box Art URL", "Popular Games List (Game IDs)", "Popular Games List (Game Names)", "Popular Games List (Game Box Art URLs)"];//Game Info
		
		var infoNum1 = 0;
		var infoNum2;
		var infoList1 = [];
		var infoList2 = [];
		var infoName1 = '';
		var infoName2 = '';

		switch(sourceType) {
			case 0:
				infoList1 = list1;
				infoNum1 = info1;
				infoName2 = 'Channel';
				switch(inputType) {
					case 0:
						infoName1 = 'ID';
						break;
					case 1:
						if(sourceType > 0) {
							infoName1 = 'ID';
						} else if(info1 < 9) {
							infoName1 = 'Login Name';
						} else {
							infoName1 = 'ID';
						};
						break;
				};
				break;
			case 1:
				infoList1 = list2;
				infoNum1 = info2;
				infoName2 = 'User';
				break;
			case 2:
				infoList1 = list3;
				infoNum1 = info3;
				infoName2 = 'Video';
				break;
			case 3:
				infoList1 = list4;
				infoNum1 = info4;
				infoName2 = 'Game';
				switch(inputType) {
					case 0:
						infoName1 = 'ID';
						break;
					case 1:
						infoName1 = 'Name';
						break;
				};
				break;
		};

		infoList2.push(`from ${infoName2} ${infoName1} "${data.input.toString()}"`);
		infoList2.push('');

		if(info4 > 2 && sourceType == 3) {
			infoNum2 = 1;
		} else {
			infoNum2 = 0;
		};

		return `Get "${infoList1[parseInt(infoNum1)]}" ${infoList2[parseInt(infoNum2)]}`;
	},

	author: "ACertainCoder",

	version: "1.9.6",

	short_description: "This mod will store a specific information from Twitch.",

	depends_on_mods: [{name:'WrexMODS',path:'aaa_wrexmods_dependencies_MOD.js'}],

	variableStorage: function (data, varType) {
		const type = parseInt(data.storage);
		const sourceType = parseInt(data.type);
		const inputType = parseInt(data.inputtype);
		if(type !== varType) return;
		var dataType = "Unknown Type";

		if(sourceType == 0) {
			var info1 = parseInt(data.info1);
			switch(info1) {
				case 0: 
				case 8:
				case 9: dataType = "Number"; break;
				case 1:
				case 2:
				case 3:
				case 4:
				case 5: dataType = "Text"; break;
				case 6:
				case 7: dataType = "Image URL"; break;
			};
		} else if(sourceType == 1) {
			var info2 = parseInt(data.info2);
			switch(info2) {
				case 0:
				case 1:
				case 3:
				case 7:
				case 8: dataType = "Number"; break;
				case 2:
				case 6:
				case 9: dataType = "Text"; break;
				case 5: dataType = "Boolean"; break;
				case 10: dataType = "Image URL"; break;
				case 4:
				case 11: dataType = "List"; break;
			}
		} else if(sourceType == 2) {
			dataType = "List";
		} else if(sourceType == 3) {
			var info4 = parseInt(data.info4);
			switch(info4) {
				case 0:
					dataType = "Number";
					break;
				case 1:
					dataType = "Text";
					break;
				case 2:
					dataType = "Image URL";
					break;
				case 3:
				case 4:
				case 5:
					dataType = "List";
					break;
			};
		};

		return ([data.varName, dataType]);
	},

	fields: ["wrexdiv", "type", "divinputtype", "inputtype", "divinput", "input", "divinfo1", "info1", "divinfo2", "info2", "divinfo3", "info3", "divinfo4", "info4", "clientid", "results", "divresults", "storage", "varName"],

	html: function (isEvent, data) {
		return `
	<div id ="wrexdiv" style="width: 550px; height: 350px; overflow-y: scroll; overflow-x: hidden;">
	<div>
		<p>
			<u>Mod Info:</u><br>
			Made by ACertainCoder<br>
			Idea by Ju#0007<br>
		</p>
	</div>
	<div style="float: left; width: 42%;">
		<br>Source Type:<br>
		<select id="type" class="round" onchange="glob.onChange1(this)">
			<option value="0" selected>Channel Info</option>
			<option value="1">Stream Info</option>
			<option value="2">Video Info</option>
			<option value="3">Game Info</option>
		</select>
	</div>
	<div id="divinputtype" style="padding-left: 5%; float: left; width: 52%; display: none;">
		<br>Input Type:<br>
		<select id="inputtype" class="round" onchange="glob.onChange2(this)" style="display: none;">
			<option value="0" selected>ID</option>
			<option value="1">Name</option>
		</select>
	</div>
	<div id="divinput" style="float: left; width: 99%; padding-top: 8px;">
		<span id="tempName1">User</span> <span id="tempName2">ID</span>:<br>
		<textarea id="input" rows="2" placeholder="Please insert the needed information..." style="width: 95%; font-family: monospace; white-space: nowrap; resize: none;"></textarea>
	</div>
	<div id="divinfo1"; style="float: left; width: 94%; padding-top: 8px; display: none;" onchange="glob.onChange3(this)">
		Source Channel Info:<br>
		<select id="info1" class="round">
			<option value="0">User ID</option>
			<option value="1">User Login Name</option>
			<option value="2" selected>User Display Name</option>
			<option value="3">User Type</option>
			<option value="4">Broadcaster Type</option>
			<option value="5">Channel Description</option>
			<option value="6">Channel Profile Picture URL</option>
			<option value="7">Channel Offline Picture URL</option>
			<option value="8">Channel View Count</option>
			<option value="9">Channel Follower Count</option>
		</select>
	</div>
	<div id="divinfo2"; style="float: left; width: 94%; padding-top: 8px; display: none;">
		Source Stream Info:<br>
		<select id="info2" class="round">
			<option value="5">Is Live?</option>
			<option value="0">Stream ID</option>
			<option value="6" selected>Stream Title</option>
			<option value="7">Viewer Count</option>
			<option value="8">Started At</option>
			<option value="9">Language Code</option>
			<option value="10">Thumbnail URL</option>
			<option value="1">User ID</option>
			<option value="2">User Display Name</option>
			<option value="3">Game ID</option>
			<option value="4">Community IDs</option>
			<option value="11">Tag IDs</option>
		</select>
	</div>
	<div id="divinfo3"; style="float: left; width: 94%; padding-top: 8px; display: none;">
		Source Video Info:<br>
		<select id="info3" class="round">
			<option value="1">User IDs</option>
			<option value="2">User Display Names</option>
			<option value="0">Video IDs</option>
			<option value="3" selected>Video Titles</option>
			<option value="4">Video Descriptions</option>
			<option value="5">Video Creation Dates</option>
			<option value="6">Video Publish Dates</option>
			<option value="7">Video URLs</option>
			<option value="8">Video Thumbnail URLs</option>
			<option value="9">Videos Viewable?</option>
			<option value="10">Video Viewcounts</option>
			<option value="11">Video Languages</option>
			<option value="12">Video Types</option>
			<option value="13">Video Durations</option>
		</select>
	</div>
	<div id="divinfo4"; style="float: left; width: 94%; padding-top: 8px; display: none;" onchange="glob.onChange4(this)">
		Source Game Info:<br>
		<select id="info4" class="round">
			<option value="0">Game ID</option>
			<option value="1">Game Name</option>
			<option value="2">Game Box Art URL</option>
			<option value="3">Popular Games List (Game IDs)</option>
			<option value="4">Popular Games List (Game Names)</option>
			<option value="5">Popular Games List (Game Box Art URLs)</option>
		</select>
	</div>
	<div style="float: left; width: 104.5%; padding-top: 8px;">
		Client ID:<br>
		<input id="clientid" class="round" type="text" placeholder="Insert your Twitch Application Client ID...">
	</div>
	<div id="divresults" style="float: left; width: 95%; padding-top: 8px; display: none;">
		Max Results:<br>
		<input id="results" class="round" type="text" placeholder="Default: 20 | Max: 100">
	</div>
	<div>
		<div style="float: left; width: 35%;  padding-top: 8px;">
			Store In:<br>
			<select id="storage" class="round" onchange="glob.variableChange(this, 'varNameContainer')">
				${data.variables[1]}
			</select>
		</div>
		<div id="varNameContainer" style="float: right; width: 60%; padding-top: 8px;">
			Variable Name:<br>
			<input id="varName" class="round" type="text"><br>
		</div>
		<div style="float: left; padding-top: 8px;">
			<p>
				<u>API Info:</u><br>
				You will need a <span class="wrexlink" data-url="https://glass.twitch.tv/console/apps">Twitch Client ID</span> to use this mod!<br><br>
				<u>Client ID Introductions:</u><br>
				To get a client id: login through Twitch, create a new application. Then insert your favourite application name & some url (this could be your GitHub page).<br>
				Then select the category "Application Integration" down below and click on create! You should now be in your application list again.<br>
				You need to edit your application once more to copy the client id.<br><br>
				<u>API Limitations:</u><br>
				Please go to the <span class="wrexlink2" data-url2="https://dev.twitch.tv/docs/api/guide/#rate-limits">Twitch API Rate Limits Page</span> if need this information.<br><br>
				<u>Explanations of individual source types:</u><br>
				• User Types: "staff", "admin", "global_mod" or ""<br>
				• Broadcaster Types: "partner", "affiliate" or ""<br>
				• Video Types: "upload", "archive" or "highlight"<br>
				• Video Duration: Will return something like "3h8m33s"<br>
			</p>
		</div>
	</div>
	</div>
	<style>
	  span.wrexlink {
		color: #99b3ff;
		text-decoration:underline;
		cursor:pointer;
	  }
	  span.wrexlink:hover {
		color:#4676b9; 
	  }
	  span.wrexlink2 {
		color: #99b3ff;
		text-decoration:underline;
		cursor:pointer;
	  }
	  span.wrexlink2:hover {
		color:#4676b9; 
	  }
	</style>`
	},

	init: function () {
		const { glob, document } = this;
		
		try {
			var WrexMODS = require(require('path').join(__dirname,'aaa_wrexmods_dependencies_MOD.js')).getWrexMods();
							
			var wrexlinks = document.getElementsByClassName("wrexlink")
			for(var x = 0; x < wrexlinks.length; x++) {
			  
			var wrexlink = wrexlinks[x];
			var url = wrexlink.getAttribute('data-url');
			  	if(url){
					wrexlink.setAttribute("title", url);
					wrexlink.addEventListener("click", function(e){
					  	e.stopImmediatePropagation();
					  	console.log("Launching URL: [" + url + "] in your default browser.")
					  	require('child_process').execSync('start ' + url);
					});
				}
			}

			var wrexlinks2 = document.getElementsByClassName("wrexlink2")
			for(var x2 = 0; x2 < wrexlinks2.length; x2++) {
	  
		  		var wrexlink2 = wrexlinks2[x2];
		  		var url2 = wrexlink2.getAttribute('data-url2');   
		  		if(url2){
					wrexlink2.setAttribute("title", url2);
					wrexlink2.addEventListener("click", function(e2){
			  			e2.stopImmediatePropagation();
			  			console.log("Launching URL: [" + url2 + "] in your default browser.")
			  			require('child_process').execSync('start ' + url2);
					});
		  		}
			}

		} catch (error) {
			require("fs").appendFile("errors.txt", error.stack ? error.stack : error + "\r\n"); 
		}

		glob.onChange1 = function(event) {
			const id1 = parseInt(document.getElementById('type').value);
			const infoDiv1 = document.getElementById('divinfo1');
			const info1 = document.getElementById('info1');
			const infoDiv2 = document.getElementById('divinfo2');
			const info2 = document.getElementById('info2');
			const infoDiv3 = document.getElementById('divinfo3');
			const info3 = document.getElementById('info3');
			const infoDiv4 = document.getElementById('divinfo4');
			const info4 = document.getElementById('info4');
			const input = document.getElementById('input');
			const inputDiv = document.getElementById('divinput');
			const inputType = document.getElementById('inputtype');
			const inputTypeDiv = document.getElementById('divinputtype');
			const results = document.getElementById('results');
			const resultsDiv = document.getElementById('divresults');
			const inputList1 = ['ID', 'Login Name'];
			const inputList2 = ['ID', 'Name'];

			var result1 = '';
			var result2 = '';
			switch(id1) {
				case 0:
					result1 = 'User';
					if(parseInt(info1.value) < 9) {
						result2 = inputList1[parseInt(inputType.value)];
						inputType.style.display = null;
						inputTypeDiv.style.display = null;
					} else {
						result2 = 'ID';
						inputType.style.display = 'none';
						inputTypeDiv.style.display = 'none';
					}
					infoDiv1.style.display = null;
					info1.style.display = null;
					infoDiv2.style.display = 'none';
					info2.style.display = 'none';
					infoDiv3.style.display = 'none';
					info3.style.display = 'none';
					infoDiv4.style.display = 'none';
					info4.style.display = 'none';
					results.style.display = 'none';
					resultsDiv.style.display = 'none';
					break;
				case 1:
					result1 = 'User';
					result2 = 'ID';
					infoDiv1.style.display = 'none';
					info1.style.display = 'none';
					infoDiv2.style.display = null;
					info2.style.display = null;
					infoDiv3.style.display = 'none';
					info3.style.display = 'none';
					infoDiv4.style.display = 'none';
					info4.style.display = 'none';
					inputType.style.display = 'none';
					inputTypeDiv.style.display = 'none';
					results.style.display = 'none';
					resultsDiv.style.display = 'none';
					break;
				case 2:
					result1 = 'Video'
					result2 = 'ID';
					infoDiv1.style.display = 'none';
					info1.style.display = 'none';
					infoDiv2.style.display = 'none';
					info2.style.display = 'none';
					infoDiv3.style.display = null;
					info3.style.display = null;
					infoDiv4.style.display = 'none';
					info4.style.display = 'none';
					inputType.style.display = 'none';
					inputTypeDiv.style.display = 'none';
					results.style.display = null;
					resultsDiv.style.display = null;
					break;
				case 3:
					result1 = 'Game';
					result2 = inputList2[parseInt(inputType.value)];
					if(parseInt(info4.value) < 3) {
						inputType.style.display = null;
						inputTypeDiv.style.display = null;
					} else {
						inputType.style.display = 'none';
						inputTypeDiv.style.display = 'none';
					};
					infoDiv1.style.display = 'none';
					info1.style.display = 'none';
					infoDiv2.style.display = 'none';
					info2.style.display = 'none';
					infoDiv3.style.display = 'none';
					info3.style.display = 'none';
					infoDiv4.style.display = null;
					info4.style.display = null;
					results.style.display = 'none';
					resultsDiv.style.display = 'none';
					break;
			}

			document.getElementById('tempName1').innerHTML = result1;
			document.getElementById('tempName2').innerHTML = result2;
		}

		glob.onChange2 = function(event) {
			const id1 = parseInt(document.getElementById('type').value);
			const id2 = parseInt(document.getElementById('inputtype').value);

			var result = '';
			if(id1 == 0) {
				switch(id2) {
					case 0:
						result = 'ID';
						break;
					case 1:
						if(id2 > 0) {
							result = 'Login Name';
						} else {
							result = 'ID';
						}
						break;
				}
			} else if(id1 == 3) {
				switch(id2) {
					case 0:
						result = 'ID';
						break;
					case 1:
						result = 'Name';
				}
			} else {
				result = 'ID';
			}
			document.getElementById('tempName2').innerHTML = result;
		}

		glob.onChange3 = function(event) {
			const id4 = parseInt(document.getElementById('info1').value);
			const inputType = document.getElementById('inputtype');
			const inputTypeDiv = document.getElementById('divinputtype');
			const inputList1 = ['ID', 'Login Name'];

			var result2 = '';
			if(id4 < 9) {
				inputType.style.display = null;
				inputTypeDiv.style.display = null;
				result2 = inputList1[parseInt(inputType.value)];
			} else {
				inputType.style.display = 'none';
				inputTypeDiv.style.display = 'none';
				result2 = 'ID';
			}
			document.getElementById('tempName2').innerHTML = result2;
		}

		glob.onChange4 = function(event) {
			const id1 = parseInt(document.getElementById('type').value);
			const id5 = parseInt(document.getElementById('info4').value);
			const inputType = document.getElementById('inputtype');
			const inputTypeDiv = document.getElementById('divinputtype');

			if(id1 == 3) {
				if(parseInt(id5) < 3) {
					inputType.style.display = null;
					inputTypeDiv.style.display = null;
				} else {
					inputType.style.display = 'none';
					inputTypeDiv.style.display = 'none';
				}
			} else if(id1 == 1 || id1 == 2) {
				inputType.style.display = 'none';
				inputTypeDiv.style.display = 'none';
			} else {
				inputType.style.display = null;
				inputTypeDiv.style.display = null;
			}
		}

		document.getElementById('type');
		document.getElementById('inputtype').style.display = null;
		document.getElementById('divinputtype').style.display = null;
		document.getElementById('info1');
		document.getElementById('info4');

		glob.onChange1(document.getElementById('type'));
		glob.onChange2(document.getElementById('inputtype'));
		glob.onChange3(document.getElementById('info1'));
		glob.onChange4(document.getElementById('info4'));
		glob.variableChange(document.getElementById('storage'), 'varNameContainer');
	},

	action: function (cache) {
		const data = cache.actions[cache.index];
		const _this = this;
		const WrexMODS = this.getWrexMods();
		//const request = WrexMODS.require('request');

		const input = this.evalMessage(data.input, cache);
		const clientID = this.evalMessage(data.clientid, cache);
		const sourceType = parseInt(data.type);
		const inputType = parseInt(data.inputtype);
		var searchResults = parseInt(data.results);
		var infoType = 0;
		const info1 = parseInt(data.info1);
		const info2 = parseInt(data.info2);
		const info3 = parseInt(data.info3);
		const info4 = parseInt(data.info4);
		switch(sourceType) {
			case 0:
				infoType = info1;
				break;
			case 1:
				infoType = info2;
				break;
			case 2:
				infoType = info3;
				break;
			case 3:
				infoType = info4;
				break;
		}

		if(!clientID) {return console.log('Please insert a client id!')};
		if(!input) {return console.log('Please insert something to search for!')};

		if(searchResults > 0) {
			if(searchResults > 100) {
				searchResults = 100;
			}
		} else {
			searchResults = 20;
		}

		if(sourceType == 0) {
			if(inputType == 0 || infoType == 9) {
				if(infoType < 9) {
					var options = {
						url: `https://api.twitch.tv/helix/users?id=${input}`,
						headers: {
							'Client-ID': `${clientID}`
						}
					}
				} else {
					var options = {
						url: `https://api.twitch.tv/helix/users/follows?to_id=${input}&first=2`,
						headers: {
							'Client-ID': `${clientID}`
						}
					}
				}
				
				function callback(error, response, body) {
					if(!error && response.statusCode == 200) {
					  	var info = JSON.parse(body);
					  	var result = undefined;
						if(!info.data[0]) {
							console.log(`No results for ${input}.`);
							return _this.callNextAction(cache);
						}
						switch(infoType) {
							case 0: result = info.data[0].id; break;
							case 1: result = info.data[0].login; break;
							case 2: result = info.data[0].display_name; break;
							case 3: result = info.data[0].type; break;
							case 4: result = info.data[0].broadcaster_type; break;
							case 5: result = info.data[0].description; break;
							case 6: result = info.data[0].profile_image_url; break;
							case 7: result = info.data[0].offline_image_url; break;
							case 8: result = info.data[0].view_count; break;
							case 9: result = info.total; break;
						}
						if(result !== undefined) {
							const storage = parseInt(data.storage);
							const varName = _this.evalMessage(data.varName, cache);
							_this.storeValue(result, storage, varName, cache);
							_this.callNextAction(cache);
						}
					} else {
						console.error(error);
					}
				}
				request(options, callback);

			} else if(inputType == 1 && infoType < 9) {

				var options = {
					url: `https://api.twitch.tv/helix/users?login=${input}`,
					headers: {
						'Client-ID': `${clientID}`
					}
				};
				function callback(error, response, body) {
					if(!error && response.statusCode == 200) {
					  	var info = JSON.parse(body);
					  	var result = undefined;
						if(!info.data[0]) {
							console.log(`No results for ${input}.`);
							return _this.callNextAction(cache);
						}
						switch(infoType) {
							case 0: result = info.data[0].id; break;
							case 1: result = info.data[0].login; break;
							case 2: result = info.data[0].display_name; break;
							case 3: result = info.data[0].type; break;
							case 4: result = info.data[0].broadcaster_type; break;
							case 5: result = info.data[0].description; break;
							case 6: result = info.data[0].profile_image_url; break;
							case 7: result = info.data[0].offline_image_url; break;
							case 8: result = info.data[0].view_count; break;
						}
						if(result !== undefined) {
							const storage = parseInt(data.storage);
							const varName = _this.evalMessage(data.varName, cache);
							_this.storeValue(result, storage, varName, cache);
							_this.callNextAction(cache);
						}
					} else {
						console.error(error);
					}
				};
				request(options, callback);

			} else {
				return console.log('Please select either "User ID" or "User Login Name"!');
			}

		} else if(sourceType == 1) {
			var options = {
				url: `https://api.twitch.tv/helix/streams?user_id=${input}`,
				headers: {
					'Client-ID': `${clientID}`
				}
			};
			function callback(error, response, body) {
				if(!error && response.statusCode == 200) {
					var info = JSON.parse(body);
					var result = undefined;
					var result2 = false;
					if(!info.data[0]) {
						if(infoType == 5) {
							const storage = parseInt(data.storage);
							const varName = _this.evalMessage(data.varName, cache);
							_this.storeValue(result2, storage, varName, cache);
						} else {
							console.log(`No results for ${input}.`);
						}
						return _this.callNextAction(cache);
					}
					switch(infoType) {
						case 0: result = info.data[0].id; break;
						case 1: result = info.data[0].user_id; break;
						case 2: result = info.data[0].user_name; break;
						case 3: result = info.data[0].game_id; break;
						case 4: result = info.data[0].community_ids; break;
						case 5: result2 = true; break;
						case 6: result = info.data[0].title; break;
						case 7: result = info.data[0].viewer_count; break;
						case 8: result = info.data[0].started_at; break;
						case 9: result = info.data[0].language; break;
						case 10: result = info.data[0].thumbnail_url.replace('{width}', '1920').replace('{height}', '1280'); break;
						case 11: result = info.data[0].tag_ids; break;
					}
					if(result !== undefined) {
						const storage = parseInt(data.storage);
						const varName = _this.evalMessage(data.varName, cache);
						_this.storeValue(result, storage, varName, cache);
						_this.callNextAction(cache);
					} else {
						const storage = parseInt(data.storage);
						const varName = _this.evalMessage(data.varName, cache);
						_this.storeValue(result2, storage, varName, cache);
						_this.callNextAction(cache);
					}
				} else {
					console.error(error);
				}
			}
			request(options, callback);

		} else if(sourceType == 2) {
			var options = {
				url: `https://api.twitch.tv/helix/videos?user_id=${input}&first=${searchResults}`,
				headers: {
					'Client-ID': `${clientID}`
				}
			};
			function callback(error, response, body) {
				if(!error && response.statusCode == 200) {
					var info = JSON.parse(body);
					var result = [];
					if(!info.data[0]) {
						console.log(`No results for ${input}.`);
						return _this.callNextAction(cache);
					}
					switch(infoType) {
						case 0: info.data.forEach(video => result.push(video.id)); break;
						case 1: info.data.forEach(video => result.push(video.user_id)); break;
						case 2: info.data.forEach(video => result.push(video.user_name)); break;
						case 3: info.data.forEach(video => result.push(video.title)); break;
						case 4: info.data.forEach(video => result.push(video.description)); break;
						case 5: info.data.forEach(video => result.push(video.created_at)); break;
						case 6: info.data.forEach(video => result.push(video.published_at)); break;
						case 7: info.data.forEach(video => result.push(video.url)); break;
						case 8: info.data.forEach(video => result.push(video.thumbnail_url.replace('%{width}', '1920').replace('%{height}', '1280'))); break;
						case 9: info.data.forEach(video => {if(video.viewable !== '' || video.viewable !== undefined) {if(video.viewable == 'public') {result.push(true)} else if(video.viewable == 'private') {result.push(false)}}}); break;
						case 10: info.data.forEach(video => result.push(video.view_count)); break;
						case 11: info.data.forEach(video => result.push(video.language)); break;
						case 12: info.data.forEach(video => result.push(video.type)); break;
						case 13: info.data.forEach(video => result.push(video.duration)); break;
					};
					const storage = parseInt(data.storage);
					const varName = _this.evalMessage(data.varName, cache);
					_this.storeValue(result, storage, varName, cache);
					_this.callNextAction(cache);
				} else {
					console.error(error);
				}
			}
			request(options, callback);

		} else if(sourceType == 3) {
			if(inputType == 0) {
				if(infoType < 3) {
					var options = {
						url: `https://api.twitch.tv/helix/games?id=${input}`,
						headers: {
							'Client-ID': `${clientID}`
						}
					};
				} else {
					var options = {
						url: 'https://api.twitch.tv/helix/games/top',
						headers: {
							'Client-ID': `${clientID}`
						}
					};
				}
				function callback(error, response, body) {
					if(!error && response.statusCode == 200) {
						var info = JSON.parse(body);
						var result = undefined;
						var result2 = [];
						if(!info.data[0]) {
							console.log(`No results for ${input}.`);
							return _this.callNextAction(cache);
						}
						switch(infoType) {
							case 0: result = info.data[0].id.toString(); break;
							case 1: result = info.data[0].name.toString(); break;
							case 2: result = info.data[0].box_art_url.replace('{width}', '1300').replace('{height}', '1730'); break;
							case 3: info.data.forEach(game => result2.push(game.id)); break;
							case 4: info.data.forEach(game => result2.push(game.name)); break;
							case 5: info.data.forEach(game => result2.push(game.box_art_url.replace('{width}', '1300').replace('{height}', '1730'))); break;
						}
						if(result !== undefined) {
							const storage = parseInt(data.storage);
							const varName = _this.evalMessage(data.varName, cache);
							_this.storeValue(result, storage, varName, cache);
							_this.callNextAction(cache);
						} else {
							const storage = parseInt(data.storage);
							const varName = _this.evalMessage(data.varName, cache);
							_this.storeValue(result2, storage, varName, cache);
							_this.callNextAction(cache);
						}
					} else {
						console.error(error);
					}
				}
				request(options, callback);

			} else if(inputType == 1) {

				if(infoType < 3) {
					var options = {
						url: `https://api.twitch.tv/helix/games?id=${input}`,
						headers: {
							'Client-ID': `${clientID}`
						}
					};
				} else {
					var options = {
						url: `https://api.twitch.tv/helix/games/top?first=${searchResults}`,
						headers: {
							'Client-ID': `${clientID}`
						}
					};
				}
				function callback(error, response, body) {
					if(!error && response.statusCode == 200) {
						var info = JSON.parse(body);
						var result = undefined;
						var result2 = [];
						if(!info.data[0]) {
							console.log(`No results for ${input}.`);
							return _this.callNextAction(cache);
						}
						switch(infoType) {
							case 0: result = info.data[0].id.toString(); break;
							case 1: result = info.data[0].name.toString(); break;
							case 2: result = info.data[0].box_art_url.replace('{width}', '1300').replace('{height}', '1730'); break;
							case 3: info.data.forEach(game => result2.push(game.id)); break;
							case 4: info.data.forEach(game => result2.push(game.name)); break;
							case 5: info.data.forEach(game => result2.push(game.box_art_url.replace('{width}', '1300').replace('{height}', '1730'))); break;
						}
						if(result !== undefined) {
							const storage = parseInt(data.storage);
							const varName = _this.evalMessage(data.varName, cache);
							_this.storeValue(result, storage, varName, cache);
							_this.callNextAction(cache);
						} else {
							const storage = parseInt(data.storage);
							const varName = _this.evalMessage(data.varName, cache);
							_this.storeValue(result2, storage, varName, cache);
							_this.callNextAction(cache);
						}
					} else {
						console.error(error);
					}
				}
				request(options, callback);

			} else {
				return console.log('Please select either "Game ID" or "Game Name"!');
			}
		} else {
			return console.log('Please select either "Channel", "Stream", "Video" or "Game"!');
		}
	},

	mod: function (DBM) {
	}

};
