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
                Visionary's Name
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
                Your Startup's Epic Name
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
                Industry You're Disrupting
              </label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
                className="w-full p-2 border-2 border-orange-300 rounded-lg focus:border-orange-500 focus:outline-none"
              >
                <option value="">Select your battlefield</option>
                <option value="tech">Tech Revolution</option>
                <option value="health">Health Innovation</option>
                <option value="finance">FinTech Frontier</option>
                <option value="education">EduTech Transformation</option>
                <option value="other">Other Cosmic Ventures</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="fundingStage" className="block text-orange-600 font-bold mb-2">
                Your Funding Milestone
              </label>
              <select
                id="fundingStage"
                name="fundingStage"
                value={formData.fundingStage}
                onChange={handleChange}
                required
                className="w-full p-2 border-2 border-orange-300 rounded-lg focus:border-orange-500 focus:outline-none"
              >
                <option value="">Select your launch stage</option>
                <option value="pre-seed">Idea Incubation</option>
                <option value="seed">Seed Planting</option>
                <option value="series-a">Liftoff (Series A)</option>
                <option value="series-b">Orbit (Series B)</option>
                <option value="later">Interstellar (Later Stage)</option>
              </select>
            </div>
          </>
        )
      case 3:
        return (
          <>
            <div className="mb-4">
              <label htmlFor="teamSize" className="block text-orange-600 font-bold mb-2">
                Size of Your Dream Team
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
                Your Digital HQ
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
              Your World-Changing Mission
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
              <h1 className="text-3xl font-bold text-orange-600 mb-2">Launch Your Startup Journey</h1>
              <p className="text-gray-600">Share your vision and let's build the future together!</p>
            </div>
            <div className="flex justify-center mb-8">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`w-8 h-8 rounded-full flex items-center justify-center mx-1 ${
                    s === step ? "bg-orange-500 text-white" : "bg-orange-200 text-orange-600"
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
                    Previous
                  </button>
                )}
                {step < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors ml-auto"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors ml-auto"
                  >
                    Blast Off Your Startup 🚀
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
            <h2 className="text-2xl font-bold text-orange-600 mb-2">Congratulations, {formData.founderName}!</h2>
            <p className="text-xl text-gray-700 mb-4">{formData.startupName} has been launched!</p>
            <p className="text-gray-600">Get ready to change the world!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CreativeAnimatedStartupForm

