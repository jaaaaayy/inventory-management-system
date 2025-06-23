import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { TVendor } from "../types";

const VendorDetails = ({ vendor }: { vendor: TVendor }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Vendor Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-6">
            <h1 className="text-lg font-medium">Vendor Information</h1>
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div className="grid gap-2">
                <Label>Name</Label>
                <p>{vendor.name}</p>
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <p>{vendor.email}</p>
              </div>
              <div className="grid gap-2">
                <Label>Mobile Number</Label>
                <p>{vendor.mobileNumber}</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h1 className="text-lg font-medium">Address</h1>
            <div className="space-y-6 text-sm">
              <div className="grid grid-cols-3 gap-6">
                <div className="grid gap-2">
                  <Label>Address Line 1</Label>
                  <p>{vendor.address.addressLine1}</p>
                </div>
                {vendor.address.addressLine2 && (
                  <div className="grid gap-2">
                    <Label>Address Line 2</Label>
                    <p>{vendor.address.addressLine2}</p>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="grid gap-2">
                  <Label>City</Label>
                  <p>{vendor.address.city}</p>
                </div>
                <div className="grid gap-2">
                  <Label>Province</Label>
                  <p>{vendor.address.province}</p>
                </div>
                <div className="grid gap-2">
                  <Label>Postal Code</Label>
                  <p>{vendor.address.postalCode}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6 w-1/2 pr-6">
          <h1 className="text-lg font-medium">Timestamps</h1>
          <div className="grid grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label>Created</Label>
              <p>{new Date(vendor.createdAt).toLocaleString()}</p>
            </div>
            <div className="grid gap-2">
              <Label>Updated</Label>
              <p>{new Date(vendor.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorDetails;
