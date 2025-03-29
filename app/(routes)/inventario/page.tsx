import { HeaderInventory } from "./components/HeaderInventory";
import { InventarioTable } from "./components/TableViewInventory/InventarioTable";

export default function Inventario() {
  return (
    <div>
      <HeaderInventory />
      <InventarioTable />
    </div>
  );
}
