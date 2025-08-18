import Button from "@/app/_components/Button";
import { HiPencilSquare } from "react-icons/hi2";

function ProfileHeader({ onEdit }) {
  return (
    <div className="flex items-center justify-between rounded border-2 border-cream-100 p-3 sm:p-6 shadow-lg hover:shadow-2xl trans">
      <div>
        <h2 className="font-rowdies bg-gradient-to-br from-gradient-1 to-gradient-2 bg-clip-text text-transparent text-xl sm:text-3xl">
          User Profile
        </h2>
        <p className="font-bold text-xs sm:text-lg">
          View and manage your personal information.
        </p>
      </div>

      <Button type="gradient" icon={<HiPencilSquare />} onClick={onEdit}>
        Edit Profile
      </Button>
    </div>
  );
}

export default ProfileHeader;
