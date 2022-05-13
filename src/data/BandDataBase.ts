import { BaseDatabase } from "./BaseDatabase";
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

  public async getBandByNameAndResponsible(name: string, responsible: string): Promise<Band> | undefined {
    try {
      const result = await this.getConnection()
        .select("name", "responsible")
        .from(BandDatabase.TABLE_NAME)
        .where({ name, responsible });
       return result[0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
