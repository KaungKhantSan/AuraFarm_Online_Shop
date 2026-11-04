import type { ProductImage } from "@/types/product";
import type { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function useProductColumn(): ColumnDef<ProductImage, any>[] {
  return [
    {
      accessorKey: "images",
      header: "Image",
      cell: ({ row }) => {
        const product = row.original;
        const image = product.images?.[0];

        return (
          <Avatar>
            <AvatarImage src={image.url} alt={product.name} />
            <AvatarFallback>
              {product.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        );
      },
    },
  ];
}

export default useProductColumn;
