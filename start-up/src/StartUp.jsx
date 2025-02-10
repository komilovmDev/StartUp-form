import React, { useState, useEffect } from "react";
import "./animation.css";
import PhoneNumberInput from "./input/PhoneNumberInput";
import axios from "axios";

const CreativeAnimatedStartupForm = () => {
    const [step, setStep] = useState(1);
    const [telnumber, setTelnumber] = useState(""); // Phone number state here
    const [telnumberError, setTelnumberError] = useState("");
    const [formData, setFormData] = useState({
        founderName: "",
        startupName: "",
        industry: "",
        description: "",
        fundingStage: "",
        teamSize: "",
        phoneNumber: "", 
        website: "",
    });
    const [formErrors, setFormErrors] = useState({});
    const [animationState, setAnimationState] = useState("idle");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear error on change
    };

    // Update formData when phone number changes
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            phoneNumber: telnumber
        }));
    }, [telnumber]);

    const nextStep = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const prevStep = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setAnimationState("launching");
        console.log("Form submitted:", formData);
        console.log("Phone number:", telnumber);
    };

    const handleSubmitTg = async (e) => {
        e.preventDefault();

        // Start animation immediately
        setAnimationState("launching");

        // Validate all fields are filled before submitting
        const errors = {};
        for (const key in formData) {
            if (formData[key] === "" && key !== "website") { // website is optional
                errors[key] = "This field is required";
            }
        }
        if (!telnumber) {
            errors.telnumber = "Please enter a valid phone number";
        }

        setFormErrors(errors);

        if (Object.keys(errors).length > 0) {
            // If any errors, revert animation state
            setAnimationState("idle");
            console.log("Form has errors, preventing submission");
            return;
        }

        const botToken = "8165081575:AAFJ8BrLJOWppRDmlAtbHcOsBABoKyCKP2Q";
        const chatIds = ["2064891580", "1050704041"]; // Ikki ID massiv ko‘rinishida

        const message = `
          📝 *Yangi Startup Arizasi*
          👤 *F.I.SH:* ${formData.founderName}
          🏢 *Fakultet:* ${formData.startupName}
          📚 *Yo‘nalish:* ${formData.industry}
          💡 *Loyiha nomi:* ${formData.fundingStage}
          👥 *Jamoa soni:* ${formData.teamSize}
          📞 *Telefon raqami:* ${telnumber}
          📝 *Tavsif:* ${formData.description}
        `;

        try {

            await Promise.all(
                chatIds.map(async (chatId) => {
                    const response = await fetch(
                        `https://api.telegram.org/bot${botToken}/sendMessage`,
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                chat_id: chatId,
                                text: message,
                                parse_mode: "Markdown",
                            }),
                        }
                    );

                    const data = await response.json();
                    console.log(`Xabar ${chatId} ga yuborildi:`, data);
                })
            );

            console.log("Ma'lumot Telegram botga yuborildi:", formData);
        } catch (error) {
            console.error("Xatolik yuz berdi:", error);
        }
    };

    const CreateSHeet = async () => {
        try {
            const response = await axios.post("https://sheetdb.io/api/v1/83fehi6iq3slm", {
                data: [
                    {
                        "F.I.SH": formData.founderName,
                        "Fakultet": formData.startupName,
                        "Yo‘nalish": formData.industry,
                        "LoyihaNomi": formData.fundingStage,
                        "JamoaSoni": formData.teamSize,
                        "TelefonRaqami": telnumber,
                        "Loyha haqida": formData.description
                    }
                ]
            });
    
            console.log("Google Sheets-ga muvaffaqiyatli qo‘shildi:", response.data);
        } catch (error) {
            console.error("Xatolik yuz berdi:", error);
        }
    };
    

    useEffect(() => {
        if (animationState === "launching") {
            const timer = setTimeout(() => {
                setAnimationState("success");
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [animationState]);

    function SubmitData(e) {
        e.preventDefault();
        handleSubmitTg(e);
        CreateSHeet();
    }
    

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <div className="mb-4">
                            <label
                                htmlFor="founderName"
                                className="block text-orange-600 font-bold mb-2"
                            >
                                F.I.SH
                            </label>
                            <input
                                type="text"
                                id="founderName"
                                name="founderName"
                                value={formData.founderName}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border-2 border-orange-300 rounded-lg focus:border-orange-500 focus:outline-none"
                                placeholder="..."
                            />
                            {formErrors.founderName && (
                                <p className="text-red-500 text-xs italic">
                                    {formErrors.founderName}
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="startupName"
                                className="block text-orange-600 font-bold mb-2"
                            >
                                Fakultet
                            </label>
                            <input
                                type="text"
                                id="startupName"
                                name="startupName"
                                value={formData.startupName}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border-2 border-orange-300 rounded-lg focus:border-orange-500 focus:outline-none"
                                placeholder="..."
                            />
                            {formErrors.startupName && (
                                <p className="text-red-500 text-xs italic">
                                    {formErrors.startupName}
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="industry"
                                className="block text-orange-600 font-bold mb-2"
                            >
                                Ta`lim yo`nalishi, guruhi
                            </label>
                            <input
                                type="text"
                                id="industry"
                                name="industry"
                                value={formData.industry}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border-2 border-orange-300 rounded-lg focus:border-orange-500 focus:outline-none"
                                placeholder="..."
                            />
                            {formErrors.industry && (
                                <p className="text-red-500 text-xs italic">
                                    {formErrors.industry}
                                </p>
                            )}
                        </div>
                    </>
                );
            case 2:
                return (
                    <>
                        <div className="mb-4">
                            <label
                                htmlFor="fundingStage"
                                className="block text-orange-600 font-bold mb-2"
                            >
                                Loyihaning yo`nalish nomi
                            </label>
                            <input
                                type="text"
                                id="fundingStage"
                                name="fundingStage"
                                value={formData.fundingStage}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border-2 border-orange-300 rounded-lg focus:border-orange-500 focus:outline-none"
                                placeholder="..."
                            />
                            {formErrors.fundingStage && (
                                <p className="text-red-500 text-xs italic">
                                    {formErrors.fundingStage}
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="teamSize"
                                className="block text-orange-600 font-bold mb-2"
                            >
                                Jamoa ishtirokchilari soni
                            </label>
                            <input
                                type="number"
                                id="teamSize"
                                name="teamSize"
                                value={formData.teamSize}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border-2 border-orange-300 rounded-lg focus:border-orange-500 focus:outline-none"
                                placeholder="..."
                            />
                            {formErrors.teamSize && (
                                <p className="text-red-500 text-xs italic">
                                    {formErrors.teamSize}
                                </p>
                            )}
                        </div>
                    </>
                );
            case 3:
                return (
                    <div>
                        <div className="mb-4">
                            <label
                                htmlFor="description"
                                className="block text-orange-600 font-bold mb-2"
                            >
                                Telefon raqamingiz
                            </label>
                            <PhoneNumberInput
                                phoneNumber={telnumber}
                                setPhoneNumber={setTelnumber}
                                error={telnumberError}
                                setError={setTelnumberError}
                            />
                            {formErrors.telnumber && (
                                <p className="text-red-500 text-xs italic">
                                    {formErrors.telnumber}
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="description"
                                className="block text-orange-600 font-bold mb-2"
                            >
                                Loyiha haqida qisqacha ma'lumot
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border-2 border-orange-300 rounded-lg focus:border-orange-500 focus:outline-none h-32"
                                placeholder="..."
                            />
                            {formErrors.description && (
                                <p className="text-red-500 text-xs italic">
                                    {formErrors.description}
                                </p>
                            )}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-300 p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
                {animationState === "idle" && (
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <div className="text-6xl mb-4">🚀</div>
                            <h1 className="text-3xl font-bold text-orange-600 mb-2">
                                O'z loyhanggizni biz bilan boshlang
                            </h1>
                            <p className="text-gray-600">Malumotlarni to'ldring!</p>
                        </div>
                        <div className="flex justify-center mb-8">
                            {[1, 2, 3].map((s) => (
                                <div
                                    key={s}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center mx-1 ${s === step
                                            ? "bg-orange-500 text-white"
                                            : "bg-orange-200 text-orange-600"
                                        }`}
                                >
                                    {s}
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleSubmit}>
                            {renderStep()}
                            <div className="flex justify-between mt-6">
                                {step > 1 && (
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                                    >
                                        Orqaga
                                    </button>
                                )}
                                {step < 3 ? (
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors ml-auto"
                                    >
                                        Keyingi
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        onClick={SubmitData}
                                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors ml-auto"
                                    >
                                        Startapingizni U'chirish 🚀
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                )}
                {animationState === "launching" && (
                    <div className="relative h-96 bg-gradient-to-b from-orange-100 to-orange-400 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-9xl animate-rocket">🚀</div>
                        </div>
                        <div className="absolute inset-0 animate-twinkle">
                            {Array.from({ length: 50 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute rounded-full bg-white"
                                    style={{
                                        top: `${Math.random() * 100}%`,
                                        left: `${Math.random() * 100}%`,
                                        width: `${Math.random() * 2 + 1}px`,
                                        height: `${Math.random() * 2 + 1}px`,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}
                {animationState === "success" && (
                    <div className="p-8 text-center">
                        <div className="text-6xl mb-4">🎉</div>
                        <h2 className="text-2xl font-bold text-orange-600 mb-2">
                            Tabriklayman {formData.founderName}!
                        </h2>
                        <p className="text-xl text-gray-700 mb-4">
                            {formData.fundingStage} Yo'nalishidagi loyhangiz royhatdan o'tdi
                            !!!
                        </p>
                        <p className="text-gray-600">
                            Qisqacha ma`lumot uchun Inavatsion Texnologiyalar Faqulteti
                            Dekanati bilan bog`laning
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreativeAnimatedStartupForm;