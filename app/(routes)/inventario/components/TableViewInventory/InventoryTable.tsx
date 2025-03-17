"use client";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { API_ROUTES } from "@/config/apiConfig";
import { FormCreateCustomer } from "../FormCreateCustomer/FormCreateCustomer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner"; // Importa el toast de sonner
import { MoreHorizontal } from "lucide-react";

interface Inventario {
  id: number; // Este campo sigue en la interfaz porque es necesario para las operaciones de edición y eliminación
  serial: string;
  observacion: string;
  nombre: string;
  marca: string;
  tipoEquipo: string;
  modelo: string;
  ubicacion: string;
  estado: string;
  negocio: string;
  cantidad: number;
}

export function InventarioTable() {
  const [inventario, setInventario] = React.useState<Inventario[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [total, setTotal] = React.useState(0);
  const [openModalEdit, setOpenModalEdit] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<Inventario | null>(
    null
  );

  React.useEffect(() => {
    const fetchInventario = async () => {
      try {
        const response = await fetch(
          `${API_ROUTES.BASE_URL}${API_ROUTES.INVENTARIO.DEFAULT}?page=${page}&pageSize=${pageSize}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener el inventario");
        }
        const data = await response.json();
        setInventario(data.inventario);
        setTotal(data.total);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchInventario();
  }, [page, pageSize]);

  const handleEdit = (item: Inventario) => {
    setSelectedItem(item);
    setOpenModalEdit(true);
  };

  const handleDelete = async (item: Inventario) => {
    try {
      const response = await fetch(
        `${API_ROUTES.BASE_URL}${API_ROUTES.INVENTARIO.DEFAULT}/${item.id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Error al eliminar el item del inventario");
      }
      setInventario((prevInventario) =>
        prevInventario.filter((i) => i.id !== item.id)
      );
      toast.success("Item eliminado correctamente");
    } catch (error) {
      toast.error((error as Error).message || "Error al eliminar el item");
    }
  };

  const columns: ColumnDef<Inventario>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "serial",
      header: "Serial",
    },
    {
      accessorKey: "nombre",
      header: "Nombre",
    },
    {
      accessorKey: "marca",
      header: "Marca",
    },
    {
      accessorKey: "tipoEquipo",
      header: "Tipo de Equipo",
    },
    {
      accessorKey: "modelo",
      header: "Modelo",
    },
    {
      accessorKey: "ubicacion",
      header: "Ubicación",
    },
    {
      accessorKey: "estado",
      header: "Estado",
    },
    {
      accessorKey: "negocio",
      header: "Negocio",
    },
    {
      accessorKey: "cantidad",
      header: "Cantidad",
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const item = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menú</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleEdit(item)}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDelete(item)}>
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: inventario,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: page - 1,
        pageSize,
      },
    },
  });

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar por nombre..."
          value={(table.getColumn("nombre")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nombre")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columnas
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} fila(s) seleccionadas.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
      <Dialog open={openModalEdit} onOpenChange={setOpenModalEdit}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Editar item</DialogTitle>
            <DialogDescription>Editar y configurar item</DialogDescription>
          </DialogHeader>
          <FormCreateCustomer
            setOpenModalCreate={setOpenModalEdit}
            item={selectedItem ?? undefined}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

/***
 *  ESTOS CAMBIOS SON DEL INVENTARIO YA QUE SE MOSTRARAR EN LA UI DEL USARIO ESTE CODIGO ES LO QUE APARECE CUANDO LE DAS EN EL BOTON
 * DE AGREGAR INVENTARIO Y TE SALEN LOS CAMPOS...
 */
