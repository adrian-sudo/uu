import {
  Building2,
  PanelsTopLeft,
  Settings,
  ShieldCheck,
  RefreshCw,
  UsersRound,
  ArchiveRestore,
  CircleHelpIcon,
  Calendar,
} from "lucide-react";

export const dataGeneralSidebar = [
  {
    icon: PanelsTopLeft,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Building2,
    label: "Empresa",
    href: "/empresa",
  },
  {
    icon: UsersRound,
    label: "Usuario",
    href: "/usuario",
  },
  {
    icon: RefreshCw,
    label: "Prestamo",
    href: "/prestamo",
  },
  {
    icon: ArchiveRestore,
    label: "Inventario",
    href: "/inventario",
  },
  {
    icon: Calendar,
    label: "Calendario",
    href: "/tasks",
  },
];

export const dataToolsSidebar = [
  {
    icon: CircleHelpIcon,
    label: "Faqs",
    href: "/faqs",
  },
];

export const dataSupportSidebar = [
  {
    icon: Settings,
    label: "Configuracion",
    href: "/configuracion",
  },
  {
    icon: ShieldCheck,
    label: "Seguridad",
    href: "/seguridad",
  },
];
