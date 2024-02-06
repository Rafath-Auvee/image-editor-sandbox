"use client";
import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import { useState } from "react";

const UploadAnything = () => {
  const [formData, setFormData] = useState({
    demoImage: "",
    referenceImage: "",
    finalImage: "",
    watermark: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUploadComplete = (fieldName, files) => {
    console.log("Files: ", files);
    setFormData({ ...formData, [fieldName]: files[0].url });
    alert("Upload Completed");
  };

  const handleUploadError = (error) => {
    alert(`ERROR! ${error.message}`);
  };

  return (
    <div className="h-full w-full flex items-center justify-center py-20">
      <div className="flex flex-col w-80 justify-center items-center">
        {/* Demo Image */}
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res) =>
            handleUploadComplete("demoImage", res)
          }
          onUploadError={handleUploadError}
        />
        <div>
          <label className="block font-bold mb-2" htmlFor="demoImage">
            Demo Image (imageUrl)
          </label>
          <input
            type="text"
            id="demoImage"
            name="demoImage"
            value={formData.demoImage}
            onChange={handleInputChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>

        {/* Reference Image */}
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res) =>
            handleUploadComplete("referenceImage", res)
          }
          onUploadError={handleUploadError}
        />
        <div>
          <label className="block font-bold mb-2" htmlFor="referenceImage">
            Reference Image
          </label>
          <input
            type="text"
            id="referenceImage"
            name="referenceImage"
            value={formData.referenceImage}
            onChange={handleInputChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>

        {/* Final Image */}
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res) =>
            handleUploadComplete("finalImage", res)
          }
          onUploadError={handleUploadError}
        />
        <div>
          <label className="block font-bold mb-2" htmlFor="finalImage">
            Final Image
          </label>
          <input
            type="text"
            id="finalImage"
            name="finalImage"
            value={formData.finalImage}
            onChange={handleInputChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>

        {/* Watermark */}
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res) =>
            handleUploadComplete("watermark", res)
          }
          onUploadError={handleUploadError}
        />
        <div>
          <label className="block font-bold mb-2" htmlFor="watermark">
            Watermark
          </label>
          <input
            type="text"
            id="watermark"
            name="watermark"
            value={formData.watermark}
            onChange={handleInputChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>

        {/* Display Images */}
        <div className="flex flex-row gap-x-10 gap-y-10">
          {formData.demoImage && isValidUrl(formData.demoImage) && (
            <div>
              <p>Demo Image</p>
              <Image
                src={formData.demoImage}
                alt="Demo Image"
                width={500}
                height={300}
              />
            </div>
          )}
          {formData.referenceImage && isValidUrl(formData.referenceImage) && (
            <div>
              <p>Reference Image</p>
              <Image
                src={formData.referenceImage}
                alt="Reference Image"
                width={500}
                height={300}
              />
            </div>
          )}
          {formData.finalImage && isValidUrl(formData.finalImage) && (
            <div>
              <p>Final Image</p>
              <Image
                src={formData.finalImage}
                alt="Final Image"
                width={500}
                height={300}
              />
            </div>
          )}
          {formData.watermark && isValidUrl(formData.watermark) && (
            <div>
              <p>Watermark</p>
              <Image
                src={formData.watermark}
                alt="Watermark"
                width={500}
                height={300}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

export default UploadAnything;
