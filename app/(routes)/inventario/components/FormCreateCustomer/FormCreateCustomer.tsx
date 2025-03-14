"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormCreateCustomerProps } from "./FormCreateCustomer.types";
import { useEffect, useState } from "react";

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

// Esquema de validación con Zod
const formSchema = z.object({
  serial: z.string().min(5, "El serial es obligatorio"),
  observacion: z
    .string()
    .min(2, "observacion  debe tener al menos 2 caracteres")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "observacion solo puede contener letras y espacios"
    ),
  nombre: z
    .string()
    .min(2, "nombre debe tener al menos 2 caracteres")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "nombre solo puede contener letras y espacios"
    ),
  marca: z
    .string()
    .min(2, "marca debe tener al menos 2 caracteres")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "marca solo puede contener letras y espacios"
    ),
  tipoEquipo: z
    .string()
    .min(2, "tipoEquipo debe tener al menos 2 caracteres")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "tipoEquipo solo puede contener letras y espacios"
    ),
  modelo: z.string().min(2, "El modelo es obligatorio"),
  ubicacion: z
    .string()
    .min(2, "ubicacion debe tener al menos 2 caracteres")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "ubicacion solo puede contener letras y espacios"
    ),
  estado: z
    .string()
    .min(2, "estado debe tener al menos 2 caracteres")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "estado solo puede contener letras y espacios"
    ),
  negocio: z
    .string()
    .min(2, "negocio debe tener al menos 2 caracteres")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "negocio solo puede contener letras y espacios"
    ),
});

export function FormCreateCustomer({
  setOpenModalCreate,
}: FormCreateCustomerProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serial: "",
      observacion: "",
      nombre: "",
      marca: "",
      tipoEquipo: "",
      modelo: "",
      ubicacion: "",
      estado: "",
      negocio: "",
    },
  });

  const { isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    setOpenModalCreate(false); // Cierra el modal después del envío
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {/* Campo Serial */}
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

            {/* Campo Observación */}
            <FormField
              control={form.control}
              name="observacion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observación</FormLabel>
                  <FormControl>
                    <Input placeholder="Opcional" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campo Nombre */}
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

            {/* Campo Marca */}
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

            {/* Campo Tipo de Equipo */}
            <FormField
              control={form.control}
              name="tipoEquipo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Equipo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ejemplo: Laptop, Monitor" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campo Modelo */}
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

            {/* Campo Ubicación */}
            <FormField
              control={form.control}
              name="ubicacion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ubicación</FormLabel>
                  <FormControl>
                    <Input placeholder="Ejemplo: BodegaS3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campo Estado */}
            <FormField
              control={form.control}
              name="estado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ejemplo: Disponible, Ocupado"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campo Negocio */}
            <FormField
              control={form.control}
              name="negocio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Negocio</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ejemplo: CasaLuker,Colombia"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={!isValid}>
            Enviar
          </Button>
        </form>
      </Form>
    </div>
  );
}
