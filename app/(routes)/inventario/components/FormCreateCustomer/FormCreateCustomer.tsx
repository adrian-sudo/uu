"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormCreateCustomerProps } from "./FormCreateCustomer.types";

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
  serial: z.string().min(5, "El serial debe tener al menos 5 caracteres"),
  observacion: z
    .string()
    .min(2, "La observación debe tener al menos 2 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Solo se permiten letras y espacios"),
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Solo se permiten letras y espacios"),
  marca: z
    .string()
    .min(2, "La marca debe tener al menos 2 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Solo se permiten letras y espacios"),
  tipoEquipo: z
    .string()
    .min(2, "El tipo de equipo debe tener al menos 2 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Solo se permiten letras y espacios"),
  modelo: z.string().min(2, "El modelo debe tener al menos 2 caracteres"),
  ubicacion: z
    .string()
    .min(2, "La ubicación debe tener al menos 2 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Solo se permiten letras y espacios"),
  estado: z
    .string()
    .min(2, "El estado debe tener al menos 2 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Solo se permiten letras y espacios"),
  negocio: z
    .string()
    .min(2, "El negocio debe tener al menos 2 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Solo se permiten letras y espacios"),
  cantidad: z.number().min(1, "La cantidad debe ser al menos 1"),
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
      cantidad: 1,
    },
  });

  const { isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values); // Aquí puedes enviar los datos a tu API
      setOpenModalCreate(false); // Cierra el modal después del envío
      alert("Formulario enviado correctamente"); // Feedback visual
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      alert("Hubo un error al enviar el formulario"); // Feedback visual
    }
  };

  const renderField = (
    name: keyof z.infer<typeof formSchema>,
    label: string,
    placeholder: string,
    type: string = "text"
  ) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              type={type}
              {...field}
              onChange={
                type === "number"
                  ? (e) => field.onChange(parseInt(e.target.value, 10))
                  : field.onChange
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {renderField("serial", "Serial", "Ejemplo: ABC123")}
            {renderField("observacion", "Observación", "Opcional")}
            {renderField("nombre", "Nombre", "Ejemplo: Laptop Dell")}
            {renderField("marca", "Marca", "Ejemplo: Dell")}
            {renderField(
              "tipoEquipo",
              "Tipo de Equipo",
              "Ejemplo: Laptop, Monitor"
            )}
            {renderField("modelo", "Modelo", "Ejemplo: Inspiron 15")}
            {renderField("ubicacion", "Ubicación", "Ejemplo: BodegaS3")}
            {renderField("estado", "Estado", "Ejemplo: Disponible, Ocupado")}
            {renderField("negocio", "Negocio", "Ejemplo: CasaLuker,Colombia")}
            {renderField("cantidad", "Cantidad", "Ejemplo: 5", "number")}
          </div>
          <Button type="submit">Enviar</Button>
        </form>
      </Form>
    </div>
  );
}
