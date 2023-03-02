import React, { FunctionComponent } from 'react';
import PropTypes from "prop-types";
import { CategoryItem } from "./category-item.component";
import { CategoryItemT } from "../hooks";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { StarIcon } from "@heroicons/react/24/solid";

export interface ICategoryProps {
  categoryName: string;
  categoryDesc: string;
  categoryItems: CategoryItemT[];
}

export const Category: FunctionComponent<ICategoryProps> = ({
  categoryName,
  categoryDesc,
  categoryItems,
}) => {
  return (
    <>
      <Card id={categoryName}>
        <CardHeader variant='gradient' color='green' className='mb-4 p-6'>
          <Typography variant='h6' color='white'>
            {categoryName}
          </Typography>
          <Typography variant='paragraph' color='white'>
            {categoryDesc}
          </Typography>
        </CardHeader>
        <CardBody className='overflow-x-scroll px-0 pt-0 pb-2'>
          <div className='grid grid-cols-1 gap-y-2 gap-x-2 md:grid-cols-2 p-4'>
            {categoryItems.map((item) => (
              <CategoryItem key={item.id} categoryItem={item} />
            ))}
          </div>
        </CardBody>
      </Card>
    </>
  );
};

