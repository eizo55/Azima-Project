import OurButton from "./OurButton";
import imgHolder from "../assets/EventImage.png";
import "../Styles/settings.css";
import useAuthentication from "../hooks/userHook";
import { InputText } from "./InputText";
import Checkbox from "./Checkbox";
import { useEffect, useState } from "react";
import CloudinaryUploadWidget from "../components/UploadImage";
import { User } from "../data/types";
import useGroup from "../hooks/groupHook";
import { PASSWORD_REGEX } from "../data/helpers";
const AccountSettings = ({}) => {
  const {
    user,
    updateUser,
    updatePassword,
    preferences,
    deleteAccount,
    setPreferences,
    setUser,
    logout,
  } = useAuthentication();
  const { categories, getCategories } = useGroup();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [publicId, setPublicId] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [deletePopup, setDeletePopup] = useState(false);
  const [updatePassPopup, setUpdatePassPopup] = useState(false);
  const [confirmName, setConfirmName] = useState("");
  const [cloudName] = useState("dkgrr55re");
  const [uploadPreset] = useState("v6wusflm");
  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    // cropping: true, //add a cropping step
    // showAdvancedOptions: true,  //add advanced options (public_id and tag)
    // sources: [ "local", "url"], // restrict the upload sources to URL and local files
    // multiple: false,  //restrict upload to a single file
    // folder: "user_images", //upload files to the specified folder
    // tags: ["users", "profile"], //add the given tags to the uploaded files
    // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
    // clientAllowedFormats: ["images"], //restrict uploading to image files only
    // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
    // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
    // theme: "purple", //change to a purple theme
  });

  const handleUpdatePassword = (e: any) => {
    e.preventDefault();

    oldPassword !== user?.password
      ? alert("Old password is incorrect")
      : !validatePassword(newPassword)
      ? alert(
          "Password must contain at least one lowercase letter, one uppercase letter, one number, and be between 8 and 25 characters long."
        )
      : newPassword !== confirmPassword
      ? alert("Passwords do not match")
      : oldPassword === user?.password &&
        newPassword === confirmPassword &&
        (() => {
          alert("Password updated successfully. You will be logged out.");
          updatePassword(user?.ID, newPassword);
          logout();
        })();
  };

  const DeleteAccount = () => {
    confirmName === user?.username
      ? deleteAccount(user?.ID)
      : alert("usernames do not match");
  };
  const toggleDeletePopup = (e: any) => {
    e.preventDefault();
    setDeletePopup(!deletePopup);
  };

  const toggleUpdatePassPopup = (e: any) => {
    e.preventDefault();
    setUpdatePassPopup(!updatePassPopup);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();

    if (selectedDate > currentDate) {
      alert("Selected date cannot be in the future");
    } else {
      setUser({ ...user, birthdate: e.target.value } as User);
    }
  };

  const handleInputChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value } as User);
  };

  const handleSaveClick = async (e: any) => {
    ({ ...user, preferences });
    await updateUser(user?.ID, { ...user, preferences });
    window.location.reload();
  };

  const handleNewPasswordChange = (e: any) => {
    setNewPassword(e.target.value);
    setIsPasswordValid(validatePassword(newPassword));
  };

  let passwordLength = user?.password?.length;
  const validatePassword = (password: string) => PASSWORD_REGEX.test(password);
  // Get user data
  useEffect(() => {
    getCategories();
  }, []);

  // Handle user img upload
  useEffect(() => {
    if (publicId) {
      // Construct the Cloudinary image URL with the publicId
      const baseUrl = "https://res.cloudinary.com/dkgrr55re/image/upload/";
      const imageUrl = `${baseUrl}${publicId}`;

      // Update userData state using setUserData
      setUser({ ...user, profile_image: imageUrl } as User);
    }
  }, [publicId]);

  return (
    <>
      <div className="account-settings-all">
        {deletePopup && (
          <div className="popup">
            <div className="overlay">
              <div className="popup-content">
                <>
                  <div className="header">
                    <h3>are you sure you want to delete </h3>
                    <h3>{user?.username}? </h3>
                    <InputText
                      value={confirmName}
                      placeholder="Enter group name to confirm"
                      onChange={(e: any) => setConfirmName(e.target.value)}
                    />
                    <div className="pop-up-buttn">
                      <OurButton
                        position="center"
                        label="Confirm"
                        onClick={DeleteAccount}
                      />
                    </div>
                  </div>
                </>

                <button className="close-popup" onClick={toggleDeletePopup}>
                  &times;
                </button>
              </div>
            </div>
          </div>
        )}

        {updatePassPopup && (
          <div className="popup">
            <div className="overlay">
              <div className="popup-content">
                <>
                  <div className="header">
                    <form onSubmit={handleUpdatePassword}>
                      <InputText
                        value={oldPassword}
                        placeholder="Enter your old password"
                        onChange={(e: any) => setOldPassword(e.target.value)}
                        password
                        required
                      />
                      <InputText
                        value={newPassword}
                        placeholder="Enter your new password"
                        onChange={handleNewPasswordChange}
                        password
                        required
                      />
                      {!isPasswordValid && (
                        <p style={{ color: "red", maxWidth: "43rem" }}>
                          Password must contain at least one lowercase letter,
                          one uppercase letter, one number, and be between 8 and
                          25 characters long.
                        </p>
                      )}
                      <InputText
                        value={confirmPassword}
                        placeholder="confirm your new password"
                        onChange={(e: any) =>
                          setConfirmPassword(e.target.value)
                        }
                        password
                        required
                      />
                      <div className="pop-up-buttn">
                        <OurButton
                          position="center"
                          label="Confirm"
                          onClick={handleUpdatePassword}
                          type="submit"
                        />
                      </div>
                    </form>
                  </div>
                </>

                <button className="close-popup" onClick={toggleUpdatePassPopup}>
                  &times;
                </button>
              </div>
            </div>
          </div>
        )}
        <h1 className="settings-header-settings">Account</h1>
        <div className="account-container">
          <div className="account-image-settings">
            <div>
              {" "}
              <img src={user?.profile_image} />
              <CloudinaryUploadWidget
                uwConfig={uwConfig}
                setPublicId={setPublicId}
              />
            </div>

            <OurButton label="Save" onClick={handleSaveClick} />
          </div>
          <div className="info-container-settings">
            <InputText
              placeholder={user?.name}
              label="Name"
              onChange={handleInputChange}
              defaultValue={user?.name}
              name="name"
            />
            <InputText
              placeholder={user?.surname}
              label="Surname"
              onChange={handleInputChange}
              defaultValue={user?.surname}
              name="surname"
            />
            <InputText
              placeholder={user?.username}
              label="Username"
              onChange={handleInputChange}
              defaultValue={user?.username}
              name="username"
            />
            <InputText
              placeholder={user?.birthdate}
              label="Birthdate"
              onChange={handleDateChange}
              defaultValue={user?.birthdate}
              name="birthdate"
              date
            />
            <h3 className="bold password-settings">Email</h3>
            <h3 className="purple">{user?.email}</h3>
            <h3 className="bold password-settings">Password</h3>
            <h3 className="purple">{"*".repeat(passwordLength)}</h3>
            <OurButton
              label="Change Password"
              thin
              onClick={toggleUpdatePassPopup}
            />
            <h1
              className="bold set-label-account"
              style={{ marginTop: "4rem" }}
            >
              Interests
            </h1>
            <div className="checkboxe-signup">
              {categories &&
                categories.map((category) => (
                  <Checkbox
                    key={category?.category_id}
                    label={category?.value}
                    checked={preferences?.includes(category?.category_id)}
                    onChange={() => {
                      const isChecked = preferences?.includes(
                        category?.category_id
                      );
                      isChecked && preferences
                        ? setPreferences(
                            preferences?.filter(
                              (pref) => pref !== category?.category_id
                            )
                          )
                        : setPreferences([
                            ...preferences,
                            category?.category_id,
                          ]);
                    }}
                  />
                ))}
            </div>
            <h1
              style={{ margin: "0", fontSize: "3rem" }}
              className="bold set-label"
            >
              Privacy
            </h1>
            <div className="checkbox-div">
              <Checkbox
                label="Hide my name"
                checked={user?.is_name_private}
                onChange={() =>
                  setUser({
                    ...user,
                    is_name_private: !user?.is_name_private,
                  } as User)
                }
              />
              <Checkbox
                label="Hide my email "
                checked={user?.is_email_private}
                onChange={() =>
                  setUser({
                    ...user,
                    is_email_private: !user?.is_email_private,
                  } as User)
                }
              />
              <Checkbox
                label="Send me notifications about updates"
                checked={user?.is_updates_notifications_on}
                onChange={() =>
                  setUser({
                    ...user,
                    is_updates_notifications_on:
                      !user?.is_updates_notifications_on,
                  } as User)
                }
              />
            </div>
            <OurButton
              thin
              label="Delete Account"
              variant="alert"
              onClick={toggleDeletePopup}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSettings;
