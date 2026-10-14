import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { productSchema, type ProductFormInputs } from "@/schema/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import ImageUpload from "./ImageUpload";

interface ProductFormPropts {
  initialData?: any;
  onSubmit: (data: ProductFormInputs) => void;
  isLoading: boolean;
}
function ProductForm({ initialData, onSubmit, isLoading }: ProductFormPropts) {
  const form = useForm<ProductFormInputs>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      category: "",
      price: 0,
      color: [],
      sizes: [],
      images: [],
      instock_count: 0,
      is_feature: false,
      is_new_arrival: false,
      rating_count: 0,
    },
  });
  return (
    <Card>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FieldGroup>
            <Controller
              control={form.control}
              name="name"
              render={({ field }) => (
                <Field>
                  <FieldLabel>Product Name</FieldLabel>
                  <Input {...field} />
                </Field>
              )}
            />
          </FieldGroup>
          {/* description */}
          <div className="grid grid-cols-2 gap-4">
            <FieldGroup>
              <Controller
                control={form.control}
                name="price"
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Product Price</FieldLabel>
                    <Input
                      {...field}
                      type="number"
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup>
              <Controller
                control={form.control}
                name="instock_count"
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Instock Count</FieldLabel>
                    <Input
                      {...field}
                      type="number"
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </Field>
                )}
              />
            </FieldGroup>
          </div>
          <FieldGroup>
            <Controller
              control={form.control}
              name="images"
              render={({ field }) => (
                <Field>
                  <FieldLabel>Product Image</FieldLabel>
                  <ImageUpload images={field.value} onChange={field.onChange} />
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}

export default ProductForm;
