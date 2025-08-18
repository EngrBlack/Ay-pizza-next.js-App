"use client";

import { useState } from "react";
import EditProfileForm from "./EditProfileForm";
import ProfileCard from "./ProfileCard";
import ProfileHeader from "./ProfileHeader";
import { UserProvider } from "@/app/_context/UserProvider";

function UserProfileDetails({ user }) {
  const [isEdit, setIsEdit] = useState(false);

  const onEdit = () => {
    setIsEdit((edit) => !edit);
  };

  return (
    <UserProvider>
      <div className="flex flex-col gap-6">
        <ProfileHeader onEdit={onEdit} />
        {isEdit ? <EditProfileForm /> : <ProfileCard user={user} />}
      </div>
    </UserProvider>
  );
}

export default UserProfileDetails;
