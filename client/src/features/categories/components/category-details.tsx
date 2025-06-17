import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { TCategory } from "../types";

const CategoryDetails = ({ category }: { category: TCategory }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Category Details</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-6">
        <div>
          <Label>Name</Label>
          <p>{category.name}</p>
        </div>
        <div>
          <Label>Description</Label>
          <p>{category.description}</p>
        </div>
        <div>
          <Label>Created</Label>
          <p>{new Date(category.createdAt).toLocaleString()}</p>
        </div>
        <div>
          <Label>Updated</Label>
          <p>{new Date(category.updatedAt).toLocaleString()}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryDetails;
