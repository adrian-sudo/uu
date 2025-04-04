"use client";
import { Button } from "@/components/ui/button";
import { FormCreatePrestamo } from "../FormCreatePrestamo";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";

export function HeaderPrestamo() {
  const [openModalCreate, setOpenModalCreate] = useState(false);
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl">Lista de Prestamo</h2>

      <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
        <DialogTrigger asChild>
          <Button> Crear Prestamo</Button>
        </DialogTrigger>
        <DialogContent className="sm: max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Crear Prestamos</DialogTitle>
            <DialogDescription>Crear y Configurar prestamos</DialogDescription>
          </DialogHeader>

          <FormCreatePrestamo setOpenModalCreate={setOpenModalCreate} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
