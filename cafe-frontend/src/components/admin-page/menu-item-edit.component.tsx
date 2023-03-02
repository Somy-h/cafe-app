import { useState, FunctionComponent, useRef } from 'react';
import {
  useCategoriesData,
  CategoryT,
  CategoryItemT,
  updateOnlineMenu,
  useAllCategoryItemsData
} from "../../hooks";

import {
  Avatar,
  Input,
  Checkbox,
  Button,
  Select,
  Option,
  Textarea,
} from "@material-tailwind/react";
import { PhotoIcon } from "@heroicons/react/24/outline";


export interface IMenuItemEditProps {
  categoryItem : CategoryItemT;
  handleClose: () => void;
}

export const MenuItemEdit: FunctionComponent<IMenuItemEditProps> = (
  {
    categoryItem,
    handleClose
  }
) => {

  const [previewPhotoURL, setPreviewPhotoURL] = useState(null);
  const [editMenuFormData, setEditMenuFormData] = useState<CategoryItemT>(categoryItem);

  const refCategorySelect = useRef();
  const { refetch } = useAllCategoryItemsData();
  const { status, data: categories, error } = useCategoriesData();

  if (status === "loading") {
    return <span>Loading ...</span>;
  }

  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }

  const displayCategories = categories?.map((category: CategoryT) => (
    <Option
      key={category.id}
      value={category.id}
    >
      {category.name}
    </Option>
  ));

  const handleFormChange = (event: InputChangeEvent) => {
    const { name, value, type, checked } = event.target;
    //console.log(name, value, type, checked);
    setEditMenuFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const getPhotoFileInfo = (e) => {
    if (e.target.files.length > 0) {
      setEditMenuFormData((prevData) => ({
        ...prevData,
        image_url: e.target.files[0],
      }));

      setPreviewPhotoURL(URL.createObjectURL(e.target.files[0]));
    }
  };

  const displayImage = () => {

    console.log(categoryItem.image_url);
    if (previewPhotoURL) {
      return <Avatar src={previewPhotoURL} size='xxl' />;
    } else if (categoryItem.image_url) {
      return <Avatar src={categoryItem.image_url} size='xxl' />;
    } else null;
  };

  const handleSelectCategoryChange = (e) => {
    console.log(e);
    setEditMenuFormData((prevData) => ({
      ...prevData,
      category_id: e,
    }));
  }
  //const handleClose = () => {}
  const handleUpdate = async() => {
    console.log("update");
    try {
      const formData = new FormData();
      
      formData.append("id", categoryItem.id);
      editMenuFormData.category_id && formData.append(
        "category_id",
        editMenuFormData.category_id
      );
      editMenuFormData.name && formData.append("name", editMenuFormData.name);
      editMenuFormData.price && formData.append("price", editMenuFormData.price);
      formData.append("popular", editMenuFormData.popular);
      editMenuFormData.description && formData.append(
        "description",
        editMenuFormData.description
      );
      formData.forEach((item) => console.log(item));
      previewPhotoURL &&
        formData.append(
          "menu",
          editMenuFormData?.image_url,
          editMenuFormData?.image_url?.name
        );
      //console.log(formData);
      
      const result = await updateOnlineMenu(editMenuFormData.id, formData);
      console.log(result.success, result.message);

      refetch();
      handleClose();
    } catch (err) {}
  }

  const getCategoryName = () => {
    const currentSelect = categories?.filter(
      (category: CategoryT) => category.id === editMenuFormData.category_id
    );
    if (currentSelect && currentSelect.length > 0) {
      return currentSelect[0].name;
    } else "";
  }

  return (
    <>
      <div className='flex flex-col gap-4'>
        <div className='flex justify-evenly'>
          <div>
            {displayImage()}
            <label for='input_avatar'>
              <PhotoIcon color='blue' className='cursor-pointer w-8 h-8' />
              <input
                id='input_avatar'
                className='hidden'
                type='file'
                accept='image/gif, image/jpeg, image/png'
                onChange={getPhotoFileInfo}
              ></input>
            </label>
          </div>

          <div className='ml-4 self-center'>
            <Checkbox
              label='Popular'
              ripple={true}
              name='popular'
              checked={editMenuFormData.popular ? true : false}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <Select
          ref={refCategorySelect}
          variant='standard'
          color='teal'
          label={getCategoryName()}
          onChange={handleSelectCategoryChange}
        >
          {displayCategories}
        </Select>

        <Input
          variant='standard'
          type='text'
          label='Menu Name'
          name='name'
          value={editMenuFormData.name}
          size='lg'
          onChange={handleFormChange}
        />
        <Input
          variant='standard'
          type='text'
          label='Price'
          name='price'
          value={editMenuFormData.price}
          size='lg'
          onChange={handleFormChange}
        />
        <Textarea
          name='description'
          value={editMenuFormData.description}
          label='Description'
          onChange={handleFormChange}
        />
      </div>
      <div className='flex justify-center'>
        <Button
          variant='text'
          color='red'
          onClick={handleClose}
          className='mr-2'
        >
          <span>Close</span>
        </Button>
        <Button variant='gradient' color='green' onClick={handleUpdate}>
          Update
        </Button>
      </div>
    </>
  );
}

export default MenuItemEdit;