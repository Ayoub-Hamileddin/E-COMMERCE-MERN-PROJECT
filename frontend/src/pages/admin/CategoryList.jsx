import { useEffect, useState } from "react";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice.js";
import { toast } from "react-toastify";
import CategoryForm from "../../components/CategoryForm.jsx";
import Modal from "../../components/Modal.jsx";
import AdminMenu from "./AdminMenu.jsx";

const CategoryList = () => {
  const { data: categories, refetch } = useFetchCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updateName, setUpdateName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  console.log(categories);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("required field");
    }
    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`the name ${name} is created`);
        refetch();
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!updateName) {
      toast.error("required field");
      return;
    }
    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: { name: updateName },
      }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updating`);
        setSelectedCategory(null);
        setModalVisible(false);
        setUpdateName("");
        refetch();
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const handleDeleteCategory = async (e) => {
    e.preventDefault();
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted`);
        setSelectedCategory(null);
        setModalVisible(false);
        setUpdateName("");
        refetch();
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <AdminMenu/>
      <div className="md:w-3/4 p-3">
        <div className="h-12 ">Manage Categories</div>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
        />
        <br />
        <hr />
        <div className="flex flex-wrap">
          {categories?.map((category) => (
            <div key={category._id}>
              <button
                onClick={() => {
                  setSelectedCategory(category);
                  setModalVisible(true);
                  setUpdateName(category.name);
                }}
                className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none foucs:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>

        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <CategoryForm
            handleSubmit={handleUpdateCategory}
            handleDelete={handleDeleteCategory}
            value={updateName}
            setValue={(value) => setUpdateName(value)}
          />
        </Modal>
      </div>
    </div>
  );
};

export default CategoryList;
