import session from "cookie-session";
import express from "express";
import { telefunc, provideTelefuncContext } from "telefunc";
import "telefunc/async_hooks";
import { vike } from "vike-node/server";

bootstrap();

function bootstrap() {
  const app = express();
  app.use(
    session({
      keys: ["wEFT9UxOOyL1rrbBXFDt06b1z4OMDWEN"],
      maxAge: 24 * 60 * 60 * 1000,
    })
  );
  app.use(express.text());
  app.all("/_telefunc", async (req, res) => {
    provideTelefuncContext({ req, res });
    const { originalUrl: url, method, body } = req;
    const httpResponse = await telefunc({
      url,
      method,
      body,
    });
    res
      .status(httpResponse.statusCode)
      .type(httpResponse.contentType)
      .send(httpResponse.body);
  });
  app.use(vike());
  const port = process.env.PORT || 3000;
  app.listen(port);
  console.log(`Listening on http://localhost:${port}`);
}
