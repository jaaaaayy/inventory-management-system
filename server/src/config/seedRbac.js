import Permission from "../permission/permission.model.js";
import Position from "../position/position.model.js";

export const PERMISSIONS = [
  { key: "product:read", group: "product", description: "View products" },
  { key: "product:create", group: "product", description: "Create products" },
  { key: "product:update", group: "product", description: "Update products" },
  { key: "product:delete", group: "product", description: "Delete products" },

  { key: "category:read", group: "category", description: "View categories" },
  { key: "category:create", group: "category", description: "Create categories" },
  { key: "category:update", group: "category", description: "Update categories" },
  { key: "category:delete", group: "category", description: "Delete categories" },

  { key: "customer:read", group: "customer", description: "View customers" },
  { key: "customer:create", group: "customer", description: "Create customers" },
  { key: "customer:update", group: "customer", description: "Update customers" },
  { key: "customer:delete", group: "customer", description: "Delete customers" },

  { key: "vendor:read", group: "vendor", description: "View vendors" },
  { key: "vendor:create", group: "vendor", description: "Create vendors" },
  { key: "vendor:update", group: "vendor", description: "Update vendors" },
  { key: "vendor:delete", group: "vendor", description: "Delete vendors" },

  { key: "inventory:read", group: "inventory", description: "View inventory" },
  { key: "inventory:adjust", group: "inventory", description: "Adjust stock levels" },

  { key: "purchaseOrder:read", group: "purchaseOrder", description: "View purchase orders" },
  { key: "purchaseOrder:create", group: "purchaseOrder", description: "Create purchase orders" },
  { key: "purchaseOrder:updateStatus", group: "purchaseOrder", description: "Update purchase order status / receive" },

  { key: "salesOrder:read", group: "salesOrder", description: "View sales orders" },
  { key: "salesOrder:create", group: "salesOrder", description: "Create sales orders" },
  { key: "salesOrder:updateStatus", group: "salesOrder", description: "Update sales order status / cancel" },

  { key: "stockMovement:read", group: "stockMovement", description: "View stock movement history" },

  { key: "member:read", group: "member", description: "View organization members and invitations" },
  { key: "member:invite", group: "member", description: "Invite and manage invitations" },
  { key: "member:updatePosition", group: "member", description: "Change member positions and status" },
  { key: "member:remove", group: "member", description: "Remove members" },

  { key: "report:read", group: "report", description: "View reports" },

  { key: "organization:read", group: "organization", description: "View organization settings" },
  { key: "organization:update", group: "organization", description: "Update organization settings" },
  { key: "organization:delete", group: "organization", description: "Delete the organization" },
];

const ALL_KEYS = PERMISSIONS.map((permission) => permission.key);

const keysFor = (...groups) =>
  PERMISSIONS.filter((permission) => groups.includes(permission.group)).map(
    (permission) => permission.key
  );

export const POSITION_NAMES = {
  OWNER: "Owner",
  ADMIN: "Admin",
  MEMBER: "Member",
};

export const POSITION_DEFINITIONS = [
  {
    name: POSITION_NAMES.OWNER,
    description: "Full control of the organization.",
    permissions: ALL_KEYS,
  },
  {
    name: POSITION_NAMES.ADMIN,
    description: "Manage everything except deleting the organization.",
    permissions: ALL_KEYS.filter((key) => key !== "organization:delete"),
  },
  {
    name: POSITION_NAMES.MEMBER,
    description:
      "Manage inventory, orders, and contacts. No member or organization administration.",
    permissions: [
      ...keysFor(
        "product",
        "category",
        "customer",
        "vendor",
        "inventory",
        "purchaseOrder",
        "salesOrder",
        "stockMovement",
        "report"
      ),
      "organization:read",
    ],
  },
];

export const seedRbac = async () => {
  await Permission.bulkWrite(
    PERMISSIONS.map((permission) => ({
      updateOne: {
        filter: { key: permission.key },
        update: { $set: permission },
        upsert: true,
      },
    }))
  );

  await Position.bulkWrite(
    POSITION_DEFINITIONS.map((position) => ({
      updateOne: {
        filter: { name: position.name },
        update: { $set: { ...position, isSystem: true } },
        upsert: true,
      },
    }))
  );

  console.log("RBAC permissions and positions seeded.");
};
