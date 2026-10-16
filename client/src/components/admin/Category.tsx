import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductCategroyProps {
  value: string;
  onChange: (value: string) => void;
}
const CATEGORIES = [
  {
    id: "hoodie",
    label: "Hoodie",
  },
  {
    id: "t-shirt",
    label: "T-shirt",
  },
];
function Category({ value, onChange }: ProductCategroyProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {CATEGORIES.map((cate) => (
            <SelectItem key={cate.id} value={cate.label}>
              {cate.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default Category;
