import * as schedule from "node-schedule";
import logger from "../logger";
import DroneService from "../services/drone.service";

class job {

    constructor() {

    }
    
    //Check Battery level of the drones every minute
    public async checkBatteryLevel() {
        var rule = new schedule.RecurrenceRule();
        rule.second = 0;
        schedule.scheduleJob(rule, async function() {
            try{
                const data=await DroneService.checkDroneBatteryLevels()
                logger.info({
                    batteryLevels: data
                })
            }catch(error){
                logger.error("Error in checking Battery Levels")
            }
        })
    }
}

export default new job();