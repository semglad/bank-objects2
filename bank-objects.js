bankObjects.lastFunction = bankObjects.showBanks;

bankObjects.bank = (function(name, bicCode) {

    // var bankName = name;
    // var bicCode = bicCode;
    var customers = [];

    function showCustomers(bankId) {

        bankObjects.lastFunction = showCustomers;
        bankObjects.lastParam1 = bankId;

        bankObjects.resetCurrentData();

        if (customers.length === 0)
            customers.push(bankObjects.customer(null, null));
        var anchor = bankObjects.showHeadersInTable(customers, 'customer', bankId);
        bankObjects.showDataInTable('customer', anchor, bankId);
    }

    return {
        bankName: name,
        bankBicCode: bicCode,
        customers: customers,
        listCustomers: showCustomers
    }

});

bankObjects.customer = (function(firstName, lastName) {
    // var firstName = firstName;
    // var lastName = lastName;
    var accounts = [];

    function showAccounts(bankId, customerId) {

        bankObjects.lastFunction = showAccounts;
        bankObjects.lastParam1 = bankId;
        bankObjects.lastParam2 = customerId;

        bankObjects.resetCurrentData();

        if (accounts.length === 0)
            accounts.push(bankObjects.account(null, null, null));
        var anchor = bankObjects.showHeadersInTable(accounts, 'account', bankId, customerId);
        bankObjects.showDataInTable('account', anchor, bankId, customerId);
    }

    return {
        firstName: firstName,
        lastName: lastName,
        accounts: accounts,
        listAccounts: showAccounts
    }
});

bankObjects.account = (function(iban, accountName, balance) {
    // var iban = iban;
    // var accountName = accountName;
    // var balance = balance;
    var transactions = [];

    function showTransactions(bankId, customerId, accountId) {

        bankObjects.lastFunction = showTransactions;
        bankObjects.lastParam1 = bankId;
        bankObjects.lastParam2 = customerId;
        bankObjects.lastParam3 = accountId;

        bankObjects.resetCurrentData();

        if (transactions.length === 0)
            transactions.push(bankObjects.accountTransaction(null, null));
        var anchor = bankObjects.showHeadersInTable(transactions, 'transaction', bankId, customerId, accountId);
        bankObjects.showDataInTable('transaction', anchor, bankId, customerId, transactions, accountId);
    }

    return {
        iban: iban,
        accountName: accountName,
        balance: balance,
        transactions: transactions,
        listTransactions: showTransactions
    }
});

bankObjects.accountTransaction = (function(amount, timeStamp) {
    // var amount = amount;
    // var timeStamp = timeStamp;

    return {
        timeStamp: timeStamp,
        amount: amount
    }
});