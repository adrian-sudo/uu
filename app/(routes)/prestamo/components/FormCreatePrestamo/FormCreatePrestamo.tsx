"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InventorySelectionModal } from "../InventorySelectionModal/InventorySelectionModal";

const formSchema = z.object({
  usuario_prestamo: z
    .string()
    .min(2, "El nombre del usuario debe tener al menos 2 caracteres"),
  usuario_cargo: z.string().min(2, "El cargo debe tener al menos 2 caracteres"),
  cantidad_prestada: z.preprocess(
    (value) => (value ? Number(value) : undefined),
    z.number().min(0, "La cantidad prestada debe ser al menos 1")
  ),
  id_producto: z.number().min(1, "Debe seleccionar un producto"),
});

interface FormCreatePrestamoProps {
  setOpenModalCreate: (open: boolean) => void;
  prestamo?: {
    id_prestamo: number;
    id_producto: number;
    usuario_prestamo: string;
    usuario_cargo: string;
    cantidad_prestada: number;
    estado: string;
  };
}

export function FormCreatePrestamo({
  setOpenModalCreate,
  prestamo,
}: FormCreatePrestamoProps) {
  const [openInventoryModal, setOpenInventoryModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    id_producto: number;
    nombre: string;
  } | null>(
    prestamo ? { id_producto: prestamo.id_producto, nombre: "" } : null
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      usuario_prestamo: prestamo?.usuario_prestamo || "",
      usuario_cargo: prestamo?.usuario_cargo || "",
      cantidad_prestada: prestamo?.cantidad_prestada || 1,
      id_producto: prestamo?.id_producto || 0,
    },
  });

  const { isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      let response;
      if (prestamo) {
        // Editar préstamo existente
        response = await axios.put(
          `http://localhost:1024/api/prestamo/${prestamo.id_prestamo}`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        // Crear nuevo préstamo
        response = await axios.post(
          "http://localhost:1024/api/prestamo",
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      if (response.status === 201 || response.status === 200) {
        toast.success(
          prestamo
            ? "Préstamo actualizado correctamente"
            : "Préstamo creado correctamente"
        );
        setOpenModalCreate(false); // Cierra el modal
        form.reset(); // Resetea el formulario'

      } else {
        toast.error("Error al guardar el préstamo");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "Error en la solicitud");
      } else {
        toast.error("Error al guardar el préstamo");
      }
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="usuario_prestamo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuario</FormLabel>
                  <FormControl>
                    <Input placeholder="Ejemplo: Juan Pérez" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="usuario_cargo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cargo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ejemplo: Gerente" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cantidad_prestada"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cantidad Prestada</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      defaultValue={field.value || 1}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="id_producto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Producto</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input
                        value={selectedProduct?.nombre || ""}
                        placeholder="Selecciona un producto"
                        readOnly
                      />
                      <Button
                        type="button"
                        onClick={() => setOpenInventoryModal(true)}
                      >
                        Buscar
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={!isValid}>
            {prestamo ? "Actualizar Préstamo" : "Crear Préstamo"}
          </Button>
        </form>
      </Form>

      {/* Modal de selección de inventario */}
      <InventorySelectionModal
        open={openInventoryModal}
        onClose={() => setOpenInventoryModal(false)}
        onSelect={(product) => {
          setSelectedProduct(product);
          form.setValue("id_producto", product.id_producto);
        }}
      />
    </div>
  );
}
