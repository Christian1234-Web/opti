import { useState } from "react";
// import { getLoggedinUser } from "../../helpers/api_helper";

const useProfile = () => {
  // const userProfileSession = getLoggedinUser();
  const [userProfileSession, getLoggedinUser] = useState();
  const [loading] = useState(userProfileSession ? false : true);
  const [userProfile] = useState(
    userProfileSession ? userProfileSession : null
  );

  return { userProfile, loading };
};

export { useProfile };
