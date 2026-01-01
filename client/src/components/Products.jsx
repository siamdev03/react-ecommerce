import { useState } from "react";
import CategoryFilter from "./CategoryFilter";

const Products = () => {
  const categories = ["Men", "Women", "Winter"];
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <>
      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onChange={setSelectedCategory}
      />
    </>
  );
};

export default Products;
