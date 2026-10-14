import type { ProductFormInputs } from "@/schema/product";
import ProductForm from "./ProductForm";

function ProductCreate() {
  const onSubmit = async (data: ProductFormInputs) => {};
  const isLoading = false;
  return (
    <div>
      <ProductForm onSubmit={onSubmit} isLoading={isLoading} />
    </div>
  );
}

export default ProductCreate;
