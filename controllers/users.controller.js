const services = require("../services/users.service");
const {
  ERR_INVALID_CODE,
  ERR_MISSING_CODE,
  ERR_USER_ALREADY_MEMBER,
} = require("../utils/error");

module.exports = {
  getUserById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await services.getUserById(id);
      await services.clearUser(user);
      res.send(user);
    } catch (error) {
      next(error);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await services.updateUser(id, req.body);
      res.send(user);
    } catch (error) {
      next(error);
    }
  },
  inviteUser: async (req, res, next) => {
    try {
      const { inviteCode } = req.body;
      const user = req.user;
      //clear user password
      services.clearUser(user);
      if (!inviteCode) return next(ERR_MISSING_CODE);

      const adminUser = await services.getUserByAccountCode(inviteCode);

      if (!adminUser) {
        return next(ERR_INVALID_CODE);
      }

      const existingMembers = adminUser.account.members || [];

      const userExists = existingMembers.some(
        (member) => member._id.toString() === user._id.toString()
      );
      if (userExists) {
        return next(ERR_USER_ALREADY_MEMBER);
      }

      const updatedMembers = [...existingMembers, user];

      const adminUserId = adminUser._id.toString();

      const response = await services.updateUserAccountMembers(
        adminUserId,
        updatedMembers
      );
      if (response.modifiedCount === 1) {
        res.send(
          "Your request to join the brand has been successfully accepted"
        );
      } else {
        next(ERR_INVALID_CODE);
      }
    } catch (error) {
      next(error);
    }
  },
  getMembers: async (req, res, next) => {
    try {
      const members = await services.getMembers();
      res.send(members);
    } catch (error) {
      next(error);
    }
  },
};
