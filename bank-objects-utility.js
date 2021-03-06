bankObjects.language = 'fi';

bankObjects.serverUrl = 'http://localhost:63187/api/';

bankObjects.setLanguage = function setLanguage(language) {
    bankObjects.language = language;
};

bankObjects.getTranslationFromDictionary = function getTranslationFromDictionary(value) {

    var langDictionary = dictionary[bankObjects.language];
    return langDictionary[value];
};

bankObjects.testIfNotTableType = function testIfNotTableType(value, keyName) {

    if (typeof(value) !== 'string' && typeof(value) !== 'number' && value !== null)
        return true;
    else
        if (keyName === 'id')
            return true;
    return false;
};

bankObjects.getResource = function getResource (resourceName, onResponse) {
    var request = new XMLHttpRequest();

    request.open('GET', bankObjects.serverUrl + resourceName, true);

    request.send();

    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            bankObjects.tempObj = JSON.parse(request.responseText);
            onResponse(JSON.parse(request.responseText));
        }
    }
};

bankObjects.resetCurrentData = function resetCurrentData () {

    var anchor = document.getElementById('anchor');

    while(anchor.firstChild)
    {
        anchor.removeChild(anchor.firstChild);
    }

    anchor.appendChild(document.createElement("p"));
};

bankObjects.showEmptyRecord = function showEmptyRecord(className, anchor, objType) {

    var tr = document.createElement("tr");
    var tdFirst = document.createElement("td");
    tdFirst.className = className;
    tdFirst.style = 'border-bottom: 1px solid black';
    tr.appendChild(tdFirst);

    var td = document.createElement("td");
    td.className = 'emptyColumn';
    td.colSpan = anchor.firstChild.getElementsByTagName('th').length - 1;
    td.style = "border-bottom: 1px solid black";
    var tdTextNode = document.createTextNode(bankObjects.getTranslationFromDictionary(objType));
    td.appendChild(tdTextNode);
    tr.appendChild(td);

    anchor.appendChild(tr);
};

document.addEventListener('DOMContentLoaded', function() {
    bankObjects.showBanks();
    bankObjects.setFlags();
}, false);