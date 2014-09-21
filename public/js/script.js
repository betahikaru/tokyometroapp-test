(function (){

var TYPE_ODPT_TRAIN = "odpt:Train";
var TYPE_ODPT_TRAININFORMATION = "odpt:TrainInformation";
var TYPE_ODPT_STATIONTIMETABLE = "odpt:StationTimetable";
var TYPE_ODPT_STATIONFACILITY = "odpt:StationFacility";
var TYPE_ODPT_PASSENGERSURVEY = "odpt:PassengerSurvey";
var TYPE_ODPT_RAILWAYFARE = "odpt:RailwayFare";
var TYPE_UG_POI = "ug:Poi";
var TYPE_ODPT_STATION = "odpt:Station";
var TYPE_ODPT_RAILWAY = "odpt:Railway";


var id_datapoints_rdf_type = "js-datapoints_rdf_type";
var datapoints_rdf_type = document.getElementById(id_datapoints_rdf_type);
var id_datapoints_params = "js-datapoints_params";


function setInputElementsToWrapper(wrapperId, params) {
    var element = document.createElement('div');
    var wrapper = document.getElementById(wrapperId);
    if (wrapper.firstChild == null) {
	wrapper.appendChild(element);
    } else {
	wrapper.replaceChild(element, wrapper.firstChild);
    }
    var listWrapper = document.createElement('ul');
    for (var i=0; i < params.length; i++) {
	var tag = params[i]['tag'];
	var name = params[i]['name'];
	var listElement = document.createElement('li');
	var targetElementId = "js-" + name;
	if (tag == "input" || tag == "select") {
	    var labelTextElement = document.createTextNode(name);
	    var labelElement = document.createElement('label');
	    labelElement.for = targetElementId;
	    labelElement.appendChild(labelTextElement);
	    listElement.appendChild(labelElement);
	}
	if (tag == "input") {
	    var inputElement = document.createElement('input');
	    inputElement.id = targetElementId;
	    inputElement.type = params[i]['type'];
	    inputElement.name = name;
	    inputElement.value = params[i]['value'];
	    inputElement.className = params[i]['className'];
	    listElement.appendChild(inputElement);
	} else if (tag == "select") {
	    var selectElement = document.createElement('select');
	    selectElement.id = targetElementId;
	    selectElement.name = name;
	    selectElement.className = params[i]['className'];
	    var values = params[i]['value'];
	    for (var j=0; j<values.length; j++) {
		var optionTextElement = document.createTextNode(values[j]);
		var optionElement = document.createElement('option');
		optionElement.value = values[j];
		optionElement.appendChild(optionTextElement);
		selectElement.appendChild(optionElement);
	    }
	    listElement.appendChild(selectElement);
	}
	element.appendChild(listElement);
    }
}

function changeDatapointsRdfType() {
    var type = datapoints_rdf_type.value;
    var params;
    var odpt_railway = {
	"tag": "select",
	"name": "odpt_railway",
	"value": [
	    "odpt.Railway:TokyoMetro.Ginza",
	    "odpt.Railway:TokyoMetro.Marunouchi",
	    "odpt.Railway:TokyoMetro.Hibiya",
	    "odpt.Railway:TokyoMetro.Tozai",
	    "odpt.Railway:TokyoMetro.Chiyoda",
	    "odpt.Railway:TokyoMetro.Yurakucho",
	    "odpt.Railway:TokyoMetro.Hanzomon",
	    "odpt.Railway:TokyoMetro.Namboku",
	    "odpt.Railway:TokyoMetro.Fukutoshin"
	]
    };
    var odpt_operator = {
	"tag": "input",
	"type": "text",
	"name": "odpt_operator",
	"value": "odpt.Operator:TokyoMetro"
    };
    if (type == TYPE_ODPT_TRAIN) {
	params = [
	    odpt_railway
	];
    } else if (type == TYPE_ODPT_TRAININFORMATION) {
	params = [
	    odpt_railway,
	    odpt_operator
	];
    } else {
	params = [];
    }
    setInputElementsToWrapper(id_datapoints_params, params);
}

function bootstrap() {
    datapoints_rdf_type.addEventListener('change', changeDatapointsRdfType);
    changeDatapointsRdfType();
}

bootstrap();

})();
