import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction } from "react";

const DateRange = ({
  idPrefix,
  from,
  to,
  setFrom,
  setTo,
}: {
  idPrefix: string;
  from: string;
  to: string;
  setFrom: Dispatch<SetStateAction<string>>;
  setTo: Dispatch<SetStateAction<string>>;
}) => (
  <div className="flex flex-wrap items-end gap-3">
    <div className="space-y-1">
      <Label htmlFor={`${idPrefix}-from`}>From</Label>
      <Input
        id={`${idPrefix}-from`}
        type="date"
        value={from}
        max={to}
        onChange={(e) => setFrom(e.target.value)}
        className="w-auto"
      />
    </div>
    <div className="space-y-1">
      <Label htmlFor={`${idPrefix}-to`}>To</Label>
      <Input
        id={`${idPrefix}-to`}
        type="date"
        value={to}
        min={from}
        onChange={(e) => setTo(e.target.value)}
        className="w-auto"
      />
    </div>
  </div>
);

export default DateRange;
