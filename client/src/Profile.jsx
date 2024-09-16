import React, { useEffect, useState } from "react";
import { catchErrors } from "./utils";
import { accessToken, logout, getCurrentUserProfile } from "./spotify";

const Profile = () => {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      // throw new Error();
      console.log("fetching data");
      const response = await getCurrentUserProfile();
      const data = await response.json();
      setProfile(data);
      console.log(data);
    };

    if (accessToken) {
      const wrappedFetchData = catchErrors(fetchData);
      wrappedFetchData();
    }
  }, []);

  return (
    <section>
      {!token && <a href="http://localhost:3000/login">login</a>}
      <button className="bg-slate-500" onClick={logout}>
        Logout
      </button>
      <p>
        {profile?.display_name} Followers: {profile?.followers.total}
      </p>
      <img src={profile?.images[0].url} alt="" />
    </section>
  );
};

export default Profile;
