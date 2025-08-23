import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TotalCard = ({ total }: { total: { title: string; amount: number } }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{total.title}</CardTitle>
      </CardHeader>
      <CardContent className="text-2xl font-semibold">
        {total.amount}
      </CardContent>
    </Card>
  );
};

export default TotalCard;
