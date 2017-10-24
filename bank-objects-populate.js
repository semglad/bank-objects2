var bank = [];

bank.push(bankObjects.bank('Osuuspankki', 'OKOYFIHH'));
bank.push(bankObjects.bank('Nordea', 'NORDFIHH'));
bank.push(bankObjects.bank('POP pankki', 'POPPFIHH'));
bank.push(bankObjects.bank('Uusi pankki', 'UUSIPANK'));

bank[0].customers.push(bankObjects.customer('Teppo', 'Testaaja'));
bank[0].customers.push(bankObjects.customer('Tiina', 'Testaaja'));
bank[1].customers.push(bankObjects.customer('Maija', 'Meikäläinen'));
bank[1].customers.push(bankObjects.customer('Matti', 'Meikäläinen'));
bank[2].customers.push(bankObjects.customer('Sakari', 'Sukka'));
bank[2].customers.push(bankObjects.customer('Susanna', 'Sukka'));

bank[0].customers[0].accounts.push(bankObjects.account('FI7856200910000230', 'Tepon tili', 25));
bank[0].customers[0].accounts.push(bankObjects.account('FI2046895327432907', 'Tepon toinen tili', 50));
bank[0].customers[1].accounts.push(bankObjects.account('FI7545621510000230', null, 125));
bank[1].customers[0].accounts.push(bankObjects.account('FI0656200930000210', 'Maijan tili', 125));
bank[1].customers[1].accounts.push(bankObjects.account('FI8256200960003464', 'Matin tili', 125));
bank[2].customers[0].accounts.push(bankObjects.account('FI7456200920000808', 'Sakarin tili', 0));

bank[0].customers[0].accounts[0].transactions.push(bankObjects.accountTransaction(10, '1.1.2017'));
bank[0].customers[0].accounts[0].transactions.push(bankObjects.accountTransaction(20, '1.3.2017'));
bank[0].customers[0].accounts[0].transactions.push(bankObjects.accountTransaction(-5, '1.5.2017'));
bank[0].customers[0].accounts[1].transactions.push(bankObjects.accountTransaction(10, '1.1.2017'));
bank[0].customers[0].accounts[1].transactions.push(bankObjects.accountTransaction(60, '1.3.2017'));
bank[0].customers[0].accounts[1].transactions.push(bankObjects.accountTransaction(-20, '1.5.2017'));
bank[0].customers[1].accounts[0].transactions.push(bankObjects.accountTransaction(50, '1.1.2017'));
bank[0].customers[1].accounts[0].transactions.push(bankObjects.accountTransaction(100, '1.3.2017'));
bank[0].customers[1].accounts[0].transactions.push(bankObjects.accountTransaction(-25, '1.5.2017'));
bank[1].customers[0].accounts[0].transactions.push(bankObjects.accountTransaction(50, '1.1.2017'));
bank[1].customers[0].accounts[0].transactions.push(bankObjects.accountTransaction(100, '1.3.2017'));
bank[1].customers[0].accounts[0].transactions.push(bankObjects.accountTransaction(-25, '1.5.2017'));
bank[1].customers[1].accounts[0].transactions.push(bankObjects.accountTransaction(50, '1.1.2017'));
bank[1].customers[1].accounts[0].transactions.push(bankObjects.accountTransaction(100, '1.3.2017'));
bank[1].customers[1].accounts[0].transactions.push(bankObjects.accountTransaction(-25, '1.5.2017'));