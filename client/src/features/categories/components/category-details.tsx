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
        <div className="space-y-6">
          <h1 className="text-xl font-medium">Category Information</h1>
          <div className="grid gap-2">
            <Label>Name</Label>
            <p>{category.name}</p>
          </div>
          <div className="grid gap-2">
            <Label>Description</Label>
            <p>{category.description}</p>
          </div>
        </div>
        <div className="space-y-6">
          <h1 className="text-xl font-medium">Timestamps</h1>
          <div className="grid gap-2">
            <Label>Created</Label>
            <p>{new Date(category.createdAt).toLocaleString()}</p>
          </div>
          <div className="grid gap-2">
            <Label>Updated</Label>
            <p>{new Date(category.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryDetails;
