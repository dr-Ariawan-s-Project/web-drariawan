import Button from '../../components/Button';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEmailStore } from '../../store/getEmail';

const DataDiri = () => {
  const navigate: NavigateFunction = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const { setEmail: setEmailInStore } = useEmailStore(); // Ganti nama setEmail agar tidak bentrok dengan state email

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phonePattern = /^\d{10,}$/;

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateForm(newEmail, phoneNumber);
  };

  const handlePhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value;
    setPhoneNumber(newPhoneNumber);
    validateForm(email, newPhoneNumber);
  };

  const validateForm = (newEmail, newPhoneNumber) => {
    const isEmailValid = emailPattern.test(newEmail);
    const isPhoneNumberValid = phonePattern.test(newPhoneNumber);

    setIsFormValid(isEmailValid && isPhoneNumberValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const enteredEmail = email;

    setEmailInStore(enteredEmail);

    localStorage.setItem('userEmail', enteredEmail);
    navigate('/verifikasi_email');

    if (form.checkValidity()) {
      navigate('/verifikasi_email');
    } else {
      form.reportValidity();
    }
  };

  return (
    <section className="flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 mt-18">
      <h2 className="text-center font-lato_black text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4">
        Input Data
      </h2>
      <div className="text-center mb-8">
        <p className="text-sm sm:text-base md:text-lg lg:text-xl">
          Silakan mengisi formulir ini dengan informasi yang diperlukan.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-sm mt-10 lg:mt-20">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="user-email"
          >
            Email<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            className="bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            id="user-email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {!isFormValid &&
            !email.match(/^\s*$/) &&
            !emailPattern.test(email) && (
              <p className="text-red-500">Masukkan email yang valid.</p>
            )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="no-handphone"
          >
            No Handphone<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            className="bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            id="no-handphone"
            type="tel"
            placeholder="No Handphone"
            required
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
          {!isFormValid &&
            !phoneNumber.match(/^\s*$/) &&
            !phonePattern.test(phoneNumber) && (
              <p className="text-red-500">
                Masukkan nomor handphone yang valid (minimal 10 angka).
              </p>
            )}
        </div>
        <div className="flex justify-end mt-20">
          <div className="font-semibold">
            <Button
              id="mulai"
              label="Selanjutnya"
              type="blue"
              active={isFormValid}
              onClick={() => navigate('/verifikasi_email')}
              textSize="text-base lg:text-lg xl:text-xl"
            />
          </div>
        </div>
      </form>
    </section>
  );
};

export default DataDiri;
