import { BaseDatabase } from "./BaseDatabase"

export class BandDataBase extends BaseDatabase {
    
    static NAME_TABLE = "BAND"

    async infoBand(data:string){
        try {
            const result = this.getConnection()
                .select("id","name","music_genre","responsible")
                .from(BandDataBase.NAME_TABLE)
                .where("id", "=", data)
               
            return result
        } catch (error) {
            return {error: "não foi encontrado este id ou nome da banda em nosso banco de dados" || error.sqlMessage}
        }    
    }
    async infoBandName(data:string){
        try {
            const result = this.getConnection()
                .select("id","name","music_genre","responsible")
                .from(BandDataBase.NAME_TABLE)
                .where("name", "=", data)
                
            return result
        } catch (error) {
            return {error: "não foi encontrado este id ou nome da banda em nosso banco de dados" || error.sqlMessage}
        }    
    }
}