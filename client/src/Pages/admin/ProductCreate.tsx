import type { ProductFormInputs } from "@/schema/product";
import ProductForm from "./ProductForm";
import { useCreateProductMutation } from "@/store/slices/product";
import { useNavigate } from "react-router";
import { toast } from "@/components/ui/toast";

function ProductCreate() {
  const [createProductMutation, { isLoading }] = useCreateProductMutation();
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

      //files
      data.images.forEach((img) => {
        if (img.file) {
          formData.append("images", img.file as File);
        }
      });
      await createProductMutation(formData).unwrap();
      toast.add({
        type: "success",
        description: "Product create successfully.",
      });
      navigate("/admin/product");
    } catch (error) {
      console.log("Product creation failed.", error);
      toast.add({
        type: "error",
        description: "Failed to create product.",
      });
    }
  };
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Create Product</h1>
      <ProductForm onSubmit={onSubmit} isLoading={isLoading} />
    </div>
  );
}

export default ProductCreate;
