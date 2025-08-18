"use client";

import Table from "@/app/_components/Table";
import User from "./User";

const headers = ["ID", "Name", "Email", "Role ", "Actions"];

function UserList() {
  return (
    <Table size="grid-cols-5" className="p-6">
      <Table.Header>
        {headers.map((el) => (
          <div key={el}>{el}</div>
        ))}
      </Table.Header>
      {Array.from({ length: 5 }, (_, i) => (
        <Table.Body key={i} className="p-2.5 ">
          <User />
        </Table.Body>
      ))}
    </Table>
  );
}

export default UserList;
