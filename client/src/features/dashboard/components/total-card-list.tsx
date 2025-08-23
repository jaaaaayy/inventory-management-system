import TotalCard from "./total-card";

const TotalCardList = ({
  totals,
}: {
  totals: { title: string; amount: number }[];
}) => {
  return (
    <div className="grid grid-cols-4 gap-6">
      {totals.map((total) => (
        <TotalCard key={total.title} total={total} />
      ))}
    </div>
  );
};

export default TotalCardList;
