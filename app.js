const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

// LOAD CONFIG FIRST
if (process.env.NODE_ENV !== "production") {
  const result = dotenv.config({ path: path.join(__dirname, ".env") });
  if (result.error) {
    throw result.error;
  }
}

const { errorHandler } = require("./middlewares");
const morganMiddleware = require("./middlewares/morganMiddleware");
const logger = require("./lib/logger");

const app = express();

app.set("port", process.env.PORT || 4000);
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(cors());
app.use(morganMiddleware);
app.use(require("./routes"));
app.use(errorHandler);

app.get("/", (req, res) => {
  return res.json({});
});

app.listen(app.get("port"), () => {
  logger.debug(`App is running at http://localhost:${app.get("port")}`);
  logger.debug("Press CTRL-C to stop\n");
});
