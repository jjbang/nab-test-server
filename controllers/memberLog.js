const logger = require("../lib/logger");
const moment = require("moment-timezone");

const isValidDateMinutes = (targetDate) => {
  return moment(targetDate, "YYYY-MM-DDTHH:mm", true).isValid();
};

exports.getMemberLogList = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "Valid body is required",
      });
    }
    let { date_start, date_end, page_number, page_size } = req.body;
    if (date_start) {
      if (!isValidDateMinutes(date_start)) {
        return res.status(400).json({
          message: "Valid start date format is required",
        });
      }
    } else {
      date_start = "1990-06-24T17:16";
    }
    if (date_end) {
      if (!isValidDateMinutes(date_end)) {
        return res.status(400).json({
          message: "Valid end date format is required",
        });
      }
    } else {
      date_end = "2100-06-24T17:16";
    }
    logger.debug(date_start);
    logger.debug(date_end);
    const pageSize =
      parseInt(page_size) > 0 && parseInt(page_size) <= 2000 ? page_size : 2000;
    const pageNumber = parseInt(page_number) >= 1 ? page_number : 1;

    const returnResult =
      !(date_start <= "2025-06-24T17:16" && "2025-06-24T17:17" <= date_end) ||
      pageNumber > 1
        ? []
        : [
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
          ];
    return res.status(200).json({
      data: returnResult,
      pagination: {
        page_number: pageNumber, // Current page number
        page_size: pageSize,
        total_count: 1,
      },
    });
  } catch (e) {
    res.status(500).send({
      error: (e && e.message) || "Unknown error while retrieving access logs",
    });
    logger.error(
      (e && e.message) || "Unknown error while retrieving access logs"
    );
    throw e;
  } finally {
  }
};
