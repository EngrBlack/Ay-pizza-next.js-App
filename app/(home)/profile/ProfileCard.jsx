import { useUser } from "@/app/_context/UserProvider";
import { formatDate } from "@/app/_helper/helper";
import Image from "next/image";
import { HiCalendar, HiEnvelope, HiPhone } from "react-icons/hi2";

function ProfileCard({ user }) {
  const fullName = user?.name || "";
  return (
    <div className=" rounded border-2 border-cream-100 px-4 md:px-6 py-8 shadow-lg hover:shadow-2xl trans flex flex-col gap-6 md:gap-8">
      <div className="flex flex-col  items-center gap-2 ">
        <figure className="w-25 aspect-square max-w-30 border-3 border-brown-300 rounded-full">
          <Image
            width={100}
            height={100}
            src="/user.jpg"
            alt=""
            className="w-full h-full"
          />
        </figure>
        <h3 className="font-rowdies">Engr Black</h3>
        <p className="bg-gradient-to-r from-gradient-1 to-gradient-2 text-cream-200 rounded-full py-0.5 px-3 font-pacifico tracking-widest md:text-xl">
          {fullName}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 md:gap-4">
        <ProfileTable />
        <AddressTable />
      </div>
    </div>
  );
}

export default ProfileCard;

function ProfileTable() {
  const { user } = useUser();

  return (
    <div className=" border rounded border-brown-300 ">
      <h2 className="font-black py-2 px-4 bg-brown-300 text-cream-200">
        Profile Details
      </h2>
      <div className="flex flex-col gap-2 p-4">
        <ContactCard icon={<HiEnvelope />}>{user?.email}</ContactCard>
        <ContactCard icon={<HiPhone />}>08084456647</ContactCard>
        <ContactCard icon={<HiCalendar />}>
          {formatDate(user?.confirmed_at)}
        </ContactCard>
      </div>
    </div>
  );
}

function AddressTable() {
  return (
    <div className="border rounded border-brown-300 ">
      <h2 className="font-black py-2 px-4 bg-brown-300 text-cream-200">
        Address
      </h2>

      <div className="flex flex-col gap-1 p-4">
        <h2>Fabian Peace</h2>

        <p>Jaja Hall Inside Unilag, Yaba Akoka, Lagos State. Inside Unilag.</p>
        <p>
          Yaba-Akoka,<span> Lagos.</span>
        </p>
      </div>
    </div>
  );
}

function ContactCard({ children, icon }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="bg-white  p-2 rounded-full">{icon}</span>
      <p className="font-rowdies text-sm md:text-base tracking-wider">
        {children}
      </p>
    </div>
  );
}
