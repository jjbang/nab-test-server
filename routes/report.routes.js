const router = require("express").Router();
const helper = require("./../helper/helper");
const memberLogController = require("./../controllers/memberLog");

router.post(
  "/member/log",
  helper.verifyToken,
  memberLogController.getMemberLogList
);

module.exports = router;
