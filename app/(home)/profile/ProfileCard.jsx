import { formatDate } from "@/app/_helper/helper";
import { updateUserImage } from "@/app/_libs/checkoutActions";
import Image from "next/image";
import {
  HiCalendar,
  HiEnvelope,
  HiMiniPencilSquare,
  HiPhone,
} from "react-icons/hi2";
import ContactCard from "./ContactCard";
import toast from "react-hot-toast";

function ProfileCard({ user }) {
  const { fullName, image } = user;

  async function handleUpdateProfileImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // Show loading toast
      const toastId = toast.loading("Updating profile image...");
      await updateUserImage({ image: file });
      // Success
      toast.success("Profile image updated successfully!", { id: toastId });
    } catch (error) {
      toast.error(`Failed to update image: ${error.message}`);
    }
  }
  git;

  return (
    <div className=" rounded border-2 border-cream-100 px-2 md:px-6 py-8 shadow-lg hover:shadow-2xl trans flex flex-col gap-6 md:gap-8">
      <div className="flex flex-col  items-center gap-2 ">
        <div className="relative">
          <figure className="w-25 aspect-square overflow-hidden relative max-w-30 border-3 border-brown-300 rounded-full">
            <Image
              fill
              quality={20}
              src={image || "/user.jpg"}
              alt={fullName}
              className="object-cover w-full h-full "
            />
          </figure>
          <label
            htmlFor="image"
            className="absolute bottom-[0.1rem] right-0 text-xl bg-gradient-to-r from-gradient-1 to-gradient-2 text-cream-200 rounded-full p-1.5 w-fit hover:bg-gradient-to-l cursor-pointer trans ease-in-out"
          >
            <HiMiniPencilSquare className="" />
            <input
              type="file"
              id="image"
              name="image"
              className="hidden"
              onChange={handleUpdateProfileImage}
            />
          </label>
        </div>
        <p className="bg-gradient-to-r from-gradient-1 to-gradient-2 text-cream-200 rounded-full py-0.5 px-3 font-pacifico tracking-widest md:text-xl">
          {fullName || ""}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 md:gap-4">
        <ProfileTable user={user} />
        <AddressTable user={user} />
      </div>
    </div>
  );
}

export default ProfileCard;

function ProfileTable({ user }) {
  const {
    email,
    address: { contact },
    created_at: createdAt,
  } = user;

  return (
    <div className=" border rounded border-brown-300 ">
      <h2 className="font-black py-2 px-2 md:px-4 bg-brown-300 text-cream-200">
        Profile Details
      </h2>
      <div className="flex flex-col gap-2 p-4 px-2 md:px-4">
        <ContactCard icon={<HiEnvelope />}>{email || ""}</ContactCard>
        <ContactCard icon={<HiPhone />}>{contact || ""}</ContactCard>
        <ContactCard icon={<HiCalendar />}>{formatDate(createdAt)}</ContactCard>
      </div>
    </div>
  );
}

function AddressTable({ user }) {
  const { fullName, address } = user;

  return (
    <div className="border rounded border-brown-300 ">
      <h2 className="font-black py-2  px-2 md:px-4 bg-brown-300 text-cream-200">
        Address
      </h2>

      <div className="flex flex-col gap-1 p-4  px-2 md:px-4">
        <h2>{fullName}</h2>

        <p>{address?.address}</p>
        <p>
          {address?.city},<span> {`${address?.state} State.`}</span>
        </p>
      </div>
    </div>
  );
}
