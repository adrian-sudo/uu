import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { CardSummary } from "./components/CardSummary/CardSummary";
import { BookOpenCheck, UsersRound, Waypoints } from "lucide-react";
import { LastCustomers } from "./components/LastCustomers";
import { CustomersTable } from "./components/CustomersTable";

const dataCardsSummary = [
  {
    icon: UsersRound,
    total: "100",
    average: 15,
    title: "Usuarios Confirmado ",
    tooltipText: "Ver los usuarios creados",
  },
  {
    icon: Waypoints,
    total: "86.5%",
    average: 80,
    title: "Total ",
    tooltipText: "Ver el total del inventario",
  },
  {
    icon: BookOpenCheck,
    total: "200%",
    average: 30,
    title: "Total de prestamo",
    tooltipText: "Ver el total de prestamo",
  },
];

export default function Home() {
  return (
    <div>
      <h2 className="mb-4 text-2xl">Dashboard</h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-20">
        {dataCardsSummary.map(
          ({ icon, total, average, title, tooltipText }) => (
            <CardSummary
              key={title}
              icon={icon}
              total={total}
              average={average}
              title={title}
              tooltipText={tooltipText}
            />
          )
        )}
      </div>
      <div className="grid grid-cols-1 mt-12 xl:grid-cols-2 md:gap-x-10">
        <LastCustomers />
      </div>
      <div className="flex-col justify-center mt-12 md:gap-x-10 xl:flex xl:flex-row gap-y-4 md:gap-y-0 md:mb-10"></div>
    </div>
  );
}
