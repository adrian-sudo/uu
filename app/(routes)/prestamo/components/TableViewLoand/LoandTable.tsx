"use client";
import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { FormCreatePrestamo } from "../FormCreatePrestamo/FormCreatePrestamo";
import { API_ROUTES } from "@/config/apiConfig";
import { toast } from "sonner";

interface Prestamo {
  id_prestamo: number;
  id_producto: number;
  usuario_prestamo: string;
  usuario_cargo: string;
  fecha_prestamo: string;
  fecha_devolucion: string;
  cantidad_prestada: number;
  estado: string;
  nombre_producto: string;
  serial_producto: string;
}

export function LoansTable() {
  const [prestamos, setPrestamos] = React.useState<Prestamo[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedPrestamo, setSelectedPrestamo] =
    React.useState<Prestamo | null>(null);
  const [openModalEdit, setOpenModalEdit] = React.useState(false);

  function formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    return date.toISOString().split("T")[0]; // Devuelve solo la parte de la fecha (YYYY-MM-DD)
  }

  React.useEffect(() => {
    const fetchPrestamos = async () => {
      try {
        const response = await fetch(
          `${API_ROUTES.BASE_URL}${API_ROUTES.PRESTAMOS.DEFAULT}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener los préstamos");
        }
        const data = await response.json();
        setPrestamos(data.prestamos);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrestamos();
  }, []);

  const handleEdit = (prestamo: Prestamo) => {
    setSelectedPrestamo(prestamo);
    setOpenModalEdit(true);
  };

  const handleMarkAsReturned = async (prestamo: Prestamo) => {
    try {
      const response = await fetch(
        `http://localhost:1024/api/prestamo/${prestamo.id_prestamo}/estado`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ estado: "Devuelto" }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al marcar el préstamo como devuelto");
      }

      // Actualizar el estado local de los préstamos
      setPrestamos((prevPrestamos) =>
        prevPrestamos.map((p) =>
          p.id_prestamo === prestamo.id_prestamo
            ? { ...p, estado: "Devuelto" }
            : p
        )
      );

      toast.success("Préstamo marcado como devuelto correctamente");
    } catch (error) {
      toast.error((error as Error).message || "Error al marcar como devuelto");
    }
  };

  const handleDelete = async (prestamo: Prestamo) => {
    try {
      const response = await fetch(
        `${API_ROUTES.BASE_URL}${API_ROUTES.PRESTAMOS.DEFAULT}/${prestamo.id_prestamo}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Error al eliminar el préstamo");
      }
      setPrestamos((prevPrestamos) =>
        prevPrestamos.filter((p) => p.id_prestamo !== prestamo.id_prestamo)
      );
      toast.success("Préstamo eliminado correctamente");
    } catch (error) {
      toast.error((error as Error).message || "Error al eliminar el préstamo");
    }
  };

  const columns: ColumnDef<Prestamo>[] = [
    { accessorKey: "usuario_prestamo", header: "Usuario" },
    { accessorKey: "usuario_cargo", header: "Cargo" },
    {
      accessorKey: "fecha_prestamo",
      header: "Fecha Préstamo",
      cell: ({ row }) => {
        const fechaPrestamo = row.original.fecha_prestamo;
        return formatDate(fechaPrestamo);
      },
    },
    {
      accessorKey: "fecha_devolucion",
      header: "Fecha Devolución",
      cell: ({ row }) => {
        const fechaDevolucion = row.original.fecha_devolucion;
        return fechaDevolucion ? formatDate(fechaDevolucion) : "Sin definir";
      },
    },
    { accessorKey: "cantidad_prestada", header: "Cantidad" },
    { accessorKey: "estado", header: "Estado" },
    { accessorKey: "nombre_producto", header: "Producto" },
    { accessorKey: "serial_producto", header: "Serial" },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const prestamo = row.original;
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
              <DropdownMenuItem onClick={() => handleEdit(prestamo)}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDelete(prestamo)}>
                Eliminar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleMarkAsReturned(prestamo)}>
                Marcar como devuelto
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: prestamos,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
        <Input placeholder="Filtrar por usuario..." className="max-w-sm" />
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
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
                  No hay préstamos disponibles.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modal para editar préstamo */}
      <Dialog open={openModalEdit} onOpenChange={setOpenModalEdit}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Editar préstamo</DialogTitle>
            <DialogDescription>Editar y configurar préstamo</DialogDescription>
          </DialogHeader>
          <FormCreatePrestamo
            setOpenModalCreate={setOpenModalEdit}
            prestamo={selectedPrestamo ?? undefined}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
