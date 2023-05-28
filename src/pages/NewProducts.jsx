import React, { useState } from "react";
import { uploadCloudinary } from "../api/uploadCloudinary";
import Button from "../components/ui/Button";
import { useProducts } from "../hooks/useProducts";

export default function NewProducts() {
  const [file, setFile] = useState();
  const [product, setProduct] = useState(initialValue);
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();
  const { addProduct } = useProducts();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imgUrl") {
      setFile(files && files[0]);
    }
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setIsUploading(true);
    uploadCloudinary(file)
      .then((imgUrl) => {
        const newProduct = { ...product, imgUrl };
        addProduct.mutate(newProduct, {
          onSuccess: () => {
            setProduct(initialValue);
            setFile(null);
            setSuccess("✅ 성공적으로 제품을 등록했습니다!");
            setTimeout(() => {
              setSuccess(null);
            }, 3000);
          },
        });
      })
      .finally(() => {
        setIsUploading(false);
      });
  };

  return (
    <section className="flex flex-col items-center py-8">
      <h1 className="text-xl font-bold py-3 text-center">새 제품 등록</h1>
      {success && <p>{success}</p>}
      {file && (
        <img
          className="w-[300px] aspect-[1/1] rounded-lg"
          src={URL.createObjectURL(file)}
          alt={file.name}
        />
      )}
      <div className="w-full flex flex-col items-center my-5 gap-5">
        <input
          className="file-input file-input-bordered w-full max-w-xl"
          type="file"
          name="imgUrl"
          accept="image/*"
          onChange={handleChange}
          required
        />
        {INPUTS.map(({ name, placeholder, type }) => (
          <input
            className="input input-bordered w-full max-w-xl"
            key={name}
            name={name}
            placeholder={placeholder}
            type={type}
            value={product[name]}
            onChange={handleChange}
            required
          />
        ))}
      </div>
      <Button
        text={isUploading ? "제품 등록 중..." : "제품등록하기"}
        disabled={isUploading}
        onClick={handleSubmit}
      />
    </section>
  );
}

const INPUTS = [
  { name: "productName", placeholder: "제품명", type: "text" },
  { name: "price", placeholder: "가격", type: "number" },
  { name: "category", placeholder: "카테고리(women or men)", type: "text" },
  { name: "detail", placeholder: "제품설명", type: "text" },
  { name: "size", placeholder: "사이즈(콤마(,)로 구분)", type: "text" },
];

const initialValue = {
  productName: "",
  price: "",
  category: "",
  detail: "",
  size: [],
};
