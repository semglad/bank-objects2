bankObjects.setFlags = function setFlags() {

    var anchor = document.getElementById('languageColumn');

    var langNames = Object.keys(dictionary);

    for (var i = 0; i < langNames.length; i++) {
        var inputElementOnClick = document.createAttribute('onclick');
        inputElementOnClick.value = 'bankObjects.setLanguage(\'' + langNames[i] + '\')';
        var inputElement = bankObjects.showButton('language', anchor, inputElementOnClick, langNames[i]);
        inputElement.addEventListener('click', function(){
            // bankObjects.language = langNames[i];

            if (bankObjects.lastFunction !== bankObjects.showBanks)
                bankObjects.lastFunction(bankObjects.lastParam1, bankObjects.lastParam2, bankObjects.lastParam3, bankObjects.lastParam4, bankObjects.lastParam5);
            else
                bankObjects.showBanks(bank);
        });

        anchor.appendChild(inputElement);
        anchor.appendChild(document.createTextNode(' '));
    }
};

bankObjects.addObject = function addObject(objType, bankId, customerId, accountId) {

    bankObjects.lastFunction = bankObjects.addObject;
    bankObjects.lastParam1 = objType;
    bankObjects.lastParam2 = bankId;
    bankObjects.lastParam3 = customerId;
    bankObjects.lastParam4 = accountId;

    bankObjects.resetCurrentData();
    var anchor = document.getElementById('anchor');
    var textNode = document.createTextNode(bankObjects.getTranslationFromDictionary('prompt' + objType[0].toUpperCase() + objType.slice(1)));
    anchor.appendChild(document.createElement('p'));
    anchor.appendChild(textNode);

    for (var i = 0; i < 2; i++) {
        var inputNode = document.createElement('input');
        inputNode.type = 'text';
        inputNode.id = 'textInput' + i;
        inputNode.className = 'inputText';
        inputNode.placeholder = bankObjects.getTranslationFromDictionary('placeholder' + objType[0].toUpperCase() + objType.slice(1) + i);
        anchor.appendChild(document.createElement('p'));
        anchor.appendChild(inputNode);
    }

    var submitButton = document.createElement('input');
    submitButton.type = 'image';
    submitButton.src = 'resources\\images\\submit.png';
    submitButton.id = 'buttonSubmit';
    submitButton.className = 'submitButton';
    anchor.appendChild(document.createElement('p'));
    submitButton.addEventListener('click', function() {

        var value1 = document.getElementById('textInput0').value;
        var value2 = document.getElementById('textInput1').value;

        switch (objType) {
            case 'bank':
                bank.push(bankObjects.bank(value1, value2));
                window["bankObjects"]["showBanks"](bank);
                break;

            case 'customer':
                if (bank[bankId].customers.length === 1 && bank[bankId].customers[0].firstName === null)
                    bank[bankId].customers.splice(0, 1);
                bank[bankId].customers.push(bankObjects.customer(value1, value2));
                bank[bankId]["listCustomers"](bankId);
                break;

            case 'account':
                if (bank[bankId].customers[customerId].accounts.length === 1 && bank[bankId].customers[customerId].accounts[0].iban === null)
                    bank[bankId].customers[customerId].accounts.splice(0, 1);
                bank[bankId].customers[customerId].accounts.push(bankObjects.account(value1, value2, 0));
                bank[bankId].customers[customerId]["listAccounts"](bankId, customerId);
                break;

            case 'transaction':
                if (bank[bankId].customers[customerId].accounts[accountId].transactions.length === 1 && bank[bankId].customers[customerId].accounts[accountId].transactions[0].timeStamp === null)
                    bank[bankId].customers[customerId].accounts[accountId].transactions.splice(0, 1);
                bank[bankId].customers[customerId].accounts[accountId].transactions.push(bankObjects.accountTransaction(parseFloat(value2.replace(",", ".")), value1));
                bank[bankId].customers[customerId].accounts[accountId].balance = bank[bankId].customers[customerId].accounts[accountId].balance + parseFloat(value2.replace(",", "."));
                bank[bankId].customers[customerId].accounts[accountId]["listTransactions"](bankId, customerId, accountId);
                break;
        }
    });

    anchor.appendChild(submitButton);

    var cancelButton = document.createElement('input');
    cancelButton.type = 'image';
    cancelButton.src = 'resources\\images\\cancel.png';
    cancelButton.id = 'buttonCancel';
    cancelButton.className = 'cancelButton';
    cancelButton.addEventListener('click', function() {

        switch (objType) {
            case 'bank':
                window["bankObjects"]["showBanks"](bank);
                break;

            case 'customer':
                bank[bankId]["listCustomers"](bankId);
                break;

            case 'account':
                bank[bankId].customers[customerId]["listAccounts"](bankId, customerId);
                break;

            case 'transaction':
                bank[bankId].customers[customerId].accounts[accountId]["listTransactions"](bankId, customerId, accountId);
                break;
        }
    });

    anchor.appendChild(cancelButton);
};

