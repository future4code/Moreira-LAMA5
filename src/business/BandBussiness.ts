import { BandDataBase } from "../data/BandDataBase";

export class BandBusiness {
    async infoBand(id?:string, name?:string) {
        try {
            if(!id && !name){
                throw new Error("Não foi passado nenhum dados para pesquisa");
            }else{
                if(id){
                    const result = await new BandDataBase().infoBand(id)
                    return result
                } else if(name){
                    const result = await new BandDataBase().infoBandName(name)
                    return result
                }
            }
        } catch (error) {
            return {error:error.message} || "error, na parte business"
        }
    }
}