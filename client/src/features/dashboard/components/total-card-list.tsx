import { LucideIcon } from "lucide-react";
import TotalCard from "./total-card";

const TotalCardList = ({
  totals,
}: {
  totals: {
    title: string;
    amount: string | number;
    icon?: LucideIcon;
    subtext?: string;
  }[];
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 2xl:grid-cols-6">
      {totals.map((total) => (
        <TotalCard key={total.title} total={total} />
      ))}
    </div>
  );
};

export default TotalCardList;
