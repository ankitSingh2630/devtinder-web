import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);
  const dispatch = useDispatch();
  const handleSaveProfile = async () => {
    try {
      setError("");
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data));
      setToast(true);
      setTimeout(() => setToast(false), 2000);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };
  return (
    <section className="page">
      <div className="page-heading">
        <p className="eyebrow">Your developer card</p>
        <h1>Edit Profile</h1>
        <p>Make your public profile count.</p>
      </div>
      <div className="profile-grid">
        <div className="glass-card form-card">
          <div className="field-grid">
            <div className="field">
              <label>First name</label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="field">
              <label>Last name</label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label>Photo URL</label>
            <input
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </div>
          <div className="field-grid">
            <div className="field">
              <label>Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="field">
              <label>Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="field">
            <label>About</label>
            <textarea
              rows="4"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button
            className="primary-button"
            style={{ width: "100%" }}
            onClick={handleSaveProfile}
          >
            {toast ? "Saved!" : "Save Profile"}
          </button>
          {toast && <p className="success">Your profile has been updated.</p>}
        </div>
        <div className="profile-preview">
          <p className="eyebrow">Live preview</p>
          <UserCard
            preview
            user={{ firstName, lastName, photoUrl, age, gender, about }}
          />
        </div>
      </div>
    </section>
  );
};
export default EditProfile;
