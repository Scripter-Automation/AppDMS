function doGet(e){

    
    let res;
    const req =  e.parameter;
    const queryString = req.query;
    const command = req.comand;
    const table = req.table;
    const DataBase = ParseDatabaseSelector(req.dataBase)

    if(command === "Query"){
        DataBase.getSheetByName("Main").getRange("A1")
        .setFormula(`=Query(${table}!1:${Main.getLastRow()}, ${queryString},1)`);
    }

    res = ParseSheet(DataBase, "Main");

    

    return res

}

function doPost(e){
    const body = e.postData.contents;
    let res;
    const req = JSON.parse(body);

    const PrimaryKey = req.primaryKey
    const DataBase = ParseDatabaseSelector(req.dataBase)
    const command = req.command
    const table = req.table
    const data = req.data
    const column = req.col
    const headers = req.headers

    
    switch(command){
        case "create":

            res = createRow(DataBase ,table,data)

            return res

        break;

        case "updateValue":

            res = updateValue(DataBase, table, PrimaryKey, data, column)
            
            return res

        break;

        case "updateRow":
            res = updateRow(DataBase,table, PrimaryKey, data)

            return res

        break;

        case "deleteRow":

            res = dropRow(DataBase, table, PrimaryKey)

            return res

        break;
        case "createTable":

            res = createTable(DataBase, table, headers)

            return res

        break;
        case "dropTable":

            res = dropTable(DataBase, table)

            return res

        break;
    }

}
