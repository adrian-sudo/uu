"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { FormCreateCustomerProps } from "./FormCreateCustomer.types";

const formSchema = z.object({
  serial: z.string().min(5, "El serial debe tener al menos 5 caracteres"),
  nombreEquipo: z
    .string()
    .min(2, "el nombreEquipo debe tener al menos 2 caracteres")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "el nombreEquipo solo puede contener letras y espacios"
    ),
  marca: z
    .string()
    .min(2, "la marca debe tener al menos 2 caracteres")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "la marca solo puede contener letras y espacios"
    ),
  modelo: z.string().min(2, "El modelo es obligatorio"),
  ubicacion: z
    .string()
    .min(2, "la ubicacion debe tener al menos 2 caracteres")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "la ubicacion solo puede contener letras y espacios"
    ),
  responsable: z
    .string()
    .min(2, "responsable debe tener al menos 2 caracteres")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "responsable solo puede contener letras y espacios"
    ),
  estado: z
    .string()
    .min(2, "estado debe tener al menos 2 caracteres")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "estado solo puede contener letras y espacios"
    ),
  cargo: z
    .string()
    .min(2, "el cargo debe tener al menos 2 caracteres")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "el cargo solo puede contener letras y espacios"
    ),
  nombrePersona: z
    .string()
    .min(2, "nombrePersona debe tener al menos 2 caracteres")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "nombrePersona solo puede contener letras y espacios"
    ),
});

export function FormCreateCustomer(props: FormCreateCustomerProps) {
  const { setOpenModalCreate } = props;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serial: "",
      nombreEquipo: "",
      marca: "",
      modelo: "",
      ubicacion: "",
      responsable: "",
      estado: "", // Ahora inicia vacío para que el usuario lo escriba
      cargo: "",
      nombrePersona: "",
    },
  });

  const { isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Datos del préstamo:", values);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="serial"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Serial</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingrese el serial" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nombreEquipo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del equipo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Laptop Dell" {...field} />
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
                    <Input placeholder="Ej: Dell, HP, Lenovo" {...field} />
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
                    <Input placeholder="Ej: Inspiron 15" {...field} />
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
                    <Input placeholder="Ej: Oficina 302" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="responsable"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Responsable</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Juan Pérez" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Estado ahora es un campo de texto libre */}
            <FormField
              control={form.control}
              name="estado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej: En mantenimiento, operativo, etc."
                      {...field}
                    />
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
                    <Input placeholder="Ej: Analista de sistemas" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nombrePersona"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de la persona</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Pedro Ramírez" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Enviar</Button>
        </form>
      </Form>
    </div>
  );
}
