import { Concert, ShowBand } from "../model/Concert";
import { User } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";

export class ShowsDataBase extends BaseDatabase{

    static TABLE_NAME = "DAYS_CONCERTS" 
    
    async addConcert(input:ShowBand) {
        try {
            await this.getConnection().insert({
                id:input.id,
                week_day:input.week_day,
                start_time:input.start_time,
                end_time:input.end_time,
                band_id:input.band_id
            })
            .into(ShowsDataBase.TABLE_NAME)
            
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    async verifyTime() {
        try {
            const result = await this.getConnection()
                .select("start_time", "end_time")
                .from(ShowsDataBase.TABLE_NAME)
            return {quantidade:result.length, result:result}    
        } catch (error) {
            return {error:error.message}
        }
    } 
    
}