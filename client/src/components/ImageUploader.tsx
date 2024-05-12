import React, { useState } from 'react';
import axios from 'axios';

interface ImageUploaderProps {
  onImageUpload: (url: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setFile(file);
      uploadFile(file);
    }
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("http://localhost:3000/api/images/upload-image", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      onImageUpload(response.data.url);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <label className="relative block cursor-pointer text-blue-500 hover:text-blue-700 focus:outline-none ">
      <span className="sr-only">Upload image</span>
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <svg className="w-6 h-6 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.55 4.55M19.55 10.05 15 14.6M21 13V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h8M15 3h6v6M10 14H5.5M16 21v-6m0 6H12m4 0h4"></path>
      </svg>
    </label>
  );
}

export default ImageUploader;
