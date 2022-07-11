
function parseAPIKey(APIKey){

    const realAPIKey = ParseDMSSettingsByKey("APIKEY")

    return APIKey == realAPIKey

}


function checkErrors(func){

    if(func.error){
        Logger.log(func.msg)
        return {error}
    }else{
        if(func.msg){
            Logger.log(func.msg)
        }
        return func
    }

}
