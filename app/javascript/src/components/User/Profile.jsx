import React, { useEffect, useState } from "react";

import usersApi from "apis/users";
import { Container, Toastr } from "components/commons";
import AvatarUpload from "components/User/AvatarUpload";
import { getFromLocalStorage } from "utils/storage";

const Profile = () => {
  const userId = getFromLocalStorage("authUserId");
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const { data } = await usersApi.show(userId);
      setUser(data);
    } catch (err) {
      Toastr.error("Failed to fetch user", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  return (
    <Container>
      <div>
        {user && (
          <div>
            <AvatarUpload
              user={user}
              userId={userId}
              onSuccess={() => fetchUser()}
            />
          </div>
        )}
      </div>
    </Container>
  );
};

export default Profile;
