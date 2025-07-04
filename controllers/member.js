const logger = require("../lib/logger");
const moment = require("moment-timezone");

let members = [
  {
    id: 1, // Required
    full_name: "John Doe",
    position: "Manager",
    mobile_no: "0888888888",
    email: "test@test.com",
    gender: "MALE",
    emp_no: "1234",
    national_no: "1111",
    department_name: "Finance",
    work_start_date: "2025-06-24T17:16",
    work_end_date: "2025-06-24T17:16",
    access_valid_start: "2025-06-24T17:16",
    access_valid_end: "2025-06-24T17:16",
    access_card_uid: "1122334455",
    access_qr_data: null,
    access_doorgroup_ids: [1, 2],
    profile_img_path: null,
    inserted_at: "2025-06-24T17:16:09",
    updated_at: "2025-06-24T17:16:09",
  },
];

exports.getMemberList = (req, res, next) => {
  return res.status(200).json({
    members,
  });
};

exports.getMemberById = (req, res) => {
  const { id } = req.params;
  if (!(parseInt(id) > 0)) {
    return res.status(400).json({
      message: "Valid Member ID is required",
    });
  }

  return res
    .status(200)
    .json(members.find((mm) => mm.id === parseInt(id)) || {});
};

exports.createMember = (req, res, next) => {
  return res.status(200).json({});
};

exports.deleteMemberById = (req, res, next) => {
  return res.status(200).json({});
};
