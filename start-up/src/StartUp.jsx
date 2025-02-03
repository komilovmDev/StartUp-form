"use client";

import { useState } from "react";
import "./style.css";

function StartupForm() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        startupName: "",
        website: "",
        stage: "",
        description: "",
        foundersCount: "",
        teamSize: "",
        industry: "",
        problem: "",
        solution: "",
        targetMarket: "",
        revenue: "",
        funding: "",
    });

    const totalSteps = 4;

    const updateFormData = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
    };

    const isStepValid = () => {
        switch (step) {
            case 1:
                return formData.startupName.trim() !== "" && formData.website.trim() !== "" && formData.stage !== "" && formData.description.trim() !== "";
            case 2:
                return formData.foundersCount !== "" && formData.teamSize.trim() !== "" && formData.industry !== "";
            case 3:
                return formData.problem.trim() !== "" && formData.solution.trim() !== "" && formData.targetMarket.trim() !== "";
            case 4:
                return formData.revenue !== "" && formData.funding !== "";
            default:
                return false;
        }
    };


    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="form-group">
                        <div className="form-field">
                            <label htmlFor="startupName">Startup Name</label>
                            <input
                                type="text"
                                id="startupName"
                                placeholder="Enter your startup name"
                                value={formData.startupName}
                                onChange={(e) => updateFormData("startupName", e.target.value)}
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="website">Website/Landing Page</label>
                            <input
                                type="url"
                                id="website"
                                placeholder="https://"
                                value={formData.website}
                                onChange={(e) => updateFormData("website", e.target.value)}
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="stage">Current Stage</label>
                            <select
                                id="stage"
                                value={formData.stage}
                                onChange={(e) => updateFormData("stage", e.target.value)}
                            >
                                <option value="">Select stage</option>
                                <option value="idea">Idea Stage</option>
                                <option value="mvp">MVP</option>
                                <option value="beta">Beta</option>
                                <option value="launched">Launched</option>
                                <option value="growth">Growth</option>
                            </select>
                        </div>
                        <div className="form-field">
                            <label htmlFor="description">Brief Description</label>
                            <textarea
                                id="description"
                                placeholder="Describe your startup in a few sentences"
                                value={formData.description}
                                onChange={(e) => updateFormData("description", e.target.value)}
                            />
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="form-group">
                        <div className="form-field">
                            <label htmlFor="foundersCount">Number of Founders</label>
                            <select
                                id="foundersCount"
                                value={formData.foundersCount}
                                onChange={(e) =>
                                    updateFormData("foundersCount", e.target.value)
                                }
                            >
                                <option value="">Select number of founders</option>
                                <option value="1">Solo Founder</option>
                                <option value="2">2 Founders</option>
                                <option value="3">3 Founders</option>
                                <option value="4+">4+ Founders</option>
                            </select>
                        </div>
                        <div className="form-field">
                            <label htmlFor="teamSize">Total Team Size</label>
                            <input
                                type="number"
                                id="teamSize"
                                placeholder="Including founders"
                                value={formData.teamSize}
                                onChange={(e) => updateFormData("teamSize", e.target.value)}
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="industry">Industry</label>
                            <select
                                id="industry"
                                value={formData.industry}
                                onChange={(e) => updateFormData("industry", e.target.value)}
                            >
                                <option value="">Select industry</option>
                                <option value="software">Software/SaaS</option>
                                <option value="ecommerce">E-commerce</option>
                                <option value="fintech">Fintech</option>
                                <option value="health">Healthcare</option>
                                <option value="education">Education</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="form-group">
                        <div className="form-field">
                            <label htmlFor="problem">Problem Statement</label>
                            <textarea
                                id="problem"
                                placeholder="What problem are you solving?"
                                value={formData.problem}
                                onChange={(e) => updateFormData("problem", e.target.value)}
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="solution">Solution</label>
                            <textarea
                                id="solution"
                                placeholder="How does your solution address this problem?"
                                value={formData.solution}
                                onChange={(e) => updateFormData("solution", e.target.value)}
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="targetMarket">Target Market</label>
                            <textarea
                                id="targetMarket"
                                placeholder="Who are your target customers?"
                                value={formData.targetMarket}
                                onChange={(e) => updateFormData("targetMarket", e.target.value)}
                            />
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="form-group">
                        <div className="form-field">
                            <label>Current Revenue Range</label>
                            {["pre-revenue", "0-1k", "1k-10k", "10k+"].map((value) => (
                                <div key={value} className="radio-option">
                                    <input
                                        type="radio"
                                        id={value}
                                        name="revenue"
                                        value={value}
                                        checked={formData.revenue === value}
                                        onChange={(e) => updateFormData("revenue", e.target.value)}
                                    />
                                    <label htmlFor={value}>{value}</label>
                                </div>
                            ))}
                        </div>
                        <div className="form-field">
                            <label>Funding Status</label>
                            {["bootstrapped", "pre-seed", "seed", "series-a"].map((value) => (
                                <div key={value} className="radio-option">
                                    <input
                                        type="radio"
                                        id={value}
                                        name="funding"
                                        value={value}
                                        checked={formData.funding === value}
                                        onChange={(e) => updateFormData("funding", e.target.value)}
                                    />
                                    <label htmlFor={value}>{value}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="form-container">
            <h1>Startup Information Form</h1>
            <p>Share details about your startup to join our student entrepreneurs community</p>

            <div className="progress-bar">
                {[1, 2, 3, 4].map((stepNumber) => (
                    <div key={stepNumber} className={`progress-step ${step >= stepNumber ? "active" : ""}`}>
                        {["Basics", "Team", "Product", "Traction"][stepNumber - 1]}
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit}>
                {renderStep()}

                <div className="form-buttons">
                    <button
                        type="button"
                        className="btn-secondary"
                        disabled={step === 1}
                        onClick={() => setStep(step - 1)}
                    >
                        Previous
                    </button>

                    {step === totalSteps ? (
                        <button type="submit" className="btn-primary" disabled={!isStepValid()}>
                            Submit
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="btn-primary"
                            onClick={() => setStep(step + 1)}
                            disabled={!isStepValid()}
                        >
                            Next
                        </button>
                    )}
                </div>


            </form>
        </div>
    );
}

export default StartupForm;
