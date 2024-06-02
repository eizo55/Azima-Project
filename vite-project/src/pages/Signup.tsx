import "../Styles/Navbar.css";
import "../Styles/signin.css";

import NavBar from "../components/navbar";
import Checkbox from "../components/Checkbox";
import OurButton from "../components/OurButton";
import CloudinaryUploadWidget from "../components/UploadImage";
import Terms from "../components/Terms";

import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

import { PASSWORD_REGEX } from "../data/helpers";

import { useEffect, useState } from "react";
import useAuthentication from "../hooks/userHook";
import ImgHolder from "../assets/EventImage.png";

export default function () {
  const [profile_image, setProfile_image] = useState(`${ImgHolder}`);
  const [isPolicyChecked, setIsPolicyChecked] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [preferences, setPreferences] = useState<number[]>([]);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [termsPopup, setTermsPopup] = useState(false);
  const [birthdate, setBirthdate] = useState("");
  const { user, register } = useAuthentication();
  const [stepTwo, setStepTwo] = useState(false);
  const [username, setUsername] = useState("");
  const [publicId, setPublicId] = useState("");
  const [password, setPassword] = useState("");
  const [uploadPreset] = useState("v6wusflm");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [cloudName] = useState("dkgrr55re");
  const navigate = useNavigate();
  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    multiple: false,
  });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();

    if (selectedDate > currentDate) {
      alert("Selected date cannot be in the future");
    } else {
      setBirthdate(e.target.value);
    }
  };

  const handlePopup = () => {
    setTermsPopup(!termsPopup);
  };

  const handleSubmit = (e: any) => {
    const formData = {
      name,
      surname,
      username,
      email,
      password,
      confirmPassword,
      profile_image,
      birthdate,
      preferences,
    };
    alert("You have successfully registered");
    register(e, formData);
  };

  const handleCheckboxesChange = (value: number) => {
    if (!preferences.includes(value)) {
      // If not present, add it to the array
      setPreferences([...preferences, value]);
    } else {
      // If present, remove it from the array
      setPreferences(preferences.filter((pref) => pref !== value));
    }
  };

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleChange = (e: any) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsPasswordValid(validatePassword(newPassword));
  };

  const handleChangeEmail = (e: any) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsEmailValid(validateEmail(newEmail));
  };

  const handleChangeComnfiremdPass = (e: any) => {
    const newPassword = e.target.value;
    setConfirmPassword(newPassword);
  };

  const handleSubmitClick = () => {
    !isEmailValid && alert("Enter a valid Email");
    password !== confirmPassword &&
      alert("The passwords you entered do not match");
    !isPolicyChecked && alert("Please agree to our terms and polices");
    if (
      password === confirmPassword &&
      isPasswordValid &&
      isEmailValid &&
      isPolicyChecked
    ) {
      setStepTwo(true);
      navigate("?step=2");
    }
  };

  const validatePassword = (password: string) => PASSWORD_REGEX.test(password);

  const handleFormSubmission = async (e: any) => {
    e.preventDefault();

    if (isPasswordValid) {
    }
  };

  useEffect(() => {
    if (publicId) {
      // Here you can fetch the profile image URL using the publicId
      // For example, if the Cloudinary base URL is "https://res.cloudinary.com/<cloud_name>/image/upload/",
      // you can construct the image URL as `${baseUrl}${publicId}`
      const imageUrl = `https://res.cloudinary.com/dkgrr55re/image/upload/${publicId}`;

      // Update the image source
      setProfile_image(imageUrl);
    }
  }, [publicId]);

  useEffect(() => {
    user && navigate("/home");
  });

  return (
    <div className="container">
      {termsPopup && (
        <div className="popup">
          <div className="overlay">
            <div className="popup-content popup-background">
              <div className="terms-and-conn">
                <Terms />
              </div>

              <button className="close-popup" onClick={handlePopup}>
                &times;
              </button>
            </div>
          </div>
        </div>
      )}
      <NavBar navType="fnav" />
      <div
        className="wrapper-signup"
        style={{
          width: `${stepTwo && "75rem"}`,
          marginTop: `${stepTwo ? "13.4rem" : "22rem"} `,
        }}
      >
        {stepTwo === false ? (
          <form onSubmit={handleFormSubmission}>
            <h1>Sign up</h1>
            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleChangeEmail}
                required
              />
              <CiMail className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                value={password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />

              <FaLock className="icon" />
            </div>
            {!isPasswordValid && (
              <p style={{ color: "red" }}>
                Password must contain at least one lowercase letter, one
                uppercase letter, one number, and be between 8 and 25 characters
                long.
              </p>
            )}
            <div className="input-box">
              <input
                placeholder="Re-type Password"
                type="password"
                value={confirmPassword}
                onChange={handleChangeComnfiremdPass}
                required
              />
              <label className="terms-and-con">
                <input
                  checked={isPolicyChecked}
                  onChange={() => setIsPolicyChecked(!isPolicyChecked)}
                  type="checkbox"
                />
                <p>
                  {" "}
                  I read and accept the{" "}
                  <a onClick={handlePopup}>terms and conditions</a>
                </p>
              </label>
            </div>
            <div className="register-button-stepone">
              <OurButton
                position="center"
                label="Register"
                variant={""}
                disabled={!email || !password || !confirmPassword}
                onClick={handleSubmitClick}
              />
            </div>
            <div className="register-link center-link">
              <p>
                Already have an account? <Link to="/Signin">Sign-in!</Link>
              </p>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <h1 className="information-header">
              Let's gather more information about you
            </h1>

            <div className="img-and-extra-info-container">
              <div className="field-inputs">
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Surname"
                    required
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <FaUser className="icon" />
                </div>

                <div className="input-box">
                  <input
                    type="date"
                    placeholder="Date of Birth"
                    required
                    value={birthdate}
                    onChange={handleDateChange}
                  />
                </div>
                <h1 className="information-header to-left">Interests</h1>
                <div className="checkboxes-signup">
                  <div className="checkboxes-left">
                    <Checkbox
                      label="Sports"
                      checked={preferences.includes(1)}
                      onChange={() => handleCheckboxesChange(1)}
                    />
                    <Checkbox
                      label="Comedy"
                      checked={preferences.includes(2)}
                      onChange={() => handleCheckboxesChange(2)}
                    />{" "}
                  </div>
                  <div className="checkboxes-right">
                    <Checkbox
                      label="Education"
                      checked={preferences.includes(3)}
                      onChange={() => handleCheckboxesChange(3)}
                    />{" "}
                    <Checkbox
                      label="Religion"
                      checked={preferences.includes(4)}
                      onChange={() => handleCheckboxesChange(4)}
                    />{" "}
                  </div>
                </div>
              </div>

              <div className="import-image-container-singup">
                <img src={profile_image} />
                <CloudinaryUploadWidget
                  uwConfig={uwConfig}
                  setPublicId={setPublicId}
                />
              </div>
            </div>
            <OurButton
              position="center"
              label="Register"
              variant={""}
              type="submit"
            />
          </form>
        )}
      </div>
    </div>
  );
}
