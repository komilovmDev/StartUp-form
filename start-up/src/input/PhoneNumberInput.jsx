import React, { useState, useEffect } from 'react';

function PhoneNumberInput({ phoneNumber, setPhoneNumber, error, setError }) {
  const [localPhoneNumber, setLocalPhoneNumber] = useState(phoneNumber || '');
  const [localError, setLocalError] = useState(error || '');

  useEffect(() => {
    setLocalPhoneNumber(phoneNumber || '');
    setLocalError(error || '');
  }, [phoneNumber, error]);

  const handleChange = (event) => {
    const { value } = event.target;

    // Basic input filtering (allow only numbers, '+', and spaces)
    const filteredValue = value.replace(/[^0-9+\s]/g, '');
    setLocalPhoneNumber(filteredValue);
  };

  const handleBlur = () => {
    // Regular Expression Validation
    const phoneRegex = /^\+\d{1,3}\s?\d{3,14}$/;

    if (localPhoneNumber && !phoneRegex.test(localPhoneNumber)) {
      setLocalError('Please enter a valid phone number (e.g., +1 5551234567).');
      setError('Please enter a valid phone number (e.g., +1 5551234567).');
      setPhoneNumber(''); // Clear the phone number in the parent
    } else if (localPhoneNumber) {
      setLocalError('');
      setError('');
      setPhoneNumber(localPhoneNumber); // Update in parent only if valid
    } else {
        setLocalError("Phone number is required.")
        setError("Phone number is required.")
        setPhoneNumber("")
    }
  };

  return (
    <div>
      <input
        type="tel"
        id="phoneNumber"
        name="phoneNumber"
        value={localPhoneNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        required
        className="w-full p-2 border-2 border-orange-300 rounded-lg focus:border-orange-500 focus:outline-none"
        placeholder="+998"
      />
      {localError && (
        <p className="text-red-500 text-xs italic">{localError}</p>
      )}
    </div>
  );
}

export default PhoneNumberInput;