import { Label } from "@/components/ui/label";
import { TCategory } from "../types";

const CategoryDetails = ({ category }: { category: TCategory }) => {
  return (
    <div className="space-y-6">
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
        <p>{new Date(category.created_at).toLocaleString()}</p>
      </div>
      <div>
        <Label>Updated</Label>
        <p>{new Date(category.updated_at).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default CategoryDetails;
