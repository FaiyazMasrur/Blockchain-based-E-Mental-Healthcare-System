const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
    updateProfileController,
    getAllApointmentsController,
    getAllRequestedApointmentsController,
    actionRequestedAppointmentCntroller,
    cancelAppointmentCntroller,
    changeAppointmentStatusController,
    getAllSessionsController,
    storeRecordController,
    getAllRecordsController,
    checkAccessPermissionController,
    changeUserStatusController,
} = require("../controllers/doctorController");
const checkDoctorMiddleware = require("../middlewares/checkDoctorMiddleware");

// router object
const router = express.Router();

// routes
// update profile route
router.post(
    "/update-profile",
    authMiddleware,
    checkDoctorMiddleware,
    updateProfileController
);

router.get(
    "/get-all-requested-appointments",
    authMiddleware,
    checkDoctorMiddleware,
    getAllRequestedApointmentsController
);

router.get(
    "/get-all-appointments",
    authMiddleware,
    checkDoctorMiddleware,
    getAllApointmentsController
);

router.post(
    "/action-requested-appointment",
    authMiddleware,
    checkDoctorMiddleware,
    actionRequestedAppointmentCntroller
);

router.post(
    "/cancel-appointment",
    authMiddleware,
    checkDoctorMiddleware,
    cancelAppointmentCntroller
);

router.post(
    "/change-appointment-status",
    authMiddleware,
    checkDoctorMiddleware,
    changeAppointmentStatusController
);

router.get(
    "/get-all-sessions",
    authMiddleware,
    checkDoctorMiddleware,
    getAllSessionsController
);

router.post(
    "/store-record",
    authMiddleware,
    checkDoctorMiddleware,
    storeRecordController
);

router.post(
    "/get-all-records",
    authMiddleware,
    checkDoctorMiddleware,
    getAllRecordsController
);

router.post(
    "/check-access-permission",
    authMiddleware,
    checkDoctorMiddleware,
    checkAccessPermissionController
);

router.post(
    "/change-user-status",
    authMiddleware,
    checkDoctorMiddleware,
    changeUserStatusController
);

module.exports = router;
