"use client";

import AdminButton from "@/app/_components/AdminButton";
import UpdateUserForm from "./UpdateUserForm";
import { SessionProvider } from "next-auth/react";
import Modal from "@/app/_components/Modal";

function UpdateUser() {
  return (
    <SessionProvider>
      <Modal>
        <Modal.Open openWindowName="user">
          <AdminButton icon="empty">Update User</AdminButton>
        </Modal.Open>
        <Modal.Window openWindowName="user">
          <UpdateUserForm />
        </Modal.Window>
      </Modal>
    </SessionProvider>
  );
}

export default UpdateUser;
