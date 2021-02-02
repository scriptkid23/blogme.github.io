import Axios from 'axios'
const baseURL = 'http://timbus.vn/';
const headers = {
        'Connection': 'keep-alive',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.104 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Origin': 'http://timbus.vn',
        'Referer': 'http://timbus.vn/',
        'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
    }
export function getVehicleInformation(stationID,fleetOver){
    let data = {
            'act': 'partremained',
            'State': 'true',
            'StationID': stationID,
            'FleetOver': fleetOver,
    }
    var form_data = new FormData();

    for ( var key in data ) {
        form_data.append(key, data[key]);
    }

    return Axios({
        headers:headers,
        baseURL:baseURL,
        method:"POST",
        timeout:1000,
        url:'/Engine/Business/Vehicle/action.ashx',
        data:form_data
    })
}
export function searchBusOfLocation(typeID,key){
    let data = {
        'act': 'searchfull',
        'typ': typeID,
        'key': key
        }
    return Axios({
        headers:headers,
        baseURL:baseURL,
        method:"POST",
        url:'/Engine/Business/Search/action.ashx',
        data:data
    })
    
}
export function getBusStopList(fleetID){
    let data = {
        'act': 'fleetdetail',
        'fid': fleetID
    }
    return Axios({
        headers:headers,
        baseURL:baseURL,
        method:"POST",
        url:'/Engine/Business/Search/action.ashx',
        data:data
    })

}
