import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { BaseError } from "../error/BaseError";

export class UserBusiness {

    async createUser(user: UserInputDTO) {

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        const hashManager = new HashManager();
        const hashPassword = await hashManager.hash(user.password);

        const userDatabase = new UserDatabase();
        await userDatabase.createUser(id, user.email, user.name, hashPassword, user.role);

        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id, role: user.role });
        
        return accessToken;
    }

    async login(input: LoginInputDTO) {
        try {
        const { password, email } = input

        if(!password || !email){
            throw new Error("Os campos não foram preenchidos corretamente");
        }

        const userDatabase = new UserDatabase();
        const verifyUser = await userDatabase.getUserByEmail(input.email);

        if(typeof verifyUser !== "object"){
            throw new Error("Usuario não encontrado");
        }
       
        const hashManager = new HashManager();
        const hashCompare = await hashManager.compare(password, verifyUser.getPassword());

        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id: verifyUser.getId(), role: verifyUser.getRole() });

        if (!hashCompare) {
            throw new Error("Invalid Password!");
        }

        return accessToken;
        } catch (error) {
            throw new Error(error.message || error.sqlMessage);
        }
    }
    
}