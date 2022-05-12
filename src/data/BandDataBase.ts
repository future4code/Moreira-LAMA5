import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";
import { Band } from "../model/Band";

export class BandDatabase extends BaseDatabase {
  private static TABLE_NAME = "NOME_TABELA_BANDAS";

  public async createBand(
    id: string,
    name: string,
    music_genre: string,
    responsible: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          name,
          music_genre,
          responsible,
        })
        .into(BandDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async getBandByName(name: string): Promise<Band> {
    try {
      const result = await this.getConnection()
        .select("name")
        .from(BandDatabase.TABLE_NAME)
        .where({ name });
     
      return Band.toBandModel(result[0]);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
