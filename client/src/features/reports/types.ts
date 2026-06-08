export type TReportStockMovement = {
  _id: string;
  type: string;
  delta: number;
  quantityAfter: number;
  reason: string;
  createdAt: string;
  product: {
    _id: string;
    name: string;
    stockKeepingUnit: string;
  } | null;
  user: {
    firstName: string;
    lastName: string;
  } | null;
};

export const toInputDate = (date: Date) => date.toISOString().slice(0, 10);

export const defaultFromDate = () =>
  toInputDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));

export const defaultToDate = () => toInputDate(new Date());
