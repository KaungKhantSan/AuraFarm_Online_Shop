import z from "zod";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

export const productSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Product name must be at least 3 character." }),
  description: z
    .string()
    .min(10, { message: "Desciption must be at least 10 characters." }),
  price: z.number().min(0, { message: "Price must be greater than 0" }),
  category: z.string().min(1, { message: "Category is require." }),
  instock_count: z.number(),
  images: z
    .array(
      z.object({
        file: z.instanceof(File).optional(),
        url: z.string(),
        public_alt: z.string().optional(),
      }),
    )
    .min(1, "At least 1 image is required"),
  color: z
    .array(z.string())
    .min(1, { message: "At least 1 color is require." }),
  sizes: z.array(z.string()).min(1, { message: "At least 1 size is require." }),
  is_new_arrival: z.boolean(),
  is_feature: z.boolean(),
  rating_count: z.number().min(0),
});

export type ProductFormInputs = z.infer<typeof productSchema>;

// name: string;
//   description: string;
//   price: number;
//   category: string;
//   instock_count: number;
//   images: Image[];
//   color: string[];
//   sizes: string[];
//   is_new_arrival: boolean;
//   is_feature: boolean;
//   rating_count: number;
