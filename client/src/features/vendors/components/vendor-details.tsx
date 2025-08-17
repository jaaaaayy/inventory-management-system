import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TVendor } from "../types";

const VendorDetails = ({ vendor }: { vendor: TVendor }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Vendor</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-6 text-sm">
        <div className="space-y-6">
          <div className="flex gap-6">
            <div className="space-y-4">
              <p className="font-medium">Name</p>
              <p className="font-medium">Email</p>
              <p className="font-medium">Mobile Number</p>
              <p>Created</p>
              <p>Updated</p>
            </div>
            <div className="space-y-4">
              <p>{vendor.name}</p>
              <p>{vendor.email}</p>
              <p>{vendor.mobileNumber}</p>
              <p>{new Date(vendor.createdAt).toLocaleString()}</p>
              <p>{new Date(vendor.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <p className="font-medium">Address</p>
          <p>{vendor.address.addressLine1}</p>
          {vendor.address.addressLine2 && <p>{vendor.address.addressLine2}</p>}
          <p>{vendor.address.city}</p>
          <p>{vendor.address.postalCode}</p>
          <p>{vendor.address.province}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorDetails;
