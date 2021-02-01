import requests
import json
from constants import url

class BusService:
    headers = {
    'Connection': 'keep-alive',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'X-Requested-With': 'XMLHttpRequest',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.104 Safari/537.36',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Origin': 'http://timbus.vn',
    'Referer': 'http://timbus.vn/',
    'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
    }
    def getVehicleInfomation(self,stationID:str, fleetOver:str):
        data = {
            'act': 'partremained',
            'State': 'true',
            'StationID': stationID,
            'FleetOver': fleetOver,
        }
        response = requests.post(url.URL_VEHICLE,headers=self.headers,data=data, verify=False)
        return json.loads(response.text)
    
    def getResultRoute(self,coordinate:dict):
        data = {
            'act': 'route',
            'slng': coordinate['slng'],
            'slat': coordinate['slat'],
            'elng': coordinate['elng'],
            'elat': coordinate['elat'],
            'opts': '2'
        }
        response = requests.post(url.URL_ROUTE,headers=self.headers,data=data,verify=False)
        return json.loads(response.text)
    
    def searchBusOfLocation(self,TypeId:int,key:str):
        try:
            data = {
            'act': 'searchfull',
            'typ': typeId,
            'key': key
            }
            response = requests.post(url.URL_SEARCH_LOCATION,headers=self.headers, data = data,verify=False)
            return json.loads(response.text)['dt']
        except:
            return []
    
    def getBusStopList(self,fleetId:str,direction:str):
     
            data = {
            'act': 'fleetdetail',
            'fid': fleetId
            }
            result = {}
            response = requests.post(url.URL_SEARCH_LOCATION,headers=self.headers, data=data,verify=False)
            result = json.loads(response.text)
            del result['dt']['Go']['Geo']
            del result['dt']['Re']['Geo']
            return result['dt'][direction]['Station']
        

    