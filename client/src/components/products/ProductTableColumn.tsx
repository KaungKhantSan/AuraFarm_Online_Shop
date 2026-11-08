import type { ProductImage } from "@/types/product";
import type { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ArrowUpDown, Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import { useNavigate } from "react-router";
import { useDeleteProductMutation } from "@/store/slices/product";
import { toast } from "../ui/toast";
import TableHeaderWithIcon from "../admin/TableHeaderWithIcon";

function useProductColumn(): ColumnDef<ProductImage>[] {
  const [deleteProductMutation, { isLoading }] = useDeleteProductMutation();

  const navigate = useNavigate();

  const productDeleteHandler = async (id: string, name: string) => {
    if (window.confirm("Are you sure you want to delete " + name + "?")) {
      try {
        await deleteProductMutation({ id }).unwrap();
        toast.add({
          type: "success",
          description: "Product delete successfully.",
        });
      } catch (error) {
        toast.add({
          type: "error",
          description: "Failed to delete product.",
        });
      }
    }
  };
  return [
    {
      accessorKey: "images",
      header: "Image",
      cell: ({ row }) => {
        const product = row.original;
        const image = product.images?.slice(0, 2);

        return (
          <div className="*:data-slot-avatar:ring-background flex -space-x-2 *:data-slot-avatar:ring-2">
            {image.map((img) => (
              <Avatar>
                <AvatarImage src={img.url} alt={product.name} />
                <AvatarFallback>
                  {product.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "name",
      header: "Product Name",
      cell: ({ row }) => {
        const product = row.original;
        return <div className="font-medium">{product.name}</div>;
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ getValue }) => {
        return <Badge variant={"secondary"}>{getValue() as string}</Badge>;
      },
    },
    {
      accessorKey: "price",
      header: ({ column }) => {
        return (
          <TableHeaderWithIcon
            title={"Price"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        );
      },
      cell: ({ getValue }) => {
        const price = getValue() as number;
        return <div className="font-medium text-right">{price.toFixed(2)}</div>;
      },
    },
    {
      accessorKey: "instock_count",
      header: ({ column }) => {
        return (
          <TableHeaderWithIcon
            title={"Stock"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        );
      },
      cell: ({ getValue }) => {
        const stock = getValue() as number;
        return (
          <div className="text-right">
            <Badge
              variant={
                stock > 10 ? "default" : stock > 0 ? "secondary" : "destructive"
              }
            >
              {stock}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <TableHeaderWithIcon
            title={"Created Date"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        );
      },
      cell: ({ getValue }) => {
        const date = new Date(getValue() as string);
        return (
          <div className="text-sm text-right">{date.toLocaleDateString()}</div>
        );
      },
    },
    {
      id: "action",
      cell: ({ row }) => {
        const product = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="ghost" className="h-8 w-8 p-0" />}
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  <Eye className="mr-1 w-2 h-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate(`/admin/product-edit/${product._id}`)}
                >
                  <Edit className="mr-1 w-2 h-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    productDeleteHandler(product._id, product.name)
                  }
                  disabled={isLoading}
                >
                  <Trash className="mr-1 w-2 h-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}

export default useProductColumn;
