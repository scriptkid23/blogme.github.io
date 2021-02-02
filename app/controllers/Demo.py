from fastapi import APIRouter, Body, Depends
from loguru import logger
# from app.services.service import find_users
from typing import AsyncIterable, Dict
from app.services.Bus import BusService
from app.helpers import helpers
import time
router = APIRouter()


# defined busService
busService:BusService

busService = BusService()

@router.get("/previous/station")
async def getPreviousStation():
    station = '17 Giải Phóng'
    target = [
        {
        'bus':'21',
        'direction': 'Go',
        },
        {
        'bus':'821',
        'direction': 'Go',
        },
        {
        'bus':'26',
        'direction': 'Go',
        },

    ]
    currentStation = busService.searchBusOfLocation(2,station)['Data'][0]
    stationId = currentStation['ObjectID']

    result = []

    for i in target:
        logger.info(i['bus'])
        logger.info(i['direction'])
        busStopList = busService.getBusStopList(i['bus'],i['direction'])
        indexOfCurrentStation = helpers.find_index(busStopList,'ObjectID',int(stationId))
        prevStation = busStopList[indexOfCurrentStation - 1]
        prevStationId = prevStation['Code']
        temp = {
            'bus' : i['bus'],
            'direction': i['direction'],
            'stationID': prevStationId,
        }
        result.append(temp)
    return result 

@router.get("/tracking")
async def tracking():
    
    target = [
          
            {
                "bus": "26",
                "direction": "Go",
                "stationID": "346"
            }
        ]
    currentStation = busService.searchBusOfLocation(2,'17 Giải Phòng')['Data'][0]
    # get current stationId
    stationId = currentStation['ObjectID']

    prevStationBusStop = []
    for i in target:

        temp = busService.getVehicleInfomation(i['stationID'],'21A,21B,26')[0]
        prevStationBusStop.append(temp)
    
    result = {
        'prevStationBusStop': prevStationBusStop,
        'currentStationBusStop': busService.getVehicleInfomation(stationId,'21A,21B,26'),
    }
    time.sleep(3)
    return result