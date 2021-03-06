module.exports = {

	name: "Add Member Role",

	section: "Member Control",

	subtitle: function(data) {
		const roles = ['Mentioned Role', '1st Author Role', '1st Server Role', 'Temp Variable', 'Server Variable', 'Global Variable'];
		const channels = ['Mentioned User', 'Command Author', 'Temp Variable', 'Server Variable', 'Global Variable'];
		return `${channels[parseInt(data.member)]} - ${roles[parseInt(data.role)]}`;
	},

	fields: ["member", "varName2", "reason", "role", "varName"],

	html: function(isEvent, data) {
		return `
	<div>
		<div style="float: left; width: 35%;">
			Source Role:<br>
			<select id="role" class="round" onchange="glob.roleChange(this, 'varNameContainer')">
				${data.roles[isEvent ? 1 : 0]}
			</select>
		</div>
		<div id="varNameContainer" style="display: none; float: right; width: 60%;">
			Variable Name:<br>
			<input id="varName" class="round" type="text" list="variableList"><br>
		</div>
	</div><br><br><br>
	<div>
		<div style="float: left; width: 93%;">
			Reason:<br>
			<input id="reason" class="round" type="text"><br>
		</div>
	</div><br><br><br>
	<div style="padding-top: 8px;">
		<div style="float: left; width: 35%;">
			Member:<br>
			<select id="member" class="round" onchange="glob.memberChange(this, 'varNameContainer2')">
				${data.members[isEvent ? 1 : 0]}
			</select>
		</div>
		<div id="varNameContainer2" style="display: none; float: right; width: 60%;">
			Variable Name:<br>
			<input id="varName2" class="round" type="text" list="variableList"><br>
		</div>
	</div>`;
	},

	init: function() {
		const {glob, document} = this;

		glob.roleChange(document.getElementById('role'), 'varNameContainer');
		glob.memberChange(document.getElementById('member'), 'varNameContainer2');
	},

	action: function(cache) {
		const data = cache.actions[cache.index];
		if (!cache.server) {
			this.callNextAction(cache);
			return;
		}
		const storage = parseInt(data.role);
		const varName = this.evalMessage(data.varName, cache);
		const role = this.getRole(storage, varName, cache);
		const storage2 = parseInt(data.member);
		const varName2 = this.evalMessage(data.varName2, cache);
		const member = this.getMember(storage2, varName2, cache);
		if(Array.isArray(member)) {
			this.callListFunc(member, "add", [role], reason).bind(this).catch(this.displayError.bind(this, data, cache));
		} else if(member && member[funcName]) {
			member.add(role, reason).bind(this).catch(this.displayError.bind(this, data, cache));
		};
		this.callNextAction(cache);
	},

	mod: function(DBM) {
	}

};