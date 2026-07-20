import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user, preview = false }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, photoUrl, age, gender, about, skills } =
    user;
  const handleSendRequest = async (status, userId) => {
    if (preview || !userId) return;
    try {
      await axios.post(
        BASE_URL + "/send/" + status + "/" + userId,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };
  const skillList = Array.isArray(skills) ? skills : [];
  return (
    <article className="glass-card feed-card">
      <div className="feed-photo">
        {photoUrl ? (
          <img src={photoUrl} alt={`${firstName} ${lastName}`} />
        ) : (
          <div />
        )}
        <div className="photo-overlay" />
        <span className="role-badge">{gender || "Developer"}</span>
        <div className="photo-title">
          <h2>
            {firstName} {lastName}
            {age && <span className="muted">, {age}</span>}
          </h2>
          <p>
            {gender && `${gender[0].toUpperCase()}${gender.slice(1)} developer`}
          </p>
        </div>
      </div>
      <div className="card-body">
        <p>{about || "Tell the community a little about yourself."}</p>
        {skillList.length > 0 && (
          <div className="chips">
            {skillList.map((skill) => (
              <span className="chip" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        )}
        {!preview && (
          <div className="actions">
            <button
              className="action-button ignore"
              aria-label={`Ignore ${firstName}`}
              onClick={() => handleSendRequest("ignored", _id)}
            >
              ✕ Ignore
            </button>
            <button
              className="action-button interested"
              aria-label={`Show interest in ${firstName}`}
              onClick={() => handleSendRequest("interested", _id)}
            >
              ♥ Interested
            </button>
          </div>
        )}
      </div>
    </article>
  );
};
export default UserCard;
