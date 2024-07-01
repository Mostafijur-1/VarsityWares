import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/actions/product";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";

const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Product created successfully!");
      navigate("/dashboard");
      window.location.reload();
    }
  }, [error, success, navigate]);

  const handleImageChange = (e, setFieldValue) => {
    const files = Array.from(e.target.files);

    setImagePreviews([]);
    setFieldValue("images", files); // Directly set the files to formik state

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreviews((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    values.images.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("category", values.category);
    formData.append("tags", values.tags);
    formData.append("originalPrice", values.originalPrice);
    formData.append("discountPrice", values.discountPrice);
    formData.append("stock", values.stock);
    formData.append("shopId", seller._id);

    dispatch(createProduct(formData));
    setSubmitting(false);
    resetForm();
    setImagePreviews([]);
  };

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Product</h5>
      <Formik
        initialValues={{
          name: "",
          description: "",
          category: "",
          tags: "",
          originalPrice: "",
          discountPrice: "",
          stock: "",
          images: [],
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <br />
            <div>
              <label className="pb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                name="name"
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your product name..."
              />
            </div>
            <br />
            <div>
              <label className="pb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <Field
                as="textarea"
                name="description"
                cols="30"
                rows="8"
                className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your product description..."
              />
            </div>
            <br />
            <div>
              <label className="pb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <Field
                as="select"
                name="category"
                className="w-full mt-2 border h-[35px] rounded-[5px]"
              >
                <option value="Choose a category">Choose a category</option>
                {categoriesData &&
                  categoriesData.map((i) => (
                    <option value={i.title} key={i.title}>
                      {i.title}
                    </option>
                  ))}
              </Field>
            </div>
            <br />
            <div>
              <label className="pb-2">Tags</label>
              <Field
                type="text"
                name="tags"
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your product tags..."
              />
            </div>
            <br />
            <div>
              <label className="pb-2">Original Price</label>
              <Field
                type="number"
                name="originalPrice"
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your product price..."
              />
            </div>
            <br />
            <div>
              <label className="pb-2">
                Price (With Discount) <span className="text-red-500">*</span>
              </label>
              <Field
                type="number"
                name="discountPrice"
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your product price with discount..."
              />
            </div>
            <br />
            <div>
              <label className="pb-2">
                Product Stock <span className="text-red-500">*</span>
              </label>
              <Field
                type="number"
                name="stock"
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your product stock..."
              />
            </div>
            <br />
            <div>
              <label className="pb-2">
                Upload Images <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                id="upload"
                className="hidden"
                multiple
                onChange={(e) => handleImageChange(e, setFieldValue)}
              />
              <div className="w-full flex items-center flex-wrap">
                <label htmlFor="upload">
                  <AiOutlinePlusCircle
                    size={30}
                    className="mt-3"
                    color="#555"
                  />
                </label>
                {imagePreviews &&
                  imagePreviews.map((preview, index) => (
                    <img
                      src={preview}
                      key={index}
                      alt=""
                      className="h-[120px] w-[120px] object-cover m-2"
                    />
                  ))}
              </div>
              <br />
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  Create
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateProduct;
