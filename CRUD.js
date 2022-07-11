function CreateDatabase(name){

  

    const DatabaseId = SpreadsheetApp.create(name).getId()
  
    const Database = DriveApp.getFileById(DatabaseId)
    Database.insertSheet("Main")
    const system = DriveApp.getFolderById(Settings.systemId).addFile(Database)
    const res = AddToDatabaseList(name) 
    
  
    return {Database:SpreadsheetApp.openById(DatabaseId), success:res.sucess, error:res.error,msg:res.msg}
  
}

function DropDatabase(name){

  const Database = ParseDatabaseByName(name)
  const res = RemoveFromDatabaseList(name)

  if(Database.error){
    return Database
  }if(res.error){
    return res
  }

  Database.deleteActiveSheet()
  
  return {success, msg: "Databased Dropes succesfully"}

}



function createRow(DataBase, table, data){

  DataBase.getSheetByName(table).insertRowBefore(2);
  DataBase.getSheetByName(table).getRange(2,1,1,data.lenght).setValues([[...data]]);

  return {sucess:true, error:null, msg:"Data Inserted"}

}

function updateValue(DataBase, table, id, data, col){

  const row = Query(DataBase,id, table, col);

  if(row == undefined | row == null){
    return{error, msg: "Error while updateing a value"}
  }

  DataBase.getSheetByName(table).getRange(row,col).setValue(data);

  return {success: true, error: null, msg:"Value Updated"}

}

function updateRow(DataBase, table, id, data){

  const row = Query(DataBase, id, table, 0);

  if(row == undefined | row == null){
    return{error, msg: "Error while updateing row"}
  }

  const sheet = DataBase.getSheetByName(table);

  sheet.getRange(row,1,1, data.lenght).setValues([[...data]]);

  return {success: true, error: null, msg:"Row Updated"}

}

function dropRow(DataBase, table, id){

  const row = Query(DataBase, id, table, 0);

  if(row == undefined | row == null){
    return{error, msg: "Error while droping row"}
  }

  DataBase.getSheetByName(table).deleteRow(row);

  return {success: true, error:null, msg:"Row Deleted"}

}

function createTable(DataBase, table, headers){

  const newTable = DataBase.insertSheet(table);

  if(newTable == undefined | newTable == null){
    
    return {error, msg: "Error while createing table"}

  }


  newTable.getRange(1,1,1,headers.lenght).setValues([[...headers]]);

  return {success: true, error:null, msg:"Table Created"}

}

function dropTable(DataBase, table){
  

  const sheet = DataBase.getSheetByName(table);

  if(sheet == undefined | sheet == null){
    return {error, msg: "Error while droping table"}
  }

  DataBase.deleteSheet(sheet);

  return {success, msg: "Table Droped"}

}
