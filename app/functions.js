var moment = require( 'moment' );

exports.sortByStartDate = function sortByStartDate(a,b) {
	console.log("sortByStartDate");
	if (a['wpcf-startdate'] < b['wpcf-startdate'])
		return 1;
	if (a['wpcf-startdate'] > b['wpcf-startdate'])
		return -1;
	return 0;
};

exports.formatLocation = function formatLocation(l) {
	//console.log(l);
	var loc = {};
	for (var item in l){
		var locA = l[item].split(";");
		if (!loc[locA[2]]) loc[locA[2]] = {};
		if (!loc[locA[2]][locA[1]]) loc[locA[2]][locA[1]] = {};
		if (!loc[locA[2]][locA[1]][locA[0]]) loc[locA[2]][locA[1]][locA[0]] = {lng:locA[3],lat:locA[4]};
	}
	//console.log(loc);
	return loc;
};

exports.getGrid = function getGrid(data) {
	var row=0;
	var col=0;
	var grid = [];
	var rowsN = parseInt(data['wpcf-rows']);
	var columnsN = parseInt(data['wpcf-columns']);
	//if (rowsN>0 && columnsN>0) {
	//}
	if (data['wpcf-same-rows-height']==1) {
		while (row<rowsN) {
			grid[row] = [];
			while (col<columnsN) {
				grid[row][col] = {};
				grid[row][col].tit = data['wpcf-row-'+(row+1)+'-col-'+(col+1)+'-title'];
				grid[row][col].stit = data['wpcf-row-'+(row+1)+'-col-'+(col+1)+'-subtitle'];
				grid[row][col].box = data['wpcf-row-'+(row+1)+'-col-'+(col+1)+'-html-box'];
				col++;
			}
			col=0;
			row++;
		}
	} else {
		while (col<columnsN) {
			grid[col] = [];
			while (row<rowsN) {
				grid[col][row] = {};
				grid[col][row].tit = data['wpcf-row-'+(row+1)+'-col-'+(col+1)+'-title'];
				grid[col][row].stit = data['wpcf-row-'+(row+1)+'-col-'+(col+1)+'-subtitle'];
				grid[col][row].box = data['wpcf-row-'+(row+1)+'-col-'+(col+1)+'-html-box'];
				row++;
			}
			row=0;
			col++;
		}
	}
	return grid;
};

exports.fixResults = function fixResults(data) {
	for (var item in data){
		if (data[item].title) data[item] = this.fixResult(data[item]);
	}
	//data.sort("this.sortByStartDate");

	return data;
};

exports.fixResult = function fixResult(data) {
	if (data.date) {
		data.date = moment(data.date).utc().format();
		data.dateHR = moment(data.date).utc().format("MMMM, Do YYYY, h:mm a");
	}
	if (data['wpcf-startdate']){
		data['wpcf-startdate'] = parseInt(data['wpcf-startdate'][0]);
		data.startdateISO = moment(data['wpcf-startdate']*1000).utc().format();
		data.startdateHR = moment(data['wpcf-startdate']*1000).utc().format("MMMM, Do YYYY, h:mm a");
	}
	if (data['wpcf-enddate']){
		data['wpcf-enddate'] = parseInt(data['wpcf-enddate'][0]);
		data.enddateISO = moment(data['wpcf-enddate']*1000).utc().format();
		data.enddateHR = moment(data['wpcf-enddate']*1000).utc().format("MMMM, Do YYYY, h:mm a");
	}
	if (data['wpcf-location']) data['wpcf-location'] = this.formatLocation(data['wpcf-location']);
	if (data['data_evento'] && data['data_evento'][0]) data['data_evento'] = data['data_evento'][0];
	if (!data['data_evento']) data['data_evento'] = [moment(data['date']).utc().format("MMMM D, YYYY")];
	return data;
};