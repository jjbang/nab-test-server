const logger = require("../lib/logger");
const moment = require("moment-timezone");

exports.getMemberLogList = async (req, res) => {
  return res.status(200).json({
    data: [
      {
        id: 12345,
        member_id: 1,
        member_full_name: "John Doe",
        device_id: 54321,
        doorgroup_id: 1,
        doorgroup_name: "Gate - New Building",
        door_id: 1,
        door_name: "Lane 1 - IN",
        access_event_type: "TIME_IN", // TIME_IN, TIME_OUT
        access_method_type: "FACE", // QR, CARD, FACE
        access_data: "123123213213",
        access_time: "2025-06-24T17:16:09",
      },
    ],
    pagination: {
      page_number: 1, // Current page number
      page_size: 1,
      total_count: 1,
    },
  });
};
