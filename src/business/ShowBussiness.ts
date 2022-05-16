import { ShowsDataBase } from "../data/ShowDatabase";
import { ConcertDTO, Concert, ShowBand} from "../model/Concert" 
import {IdGenerator} from "../services/IdGenerator"

export class ShowBusiness {
    async addNewShow(input:ConcertDTO) {
        try {
            const { week_day, start_time, end_time, band_id } = input
            if(!week_day || !start_time || !end_time || !band_id){
                throw new Error("Os campos nao foram preenchidos corretamente");
            }
            const id = new IdGenerator().generate()
            if(start_time < 8 || end_time > 23 || end_time < 8){
                throw new Error("Horários de shows não permitidos");
            }
            const showDataBase = new ShowsDataBase()
            const verifyTime = await showDataBase.verifyTime()
            for (let i = 0; i < verifyTime.quantidade; i++) {
                if(
                    verifyTime.result[i].start_time === start_time ||
                    verifyTime.result[i].end_time === end_time
                ){
                    return {error:"os horários passados já foram selecionados, por gentileza, selecione outro horário, para inicio e termino do sue show"}
                }
            }
            const newConcert:ShowBand = {
                id,
                week_day,
                start_time,
                end_time,
                band_id
            }
            await showDataBase.addConcert(newConcert)
            const response = {
                message: "Show criado com sucesso!",
                dadosDaBanda: newConcert
            }
            return response
        } catch (error) {
            return {error:error.message}; 
        }
    }
}

//CRIO A LOGICA ABAIXO PARA SE PRECISAR COLOCAR A HORA DE INICIO ASSIM: 08 OU 09. 
/* if(start_time < 10 && start_time > 7){
    const newStart = `0${start_time}`
}else if(end_time < 10 end_time > 7)
    const newEnd = `0${end_time}`
*/