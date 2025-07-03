const router = require("express").Router();
const helper = require("./../helper/helper");
const doorGroupController = require("./../controllers/doorGroup");

router.get("/list", helper.verifyToken, doorGroupController.getDoorGroupList);

module.exports = router;
