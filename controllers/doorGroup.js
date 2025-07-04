const logger = require("../lib/logger");
const moment = require("moment-timezone");

exports.getDoorGroupList = (req, res) => {
  return res.status(200).json({
    doorgroups: [
      {
        id: 1,
        doorgroup_name: "Gate - Main Entrance",
      },
      {
        id: 2,
        doorgroup_name: "Gate - New Building",
      },
      {
        id: 3,
        doorgroup_name: "Parking - Car",
      },
      {
        id: 4,
        doorgroup_name: "Parking - Moto",
      },
    ],
  });
};
