const router = require("express").Router();
const { responseHandler } = require("./../middlewares");

const member = require("./member.routes");
const door = require("./door.routes");
const doorGroup = require("./doorGroup.routes");
const report = require("./report.routes");

router.use("/api/v1/member", member, responseHandler);
router.use("/api/v1/door", door, responseHandler);
router.use("/api/v1/doorgroup", doorGroup, responseHandler);
router.use("/api/v1/report", report, responseHandler);

module.exports = router;
