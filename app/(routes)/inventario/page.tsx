import { InventarioTable } from "./components/TableViewInventory/InventarioTable";
import { HeaderInventory } from "./components/HeaderInventory";

export default function Inventario() {
  return (
    <div>
      <HeaderInventory />
      <InventarioTable />
    </div>
  );
}
