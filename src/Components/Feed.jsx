import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    try {
      if (feed) return;
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data));
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  if (!feed) return null;
  if (feed.length <= 0)
    return (
      <section className="empty-state">
        <p className="eyebrow">Discover</p>
        <h2>You’re all caught up!</h2>
        <p className="muted">Check back later for more developers.</p>
      </section>
    );
  return (
    <section className="feed-wrap" aria-label="Discover developers">
      <div className="discover-card-frame">
        <p className="eyebrow" style={{ textAlign: "center" }}>
          Discover developers
        </p>
        <UserCard user={feed[0]} />
      </div>
    </section>
  );
};
export default Feed;
