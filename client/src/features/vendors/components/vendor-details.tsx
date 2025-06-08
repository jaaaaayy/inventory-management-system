import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { TVendor } from "../types";

const VendorDetails = ({ vendor }: { vendor: TVendor }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Vendor Details</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-6">
        <div>
          <Label>Name</Label>
          <p>{vendor.name}</p>
        </div>
        <div>
          <Label>Email</Label>
          <p>{vendor.email}</p>
        </div>
        <div>
          <Label>Mobile Number</Label>
          <p>{vendor.mobileNumber}</p>
        </div>
        <div>
          <Label>AddressLine1</Label>
          <p>{vendor.address.addressLine1}</p>
        </div>
        <div>
          <Label>AddressLine2</Label>
          <p>{vendor.address.addressLine2}</p>
        </div>
        <div>
          <Label>City</Label>
          <p>{vendor.address.city}</p>
        </div>
        <div>
          <Label>Province</Label>
          <p>{vendor.address.province}</p>
        </div>
        <div>
          <Label>Postal Code</Label>
          <p>{vendor.address.postalCode}</p>
        </div>
        <div>
          <Label>Created</Label>
          <p>{new Date(vendor.createdAt).toLocaleString()}</p>
        </div>
        <div>
          <Label>Updated</Label>
          <p>{new Date(vendor.updatedAt).toLocaleString()}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorDetails;
