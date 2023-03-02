import { FunctionComponent } from "react";
import { Category } from "./category.component";

import {
  useAllCategoryItemsData,
  CategoryT,
  CategoryItemT
} from "../hooks";

export interface IMenuListProp {
  categories : CategoryT[];
}

export const MenuList: FunctionComponent<IMenuListProp> = ({
  categories
}) => {
  
  const { status, data: categoryItems, error } = useAllCategoryItemsData();

  if (status === "loading") {
    return <span>Loading ...</span>;
  }

  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }


  const getItems = (categoryId: number): CategoryItemT[] => {
    if (categoryId === 1) {
      // popular
      return categoryItems.filter((item: CategoryItemT) => item.popular === 1);
    } else {
      return categoryItems.filter((item: CategoryItemT) => item.category_id === categoryId);
    }
  };
  
  return (
    <>
    {
      categories?.map((category:CategoryT) => (
        <div key={category.id} className="mt-12 mb-8 mr-8 flex flex-col gap-12">
          <Category 
            categoryName={category.name} categoryDesc = {category.description} categoryItems = {getItems(category.id)}
          />
        </div>
      ))
    }
    </>
  )
};

export default MenuList;
