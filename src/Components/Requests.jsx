import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const requestData = async () => {
    if (requests) return;

    try {
      const request = await axios.get(
        BASE_URL + "/user/requests/recieved",
        { withCredentials: true }
      );

      dispatch(addRequests(request.data.data));
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  const reviewRequest = async (status, requestId) => {
    try {
      await axios.post(
  `${BASE_URL}/request/review/${status}/${requestId}`,
  {},
  {
    withCredentials: true,
  }
);

      // Remove reviewed request from UI
      const updatedRequests = requests.filter(
        (req) => req._id !== requestId
      );

      dispatch(addRequests(updatedRequests));
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Unable to review request");
    }
  };

  useEffect(() => {
    requestData();
  }, []);

  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <div className="text-center my-15 text-4xl font-bold text-white">
        <h2>No Request Found</h2>
      </div>
    );
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-4xl text-white font-bold">Requests</h1>

      {requests.map((request) => {
        const {
          _id,
          firstName,
          lastName,
          age,
          gender,
          photoUrl,
          about,
        } = request.fromUserId;

        return (
          <div
            className="flex m-4 p-4 bg-base-300 w-1/2 mx-auto"
            key={request._id}
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-25 rounded-full"
                src={photoUrl}
              />
            </div>

            <div className="text-left mx-4 flex-1">
              <h2 className="text-xl font-bold">
                {firstName} {lastName}
              </h2>

              {age && gender && <p>{age + ", " + gender}</p>}

              <p>{about}</p>
            </div>

            <div className="flex justify-center items-center">
              <button
                className="btn btn-primary mx-2"
                onClick={() =>
                  reviewRequest("accepted", request._id)
                }
              >
                Accept
              </button>

              <button
                className="btn btn-secondary mx-2"
                onClick={() =>
                  reviewRequest("rejected", request._id)
                }
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;