
function ParseSheet(DataBase, sheet){
    const ss = DataBase
    const ws = ss.getSheetByName(sheet);
    const data = ws.getRange("A1").getDataRegion().getValues();
    const headers = data.shift();

    const jsonArray = data.map(r =>{
      let obj =  { }
      headers.forEach((h,i) =>{
        obj[h] = r[i];
      });
      
      return obj
      
    });

  return jsonArray

}

function Query(DataBase,value, sheet, col) {

  var sheet = DataBase.getSheetByName(sheet);
  var dataRange = sheet.getDataRange().getValues();
  var articulo = value;
  for (var i = 0; i < dataRange.length; i++) {
    if (dataRange[i][col] == articulo) { //[col] query that column
      var row = i + 1
    }
  }

  return row
}



function ParseDatabaseSelector(database){
  return SpreadsheetApp.openById(database)
}

function createRow(DataBase, table, data){

  DataBase.getSheetByName(table).insertRowAfter(2);
  DataBase.getSheetByName(table).getRange(2,1,1,data.lenght).setValues([[...data]]);

  return {sucess:true, error:null, msg:"Data Inserted"}

}

function updateValue(DataBase, table, id, data, col){

  const row = Query(DataBase,id, table, col);

  DataBase.getSheetByName(table).getRange(row,col).setValue(data);

  return {success: true, error: null, msg:"Value Updated"}

}

function updateRow(DataBase, table, id, data){

  const row = Query(DataBase, id, table, 0);

  const sheet = DataBase.getSheetByName(table);

  sheet.getRange(row,1,1, data.lenght).setValues([[...data]]);

  return {success: true, error: null, msg:"Row Updated"}

}

function dropRow(DataBase, table, id){

  const row = Query(DataBase, id, table, 0);

  DataBase.getSheetByName(table).deleteRow(row);

  return {success: true, error:null, msg:"Row Deleted"}

}

function createTable(DataBase, table, headers){

  const newTable = DataBase.insertSheet(table);

  newTable.getRange(1,1,1,headers.lenght).setValues([[...headers]]);

  return {success: true, error:null, msg:"Table Created"}

}

function dropTable(DataBase, table){
  

  const sheet = DataBase.getSheetByName(table);
  DataBase.deleteSheet(sheet);

}
