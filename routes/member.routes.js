const router = require("express").Router();
const helper = require("./../helper/helper");
const memberController = require("./../controllers/member");

router.get("/list", helper.verifyToken, memberController.getMemberList);
router.post("/addedit", helper.verifyToken, memberController.createMember);
router.delete("/:id", helper.verifyToken, memberController.deleteMemberById);

module.exports = router;
