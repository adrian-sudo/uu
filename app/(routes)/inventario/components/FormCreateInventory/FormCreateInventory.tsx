"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner"; // Importa el toast de sonner

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { API_ROUTES } from "@/config/apiConfig";

// Esquema de validación con Zod
const formSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  marca: z.string().min(2, "La marca debe tener al menos 2 caracteres"),
  tipoEquipo: z
    .string()
    .min(2, "El tipo de equipo debe tener al menos 2 caracteres"),
  modelo: z.string().min(2, "El modelo debe tener al menos 2 caracteres"),
  negocio: z.string().min(2, "El negocio debe tener al menos 2 caracteres"),
  ubicacion: z.string().min(2, "La ubicación debe tener al menos 2 caracteres"),
  descripcion: z.string().optional(),
  serial: z.string().min(5, "El serial debe tener al menos 5 caracteres"),
  cantidad: z.number().min(1, "La cantidad debe ser al menos 1"),
  estado: z.string().min(2, "El estado debe ser válido"),
});

interface FormCreateInventoryProps {
  setOpenModalCreate: (open: boolean) => void;
  inventario?: {
    id_producto: number;
    nombre: string;
    marca: string;
    tipoEquipo: string;
    modelo: string;
    negocio: string;
    ubicacion: string;
    descripcion: string | null;
    serial: string;
    cantidad: number;
    estado: string;
  };
}

export function FormCreateInventory({
  setOpenModalCreate,
  inventario,
}: FormCreateInventoryProps) {
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange", // Valida en cada cambio de entrada
    defaultValues: {
      nombre: inventario?.nombre || "",
      marca: inventario?.marca || "",
      tipoEquipo: inventario?.tipoEquipo || "",
      modelo: inventario?.modelo || "",
      negocio: inventario?.negocio || "",
      ubicacion: inventario?.ubicacion || "",
      descripcion: inventario?.descripcion || "",
      serial: inventario?.serial || "",
      cantidad: inventario?.cantidad || 1,
      estado: inventario?.estado || "Disponible",
    },
  });

  const { isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      let response;
      if (inventario) {
        // Editar inventario
        response = await axios.put(
          `${API_ROUTES.BASE_URL}${API_ROUTES.INVENTARIO.DEFAULT}/${inventario.id_producto}`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        // Crear nuevo inventario
        response = await axios.post(
          `${API_ROUTES.BASE_URL}${API_ROUTES.INVENTARIO.DEFAULT}`,
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
          response.data.message || "Inventario guardado correctamente"
        );
        setOpenModalCreate(false); // Cierra el modal después de enviar
        form.reset(); // Resetea el formulario
      } else {
        setError(response.data.message || "Error al guardar el inventario");
        toast.error(response.data.message || "Error al guardar el inventario");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || "Error en la solicitud");
        toast.error(error.response.data.message || "Error en la solicitud");
      } else {
        setError("Error en la solicitud");
        toast.error("Error en la solicitud");
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
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Ejemplo: Laptop Dell" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="marca"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marca</FormLabel>
                  <FormControl>
                    <Input placeholder="Ejemplo: Dell" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tipoEquipo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Equipo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ejemplo: Laptop" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="modelo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modelo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ejemplo: Inspiron 15" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="negocio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Negocio</FormLabel>
                  <FormControl>
                    <Input placeholder="Ejemplo: CasaLuker" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ubicacion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ubicación</FormLabel>
                  <FormControl>
                    <Input placeholder="Ejemplo: Bodega S3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Input placeholder="Opcional" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="serial"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Serial</FormLabel>
                  <FormControl>
                    <Input placeholder="Ejemplo: ABC123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cantidad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cantidad</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ejemplo: 5"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="estado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Disponible">Disponible</SelectItem>
                        <SelectItem value="No disponible">
                          No disponible
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" disabled={!isValid}>
            {inventario ? "Actualizar" : "Crear"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
