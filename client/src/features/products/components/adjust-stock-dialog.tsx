import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, useState } from "react";
import { useAdjustStock } from "../services/mutations";

type AdjustmentType = "increase" | "decrease" | "set";

interface AdjustStockDialogProps {
  openAdjustDialog: boolean;
  setOpenAdjustDialog: Dispatch<SetStateAction<boolean>>;
  setOpenActionsDropdown: Dispatch<SetStateAction<boolean>>;
  id: string;
  name: string;
  currentQuantity: number;
}

const adjustmentTypes: { value: AdjustmentType; label: string }[] = [
  { value: "increase", label: "Increase" },
  { value: "decrease", label: "Decrease" },
  { value: "set", label: "Set to" },
];

const AdjustStockDialog = ({
  openAdjustDialog,
  setOpenAdjustDialog,
  setOpenActionsDropdown,
  id,
  name,
  currentQuantity,
}: AdjustStockDialogProps) => {
  const [type, setType] = useState<AdjustmentType>("increase");
  const [quantity, setQuantity] = useState("");

  const { mutateAsync: adjustStockMutation, isPending } = useAdjustStock(
    id,
    setOpenAdjustDialog,
    setOpenActionsDropdown
  );

  const amount = Number(quantity);
  const hasValidAmount = quantity !== "" && Number.isInteger(amount) && amount >= 0;

  const resultingQuantity = !hasValidAmount
    ? currentQuantity
    : type === "increase"
    ? currentQuantity + amount
    : type === "decrease"
    ? currentQuantity - amount
    : amount;

  const isInvalidResult = resultingQuantity < 0;

  const handleAdjustStock = async () => {
    await adjustStockMutation({ type, quantity: amount });
    setQuantity("");
    setType("increase");
  };

  return (
    <Dialog open={openAdjustDialog} onOpenChange={setOpenAdjustDialog}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Adjust stock
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adjust stock</DialogTitle>
          <DialogDescription>
            Update the stock level for <span className="font-medium">{name}</span>
            . Current quantity: {currentQuantity}.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Adjustment type</Label>
            <div className="grid grid-cols-3 gap-2">
              {adjustmentTypes.map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  variant={type === option.value ? "default" : "outline"}
                  className={cn("w-full")}
                  onClick={() => setType(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="adjust-quantity">Quantity</Label>
            <Input
              id="adjust-quantity"
              type="number"
              min={0}
              placeholder="Enter the quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              autoComplete="off"
            />
          </div>
          <p
            className={cn(
              "text-sm",
              isInvalidResult ? "text-destructive" : "text-muted-foreground"
            )}
          >
            {isInvalidResult
              ? `This adjustment would result in negative stock (${resultingQuantity}).`
              : `New quantity will be ${resultingQuantity}.`}
          </p>
        </div>
        <DialogFooter>
          <Button
            variant="secondary"
            type="button"
            onClick={() => setOpenAdjustDialog(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isPending || !hasValidAmount || isInvalidResult}
            onClick={handleAdjustStock}
          >
            {isPending ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdjustStockDialog;
