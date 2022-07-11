const Settings ={
    Username: "",
    Password:"",
    DatabaseName: "",
    DataBases: ParseSheet(),
    system: DriveApp.getFolderById(),
    parsedSettings: ParseSheet(),
     
  }
  
    const DataBaseManagementSystem = ParseDMSSettingsByKey("DMSSettingsId");

    

   const DMSSettings = DataBaseManagementSystem.getSheetByName("Settings")
  
   const Databases = DataBaseManagementSystem.getSheetByName("Databases")  
  
   function Init(){
      let res
      const DMS = checkErrors(InitializeSystem(Settings.DatabaseName))
      if(Database.error){
        return {DMS, msg:"Fallo en la creación del systema de base de datos"}
      }
      const Main = DMS.Database.insertSheet("Main");

      const DMSSettings = DMS.DMSSettings;

      const Databases = DMSSettings.insertSheet("Databases");
      const GenericSettings = DMSSettings.insertSheet("Settings")

      GenericSettings.getRange(1,1,5,2).setValues([
        ["Key", "Value"]
        ["APIKEY", generateAPIKey(20)],
        ["Username", Settings.Username],
        ["Password", Settings.Password],
        ["DMSSettingsId", DMS.DMSSettingsId]
    
    ])

      Databases.getRange(1,1,1,2).setValues([["Database", "Id"]])
      Databases.getRange(2,1,1,2).setValues([[Settings.DatabaseName, DMS.Database.getId()]])
      Databases.insertRowBefore(2)
      Databases.getRange(2,1,1,2).setValues([["Settings", DMS.DMSSettingsId]])

  

  
  }
  
  function InitializeSystem(name){
  
    let res
  
    const systemId = DriveApp.createFolder(`AppDMS ${name}`).getId()
    const system = DriveApp.getFolderById(systemId)
    const DatabaseId = SpreadsheetApp.create(name).getId()
    const DMSSettingsId = SpreadsheetApp.create("Settings").getId()
    
    let DMSSettings = DriveApp.getFileById(DMSSettingsId)
    let Database = DriveApp.getFileById(DatabaseId)


    system.addFile(Database)
    system.addFile(DMSSettings)
  
    Database = SpreadsheetApp.openById(DatabaseId)
    DMSSettings = SpreadsheetApp.openById(DMSSettingsId)
  
    res = {success, DatabaseId: DatabaseId, systemId:systemId, Database: Database, System: system, DMSSettings:DMSSettings, DMSSettingsId:DMSSettingsId }
  
    if(res.success){
      Logger.log(`El systema de gestion de base de datos ha sido creada`, res)
      return res
    }else{
      return {error, msg:'Algo salio mal al crear el sistema de gestion de base de datos'}
    }
  
    
  
  }
  
