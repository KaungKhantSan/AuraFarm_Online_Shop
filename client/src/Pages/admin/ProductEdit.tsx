import type { ProductFormInputs } from "@/schema/product";
import ProductForm from "./ProductForm";
import { useNavigate, useParams } from "react-router";
import { toast } from "@/components/ui/toast";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "@/store/slices/product";
import { useEffect } from "react";

function ProductUpdate() {
  const { id } = useParams();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const {
    data: initialdata,
    isLoading,
    isError,
  } = useGetProductDetailsQuery(id as string);

  useEffect(() => {
    if (isError || !id) {
      navigate("/admin");
    }
  }, [isError]);

  const navigate = useNavigate();
  const onSubmit = async (data: ProductFormInputs) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", String(data.price));
      formData.append("instock_count", String(data.instock_count));
      formData.append("category", data.category);
      formData.append("is_feature", String(data.is_feature));
      formData.append("is_new_arrival", String(data.is_new_arrival));
      formData.append("rating_count", String(data.rating_count));

      //array
      data.color.forEach((c) => formData.append("color[]", c));
      data.sizes.forEach((s) => formData.append("sizes[]", s));

      //seperate existing images and new images
      const existingImages = data.images.filter(
        (img) => !img.file && img.url && img.public_alt,
      );
      const newImages = data.images.filter((img) => img.file);
      formData.append("existingImages", JSON.stringify(existingImages));

      newImages.forEach((img) => {
        if (img.file) {
          formData.append("images", img.file as File);
        }
      });

      await updateProduct({ id: id!, formData }).unwrap();
      toast.add({
        type: "success",
        description: "Product update successfully.",
      });
      navigate("/admin/product");
    } catch (error) {
      console.log("Product update failed.", error);
      toast.add({
        type: "error",
        description: "Failed to update product.",
      });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Edit Product</h1>
      <ProductForm
        onSubmit={onSubmit}
        isLoading={isLoading}
        initialData={initialdata}
      />
    </div>
  );
}

export default ProductUpdate;
