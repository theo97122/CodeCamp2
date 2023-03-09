import { Router } from "express";
const route: any = Router();

import trombi from "./routes/trombi.routes";
import users from "./routes/users.routes";
import history from "./routes/history.routes";
import auth from "./routes/auth.routes";
import images from "./routes/image.routes";

route.use("/trombi", trombi);
route.use("/users", users);
route.use("/history", history);
route.use("/auth", auth);
route.use("/images", images);

export default route;
