import axios from "axios";
import React, { useEffect, useState } from "react";

function MyProfile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const res = axios
      .get("http://localhost:8800/api/users/find?username=balu")
      .then((data) => setUser(data.data));
  }, []);

  console.log(user);

  return (
    <div>
      {user?.prchdPrd?.map((item) => (
        <div key={item._id}>{item.title}</div>
      ))}
    </div>
  );
}

export default MyProfile;