bankObjects.editObject = function editObject(objType, bankId, customerId, accountId, transactionId) {

    bankObjects.lastFunction = bankObjects.editObject;
    bankObjects.lastParam1 = objType;
    bankObjects.lastParam2 = bankId;
    bankObjects.lastParam3 = customerId;
    bankObjects.lastParam4 = accountId;
    bankObjects.lastParam5 = transactionId;

    bankObjects.resetCurrentData();
    var anchor = document.getElementById('anchor');
    var textNode = document.createTextNode(bankObjects.getTranslationFromDictionary('prompt' + objType[0].toUpperCase() + objType.slice(1)));
    anchor.appendChild(document.createElement('p'));
    anchor.appendChild(textNode);

    for (var i = 0; i < 2; i++) {
        var inputNode = document.createElement('input');
        inputNode.type = 'text';
        inputNode.id = 'textInput' + i;
        inputNode.className = 'inputText';

        switch (objType) {
            case 'bank':
                if (i === 0)
                    inputNode.value = bank[bankId].bankName;
                else
                    inputNode.value = bank[bankId].bankBicCode;
                break;

            case 'customer':
                if (i === 0)
                    inputNode.value = bank[bankId].customers[customerId].firstName;
                else
                    inputNode.value = bank[bankId].customers[customerId].lastName;
                break;

            case 'account':
                if (i === 0)
                    inputNode.value = bank[bankId].customers[customerId].accounts[accountId].iban;
                else
                    inputNode.value = bank[bankId].customers[customerId].accounts[accountId].accountName;
                break;

            case 'transaction':
                if (i === 0)
                    inputNode.value = bank[bankId].customers[customerId].accounts[accountId].transactions[transactionId].timeStamp;
                else
                    inputNode.value = bank[bankId].customers[customerId].accounts[accountId].transactions[transactionId].amount;
                break;
        }
        anchor.appendChild(document.createElement('p'));
        anchor.appendChild(inputNode);
    }

    var submitButton = document.createElement('input');
    submitButton.type = 'image';
    submitButton.src = 'resources\\images\\submit.png';
    submitButton.id = 'buttonSubmit';
    submitButton.className = 'submitButton';
    anchor.appendChild(document.createElement('p'));
    submitButton.addEventListener('click', function() {

        var value1 = document.getElementById('textInput0').value;
        var value2 = document.getElementById('textInput1').value;

        switch (objType) {
            case 'bank':
                bank[bankId].bankName = value1;
                bank[bankId].bankBicCode = value2;
                window["bankObjects"]["showBanks"](bank);
                break;

            case 'customer':
                if (bank[bankId].customers.length === 1 && bank[bankId].customers[0].firstName === null)
                    bank[bankId].customers.splice(0, 1);
                bank[bankId].customers[customerId].firstName = value1;
                bank[bankId].customers[customerId].lastName = value2;
                bank[bankId]["listCustomers"](bankId);
                break;

            case 'account':
                if (bank[bankId].customers[customerId].accounts.length === 1 && bank[bankId].customers[customerId].accounts[0].iban === null)
                    bank[bankId].customers[customerId].accounts.splice(0, 1);
                bank[bankId].customers[customerId].accounts[accountId].iban = value1;
                bank[bankId].customers[customerId].accounts[accountId].accountName = value2;
                bank[bankId].customers[customerId]["listAccounts"](bankId, customerId);
                break;

            case 'transaction':
                if (bank[bankId].customers[customerId].accounts[accountId].transactions.length === 1 && bank[bankId].customers[customerId].accounts[accountId].transactions[0].timeStamp === null)
                    bank[bankId].customers[customerId].accounts[accountId].transactions.splice(0, 1);
                bank[bankId].customers[customerId].accounts[accountId].transactions[transactionId].timeStamp = value2;
                bank[bankId].customers[customerId].accounts[accountId].transactions[transactionId].amount = value1;
                bank[bankId].customers[customerId].accounts[accountId]["listTransactions"](bankId, customerId, accountId);
                break;
        }
    });

    anchor.appendChild(submitButton);

    var cancelButton = document.createElement('input');
    cancelButton.type = 'image';
    cancelButton.src = 'resources\\images\\cancel.png';
    cancelButton.id = 'buttonCancel';
    cancelButton.className = 'cancelButton';
    cancelButton.addEventListener('click', function() {

        switch (objType) {
            case 'bank':
                window["bankObjects"]["showBanks"](bank);
                break;

            case 'customer':
                bank[bankId]["listCustomers"](bankId);
                break;

            case 'account':
                bank[bankId].customers[customerId]["listAccounts"](bankId, customerId);
                break;

            case 'transaction':
                bank[bankId].customers[customerId].accounts[accountId]["listTransactions"](bankId, customerId, accountId);
                break;
        }
    });

    anchor.appendChild(cancelButton);
};

