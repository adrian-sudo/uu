"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import { FormCreateCustomer } from "../FormCreateCustomer";
export function HeaderInventory() {
  const [openModalCreate, setOpenModalCreate] = useState(false);

  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl">Lista de Inventario</h2>

      <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
        <DialogTrigger asChild>
          <Button>Agregar Inventario</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Crear Inventario</DialogTitle>
            <DialogDescription>Crear y configurar Inventario</DialogDescription>
          </DialogHeader>

          <FormCreateCustomer />
        </DialogContent>
      </Dialog>
    </div>
  );
}
