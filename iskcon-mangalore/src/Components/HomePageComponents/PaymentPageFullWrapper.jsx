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
        const payload = { ...formData, amount, campaignsid: id };
        dispatch(postPaymentFormData(payload)).then((res) => {
            const orderId = res?.payload?.order?.id;
            if (orderId) {
                const params = new URLSearchParams({
                    name: formData.username || "",
                    phone: formData.mobileno || "",
                    email: formData.email || "",
                    seva: "Mandir Nirmana Seva",
                    amount: formData.amount || amount,
                    order_id: orderId,
                });
                navigate(`/payment/${orderId}?${params.toString()}`);
            }
        });
    };

    return (
        <DonationPage
            amount={amount}
            setAmount={setAmount}
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            formData={formData}
            errors={errors}
            setPaymentModel={() => navigate(-1)}
            setFormData={setFormData}
            campaignerName={getSingleUser?.campaignDetails?.campaignerName || "ISKCON Chennai"}
            campaignerPhoto={getSingleUser?.campaignDetails?.imgurl || "/images/campaigner.jpg"}
            campaignDetails={getSingleUser?.campaignDetails}
        />
    );
};

export default PaymentPageFullWrapper;
