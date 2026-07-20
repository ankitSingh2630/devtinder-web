import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connection = useSelector((store) => store.connection);
  const fetchConnections = async () => {
    try {
      if (connection) return;
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connection) return null;
  return (
    <section className="page">
      <div className="page-heading">
        <p className="eyebrow">Your network</p>
        <h1>Connections</h1>
        <p>Developers you’ve mutually connected with.</p>
      </div>
      {connection.length === 0 ? (
        <div className="empty-state glass-card">
          <h2>No connections yet</h2>
          <p className="muted">
            Start discovering developers to make your first connection.
          </p>
        </div>
      ) : (
        <div className="people-list">
          {connection.map((conn) => (
            <article className="glass-card person-row" key={conn._id}>
              {conn.photoUrl ? (
                <img className="avatar" src={conn.photoUrl} alt="" />
              ) : (
                <span className="avatar avatar-fallback">
                  {conn.firstName?.[0]}
                </span>
              )}
              <div className="person-info">
                <h2>
                  {conn.firstName} {conn.lastName}
                </h2>
                <p>
                  {conn.age && conn.gender
                    ? `${conn.age}, ${conn.gender}`
                    : "Developer"}
                </p>
                <p>{conn.about}</p>
              </div>
              <span className="muted">›</span>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
export default Connections;
