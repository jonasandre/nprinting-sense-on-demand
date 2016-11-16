var connectionSection = {
	type: "items",
	label: "NPrinting Connection",
	items: {

		server: {
			ref: "npsod.conn.server",
			label: "Server Connection",
			type: "string",
			expression: "optional"
		},

		testConn: {
			label: "Test Connection",
			component: "button",
			action: function(data) {
				//Test the connection by sending API request ntlm request
			}
		},

		app: {
			type: "string",
			component: "dropdown",
			label: "Choose App",
			ref: "npsod.conn.app",
			options: function(data) {
				return $.ajax({
					url: data.npsod.conn.server + 'api/v1/apps',
					method: 'GET',
					xhrFields: {
						withCredentials: true
					}
				}).then(function(response) {
					return response.data.items.map(function(app){
						return {
							value: app.id,
							label: app.name
						}
					});
				});
			}
		},

		report: {
			type: "string",
			component: "dropdown",
			label: "Choose Report",
			ref: "npsod.conn.report",
			options: function(data) {
				var requestUrl = data.npsod.conn.server 
								+ 'api/v1/reports' 
								+ '?appId=' + data.npsod.conn.app
								+ '&sort=+title';

				return $.ajax({
					url: requestUrl,
					method: 'GET',
					xhrFields: {
						withCredentials: true
					}
				}).then(function(response) {
					return response.data.items.map(function(report){
						return {
							value: report.id,
							label: report.title
						}
					});
				});
			}
		}
	}
};