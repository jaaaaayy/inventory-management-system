import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Dispatch, SetStateAction } from "react";

interface SearchBarProps {
  feature: string;
  globalFilter: string;
  setGlobalFilter: Dispatch<SetStateAction<string>>;
}

const Searchbar = ({
  feature,
  globalFilter,
  setGlobalFilter,
}: SearchBarProps) => {
  return (
    <div className="relative w-xs">
      <SearchIcon className="size-4 absolute left-2.5 top-1/2 -translate-y-1/2" />
      <Input
        className="pl-8"
        placeholder={`Search ${feature}...`}
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />
    </div>
  );
};

export default Searchbar;
