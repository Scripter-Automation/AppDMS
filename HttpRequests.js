

function doGet(e){

    
    let res;
    const req =  e.parameter;
    const queryString = req.query;
    const command = req.command;
    const table = req.table;
    const DataBase = ParseDatabaseByName(req.dataBase)

    const APIKey = req.APIKey
    
    if(!parseAPIKey(APIKey)){

        res = {error, msg: "APIKey no es correcto"}
        
        return ContentService.createTextOutput(JSON.stringify(res)).setMimeType(ContentService.MimeType.JSON);
    }

    if(command === "Query"){
        DataBase.getSheetByName("Main").getRange("A1")
        .setFormula(`=Query(${table}!1:${Main.getLastRow()}, ${queryString},1)`);
    }

    res = ParseSheetByDatabase(DataBase, "Main");

    

    return ContentService.createTextOutput(JSON.stringify(res)).setMimeType(ContentService.MimeType.JSON);


}

function doPost(e){
    const body = e.postData.contents;
    let res;
    const req = JSON.parse(body);


    const APIKey = req.APIKey
    
    if(!parseAPIKey(APIKey)){

        res = {error, msg: "APIKey no es correcto"}
        
        return ContentService.createTextOutput(JSON.stringify(res)).setMimeType(ContentService.MimeType.JSON);
    }


    const PrimaryKey = req.primaryKey
    const DataBase = ParseDatabaseByName(req.dataBase)
    const DataBaseName = req.dataBase
    const command = req.command
    const table = req.table
    const data = req.data
    const column = req.col
    const headers = req.headers
    const costumFunction = req.costumFunction

    
    switch(command){
        case "insert":

            res = createRow(DataBase ,table,data)

        break;

        case "updateValue":

            res = updateValue(DataBase, table, PrimaryKey, data, column)
            
        break;

        case "updateRow":
            res = updateRow(DataBase,table, PrimaryKey, data)

        break;

        case "dropRow":

            res = dropRow(DataBase, table, PrimaryKey)

        break;
        case "createTable":

            res = createTable(DataBase, table, headers)

        break;
        case "dropTable":

            res = dropTable(DataBase, table)

        break;
        case "costumFunction":

            res = costumFunction()

        break;
        case "createDatabase":

        res = CreateDatabase(DataBaseName)

        break;
        case "DropDatabase":
        
        res = DropDatabase(DataBaseName)

        break;



    }

    
    return ContentService.createTextOutput(JSON.stringify(res)).setMimeType(ContentService.MimeType.JSON);

}
