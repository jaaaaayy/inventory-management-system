import { TVendor } from "../types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const VendorDetails = ({ vendor }: { vendor: TVendor }) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card size="sm">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-[8rem_1fr] gap-x-4 gap-y-3">
              <dt className="font-medium text-muted-foreground">Name</dt>
              <dd>{vendor.name}</dd>
              <dt className="font-medium text-muted-foreground">Email</dt>
              <dd>{vendor.email}</dd>
              <dt className="font-medium text-muted-foreground">
                Mobile Number
              </dt>
              <dd>{vendor.mobileNumber}</dd>
              <dt className="font-medium text-muted-foreground">Created</dt>
              <dd>{new Date(vendor.createdAt).toLocaleString()}</dd>
              <dt className="font-medium text-muted-foreground">Updated</dt>
              <dd>{new Date(vendor.updatedAt).toLocaleString()}</dd>
            </dl>
          </CardContent>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle>Address</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-0.5">
              <p>{vendor.address.addressLine1}</p>
              {vendor.address.addressLine2 && (
                <p>{vendor.address.addressLine2}</p>
              )}
              <p>{vendor.address.city}</p>
              <p>{vendor.address.postalCode}</p>
              <p>{vendor.address.province}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorDetails;
