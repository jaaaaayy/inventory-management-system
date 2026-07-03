import { TCustomer } from "../types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CustomerDetails = ({ customer }: { customer: TCustomer }) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card size="sm">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-[8rem_1fr] gap-x-4 gap-y-3">
              <dt className="font-medium text-muted-foreground">First Name</dt>
              <dd>{customer.firstName}</dd>
              <dt className="font-medium text-muted-foreground">Last Name</dt>
              <dd>{customer.lastName}</dd>
              <dt className="font-medium text-muted-foreground">Email</dt>
              <dd>{customer.email}</dd>
              <dt className="font-medium text-muted-foreground">
                Mobile Number
              </dt>
              <dd>{customer.mobileNumber}</dd>
              <dt className="font-medium text-muted-foreground">Created</dt>
              <dd>{new Date(customer.createdAt).toLocaleString()}</dd>
              <dt className="font-medium text-muted-foreground">Updated</dt>
              <dd>{new Date(customer.updatedAt).toLocaleString()}</dd>
            </dl>
          </CardContent>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle>Address</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-0.5">
              <p>{customer.address.addressLine1}</p>
              {customer.address.addressLine2 && (
                <p>{customer.address.addressLine2}</p>
              )}
              <p>{customer.address.city}</p>
              <p>{customer.address.postalCode}</p>
              <p>{customer.address.province}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerDetails;
