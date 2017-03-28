(function() {
//organise code into object and then call that object
var BN ={
	onLoad: function() {
		document.getElementById("searchRun").addEventListener('click', this.runSearch.bind(this));
		document.getElementById("addRun").addEventListener('click', this.runAdd.bind(this));
	},

	runSearch: function() {
		var criteria = this.getSearchCriteria();
		this.search(criteria);
	},

	getSearchCriteria: function() {
		var criteria = {name: null, gender: null};
		var name = document.getElementById("searchName");
		if(name.value!='') {
			criteria.name = name.value;
		}
		var gender = document.getElementById("searchGender");
		if(gender.value!='') {
			criteria.gender = gender.value;
		}
		name.value = '';
		gender.value = '';
		return criteria;
	},
	
	search: function(criteria) {
      if(criteria.name) {
      	this.callSearch(criteria).then( (function(details) {this.updateDetailResults(details, criteria);}).bind(this) );
      } else{
      	this.callSearch(criteria).then(this.updateNameList.bind(this));
      }
	},

	updateDetailResults: function(details, criteria) {
		//console.log("Access to criteria" + criteria.name);
		var message =  document.createElement('div');
		message.textContent = "Baby name details:";
	    var lineBreak = document.createElement('br');
		var list = document.getElementById("results");
        var itemGender = document.createElement('li');
        itemGender.textContent = "Gender: " + details.gender;
        var itemCount = document.createElement('li');
        itemCount.textContent = "Number of occurances: " + details.count;
        var itemFirstYear = document.createElement('li');
        itemFirstYear.textContent = "First Year: " + details.firstYear;
        var itemRecentYear = document.createElement('li');
        itemRecentYear.textContent = "Recent Year: " + details.recentYear;
        list.appendChild(message);
        list.appendChild(itemGender);
        list.appendChild(itemCount);
        list.appendChild(itemFirstYear);
        list.appendChild(itemRecentYear);
        list.appendChild(lineBreak);
	},

	updateNameList: function(nameContainer) {
		var message =  document.createElement('div');
		message.textContent = "Baby names list:";
		var lineBreak = document.createElement('br');
	    var list = document.getElementById("results");
	    message.textContent = "Baby names list:";
	    list.appendChild(message);
        nameContainer.names.map((entry) => {
        var item = document.createElement('li');
        item.textContent = entry;
        list.appendChild(item);
        });
        list.appendChild(lineBreak);
	},

	callSearch: function(criteria) {
        var uri = this.getServiceUri(criteria);
        return fetch(uri)
        .then( (response ) => { return response.json() })
        .catch( (e) => { alert(e); });
	},

	getServiceUri: function(criteria) {
		var uri;
	    if(criteria.gender) {
			uri = `/gender/${criteria.gender}/names`
		} else {
            uri = `/names`;
		}
		if(criteria.name) {
			uri = uri + `/${criteria.name}`;
		}
		return uri;
	},

	runAdd: function() {
		var entry = this.getAddInput();
		fetch('/names', {
			headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
			method: "POST", 
			body: JSON.stringify(entry)
		}).then((response) => {return this.reflectAddStatus(response, entry);})	
		.catch( (e) => { alert(e); });	
		//fire reflect add status only if post successful	
	},

	getAddInput: function() {
        var addInput = {name: null, gender: null, year: null};
		var name = document.getElementById("addName");
		if(name.value != '') {
              addInput.name = name.value;  
		}
		var gender = document.getElementById("addGender");
		if(gender.value != '') {
              addInput.gender = gender.value;    
		}
		var year = document.getElementById("addYear");
		if(year.value != '') {
              addInput.year = year.value;    
		}
		name.value = '';
		gender.value = '';
		year.value = '';
 		return addInput;
	},

	reflectAddStatus: function(response, entry) {
		if(entry == null) {
			return;
		}
		if(!response) {
			return;
		}
		if(entry.name!=null && entry.gender!=null && entry.year!=null) {
			var list = document.getElementById("results");
			var lineBreak = document.createElement('br');
			var message = "Added Record: " + entry.name + ", " + entry.gender +", " + entry.year;
			var messageDisplay = document.createElement('div');
			messageDisplay.textContent = message;
 			list.appendChild(messageDisplay);
 			list.appendChild(lineBreak);
		}
	}
	    } //BN
	if(typeof module !== 'undefined') {
    module.exports = BN;
  } else {
    window.addEventListener('load', BN.onLoad.bind(BN));
    window.BN = BN;
  }
})();