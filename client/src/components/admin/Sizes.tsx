import { Button } from "@/components/ui/button";
interface SizeProps {
  sizes: string[];
  onChange: (sizes: string[]) => void;
}
function Sizes({ sizes, onChange }: SizeProps) {
  const availableSizes = ["s", "m", "l", "xl", "xxl"];

  const toggleSizes = (selectedSize: string) => {
    if (sizes.includes(selectedSize)) {
      onChange(sizes.filter((s) => s !== selectedSize));
    } else {
      onChange([...sizes, selectedSize]);
    }
  };
  return (
    <div>
      {availableSizes.map((size) => (
        <Button
          type="button"
          key={size}
          onClick={() => toggleSizes(size)}
          className={`${sizes.includes(size) && "bg-black text-white hover:bg-black hover:text-white"}`}
          variant={"outline"}
        >
          {size.toUpperCase()}
        </Button>
      ))}
    </div>
  );
}

export default Sizes;
