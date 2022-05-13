import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";

export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME = "NOME_TABELAS_USUARIOS";

  public async createUser(
    id: string,
    email: string,
    name: string,
    password: string,
    role: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          email,
          name,
          password,
          role,
        })
        .into(UserDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async getUserByEmail(email: string): Promise<User> | undefined {
    try {
      const result = await this.getConnection()
        .select("email")
        .from(UserDatabase.TABLE_NAME)
        .where({ email });
         return result[0]
    } catch (error) {
          throw new Error(error.sqlMessage || error.message);
    }
  }
}
   // return User.toUserModel(result[0]); //p pegar o user no modelo que eu quero quando fetch dados para mostrar