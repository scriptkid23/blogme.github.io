import uvicorn

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
# © 2021 GitHub, Inc.
# Copyright by Hoando.



# busService = BusService()
# print(busService.getBusStopList('107','Go'))
# coordinate = {
#     'slng' : '105.46845',
#     'slat':'21.010116666666665',
#     'elng':'105.460542',
#     'elat':'21.026232',
# }

# print(busService.getBusStopList('26','Go'))
# print(busService.searchBusOfLocation(2,'17 Giải Phóng'))
# print(busService.getVehicleInfomation('170','26,21B,21A'))