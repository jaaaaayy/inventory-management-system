import { TVendor } from "../types";

const VendorDetails = ({ vendor }: { vendor: TVendor }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Vendor</h1>
      <div className="grid grid-cols-2 gap-6 text-sm">
        <div className="space-y-6">
          <div className="flex gap-6">
            <div className="space-y-6">
              <p className="font-medium">Name</p>
              <p className="font-medium">Email</p>
              <p className="font-medium">Mobile Number</p>
              <p>Created</p>
              <p>Updated</p>
            </div>
            <div className="space-y-6">
              <p>{vendor.name}</p>
              <p>{vendor.email}</p>
              <p>{vendor.mobileNumber}</p>
              <p>{new Date(vendor.createdAt).toLocaleString()}</p>
              <p>{new Date(vendor.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <p className="font-medium">Address</p>
          <div>
            <p>{vendor.address.addressLine1}</p>
            {vendor.address.addressLine2 && (
              <p>{vendor.address.addressLine2}</p>
            )}
            <p>{vendor.address.city}</p>
            <p>{vendor.address.postalCode}</p>
            <p>{vendor.address.province}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDetails;
