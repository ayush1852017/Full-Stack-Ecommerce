const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgetPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUserRole,
} = require("../Controllers/user.controller");
const { isAuthUser, authorizeRoles } = require("../Middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgetPassword);
router.route("/register").post(registerUser);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").post(logout);
router.route("/me").get(isAuthUser, getUserDetails);
router.route("/password/update").put(isAuthUser, updatePassword);
router.route("/me/update").put(isAuthUser, updateProfile);
router
  .route("/admin/users")
  .get(isAuthUser, authorizeRoles("admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuthUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthUser, authorizeRoles("admin"), deleteUser);
module.exports = router;
