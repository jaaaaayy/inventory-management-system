import { TCustomer } from "../types";

const CustomerDetails = ({ customer }: { customer: TCustomer }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Customer</h1>
      <div className="grid grid-cols-2 gap-6 text-sm">
        <div className="flex gap-6">
          <div className="space-y-6">
            <p className="font-medium">First Name</p>
            <p className="font-medium">Last Name</p>
            <p className="font-medium">Email</p>
            <p className="font-medium">Mobile Number</p>
            <p className="font-medium">Created</p>
            <p className="font-medium">Updated</p>
          </div>
          <div className="space-y-6">
            <p>{customer.firstName}</p>
            <p>{customer.lastName}</p>
            <p>{customer.email}</p>
            <p>{customer.mobileNumber}</p>
            <p>{new Date(customer.createdAt).toLocaleString()}</p>
            <p>{new Date(customer.updatedAt).toLocaleString()}</p>
          </div>
        </div>
        <div className="space-y-6">
          <p className="font-medium">Address</p>
          <div>
            <p>{customer.address.addressLine1}</p>
            {customer.address.addressLine2 && (
              <p>{customer.address.addressLine2}</p>
            )}
            <p>{customer.address.city}</p>
            <p>{customer.address.postalCode}</p>
            <p>{customer.address.province}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
