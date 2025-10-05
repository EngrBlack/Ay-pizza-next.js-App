import SortBy from "@/app/_components/SortBy";

function UserAdminHeading() {
  return (
    <div className="flex items-center justify-between gap-4   mb-6">
      <h1 className="font-rowdies text-brown-300 text-2xl sm:text-3xl ">
        Admins and Users
      </h1>
      <div>
        <SortBy
          field="sortedBy"
          options={[
            { label: "Admins", value: "role-asc" },
            { label: "Customers", value: "role-desc" },
            { label: "Old Users", value: "created_at-asc" },
            { label: "Newest Users", value: "created_at-desc" },
            { label: "Name (A - Z)", value: "fullName-asc" },
            { label: "Name (Z - A)", value: "fullName-desc" },
            { label: "Email (A - Z)", value: "email-asc" },
            { label: "Email(Z - A)", value: "email-desc" },
          ]}
        />
      </div>
    </div>
  );
}

export default UserAdminHeading;
