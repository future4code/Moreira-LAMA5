import { BandDatabase } from "../data/BandDataBase";
import { BandInputDTO } from "../model/Band";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class BandBusiness {
  async createBand(band: BandInputDTO, token: string) {
    try {
      const idGenerator = new IdGenerator();
      const id = idGenerator.generate();
      const bandDatabase = new BandDatabase();
       await bandDatabase.createBand(
         id,
         band.name,
         band.music_genre,
         band.responsible
       );
      const authenticator = new Authenticator();

      const verifyToken = authenticator.getData(token);

  //     const registeredBand = await bandDatabase.getBandByName(band.name);
  // if (registeredBand) {
  //   throw new Error("Band is already registered");
  // }
      if (!verifyToken) {
        throw new Error("Invalid token");
      }
      if (!band.name || !band.music_genre || !band.responsible) {
        throw new Error("Invalid fields");
      }
    

     
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
