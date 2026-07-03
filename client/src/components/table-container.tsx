import { ReactNode } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

// Rounded, bordered table frame whose horizontal overflow is handled by the
// shadcn ScrollArea (styled scrollbar) instead of the Table's native scroller.
const TableContainer = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <ScrollArea
      className={cn(
        "w-full rounded-md border",
        "[&_[data-slot=table-container]]:overflow-visible",
        className
      )}
    >
      {children}
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default TableContainer;
