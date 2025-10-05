"use client";

import Table from "@/app/_components/Table";
import User from "./User";
import { useOptimistic } from "react";
import { deleteUser } from "@/app/_libs/userAction";
import Pagination from "@/app/_components/Pagination";

const headers = ["ID", "Name", "Email", "Role ", "Actions"];

function UserList({ users, count }) {
  const pageSize = Number(process.env.NEXT_PUBLIC_PAGE_SIZE);

  const [optimisticUsers, optimisticDelete] = useOptimistic(
    users,
    (curUsers, userId) => curUsers?.filter((user) => user.id !== userId)
  );

  async function handleDeleteUser(userId) {
    optimisticDelete(userId);
    await deleteUser(userId);
  }

  if (!users || users?.length === 0) {
    return <p className="p-6 mx-auto">No users found.</p>;
  }

  return (
    <div>
      <Table size="grid-cols-5" className="p-6">
        <Table.Header>
          {headers.map((el) => (
            <div key={el}>{el}</div>
          ))}
        </Table.Header>

        {optimisticUsers?.map((user) => (
          <Table.Body key={user?.id} className="p-2.5 ">
            <User user={user} onDeleteUser={handleDeleteUser} />
          </Table.Body>
        ))}
      </Table>
      {count > pageSize && <Pagination field="page" count={count} />}
    </div>
  );
}

export default UserList;
