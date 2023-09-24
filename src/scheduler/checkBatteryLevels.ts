import * as schedule from "node-schedule";
import logger from "../logger";
import DroneService from "../services/drone.service";

class job {

    constructor() {

    }
    
    //Shop code refresh at 12:00 AM
    public async checkBatteryLevel() {
        var rule = new schedule.RecurrenceRule();
        rule.dayOfWeek = [0, new schedule.Range(0, 6)];
        rule.hour = 0;
        rule.minute = 1;
        schedule.scheduleJob(rule, async function() {
            try{
                const data=await DroneService.checkDroneBatteryLevels()
                logger.info(data)
            }catch(error){
                logger.error("Error in checking Battery Levels")
            }
        })
    }
}

export default new job();