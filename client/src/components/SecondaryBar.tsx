import { Menu } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";

const categories = ["T-Shirt", "Hoodie"];

const SecondaryBar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get("category");
  const handleCategory = (category: string) => {
    const newParams = new URLSearchParams(searchParams);
    const categoryLower = category.toLowerCase();

    if (currentCategory === categoryLower) {
      newParams.delete("category");
    } else {
      newParams.set("category", categoryLower);
    }
    const newSearchQuery = newParams.toString();
    const path = newSearchQuery
      ? `/product/filter?${newSearchQuery}`
      : "/product/filter";
    navigate(path, { replace: true });
  };

  return (
    <main className="py-6">
      <div className="max-w-6xl mx-auto flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Menu />
          <p className="text-lg font-semibold">Categories</p>
        </div>
        <div className="flex gap-6">
          {categories.map((category, index) => (
            <p
              key={index}
              onClick={() => handleCategory(category)}
              className={`cursor-pointer ${currentCategory === category.toLocaleLowerCase() && "text-lg font-bold underline"}`}
            >
              {category}
            </p>
          ))}
        </div>
      </div>
    </main>
  );
};

export default SecondaryBar;
