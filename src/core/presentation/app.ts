import express, { Request, Response } from "express";
import cors from "cors";
import UserRoutes from "../../features/users/presentation/routes/UserRoutes";

export default class App {
  readonly #express: express.Express;

  constructor() {
    this.#express = express();
  }

  public init() {
    this.middlewares();
    this.routes();
  }

  public middlewares() {
    this.#express.use(cors());
    this.#express.use(express.json());
  }

  public routes() {
    this.#express.get("/", (req: Request, res: Response) => {
      return res.status(200).send("Servidor funcionando!");
    });

    const userRoutes = new UserRoutes().init();
    this.#express.use(userRoutes);
  }

  public start(port: string) {
    this.#express.listen(port, () => {
      console.log(`Servidor iniciado na porta -- ${port}!`);
    });
  }
}
