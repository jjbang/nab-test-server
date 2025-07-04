const logger = require("../lib/logger");
const moment = require("moment-timezone");

exports.getDoorList = (req, res) => {
  return res.status(200).json({
    doors: [
      {
        id: 1,
        door_name: "Lane 1 - IN",
      },
      {
        id: 2,
        door_name: "Lane 1 - OUT",
      },
      {
        id: 3,
        door_name: "Car Lane IN",
      },
      {
        id: 4,
        door_name: "Car Lane OUT",
      },
    ],
  });
};
