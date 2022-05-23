export class Concert {
    constructor(
        private id:string,
        private week_day: string,
        private start_time: number,
        private end_time: number,
        private band_id: string
    ) {}
    public getId(){
        return this.id
    }
    public getWeekDay(){
        return this.week_day
    }
    public getStartTime(){
        return this.start_time
    }
    public getEndTime(){
        return this.end_time
    }
    public getBandId(){
        return this.band_id
    }
}
export type ShowBand = {
    id:string,
    week_day:string,
    start_time:number,
    end_time:number,
    band_id:string
}
export type ConcertDTO = {
    week_day: string,
    start_time: number,
    end_time: number,
    band_id: string
}
