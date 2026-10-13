import { Search, X } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

const SearchBar = () => {
  const [searchParams] = useSearchParams();

  const initailKeyword = searchParams.get("keyword") || "";
  const [keyword, setKeyword] = useState(initailKeyword);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateKeyWordInUrl(keyword.trim());
  };

  const updateKeyWordInUrl = (newkeyword: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (newkeyword) {
      newParams.set("keyword", newkeyword);
    } else {
      newParams.delete("keyword");
    }

    const newSearchQuery = newParams.toString();
    const path = newSearchQuery
      ? `/product/filter?${newSearchQuery}`
      : "/product/filter";
    navigate(path, { replace: true });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);

    if (value === "" && searchParams.get("keyword")) {
      updateKeyWordInUrl("");
    }
  };

  const handleClear = () => {
    setKeyword("");
    updateKeyWordInUrl("");
  };
  return (
    <main className="mt-4 py-2">
      <div className="w-96 relative max-w-6xl mx-auto flex items-center">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            className="bg-white focus:outline-0 py-2 ps-10 text-black text-sm w-full rounded-full shadow"
            value={keyword}
            onChange={handleInputChange}
          />
          <Search className="absolute top-1.5 left-2 text-black" />
          {keyword && (
            <X
              className="absolute top-1.5 right-2 cursor-pointer"
              onClick={handleClear}
            />
          )}
        </form>
      </div>
    </main>
  );
};

export default SearchBar;
