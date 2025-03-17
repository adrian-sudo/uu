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
    .min(2, "observacion debe tener al menos 2 caracteres")
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
  cantidad: z.number().min(1, "La cantidad debe ser al menos 1"), // Nuevo campo
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
      cantidad: 1, // Valor por defecto para cantidad
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

            {/* Campo Cantidad */}
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

            {/* Resto de los campos... */}
          </div>
          <Button type="submit" disabled={!isValid}>
            Enviar
          </Button>
        </form>
      </Form>
    </div>
  );
}
