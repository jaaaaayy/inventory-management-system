import { LucideIcon } from "lucide-react";
import TotalCard from "./total-card";

const TotalCardList = ({
  totals,
}: {
  totals: { title: string; amount: string | number; icon?: LucideIcon }[];
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {totals.map((total) => (
        <TotalCard key={total.title} total={total} />
      ))}
    </div>
  );
};

export default TotalCardList;
