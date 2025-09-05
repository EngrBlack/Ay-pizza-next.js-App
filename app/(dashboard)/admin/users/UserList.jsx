"use client";

import Table from "@/app/_components/Table";
import User from "./User";

const headers = ["ID", "Name", "Email", "Role ", "Actions"];

function UserList({ users }) {
  return (
    <Table size="grid-cols-5" className="p-6">
      <Table.Header>
        {headers.map((el) => (
          <div key={el}>{el}</div>
        ))}
      </Table.Header>

      {users.map((user) => (
        <Table.Body key={user?.id} className="p-2.5 ">
          <User user={user} />
        </Table.Body>
      ))}
    </Table>
  );
}

export default UserList;
