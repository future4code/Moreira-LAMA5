import { UserInputDTO, LoginInputDTO, UserRole, User } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";

export class UserBusiness {
  async createUser(user: UserInputDTO) {
    try {
      const idGenerator = new IdGenerator();
      const id = idGenerator.generate();

      const hashManager = new HashManager();
      const hashPassword = await hashManager.hash(user.password);

      const userDatabase = new UserDatabase();
      // const registeredUser = await userDatabase.getUserByEmail(user.email);

      // if (registeredUser) {
      //   throw new Error("User is already registered");
      // }

      await userDatabase.createUser(
        id,
        user.email,
        user.name,
        hashPassword,
        User.stringToUserRole(user.role)
      );

      const authenticator = new Authenticator();
      const accessToken = authenticator.generateToken({
        id: id,
        role: user.role,
      });

      if (!user.email || !user.name || !user.password || !user.role) {
        throw new Error("Invalid fiedls");
      }
      if (user.email.indexOf("@") === -1) {
        throw new Error("Invalid email");
      }

      return accessToken;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUserByEmail(user: LoginInputDTO) {
    const userDatabase = new UserDatabase();
    const userFromDB = await userDatabase.getUserByEmail(user.email);

    const hashManager = new HashManager();
    const hashCompare = await hashManager.compare(
      user.password,
      userFromDB.getPassword()
    );

    const authenticator = new Authenticator();
    const accessToken = authenticator.generateToken({
      id: userFromDB.getId(),
      role: userFromDB.getRole(),
    });

    if (!hashCompare) {
      throw new Error("Invalid Password!");
    }

    return accessToken;
  }
}
