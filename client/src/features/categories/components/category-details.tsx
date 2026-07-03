import { TCategory } from "../types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CategoryDetails = ({ category }: { category: TCategory }) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card size="sm">
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-[8rem_1fr] gap-x-4 gap-y-3">
              <dt className="font-medium text-muted-foreground">Name</dt>
              <dd>{category.name}</dd>
              <dt className="font-medium text-muted-foreground">
                Description
              </dt>
              <dd className="whitespace-normal">
                {category.description || "—"}
              </dd>
            </dl>
          </CardContent>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle>Record</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-[8rem_1fr] gap-x-4 gap-y-3">
              <dt className="font-medium text-muted-foreground">Created</dt>
              <dd>{new Date(category.createdAt).toLocaleString()}</dd>
              <dt className="font-medium text-muted-foreground">Updated</dt>
              <dd>{new Date(category.updatedAt).toLocaleString()}</dd>
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CategoryDetails;
