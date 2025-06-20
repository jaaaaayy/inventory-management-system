import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { TCustomer } from "../types";

const CustomerDetails = ({ customer }: { customer: TCustomer }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Customer Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-6">
            <h1 className="text-lg font-semibold">Personal Information</h1>
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div className="grid gap-2">
                <Label>First Name</Label>
                <p>{customer.firstName}</p>
              </div>
              <div className="grid gap-2">
                <Label>Last Name</Label>
                <p>{customer.lastName}</p>
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <p>{customer.email}</p>
              </div>
              <div className="grid gap-2">
                <Label>Mobile Number</Label>
                <p>{customer.mobileNumber}</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h1 className="text-lg font-semibold">Address</h1>
            <div className="space-y-6 text-sm">
              <div className="grid grid-cols-3 gap-6">
                <div className="grid gap-2">
                  <Label>Address Line 1</Label>
                  <p>{customer.address.addressLine1}</p>
                </div>
                {customer.address.addressLine2 && (
                  <div className="grid gap-2">
                    <Label>Address Line 2</Label>
                    <p>{customer.address.addressLine2}</p>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="grid gap-2">
                  <Label>City</Label>
                  <p>{customer.address.city}</p>
                </div>
                <div className="grid gap-2">
                  <Label>Province</Label>
                  <p>{customer.address.province}</p>
                </div>
                <div className="grid gap-2">
                  <Label>Postal Code</Label>
                  <p>{customer.address.postalCode}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6 w-1/2 pr-6">
          <h1 className="text-lg font-semibold">Account Information</h1>
          <div className="grid grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label>Created</Label>
              <p>{new Date(customer.createdAt).toLocaleString()}</p>
            </div>
            <div className="grid gap-2">
              <Label>Postal Code</Label>
              <p>{new Date(customer.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerDetails;
