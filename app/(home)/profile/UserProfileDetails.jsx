"use client";

import { useState } from "react";
import EditProfileForm from "./EditProfileForm";
import ProfileCard from "./ProfileCard";
import ProfileHeader from "./ProfileHeader";

function UserProfileDetails({ user }) {
  const [isEdit, setIsEdit] = useState(false);

  const onEdit = () => {
    setIsEdit((edit) => !edit);
  };

  return (
    <div className="flex flex-col gap-6">
      <ProfileHeader onEdit={onEdit} />
      {isEdit && (user !== null || {}) ? (
        <EditProfileForm user={user} onEdit={onEdit} />
      ) : (
        <ProfileCard user={user} />
      )}
    </div>
  );
}

export default UserProfileDetails;
