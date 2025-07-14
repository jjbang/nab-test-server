const logger = require("../lib/logger");
const moment = require("moment-timezone");

let idIncrement = 2;
let memberList = [
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
    work_start_date: "2025-06-24",
    work_end_date: "2025-06-24",
    access_valid_start: "2025-06-24T17:16",
    access_valid_end: "2025-06-24T17:16",
    access_card_uid: "1122334455",
    access_uhf_uid: null,
    access_qr_data: null,
    access_doorgroup_ids: [1, 2],
    profile_img_data: null,
    inserted_at: "2025-06-24T17:16:09",
    updated_at: "2025-06-24T17:16:09",
  },
];

const isNullOrString = (val) => {
  return !val || val instanceof String || typeof val === "string";
};

const isValidDateMinutes = (targetDate) => {
  return moment(targetDate, "YYYY-MM-DDTHH:mm", true).isValid();
};

const isValidDate = (targetDate) => {
  return moment(targetDate, "YYYY-MM-DD", true).isValid();
};

exports.getMemberList = (req, res, next) => {
  return res.status(200).json({
    members: memberList,
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
    .json(memberList.find((mm) => mm.id === parseInt(id)) || {});
};

exports.createMember = (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "Valid body is required",
      });
    }
    const { members } = req.body;
    const memberIdsObj = {};
    for (const mem of memberList) {
      memberIdsObj[`${mem.id}`] = mem;
    }

    if (!Array.isArray(members)) {
      return res.status(400).json({
        message: "Valid list of members to add / edit is required",
      });
    }

    if (members.length > 100) {
      return res.status(400).json({
        message: "Max 100 members can be added at one time",
      });
    }
    const createdMemberIds = [];
    const updatedMemberIds = [];
    for (const mem of members) {
      const {
        id,
        full_name,
        position,
        mobile_no,
        email,
        gender,
        emp_no,
        national_no,
        department_name,
        work_start_date,
        work_end_date,
        access_valid_start,
        access_valid_end,
        access_card_uid,
        access_uhf_uid,
        access_qr_data,
        access_doorgroup_ids,
        profile_img_data,
      } = mem;

      let baseMessage = "Creating New Member";
      if (parseInt(id) > 0) {
        if (!memberIdsObj[`${id}`]) {
          return res.status(400).json({
            message: `Member ID ${id} does not exist for update`,
          });
        } else {
          baseMessage = `Member ID ${id}`;
        }
      }

      if (work_start_date) {
        if (!isValidDate(work_start_date)) {
          return res.status(400).json({
            message: `${baseMessage}: Invalid work start date ${work_start_date}`,
          });
        }
      }
      if (work_end_date) {
        if (!isValidDate(work_end_date)) {
          return res.status(400).json({
            message: `${baseMessage}: Invalid work end date ${work_end_date}`,
          });
        }
      }
      if (access_valid_start) {
        if (!isValidDateMinutes(access_valid_start)) {
          return res.status(400).json({
            message: `${baseMessage}: Invalid access valid start date ${access_valid_start}`,
          });
        }
      }
      if (access_valid_end) {
        if (!isValidDateMinutes(access_valid_end)) {
          return res.status(400).json({
            message: `${baseMessage}: Invalid access valid end date ${access_valid_end}`,
          });
        }
      }
      if (access_doorgroup_ids) {
        if (!Array.isArray(access_doorgroup_ids)) {
          return res.status(400).json({
            message: `${baseMessage}: Invalid access_doorgroup_ids should be a list of doorgroup ids`,
          });
        }
        for (const dg of access_doorgroup_ids) {
          if (!(dg >= 1 && dg <= 4)) {
            return res.status(400).json({
              message: `${baseMessage}: Invalid access_doorgroup_ids for id ${dg}`,
            });
          }
        }
      }
      if (!isNullOrString(full_name)) {
        return res.status(400).json({
          message: `${baseMessage}: Type of full_name should be string or null`,
        });
      }
      if (!isNullOrString(position)) {
        return res.status(400).json({
          message: `${baseMessage}: Type of position should be string or null`,
        });
      }
      if (!isNullOrString(email)) {
        return res.status(400).json({
          message: `${baseMessage}: Type of email should be string or null`,
        });
      }
      if (!isNullOrString(gender)) {
        return res.status(400).json({
          message: `${baseMessage}: Type of gender should be string or null`,
        });
      }
      if (gender && !(gender === "MALE" || gender === "FEMALE")) {
        return res.status(400).json({
          message: `${baseMessage}: Value of gender should MALE or FEMALE`,
        });
      }
      if (!isNullOrString(emp_no)) {
        return res.status(400).json({
          message: `${baseMessage}: Type of emp_no should be string or null`,
        });
      }
      if (!isNullOrString(national_no)) {
        return res.status(400).json({
          message: `${baseMessage}: Type of national_no should be string or null`,
        });
      }
      if (!isNullOrString(department_name)) {
        return res.status(400).json({
          message: `${baseMessage}: Type of department_name should be string or null`,
        });
      }
      if (!isNullOrString(mobile_no)) {
        return res.status(400).json({
          message: `${baseMessage}: Type of mobile_no should be string or null`,
        });
      }
      if (!isNullOrString(access_card_uid)) {
        return res.status(400).json({
          message: `${baseMessage}: Type of access_card_uid should be string or null`,
        });
      }
      if (!isNullOrString(access_uhf_uid)) {
        return res.status(400).json({
          message: `${baseMessage}: Type of access_uhf_uid should be string or null`,
        });
      }
      if (!isNullOrString(access_qr_data)) {
        return res.status(400).json({
          message: `${baseMessage}: Type of access_qr_data should be string or null`,
        });
      }
      if (!isNullOrString(profile_img_data)) {
        return res.status(400).json({
          message: `${baseMessage}: Type of profile_img_data should be string or null`,
        });
      }
    }

    for (const mem of members) {
      const {
        id,
        full_name,
        position,
        mobile_no,
        email,
        gender,
        emp_no,
        national_no,
        department_name,
        work_start_date,
        work_end_date,
        access_valid_start,
        access_valid_end,
        access_card_uid,
        access_uhf_uid,
        access_qr_data,
        access_doorgroup_ids,
        profile_img_data,
      } = mem;

      if (!(parseInt(id) > 0)) {
        createdMemberIds.push(idIncrement);

        memberList = [
          {
            id: idIncrement,
            full_name: full_name || null,
            position: position || null,
            mobile_no: mobile_no || null,
            email: email || null,
            gender: gender || null,
            emp_no: emp_no || null,
            national_no: national_no || null,
            department_name: department_name || null,
            work_start_date: work_start_date || null,
            work_end_date: work_end_date || null,
            access_valid_start: access_valid_start || null,
            access_valid_end: access_valid_end || null,
            access_card_uid: access_card_uid || null,
            access_uhf_uid: access_uhf_uid || null,
            access_qr_data: access_qr_data || null,
            access_doorgroup_ids: access_doorgroup_ids || [],
            profile_img_data: profile_img_data || null,
            inserted_at: "2025-06-24T17:16:09",
            updated_at: "2025-06-24T17:16:09",
          },
          ...memberList,
        ];
        idIncrement += 1;
      } else {
        updatedMemberIds.push(id);
        let memberToUpdate = memberIdsObj[`${id}`];
        if (full_name) {
          memberToUpdate["full_name"] = full_name;
        }
        if (position) {
          memberToUpdate["position"] = position;
        }
        if (mobile_no) {
          memberToUpdate["mobile_no"] = mobile_no;
        }
        if (email) {
          memberToUpdate["email"] = email;
        }
        if (gender) {
          memberToUpdate["gender"] = gender;
        }
        if (emp_no) {
          memberToUpdate["emp_no"] = emp_no;
        }
        if (national_no) {
          memberToUpdate["national_no"] = national_no;
        }
        if (department_name) {
          memberToUpdate["department_name"] = department_name;
        }
        if (work_start_date) {
          memberToUpdate["work_start_date"] = work_start_date;
        }
        if (work_end_date) {
          memberToUpdate["work_end_date"] = work_end_date;
        }
        if (access_valid_start) {
          memberToUpdate["access_valid_start"] = access_valid_start;
        }
        if (access_valid_end) {
          memberToUpdate["access_valid_end"] = access_valid_end;
        }
        if (access_card_uid) {
          memberToUpdate["access_card_uid"] = access_card_uid;
        }
        if (access_uhf_uid) {
          memberToUpdate["access_uhf_uid"] = access_uhf_uid;
        }
        if (access_qr_data) {
          memberToUpdate["access_qr_data"] = access_qr_data;
        }
        if (access_doorgroup_ids) {
          memberToUpdate["access_doorgroup_ids"] = access_doorgroup_ids;
        }
        if (profile_img_data) {
          memberToUpdate["profile_img_data"] = profile_img_data;
        }
      }
    }
    return res.status(200).json({
      created_ids: createdMemberIds,
      updated_ids: updatedMemberIds,
    });
  } catch (e) {
    res.status(500).send({
      error:
        (e && e.message) || "Unknown error while creating or updating member",
    });
    logger.error(
      (e && e.message) || "Unknown error while creating or updating member"
    );
    throw e;
  } finally {
  }
};

exports.deleteMemberById = (req, res, next) => {
  const { id } = req.params;
  if (!(parseInt(id) > 0)) {
    return res.status(400).json({
      message: "Valid Member ID is required",
    });
  }
  memberList = memberList.filter((mm) => {
    return mm.id !== parseInt(id);
  });
  return res.status(200).json({
    id,
  });
};
