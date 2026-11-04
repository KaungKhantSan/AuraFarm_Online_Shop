import { Package, PackagePlus } from "lucide-react";
import type React from "react";
import { Link } from "react-router";

interface Page {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const pages: Page[] = [
  {
    name: "Manage Product",
    path: "/admin/manage-products",
    icon: <Package className="w-6 h-6" />,
  },
  {
    name: "Create Product",
    path: "/admin/product-create",
    icon: <PackagePlus className="w-6 h-6" />,
  },
];
function SideBar() {
  return (
    <div>
      {pages.map((page, index) => (
        <div className="flex gap-1 space-y-4" key={index}>
          {page.icon}
          <Link to={page.path} className="font-medium">
            {page.name}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default SideBar;
