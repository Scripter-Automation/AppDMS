


function ParseSheet(ID, sheet){
    const ss = SpreadsheetApp.openById(ID);
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

function generateAPIKey(length){

    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';


    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;


}

function ParseDatabaseSelector(database){
  return SpreadsheetApp.openById(database)
}


function ParseDatabaseByName(name){

  const id = Settings.DataBases.forEach((valuePair)=>{

    let res;

    if(valuePair.Database == name){
      res = SettingKey.Id
      return res
    }

  })

  if(id == undefined | id == null){
    return {error, msg: "Base de datos no encontrada"}
  }

  return SpreadsheetApp.openById(id)

}

function ParseDMSSettingsByKey(key){

  const id =  Settings.parsedSettings.forEach((valuePair)=>{
    
    let res;

    if(valuePair.Key == key){
      res = SettingKey.Value
      return res
    }

  })

  return SpreadsheetApp.openById(id)

}


function AddToDatabaseList(name){

  let res

  const newDatabase = CreateDatabase(name);

  

  res = createRow(DataBaseManagementSystem, "Databases",[name,newDatabase.Database.getId()])

  return res

}


function RemoveFromDatabaseList(name){

  let res

  res = dropRow(DataBaseManagementSystem, "Databases", name)

  if(res.error){
    return {error, msg: "Error while removing database from list" , cause: res.msg }
  }

  return res


}
