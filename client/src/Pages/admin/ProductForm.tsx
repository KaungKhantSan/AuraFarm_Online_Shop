import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { productSchema, type ProductFormInputs } from "@/schema/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import ImageUpload from "../../components/admin/ImageUpload";
import Category from "../../components/admin/Category";
import ColorPicker from "../../components/admin/ColorPicker";
import Sizes from "../../components/admin/Sizes";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import Tiptap from "@/components/editor/Tiptap";
import { useEffect } from "react";

interface ProductFormPropts {
  initialData?: any;
  onSubmit: (data: ProductFormInputs) => void;
  isLoading: boolean;
}
function ProductForm({ initialData, onSubmit, isLoading }: ProductFormPropts) {
  const form = useForm<ProductFormInputs>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          description: initialData.description,
          category: initialData.category,
          price: initialData.price,
          color: initialData.color,
          sizes: initialData.sizes,
          instock_count: initialData.instock_count,
          is_feature: initialData.is_feature,
          is_new_arrival: initialData.is_new_arrival,
          rating_count: initialData.rating_count,
          images: initialData.images.map((img: any) => ({
            url: img.url,
            public_alt: img.url,
          })),
        }
      : {
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

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        description: initialData.description,
        category: initialData.category,
        price: initialData.price,
        color: initialData.color,
        sizes: initialData.sizes,
        instock_count: initialData.instock_count,
        is_feature: initialData.is_feature,
        is_new_arrival: initialData.is_new_arrival,
        rating_count: initialData.rating_count,
        images: initialData.images.map((img: any) => ({
          url: img.url,
          public_alt: img.url,
        })),
      });
    }
  }, [FormData, initialData]);
  return (
    <Card>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FieldGroup>
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Product Name</FieldLabel>
                  <Input {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              control={form.control}
              name="description"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Description</FieldLabel>
                  <Tiptap value={field.value} onChange={field.onChange} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
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
          <FieldGroup>
            <Controller
              control={form.control}
              name="category"
              render={({ field }) => (
                <Field>
                  <FieldLabel>Category</FieldLabel>
                  <Category value={field.value} onChange={field.onChange} />
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              control={form.control}
              name="color"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Color</FieldLabel>
                  <ColorPicker colors={field.value} onChange={field.onChange} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              control={form.control}
              name="sizes"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Sizes</FieldLabel>
                  <Sizes sizes={field.value} onChange={field.onChange} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <div className="flex gap-2">
            <FieldGroup>
              <Controller
                control={form.control}
                name="is_new_arrival"
                render={({ field }) => (
                  <Field
                    className={"flex flex-row rounded-md border px-5 py-3"}
                  >
                    <FieldLabel>New Arrival</FieldLabel>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup>
              <Controller
                control={form.control}
                name="is_feature"
                render={({ field }) => (
                  <Field
                    className={"flex flex-row rounded-md border px-5 py-3"}
                  >
                    <FieldLabel>Featured Items</FieldLabel>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </Field>
                )}
              />
            </FieldGroup>
          </div>
          <Button type="submit" disabled={isLoading} className={"w-full"}>
            {isLoading
              ? "Saving..."
              : initialData
                ? "Update Product"
                : "Create Product"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default ProductForm;
