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
import { API_ROUTES } from "@/config/apiConfig";

// Esquema de validación con Zod
const formSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "El nombre solo puede contener letras y espacios"
    ),
  apellido: z
    .string()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "El apellido solo puede contener letras y espacios"
    ),
  cargo: z
    .string()
    .min(2, "El cargo debe tener al menos 2 caracteres")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "El cargo solo puede contener letras y espacios"
    ),
  ciudad: z
    .string()
    .min(2, "La ciudad debe tener al menos 2 caracteres")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "La ciudad solo puede contener letras y espacios"
    ),
  negocio: z
    .string()
    .min(2, "El negocio debe tener al menos 2 caracteres")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "El negocio solo puede contener letras y espacios"
    ),
  telefono: z
    .string()
    .min(10, "El teléfono debe tener al menos 10 dígitos")
    .regex(/^\d+$/, "El teléfono solo debe contener números"),
});

interface FormCreateCustomerProps {
  setOpenModalCreate: (open: boolean) => void;
  usuario?: {
    id: number;
    nombre: string;
    apellido: string;
    cargo: string;
    ciudad: string;
    negocio: string;
    telefono: string;
  };
}

export function FormCreateCustomer({
  setOpenModalCreate,
  usuario,
}: FormCreateCustomerProps) {
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange", // Valida en cada cambio de entrada
    defaultValues: {
      nombre: usuario?.nombre || "",
      apellido: usuario?.apellido || "",
      cargo: usuario?.cargo || "",
      ciudad: usuario?.ciudad || "",
      negocio: usuario?.negocio || "",
      telefono: usuario?.telefono || "",
    },
  });

  const { isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      let response;
      if (usuario) {
        // Editar usuario
        response = await axios.put(
          `${API_ROUTES.BASE_URL}${API_ROUTES.USUARIOS.DEFAULT}/${usuario.id}`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        // Crear nuevo usuario
        response = await axios.post(
          `${API_ROUTES.BASE_URL}${API_ROUTES.USUARIOS.DEFAULT}`,
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
          response.data.message || "Usuario guardado correctamente"
        );
        setOpenModalCreate(false); // Cierra el modal después de enviar
        form.reset(); // Resetea el formulario
      } else {
        setError(response.data.message || "Error al guardar el usuario");
        toast.error(response.data.message || "Error al guardar el usuario");
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
                    <Input placeholder="Ejemplo: Juan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="apellido"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input placeholder="Ejemplo: Pérez" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cargo"
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
              name="ciudad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ciudad</FormLabel>
                  <FormControl>
                    <Input placeholder="Ejemplo: Bogotá" {...field} />
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
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input placeholder="Ejemplo: 3123456789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" disabled={!isValid}>
            {usuario ? "Actualizar" : "Crear"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
