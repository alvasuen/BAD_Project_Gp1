import express from "express";
import path from "path";
import {
  playlistRoutes,
  profileRoutes,
  statusRoutes,
  userRoutes,
  ytdlRoutes,
  searchRoutes,
} from "./restful/route/route";
import { env } from "./env";
// import { UserController } from "./restful/controller/userController";
import { sessionMiddleware } from "./session";

let app = express();
app.use(express.json());
let uploadsPath = path.join(__dirname, "uploads");
// console.log(p2)
app.use(express.static(uploadsPath));
let publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

app.use(sessionMiddleware);

app.use("/user", userRoutes);
app.use("/playlists", playlistRoutes);
app.use("/", profileRoutes);
app.use("/", searchRoutes);
app.use("/videos", ytdlRoutes);
app.use("/videos", statusRoutes);

app.get("*", async (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(publicPath, "error.html"));
});

let port = env.PORT;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
