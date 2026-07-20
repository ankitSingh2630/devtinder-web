import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const requestData = async () => {
    if (requests) return;
    try {
      const request = await axios.get(BASE_URL + "/user/requests/recieved", {
        withCredentials: true,
      });
      dispatch(addRequests(request.data.data));
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };
  const reviewRequest = async (status, requestId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true },
      );
      dispatch(addRequests(requests.filter((req) => req._id !== requestId)));
    } catch (err) {
      setError(err.response?.data?.message || "Unable to review request");
    }
  };
  useEffect(() => {
    requestData();
  }, []);
  if (!requests) return null;
  return (
    <section className="page">
      <div className="page-heading">
        <p className="eyebrow">Connection inbox</p>
        <h1>Requests</h1>
        <p>Developers who want to connect with you.</p>
      </div>
      {error && <p className="error">{error}</p>}
      {requests.length === 0 ? (
        <div className="empty-state glass-card">
          <h2>No pending requests</h2>
          <p className="muted">
            When someone sends you a request, it will appear here.
          </p>
        </div>
      ) : (
        <div className="people-list">
          {requests.map((request) => {
            const user = request.fromUserId;
            return (
              <article className="glass-card person-row" key={request._id}>
                {user.photoUrl ? (
                  <img className="avatar" src={user.photoUrl} alt="" />
                ) : (
                  <span className="avatar avatar-fallback">
                    {user.firstName?.[0]}
                  </span>
                )}
                <div className="person-info">
                  <h2>
                    {user.firstName} {user.lastName}
                  </h2>
                  <p>
                    {user.age && user.gender
                      ? `${user.age}, ${user.gender}`
                      : "Developer"}
                  </p>
                  <p>{user.about}</p>
                </div>
                <div className="person-actions">
                  <button
                    className="secondary-button"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Decline
                  </button>
                  <button
                    className="primary-button"
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};
export default Requests;
