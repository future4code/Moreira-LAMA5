import { BandDatabase } from "../data/BandDataBase";
import { BandInputDTO } from "../model/Band";
import { UserRole } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class BandBusiness {
  async createBand(band: BandInputDTO, token: string): Promise<void> {
    try {
      const bandDatabase = new BandDatabase();
      const idGenerator = new IdGenerator();
      const id = idGenerator.generate();
      const authenticator = new Authenticator();
      const verifyToken = authenticator.getData(token);
      const isAdmin = verifyToken.role;

      const registeredBand = await bandDatabase.getBandByNameAndResponsible(
        band.name,
        band.responsible
      );

      //validations
      if (isAdmin === UserRole.NORMAL) {
        throw new Error("Only Admin users are able to register bands");
      }
      if (!band.name || !band.music_genre || !band.responsible) {
        throw new Error("Invalid fields");
      }
      if (registeredBand) {
        throw new Error("Band is already registered");
      }
      if (!verifyToken) {
        throw new Error("Invalid token");
      }

      //creating band
      await bandDatabase.createBand(
        id,
        band.name,
        band.music_genre,
        band.responsible
      );
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
