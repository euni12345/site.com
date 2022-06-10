const { Router } = require("express");
const express = require("express");
const {
  getAllContacts,
  createContact,
  deleteContact,
  getContactDetails,
} = require("../controllers/contactController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/contacts").get(getAllContacts);
router.route("/contact/new").post(createContact);
router.route("/contactdelete/:id").delete(deleteContact);

router.route("/contact/:id").get(getContactDetails);

module.exports = router;
