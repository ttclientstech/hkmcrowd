// src/Pages/PaymentPageFullWrapper.jsx
import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postPaymentFormData } from "../../Redux/clientSlices/clientUsers";
import DonationPage from "./DonationPage";

const PaymentPageFullWrapper = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // ✅ get campaign data from router state
    const getSingleUser = location.state?.getSingleUser || {};

    const [amount, setAmount] = useState(0);
    const [errors, setErrors] = useState({});

    // ✅ New state to handle loading status
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        mobileno: "",
        country: "Indian",
        pincode: "",
        panno: "",
        address: "",
        city: "",
        state: "",
        username: "",
        prasadRequired: false,
        taxExemption: false,
        isanonymous: false,
        campainerName: getSingleUser?.campaignDetails?.campaignName || "#Campainer Name",
    });

    const handleOnChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // ✅ Prevent double clicks
        if (isLoading) return;

        // ✅ Start Loader immediately
        setIsLoading(true);

        const payload = { ...formData, amount, campaignsid: id };

        dispatch(postPaymentFormData(payload))
            .then((res) => {
                const orderId = res?.payload?.order?.id;
                if (orderId) {
                    const params = new URLSearchParams({
                        name: formData.username || "",
                        phone: formData.mobileno || "",
                        email: formData.email || "",
                        seva: "Mandir Nirmana Seva",
                        amount: formData.amount || amount,
                        campaignsid: id,
                        taxHouseNumber: formData.taxHouseNumber || "",
                        taxStreet: formData.taxStreet || "",
                        taxCity: formData.taxCity || "",
                        taxState: formData.taxState || "",
                        taxPincode: formData.taxPincode || "",
                        panno: formData.panno || "",
                        dob: formData.dob || "",
                        campainerName: formData.campainerName || "#Campainer Name",
                    });
                    navigate(`/payment/${orderId}?${params.toString()}`);
                    // Note: We don't set isLoading(false) here because we are navigating away.
                    // Keeping it true prevents user interaction during the transition.
                } else {
                    // If no orderId, something went wrong logic-wise
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                console.error("Payment Error:", err);
                // ✅ Stop loader if API fails so user can try again
                setIsLoading(false);
            });
    };

    return (
        <>
            {/* ✅ Full Screen Loader Overlay */}
            {isLoading && (
                <div style={styles.overlay}>
                    <div style={styles.loaderBox}>
                        <div style={styles.spinner}></div>
                        <h3 style={styles.loadingText}>Please wait...</h3>
                        <p style={styles.loadingSubText}>
                            We are processing your request and taking you to the next step shortly.
                        </p>
                    </div>
                </div>
            )}

            <DonationPage
                amount={amount}
                setAmount={setAmount}
                handleSubmit={handleSubmit}
                handleOnChange={handleOnChange}
                formData={formData}
                errors={errors}
                setPaymentModel={() => navigate(-1)}
                setFormData={setFormData}
                campaignerName={getSingleUser?.campaignDetails?.campaignName || "ISKCON Chennai"}
                campaignerPhoto={getSingleUser?.campaignDetails?.imgurl || "/images/campaigner.jpg"}
                campaignDetails={getSingleUser?.campaignDetails}
                // Optional: Pass isLoading to child if you want to disable the button visually there too
                isLoading={isLoading}
            />
        </>
    );
};

// ✅ Simple inline styles for the loader
const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
    },
    loaderBox: {
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "12px",
        textAlign: "center",
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        maxWidth: "90%",
        width: "400px",
    },
    spinner: {
        border: "5px solid #f3f3f3",
        borderTop: "5px solid #d35400", // Using an orange shade suitable for donation themes
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        animation: "spin 1s linear infinite",
        margin: "0 auto 15px auto",
    },
    loadingText: {
        margin: "0 0 10px 0",
        fontSize: "1.2rem",
        color: "#333",
        fontWeight: "600"
    },
    loadingSubText: {
        margin: 0,
        color: "#666",
        fontSize: "0.95rem",
        lineHeight: "1.4"
    }
};

// Add animation globally if not present
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;
document.head.appendChild(styleSheet);

export default PaymentPageFullWrapper;