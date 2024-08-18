import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '@/app/context/auth-context';

type Category = { id: number; name: string; };
type Color = { id: number; name: string; };
type Size = { id: number; name: string; };
type Brand = { id: number; name: string; };

type FormData = {
  name: string;
  code: string;
  description: string;
  categoryid: number | string;
  colorid: number | string;
  sizeid: number | string;
  brandid: number | string;
  imageurl: string[];
  quantity: number;
  costprice: number;
  price: number;
  updatedby?: number;
};

const Body: React.FC = () => {
  const { authState } = useAuth();
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [categories, setCategories] = useState<Category[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    code: '',
    description: '',
    categoryid: '',
    colorid: '',
    sizeid: '',
    brandid: '',
    imageurl: [],
    quantity: 0,
    costprice: 0,
    price: 0,
    updatedby: authState.user?.userid,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (url: string, setState: React.Dispatch<React.SetStateAction<any[]>>) => {
      try {
        const response = await axios.get(url);
        setState(response.data);
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
      }
    };
  
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/api/product-details?id=${id}`);
        const product = response.data;

        setFormData({
          name: product.name || '',
          code: product.code || '',
          description: product.description || '',
          categoryid: product.categoryid || '',  // Set current categoryid
          colorid: product.colorid || '',        // Set current colorid
          sizeid: product.sizeid || '',          // Set current sizeid
          brandid: product.brandid || '',        // Set current brandid
          imageurl: product.imageUrls || [],
          quantity: product.quantity || 0,
          costprice: product.costprice || 0,
          price: product.price || 0,
          updatedby: authState.user?.userid,
        });
      } catch (error) {
        console.error('Error fetching product details:', error);
        toast.error('Failed to load product details.', {
          autoClose: 1000,
          transition: Slide,
        });
      }
    };
  
    fetchData('/api/categories', setCategories);
    fetchData('/api/colors', setColors);
    fetchData('/api/sizes', setSizes);
    fetchData('/api/brands', setBrands);
    fetchProductDetails();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const uploadedImageUrls: string[] = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);

        try {
          const response = await axios.post(`/api/uploads/${id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          uploadedImageUrls.push(response.data.url);
        } catch (error) {
          console.error('Error uploading file:', error);
          toast.error('Failed to upload image. Please try again.', {
            autoClose: 2000,
            transition: Slide,
          });
        }
      }

      setFormData(prevState => ({ ...prevState, imageurl: [...prevState.imageurl, ...uploadedImageUrls] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedFormData = { ...formData, updatedby: authState.user?.userid };
      const response = await axios.put(`/api/product-details/${id}`, updatedFormData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toast.success('Product updated successfully!', {
        autoClose: 1000,
        transition: Slide,
      });
      setTimeout(() => {
        router.replace('/dashboard');
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update product. Please try again.', {
        autoClose: 1000,
        transition: Slide,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Update Product</h1>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-wrap -m-2">
              {/* Product Name */}
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="name" className="leading-7 text-sm text-gray-600">Product Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              {/* Product Code */}
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="code" className="leading-7 text-sm text-gray-600">Product Code</label>
                  <input
                    type="text"
                    id="code"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="description" className="leading-7 text-sm text-gray-600">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>

              {/* Category */}
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="categoryid" className="leading-7 text-sm text-gray-600">Category</label>
                  <select
                    id="categoryid"
                    name="categoryid"
                    value={formData.categoryid}
                    onChange={handleInputChange}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  >
                    <option value="" disabled>Select Category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Color */}
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="colorid" className="leading-7 text-sm text-gray-600">Color</label>
                  <select
                    id="colorid"
                    name="colorid"
                    value={formData.colorid}
                    onChange={handleInputChange}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  >
                    <option value="" disabled>Select Color</option>
                    {colors.map(color => (
                      <option key={color.id} value={color.id}>{color.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Size */}
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="sizeid" className="leading-7 text-sm text-gray-600">Size</label>
                  <select
                    id="sizeid"
                    name="sizeid"
                    value={formData.sizeid}
                    onChange={handleInputChange}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  >
                    <option value="" disabled>Select Size</option>
                    {sizes.map(size => (
                      <option key={size.id} value={size.id}>{size.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Brand */}
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="brandid" className="leading-7 text-sm text-gray-600">Brand</label>
                  <select
                    id="brandid"
                    name="brandid"
                    value={formData.brandid}
                    onChange={handleInputChange}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  >
                    <option value="" disabled>Select Brand</option>
                    {brands.map(brand => (
                      <option key={brand.id} value={brand.id}>{brand.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Cost Price */}
              <div className="p-2 w-1/3">
                <div className="relative">
                  <label htmlFor="costprice" className="leading-7 text-sm text-gray-600">Cost Price</label>
                  <input
                    type="number"
                    id="costprice"
                    name="costprice"
                    value={formData.costprice}
                    onChange={handleInputChange}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              {/* Selling Price */}
              <div className="p-2 w-1/3">
                <div className="relative">
                  <label htmlFor="price" className="leading-7 text-sm text-gray-600">Selling Price</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              {/* Quantity */}
              <div className="p-2 w-1/3">
                <div className="relative">
                  <label htmlFor="quantity" className="leading-7 text-sm text-gray-600">Quantity</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="imageurl" className="leading-7 text-sm text-gray-600">Product Images</label>
                  <input
                    type="file"
                    id="imageurl"
                    name="imageurl"
                    multiple
                    accept=".jpg, .png, .jpeg, .gif"
                    onChange={handleFileChange}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="p-2 w-full">
                <button type="submit" className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" disabled={loading}>
                  {loading ? 'Updating...' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Body;
