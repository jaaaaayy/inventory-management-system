import { TCategory } from "../types";

const CategoryDetails = ({ category }: { category: TCategory }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Category</h1>
      <div className="space-y-6 text-sm">
        <div className="flex gap-6">
          <div className="space-y-6">
            <p className="font-medium">Name</p>
            <p className="font-medium">Description</p>
          </div>
          <div className="space-y-6">
            <p>{category.name}</p>
            <p>{category.description}</p>
          </div>
        </div>
        <div className="flex gap-6">
          <div className="space-y-6">
            <p className="font-medium">Created</p>
            <p className="font-medium">Updated</p>
          </div>
          <div className="space-y-6">
            <p>{new Date(category.createdAt).toLocaleString()}</p>
            <p>{new Date(category.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;
