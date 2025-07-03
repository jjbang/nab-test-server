const router = require("express").Router();
const helper = require("./../helper/helper");
const doorController = require("./../controllers/door");

router.get("/list", helper.verifyToken, doorController.getDoorList);

module.exports = router;
