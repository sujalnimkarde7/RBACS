// src/routes/protectedRoutes.js
import express from "express";
import { protect } from "../middleware/auth.js";
import { authorizeRoles } from "../middleware/role.js";

const router = express.Router();

// Accessible by any logged-in user
router.get("/profile", protect, (req, res) => {
  res.json({ message: `Welcome ${req.user.name}, Role: ${req.user.role}` });
});

// Accessible only by admins
router.get("/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin! You have full access." });
});

// Accessible by admin or manager
router.get("/manager", protect, authorizeRoles("admin", "manager"), (req, res) => {
  res.json({ message: "Welcome Manager/Admin! You have elevated access." });
});

export default router;
