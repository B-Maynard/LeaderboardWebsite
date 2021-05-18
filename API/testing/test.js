const Database = require('../utils/database.js');

async function main() {
    await Database.ConnectClient();
    await Database.listDatabases();
    await Database.DisconnectClient();
    
    return;
}

main();