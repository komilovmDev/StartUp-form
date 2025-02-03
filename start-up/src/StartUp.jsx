import { useState, useEffect } from "react"
import "./animation.css"

const CreativeAnimatedStartupForm = () => {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        founderName: "",
        startupName: "",
        industry: "",
        description: "",
        fundingStage: "",
        teamSize: "",
        website: "",
    })
    const [animationState, setAnimationState] = useState("idle")

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const nextStep = () => {
        setStep((prevStep) => prevStep + 1)
    }

    const prevStep = () => {
        setStep((prevStep) => prevStep - 1)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setAnimationState("launching")
        console.log("Form submitted:", formData)
    }

    useEffect(() => {
        if (animationState === "launching") {
            const timer = setTimeout(() => {
                setAnimationState("success")
            }, 4000)
            return () => clearTimeout(timer)
        }
    }, [animationState])

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <div className="mb-4">
                            <label htmlFor="founderName" className="block text-orange-600 font-bold mb-2">
                                Ko'rishdorning Nomi
                            </label>
                            <input
                                type="text"
                                id="founderName"
                                name="founderName"
                                value={formData.founderName}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border-2 border-orange-300 rounded-lg focus:border-orange-500 focus:outline-none"
                                placeholder="e.g., Elon Musk"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="startupName" className="block text-orange-600 font-bold mb-2">
                                Startapingizning Ajoyib Nomi
                            </label>
                            <input
                                type="text"
                                id="startupName"
                                name="startupName"
                                value={formData.startupName}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border-2 border-orange-300 rounded-lg focus:border-orange-500 focus:outline-none"
                                placeholder="e.g., SpaceX"
                            />
                        </div>
                    </>
                )
            case 2:
                return (
                    <>
                        <div className="mb-4">
                            <label htmlFor="industry" className="block text-orange-600 font-bold mb-2">
                                Siz Izlanayotgan Sanoat
                            </label>
                            <select
                                id="industry"
                                name="industry"
                                value={formData.industry}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border-2 border-orange-300 rounded-lg focus:border-orange-500 focus:outline-none"
                            >
                                <option value="">Jang maydoningizni tanlang</option>
                                <option value="tech">Texnologiya Inqilobi</option>
                                <option value="health">Sog'liqni Saqlash Insoniyatining Yangilanishi</option>
                                <option value="finance">Moliyaviy Texnologiya Chegaralari</option>
                                <option value="education">Ta'lim Texnologiyasi Transformatsiyasi</option>
                                <option value="other">Boshqa Kosmik Korxonalar</option>

                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="fundingStage" className="block text-orange-600 font-bold mb-2">
                                Sizning Moliyaviy Bosqichingiz
                            </label>
                            <select
                                id="fundingStage"
                                name="fundingStage"
                                value={formData.fundingStage}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border-2 border-orange-300 rounded-lg focus:border-orange-500 focus:outline-none"
                            >
                                <option value="">Yuklash Bosqchingizni Tanlang</option>
                                <option value="pre-seed">Idea Inkubatsiyasi</option>
                                <option value="seed">Urug' Ekish</option>
                                <option value="series-a">Yuksalish (A Seriyasi)</option>
                                <option value="series-b">Orbita (B Seriyasi)</option>
                                <option value="later">Yulduzlararo (Keyingi Bosqich)</option>
                            </select>
                        </div>
                    </>
                )
            case 3:
                return (
                    <>
                        <div className="mb-4">
                            <label htmlFor="teamSize" className="block text-orange-600 font-bold mb-2">
                                Jamoangizda nechta odam bor
                            </label>
                            <input
                                type="number"
                                id="teamSize"
                                name="teamSize"
                                value={formData.teamSize}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border-2 border-orange-300 rounded-lg focus:border-orange-500 focus:outline-none"
                                placeholder="e.g., 5 Innovators"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="website" className="block text-orange-600 font-bold mb-2">
                                Sizning Raqamli Boshqaruv Markazingiz
                            </label>
                            <input
                                type="url"
                                id="website"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                className="w-full p-2 border-2 border-orange-300 rounded-lg focus:border-orange-500 focus:outline-none"
                                placeholder="https://yourgalacticempire.com"
                            />
                        </div>
                    </>
                )
            case 4:
                return (
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-orange-600 font-bold mb-2">
                            Dunyoni O'zgartiruvchi Missiyangiz
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border-2 border-orange-300 rounded-lg focus:border-orange-500 focus:outline-none h-32"
                            placeholder="Describe how you're going to change the world..."
                        />
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-300 p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
                {animationState === "idle" && (
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <div className="text-6xl mb-4">🚀</div>
                            <h1 className="text-3xl font-bold text-orange-600 mb-2">O'z loyhanggizni biz bilan boshlang</h1>
                            <p className="text-gray-600">Malumotlarni to'ldring!</p>
                        </div>
                        <div className="flex justify-center mb-8">
                            {[1, 2, 3, 4].map((s) => (
                                <div
                                    key={s}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center mx-1 ${s === step ? "bg-orange-500 text-white" : "bg-orange-200 text-orange-600"
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
                                {step < 4 ? (
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
                                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors ml-auto"
                                    >
                                        Startapingizni O'chirish 🚀
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
                                        width: `${Math.random() * 3 + 1}px`,
                                        height: `${Math.random() * 3 + 1}px`,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}
                {animationState === "success" && (
                    <div className="p-8 text-center">
                        <div className="text-6xl mb-4">🎉</div>
                        <h2 className="text-2xl font-bold text-orange-600 mb-2">Tabriklayman, {formData.founderName}!</h2>
                        <p className="text-xl text-gray-700 mb-4">{formData.startupName} Ishga tushirildi!</p>
                        <p className="text-gray-600">Dunyoni o'zgartirishga tayyor bo'ling!</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CreativeAnimatedStartupForm

