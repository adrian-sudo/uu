import { CustomersTable } from "../components/CustomersTable";
import { HeaderUsers } from "./components/HeaderUsers";
import { UsersTable } from "./components/TableViewUsers/UsersTable";

export default function Usuario() {
  return (
    <div>
      <HeaderUsers />
      <UsersTable />
    </div>
  );
}