bankObjects.deleteObject = function deleteObject(objType, index, bankId, customerId, accountId) {
    var confirmation = confirm(bankObjects.getTranslationFromDictionary('confirmation'));
    if (confirmation === true) {
        switch (objType) {
            case 'bank':
                bank.splice(index, 1);
                break;

            case 'customer':
                bank[bankId].customers.splice(index, 1);
                break;

            case 'account':
                bank[bankId].customers[customerId].accounts.splice(index, 1);
                break;

            case 'transaction':
                bank[bankId].customers[customerId].accounts[accountId].balance = bank[bankId].customers[customerId].accounts[accountId].balance - bank[bankId].customers[customerId].accounts[accountId].transactions[index].amount;
                    bank[bankId].customers[customerId].accounts[accountId].transactions.splice(index, 1);
                break;
        }

        if (bankObjects.lastFunction !== bankObjects.showBanks)
            bankObjects.lastFunction(bankObjects.lastParam1, bankObjects.lastParam2);
        else
            bankObjects.showBanks(bank);

    }
};

bankObjects.showButton = function showButton(buttonType, anchor, onclick, langName, objType, bankId, customerId, accountId) {
    var button = document.createElement('input');
    button.type = 'image';

    if (buttonType === 'add') {

        switch (objType) {
            case "bank":
                onclick.value = onclick.value + '\'bank\')';
                break;

            case 'customer':
                onclick.value = onclick.value + '\'customer\', ' + bankId + ')';
                break;

            case 'account':
                onclick.value = onclick.value + '\'account\', ' + bankId + ', ' + customerId + ')';
                break;

            case 'transaction':
                onclick.value = onclick.value + '\'transaction\', ' + bankId + ', ' + customerId + ', ' + accountId + ')';
                break;
        }
    }

    if (buttonType === 'language') {
        button.src = 'resources\\images\\' + langName + '.jpg';
        button.id = 'btn' + buttonType[0].toUpperCase() + buttonType.slice(1) + langName[0] + langName.slice(1);
    }
    else
    {
        button.src = 'resources\\images\\' + buttonType + '.png';
        button.id = 'btn' + buttonType[0].toUpperCase() + buttonType.slice(1);
    }
    button.className = buttonType + 'Btn';

    button.setAttributeNode(onclick);
    anchor.appendChild(button);

    return button;
};