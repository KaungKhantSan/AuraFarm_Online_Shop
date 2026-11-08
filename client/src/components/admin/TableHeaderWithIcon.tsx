import { ArrowUpDown } from "lucide-react";
import type React from "react";
import { Button } from "../ui/button";

interface TableHeaderWithIconProps {
  title: String;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

function TableHeaderWithIcon({ title, onClick }: TableHeaderWithIconProps) {
  return (
    <div onClick={onClick} className="flex w-full items-center justify-end">
      <Button variant={"secondary"}>
        <span>{title}</span>
        <ArrowUpDown className="ml-2 w-4 h-4" />
      </Button>
    </div>
  );
}

export default TableHeaderWithIcon;
