"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { API_ROUTES } from "@/config/apiConfig";

interface Inventario {
  id_producto: number;
  nombre: string;
  serial: string;
}

interface InventorySelectionModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (product: Inventario) => void;
}

export function InventorySelectionModal({
  open,
  onClose,
  onSelect,
}: InventorySelectionModalProps) {
  const [products, setProducts] = useState<Inventario[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(4); // Mostrar solo 8 productos por página
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${API_ROUTES.BASE_URL}${API_ROUTES.INVENTARIO.DEFAULT}?page=${page}&pageSize=${pageSize}&search=${searchTerm}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener el inventario");
        }
        const data = await response.json();
        setProducts(data.productos);
        setTotal(data.total);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [page, pageSize, searchTerm]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Seleccionar Producto del Inventario</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Campo de búsqueda */}
          <Input
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />

          {/* Tabla de productos */}
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Serial</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <TableRow key={product.id_producto}>
                      <TableCell>{product.nombre}</TableCell>
                      <TableCell>{product.serial}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            onSelect(product);
                            onClose();
                          }}
                        >
                          Seleccionar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">
                      No se encontraron productos.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Paginación */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Anterior
            </Button>
            <span>
              Página {page} de {Math.ceil(total / pageSize)}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page * pageSize >= total}
            >
              Siguiente
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
