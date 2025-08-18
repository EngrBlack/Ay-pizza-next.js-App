"use client";

import Modal from "@/app/_components/Modal";
import AddCategoryForm from "./AddCategoryForm";
import AdminButton from "@/app/_components/AdminButton";

function CreateCategory() {
  return (
    <Modal>
      <Modal.Open openWindowName="category">
        <AdminButton>Add Category</AdminButton>
      </Modal.Open>
      <Modal.Window openWindowName="category">
        <AddCategoryForm />
      </Modal.Window>
    </Modal>
  );
}

export default CreateCategory;
