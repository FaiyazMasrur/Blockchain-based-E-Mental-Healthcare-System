import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import AddDoctor from "./pages/admin/AddDoctor";
import ApplyDoctor from "./pages/ApplyDoctor";
import NotificationPage from "./pages/NotificationPage";
import Doctor from "./pages/admin/Doctor";
import Patient from "./pages/admin/Patient";
import DoctorProfile from "./pages/doctor/Profile";
import AdminRoute from "./components/AdminRoute";
import DoctorRoute from "./components/DoctorRoute";
import DoctorsList from "./pages/patient/DoctorsList";
import AppInfo from "./pages/admin/AppInfo";
import DoctorAppointmentList from "./pages/doctor/AppointmentList";
import PatientAppointmentList from "./pages/patient/AppointmentList";
import PatientRoute from "./components/PatientRoute";
import BookingPage from "./pages/patient/BookingPage";
import DoctorDetailsPatientView from "./pages/patient/DoctorDetails";
import DoctorDetailsUserView from "./pages/DoctorDetails";
import DoctorDetailsAdminView from "./pages/admin/DoctorDetails";
import PatientProfile from "./pages/patient/Profile";
import DoctorSessionList from "./pages/doctor/SessionList";
import PatientSessionList from "./pages/patient/SessionList";
import DoctorSessionRoom from "./pages/doctor/SessionRoom";
import PatientSessionRoom from "./pages/patient/SessionRoom";
import PatientData from "./pages/doctor/PatientData";
import MedicalRecord from "./pages/patient/MedicalRecord";
import AccessControle from "./pages/patient/AccessControle";
import ApplyResearcher from "./pages/ApplyResearcher";
import Researcher from "./pages/admin/Researcher";
import ResearcherDetailsAdminView from "./pages/admin/ResearcherDetails";
import PatientListResearcherView from "./pages/researcher/PatientList";
import ResearcherRoute from "./components/ResearcherRoute";
import PatientDataRessearcherView from "./pages/researcher/PatientData";
import ResearcherProfile from "./pages/researcher/Profile";
import AdminProfile from "./pages/admin/Profile";
import ConfirmAppointment from "./components/ConfirmAppointment";
import PaymentFailed from "./components/PaymentFailed";

function App() {
    const { loading } = useSelector((state) => state.alerts);
    return (
        <>
            <BrowserRouter>
                {loading ? (
                    <Spinner />
                ) : (
                    <Routes>
                        <Route element={<ProtectedRoute />}>
                            <Route path="/" element={<HomePage />} />
                            <Route
                                path="/notification"
                                element={<NotificationPage />}
                            />
                            <Route
                                path="/doctor-details/:doctorKey"
                                element={<DoctorDetailsUserView />}
                            />
                        </Route>
                        <Route element={<PatientRoute />}>
                            <Route
                                path="/patient/user-homepage"
                                element={<DoctorsList />}
                            />
                            <Route
                                path="/patient/get-doctor-details/:doctorKey"
                                element={<DoctorDetailsPatientView />}
                            />
                            <Route
                                path="/patient/book-appointemnt/:doctorKey"
                                element={<BookingPage />}
                            />
                            <Route
                                path="/patient/confirm-appointment/:appointmentId"
                                element={<ConfirmAppointment />}
                            />
                            <Route
                                path="/patient/appointment-failed/:doctorKey"
                                element={<PaymentFailed />}
                            />
                            <Route
                                path="/patient/appointments"
                                element={<PatientAppointmentList />}
                            />
                            <Route
                                path="/patient/session"
                                element={<PatientSessionList />}
                            />
                            <Route
                                path="/patient/sessionroom/:roomId"
                                element={<PatientSessionRoom />}
                            />
                            <Route
                                path="/patient/medical-record"
                                element={<MedicalRecord />}
                            />
                            <Route
                                path="/patient/access-controle"
                                element={<AccessControle />}
                            />
                            <Route
                                path="/patient/profile"
                                element={<PatientProfile />}
                            />
                        </Route>
                        <Route element={<AdminRoute />}>
                            <Route
                                path="/admin/admin-dashboard"
                                element={<AppInfo />}
                            />
                            <Route
                                path="/admin/add-doctor"
                                element={<AddDoctor />}
                            />
                            <Route path="/admin/doctors" element={<Doctor />} />
                            <Route
                                path="/admin/get-doctor-details/:doctorKey"
                                element={<DoctorDetailsAdminView />}
                            />
                            <Route
                                path="/admin/patients"
                                element={<Patient />}
                            />
                            <Route
                                path="/admin/researchers"
                                element={<Researcher />}
                            />
                            <Route
                                path="/admin/get-researcher-details/:researcherKey"
                                element={<ResearcherDetailsAdminView />}
                            />
                            <Route
                                path="/admin/profile"
                                element={<AdminProfile />}
                            />
                        </Route>
                        <Route element={<DoctorRoute />}>
                            <Route
                                path="/doctor/doctor-dashboard"
                                element={<DoctorAppointmentList />}
                            />
                            <Route
                                path="/doctor/session"
                                element={<DoctorSessionList />}
                            />
                            <Route
                                path="/doctor/sessionroom/:roomId"
                                element={<DoctorSessionRoom />}
                            />
                            <Route
                                path="/doctor/patientdata/:patientKey"
                                element={<PatientData />}
                            />
                            <Route
                                path="/doctor/profile"
                                element={<DoctorProfile />}
                            />
                        </Route>
                        <Route element={<PublicRoute />}>
                            <Route
                                path="/apply-doctor"
                                element={<ApplyDoctor />}
                            />
                            <Route
                                path="/apply-researcher"
                                element={<ApplyResearcher />}
                            />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Route>
                        <Route element={<ResearcherRoute />}>
                            <Route
                                path="/researcher/researcher-dashboard"
                                element={<PatientListResearcherView />}
                            />
                            <Route
                                path="/researcher/record/:patientKey"
                                element={<PatientDataRessearcherView />}
                            />
                            <Route
                                path="/researcher/profile"
                                element={<ResearcherProfile />}
                            />
                        </Route>
                    </Routes>
                )}
            </BrowserRouter>
        </>
    );
}

export default App;
