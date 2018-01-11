bankObjects.tempObj = undefined;

bankObjects.showBanks = function showBanks() {

    bankObjects.lastFunction = showBanks;

    function getResourceCallback(response) {
        bankObjects.bank = response;
        bankObjects.resetCurrentData();
        var anchor = bankObjects.showHeadersInTable(response, 'bank');
        bankObjects.showDataInTable('bank', anchor);
    }

    bankObjects.getResource('bank', getResourceCallback);
};

bankObjects.showHeadersInTable = function showHeadersInTable(obj, objType, bankId, customerId, accountId) {

    var anchor = document.getElementById('anchor');
    var table = document.createElement("table");
    table.setAttribute('class', 'dataTable');

    if (obj[0] === null)
        return table;

    var tr = document.createElement("tr");

    var objKeys = Object.keys(obj[0]);
    var objValues = Object.values(obj[0]);

    var onclickatt = document.createAttribute('onclick');

    switch (objType) {
        case 'bank':
            onclickatt.value = 'bankObjects.showBanks(bank)';
            break;

        case 'customer':
            onclickatt.value = "bankObjects.showBanks(bank)";
            break;

        case 'account':
            onclickatt.value = "bank[" + bankId + "].listCustomers(" + bankId + ")";
            break;

        case 'transaction':
            onclickatt.value = "bank[" + bankId + "].customers[" + customerId + "].listAccounts(" + bankId + ", " + customerId + ")";
            break;
    }

    var th = document.createElement("th");
    th.className = 'firstColumnHeader';
    bankObjects.showButton('back', th, onclickatt);
    tr.appendChild(th);

    for (var i = 0; i < objKeys.length; i++)
    {
        if (bankObjects.testIfNotTableType(objValues[i], objKeys[i]))
            continue;

        var td = document.createElement("th");
        td.className = objKeys[i] + 'Header';
        var nodeText = bankObjects.getTranslationFromDictionary(objKeys[i]);
        var textNode = document.createTextNode(nodeText);

        td.appendChild(textNode);
        tr.appendChild(td);
    }

    var thLast = document.createElement('th');
    thLast.className = 'lastColumn';

    var addOnclick = document.createAttribute('onclick');
    addOnclick.value = 'bankObjects.addObject(';
    bankObjects.showButton('add', thLast, addOnclick, null, objType, bankId, customerId, accountId);

    tr.appendChild(thLast);
    anchor.appendChild(tr);

    table.appendChild(tr);
    anchor.appendChild(table);

    return table;
};

bankObjects.showDataInTable = function showDataInTable (objType, anchor, bankId, customerId, transactions) {

    var list;

    switch (objType) {
        case 'bank':
            list = bankObjects.tempObj;
            break;

        case 'customer':
            list = bank[bankId].customers;
            break;

        case 'account':
            list = bankObjects.bank[bankId].customers[customerId].accounts;
            break;

        case 'transaction':
            list = transactions;
            break;
    }

    if (Object.values(list[0])[0] === null) {

        bankObjects.showEmptyRecord('firstColumn', anchor, objType);

        return;
    }

    for (var i = 0; i < list.length; i++) {

        var tr = document.createElement("tr");

        var listKeys = Object.keys(list[i]);
        var listValues = Object.values(list[i]);

        var tdFirst = document.createElement("td");
        tdFirst.className = 'firstColumn';
        if (i === list.length - 1)
            tdFirst.style = 'border-bottom: 1px solid black';

        if (objType !== 'transaction') {
            var onclick = document.createAttribute('onclick');

            switch (objType) {
                case 'bank':
                    onclick.value = 'bankObjects.editObject(\'bank\', ' + i + ')';
                    break;

                case 'customer':
                    onclick.value = 'bankObjects.editObject(\'customer\', ' + bankId + ', ' + i + ')';
                    break;

                case 'account':
                    onclick.value = 'bankObjects.editObject(\'account\', ' + bankId + ', ' + customerId + ', ' + i + ')';
            }

            bankObjects.showButton('edit', tdFirst, onclick);
        }

        tr.appendChild(tdFirst);

        for (var j = 0; j < listKeys.length; j++) {

            if (listValues[j] === null)
                listValues[j] = '';

            if (bankObjects.testIfNotTableType(listValues[j], listKeys[j]))
                continue;

            var nodeText = listValues[j];

            var td = document.createElement("td");
            td.className = listKeys[j];

            var link = document.createElement("a");
            var linkId = document.createAttribute("id");
            linkId.value = objType + i;

            var onclickatt = document.createAttribute("onclick");

            var handleOnclick = document.createAttribute('onclick');

            switch (objType) {
                case 'bank':
                    onclickatt.value = "bank[" + i + "].listCustomers(" + i + ")";
                    handleOnclick.value = 'bankObjects.deleteObject(\'' + objType + '\', ' + i + ')';
                    break;

                case 'customer':
                    onclickatt.value = "bank[" + bankId + "].customers[" + i +"].listAccounts(" + bankId + ", " + i + ")";
                    handleOnclick.value = 'bankObjects.deleteObject(\'' + objType + '\', ' + i + ', ' + bankId + ', ' + customerId + ')';
                    break;

                case 'account':
                    var accountIndex = _.findKey(bank[bankId].customers[customerId].accounts, ['iban', listValues[0]]);
                    onclickatt.value = 'bank[' + bankId + '].customers[' + customerId +'].accounts[' + accountIndex + '].listTransactions(' + bankId + ', ' + customerId + ', ' + i + ')';
                    handleOnclick.value = 'bankObjects.deleteObject(\'' + objType + '\', ' + i + ', ' + bankId + ', ' + customerId + ')';
                    break;

                case 'transaction':
                    handleOnclick.value = 'bankObjects.deleteObject(\''+ objType +  '\', ' + i + ', ' + bankId + ', ' + customerId + ', 0)';
                    break;

                default:
                    break;
            }

            link.setAttributeNode(onclickatt);

            var hrefatt = document.createAttribute("href");
            hrefatt.value = "#start";
            link.setAttributeNode(hrefatt);

            var linktext = document.createTextNode(nodeText);

            link.appendChild(linktext);

            if (objType !== 'transaction')
                td.appendChild(link);
            else
                td.appendChild(document.createTextNode(nodeText));

            if(i === list.length - 1)
                td.style = "border-bottom: 1px solid black";

            tr.appendChild(td);
        }

        var tdLast = document.createElement('td');
        tdLast.className = 'lastColumn';
        if (i === list.length - 1)
            tdLast.style = 'border-bottom: 1px solid black';
        bankObjects.showButton('delete', tdLast, handleOnclick);
        tr.appendChild(tdLast);

        anchor.appendChild(tr);
    }
};