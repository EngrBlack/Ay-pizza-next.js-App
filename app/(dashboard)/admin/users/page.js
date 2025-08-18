"use client";

import Modal from "@/app/_components/Modal";
import UserList from "./UserList";
import AdminButton from "@/app/_components/AdminButton";
import UpdateUserForm from "./UpdateUserForm";

function page() {
  return (
    <section className="bg-cream-200 ">
      <div className="px-4 sm:px-6 py-4 sm:py-10 xl:px-10 lg:py-10 w-full tracking-wide bg-cream-200">
        <div className="flex items-center justify-between  mb-6 ">
          <h1 className="font-rowdies text-brown-300 text-2xl sm:text-3xl  ">
            Admins and Users
          </h1>

          <Modal>
            <Modal.Open openWindowName="user">
              <AdminButton icon="empty">Update User</AdminButton>
            </Modal.Open>
            <Modal.Window openWindowName="user">
              <UpdateUserForm />
            </Modal.Window>
          </Modal>
        </div>
        <div>
          <UserList />
        </div>
      </div>
    </section>
  );
}

export default page;
