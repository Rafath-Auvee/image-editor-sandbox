"use client";
import { useState } from "react";
import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";

const AddCard = () => {
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    referenceImage: "",
    color: "",
    finalImage: "",
    eventName: "",
    watermark: "",
    letUsCustomizePrice: "",
    imageType: "",
    price: "",
    buttonText: "",
    cardType: "",
    popularity: "",
    description: "",
    cardCategory: "",
    textStyles: [],
  });

  const [addingMoreIndex, setAddingMoreIndex] = useState(null);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [newTextStyleKey, setNewTextStyleKey] = useState("");
  const [newTextStyleValue, setNewTextStyleValue] = useState("");
  const [showAddMore, setShowAddMore] = useState(false);
  const [showAddKeyValue, setShowAddKeyValue] = useState(false);
  const [customKey, setCustomKey] = useState("");
  const [customTextStyleKey, setCustomTextStyleKey] = useState("");

  const [type, setType] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const handleCustomKeyChange = (e) => {
    setCustomKey(e.target.value);
    setNewKey(e.target.value); // Update newKey as well
  };

  const handleAddMoreKeyAndValue = (index) => {
    setShowAddMore(true);
    setShowAddKeyValue(false);
    setAddingMoreIndex(index);
    setNewKey("");
    setNewValue("");
  };

  const handleAddKeyAndValue = (index) => {
    setShowAddMore(false);
    setShowAddKeyValue(true);
    if ((newKey && newValue) || newKey === "custom") {
      setFormData((prevFormData) => {
        const updatedTextStyles = [...prevFormData.textStyles];
        updatedTextStyles[index][newKey] = newValue;
        return {
          ...prevFormData,
          textStyles: updatedTextStyles,
        };
      });
      setAddingMoreIndex(null);
      setNewKey("");
      setNewValue("");
      setCustomKey(""); // Reset custom key input
    }
  };

  const handleAddNewTextStyle = () => {
    if (
      (newTextStyleKey && newTextStyleValue) ||
      newTextStyleKey === "custom"
    ) {
      if (newTextStyleKey === "custom") {
        handleAddTextStyle(customTextStyleKey, newTextStyleValue);
      } else {
        handleAddTextStyle(newTextStyleKey, newTextStyleValue);
      }
      setNewTextStyleKey("");
      setCustomTextStyleKey("");
      setNewTextStyleValue("");
    }
  };

  const handleAddTextStyle = (key, value) => {
    setFormData((prevFormData) => {
      const uniqueId = generateUniqueID();
      const newTextStyle = {
        id: uniqueId,
        [key]: value,
      };

      const updatedTextStyles = [...prevFormData.textStyles, newTextStyle];

      return {
        ...prevFormData,
        textStyles: updatedTextStyles,
      };
    });
  };

  const handleRemoveTextStyle = (index) => {
    setFormData((prevFormData) => {
      const updatedTextStyles = [...prevFormData.textStyles];
      updatedTextStyles.splice(index, 1);

      return {
        ...prevFormData,
        textStyles: updatedTextStyles,
      };
    });
  };

  const handleRemoveTextStyleKey = (index, key) => {
    setFormData((prevFormData) => {
      const updatedTextStyles = [...prevFormData.textStyles];
      delete updatedTextStyles[index][key];

      // If no key-value pairs left, remove the textStyle object
      if (Object.keys(updatedTextStyles[index]).length === 1) {
        updatedTextStyles.splice(index, 1);
      }

      return {
        ...prevFormData,
        textStyles: updatedTextStyles,
      };
    });
  };

  const handleColorChange = (e) => {
    // Convert the color value to lowercase and update the state
    setFormData({ ...formData, color: e.target.value.toLowerCase() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = { ...formData };
    console.log(updatedFormData);
    try {
    } catch (error) {
      setType("error");
      setMessage("Error Creating Card.");

      console.error("Error creating card:", error);
    }
    // Reset the form data after submitting
  };

  const handleClearForm = () => {
    setFormData({
      id: "",
      title: "",
      imageUrl: "",
      referenceImage: "",
      finalImage: "",
      eventName: "",
      watermark: "",
      imageType: "",
      price: "",
      letUsCustomizePrice: "",
      color: "",
      buttonText: "",
      cardType: "",
      popularity: "",
      description: "",
      cardCategory: "",
      textStyles: [],
    });

    setNewKey("");
    setNewValue("");
    setNewTextStyleKey("");
    setNewTextStyleValue("");
    setCustomKey("");
    setCustomTextStyleKey("");
  };

  const fieldOptions = [
    "text",
    "left",
    "top",
    "color",

    "fontSize",
    "backgroundColor",
    "textAlign",
    "fontFamily",
    "lineHeight",
    "startingImage",
    "width",
    "height",
    "custom",
    "field",
    "placeholder",
  ];

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

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <label
        className="block font-bold my-8 text-center text-2xl"
        htmlFor="single-card"
      >
        Single Card Add Form
      </label>

      <div className="px-12">
        <form onSubmit={handleSubmit}>
          <div className="divider divider-info"></div>

          <div className="border-2 p-4 border-lime-400 bg-lime-300">
            <div>
              <label className="block font-bold mb-2" htmlFor="title">
                Title:
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="input input-bordered input-success border rounded px-2 py-1 w-full"
              />
            </div>
          </div>
          <div className="divider divider-info"></div>

          <div className="border-2 p-4 border-lime-400 bg-lime-300">
            <div>
              <label className="block font-bold mb-2" htmlFor="description">
                Description:
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="input input-bordered input-success border rounded px-2 py-1 w-full
                h-full"
                rows={4}
              />
            </div>
          </div>

          <div className="divider divider-info"></div>

          {/* Demo Image (imageUrl */}
          <div className="border-2 p-4 border-lime-400 bg-lime-300">
            <label className="block font-bold mb-2" htmlFor="demoImage">
              Demo Image (imageUrl) - Uploader
            </label>
            <UploadDropzone
              endpoint="imageUploader"
              onClientUploadComplete={(res) =>
                handleUploadComplete("demoImage", res)
              }
              onUploadError={handleUploadError}
            />
            <div>
              <label className="block font-bold mb-2" htmlFor="demoImage">
                Demo Image (imageUrl) - Input
              </label>
              <input
                type="text"
                id="demoImage"
                name="demoImage"
                value={formData.demoImage}
                onChange={handleInputChange}
                className="input input-bordered input-success border rounded px-2 py-1 w-full"
              />
            </div>
          </div>

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

          <div className="divider divider-info"></div>

          <div className="border-2 p-4 border-lime-400 bg-lime-300">
            {/* ReferenceImage */}
            <label className="block font-bold mb-2" htmlFor="referenceImage">
              Reference Image - Uploader
            </label>
            <UploadDropzone
              endpoint="imageUploader"
              onClientUploadComplete={(res) =>
                handleUploadComplete("referenceImage", res)
              }
              onUploadError={handleUploadError}
            />
            <div>
              <label className="block font-bold mb-2" htmlFor="referenceImage">
                Reference Image - Input
              </label>
              <input
                type="text"
                id="referenceImage"
                name="referenceImage"
                value={formData.referenceImage}
                onChange={handleInputChange}
                className="input input-bordered input-success border rounded px-2 py-1 w-full"
              />
            </div>
          </div>

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

          <div className="divider divider-info"></div>

          <div className="border-2 p-4 border-lime-400 bg-lime-300">
            {/* Final Image */}
            <label className="block font-bold mb-2" htmlFor="finalImage">
              Final Image - Upload
            </label>
            <UploadDropzone
              endpoint="imageUploader"
              onClientUploadComplete={(res) =>
                handleUploadComplete("finalImage", res)
              }
              onUploadError={handleUploadError}
            />
            <div>
              <label className="block font-bold mb-2" htmlFor="finalImage">
                Final Image - Input
              </label>
              <input
                type="text"
                id="finalImage"
                name="finalImage"
                value={formData.finalImage}
                onChange={handleInputChange}
                className="input input-bordered input-success border rounded px-2 py-1 w-full"
              />
            </div>
          </div>

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

          <div className="divider divider-info"></div>

          {/* Watermark */}

          <div className="border-2 p-4 border-lime-400 bg-lime-300">
            <label className="block font-bold mb-2" htmlFor="watermark">
              Watermark - Upload
            </label>
            <UploadDropzone
              endpoint="imageUploader"
              onClientUploadComplete={(res) =>
                handleUploadComplete("watermark", res)
              }
              onUploadError={handleUploadError}
            />
            <div>
              <label className="block font-bold mb-2" htmlFor="watermark">
                Watermark - Input
              </label>
              <input
                type="text"
                id="watermark"
                name="watermark"
                value={formData.watermark}
                onChange={handleInputChange}
                className="input input-bordered input-success border rounded px-2 py-1 w-full"
              />
            </div>
          </div>

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

          <div className="divider divider-info"></div>

          {/* Image Type: */}
          <div className="border-2 p-4 border-lime-400 bg-lime-300">
            <label className="block font-bold mb-2" htmlFor="imageType">
              Image Type:
            </label>
            <select
              id="imageType"
              value={formData.imageType}
              onChange={(e) =>
                setFormData({ ...formData, imageType: e.target.value })
              }
              className="input input-bordered input-success border rounded px-2 py-1 w-full"
            >
              <option value="">Select Image Type</option>
              <option value="single image">Single Image</option>
              <option value="multiple image">Multiple Image</option>
              <option value="animated multiscreen">Animated Multiscreen</option>
            </select>
          </div>

          <div className="divider divider-info"></div>

          {/* Price */}

          <div className="border-2 p-4 border-lime-400 bg-lime-300">
            <label className="block font-bold mb-2" htmlFor="Price">
              Price
            </label>
            <input
              type="number"
              id="price"
              value={formData.price || 1}
              onChange={(e) =>
                setFormData({ ...formData, price: parseInt(e.target.value) })
              }
              className="input input-bordered input-success border rounded px-2 py-1 w-full"
            />
          </div>

          <div className="divider divider-info"></div>

          {/* Let Us Customize Price */}
          <div className="border-2 p-4 border-lime-400 bg-lime-300">
            <label className="block font-bold mb-2" htmlFor="Price">
              Let Us Customize Price
            </label>
            <input
              type="number"
              id="price-letUsCustomizePrice"
              value={formData.letUsCustomizePrice || 1}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  letUsCustomizePrice: parseInt(e.target.value),
                })
              }
              className="input input-bordered input-success border rounded px-2 py-1 w-full"
            />
          </div>

          <div className="divider divider-info"></div>

          {/* Add Event Name field */}
          <div className="border-2 p-4 border-lime-400 bg-lime-300">
            <label className="block font-bold mb-2" htmlFor="eventName">
              Event Name:
            </label>
            <select
              id="eventName"
              value={formData.eventName}
              onChange={(e) =>
                setFormData({ ...formData, eventName: e.target.value })
              }
              className="input input-bordered input-success border rounded px-2 py-1 w-full"
            >
              <option value="">Select Event</option>
              <option value="Wedding Ceremony">Wedding Ceremony</option>
              <option value="Reception">Reception</option>
              <option value="Holud/Mehedi">Holud/Mehedi</option>
              <option value="Nikahnama">Nikahnama</option>
              <option value="Birthday">Birthday</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="divider divider-info"></div>

          {/* Color: */}
          <div className="border-2 p-4 border-lime-400 bg-lime-300">
            <label className="block font-bold mb-2" htmlFor="color">
              Color:
            </label>
            <input
              type="text"
              id="color"
              value={formData.color}
              onChange={handleColorChange}
              className="input input-bordered input-success border rounded px-2 py-1 w-full"
            />
          </div>

          <div className="divider divider-info"></div>

          {/* Button Text: */}
          <div className="border-2 p-4 border-lime-400 bg-lime-300">
            <label className="block font-bold mb-2" htmlFor="buttonText">
              Button Text:
            </label>
            <select
              id="buttonText"
              value={formData.buttonText}
              onChange={(e) =>
                setFormData({ ...formData, buttonText: e.target.value })
              }
              className="input input-bordered input-success border rounded px-2 py-1 w-full"
            >
              <option value="">Select Button Text</option>
              <option value="View Design">View Design</option>
              <option value="Stock Out">Stock Out</option>
              <option value="In Development">In Development</option>
              <option value="Removed">Removed</option>
              <option value="Paused">Paused</option>
              <option value="Customize Your Video">
                Customize Your Video
              </option>{" "}
              {/* New Option */}
            </select>
          </div>

          <div className="divider divider-info"></div>

          {/* Card Type: */}
          <div className="border-2 p-4 border-lime-400 bg-lime-300">
            <label className="block font-bold mb-2" htmlFor="cardType">
              Card Type:
            </label>
            <select
              id="cardType"
              value={formData.cardType}
              onChange={(e) =>
                setFormData({ ...formData, cardType: e.target.value })
              }
              className="input input-bordered input-success border rounded px-2 py-1 w-full"
            >
              <option value="">Select Card Type</option>
              <option value="Single Page">Single Page</option>
              <option value="Multiple Page">Multiple Page</option>
              <option value="animated multiscreen">
                Animated Multiscreen
              </option>{" "}
              {/* New Option */}
            </select>
          </div>

          <div className="divider divider-info"></div>

          {/* Popularity */}
          <div className="border-2 p-4 border-lime-400 bg-lime-300">
            <label className="block font-bold mb-2" htmlFor="Popularity">
              Popularity
            </label>
            <input
              type="text"
              id="popularity"
              value={formData.popularity}
              onChange={(e) =>
                setFormData({ ...formData, popularity: e.target.value })
              }
              className="input input-bordered input-success border rounded px-2 py-1 w-full"
            />
          </div>

          <div className="divider divider-info"></div>

          {/* Card Category: */}
          <div className="border-2 p-4 border-lime-400 bg-lime-300">
            <label className="block font-bold mb-2" htmlFor="cardCategory">
              Card Category:
            </label>
            <select
              id="cardCategory"
              value={formData.cardCategory}
              onChange={(e) =>
                setFormData({ ...formData, cardCategory: e.target.value })
              }
              className="input input-bordered input-success border rounded px-2 py-1 w-full"
            >
              <option value="">Select Card Category</option>
              <option value="singlePageCard">Single Page Card</option>
              <option value="multiPageCard">Multi Page Card</option>
              {/* <option value="singleAnimatedCard">Single Animated Card</option> */}
              <option value="animatedMultiscreen">Animated Multiscreen</option>{" "}
              {/* New Option */}
            </select>
          </div>

          <div className="divider divider-info"></div>

          {/* TextStyles */}
          <div>
            <div className="divider"></div>
            <label className="block font-bold mb-2" htmlFor="cardCategory">
              TextStyles
            </label>
            <div>
              {formData.textStyles.map((textStyle, index) => (
                <div
                  key={index}
                  className="border-2 rounded-md border-slate-500 px-4 py-5 mb-10"
                >
                  <div className="flex flex-col justify-between">
                    {Object.keys(textStyle).length > 1 ? (
                      <>
                        {Object.entries(textStyle).map(
                          ([key, value]) =>
                            key !== "id" && (
                              <div
                                key={key}
                                className="flex flex-row justify-between mb-5 border-b-2  border-slate-500 pb-4"
                              >
                                <p className="mb-1">{`${key}: ${value}`}</p>
                                <div className="flex flex-col justify-center items-center">
                                  <button
                                    className="ml-2 bg-red-500 text-white px-4 py-1 rounded-sm"
                                    onClick={() =>
                                      handleRemoveTextStyleKey(index, key)
                                    }
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            )
                        )}
                      </>
                    ) : (
                      <button
                        className="text-red-500"
                        onClick={() => handleRemoveTextStyle(index)}
                      >
                        Delete TextStyle
                      </button>
                    )}
                    {index === addingMoreIndex ? (
                      <div>
                        <label
                          className="block font-bold mb-2"
                          htmlFor={`newKey${index}`}
                        >
                          New Key:
                        </label>
                        <select
                          id={`newKey${index}`}
                          value={newKey}
                          onChange={(e) => setNewKey(e.target.value)}
                          className="input input-bordered input-success border rounded px-2 py-1 w-full"
                        >
                          <option value="">Select Key</option>
                          {fieldOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                          <option value="custom">Custom</option>
                        </select>
                        {newKey === "custom" && (
                          <div>
                            <input
                              type="text"
                              value={customKey}
                              onChange={(e) => setCustomKey(e.target.value)}
                              placeholder="Enter custom key"
                              className="border rounded px-2 py-1 mt-2 w-full"
                            />
                          </div>
                        )}
                        <label
                          className="block font-bold mb-2"
                          htmlFor={`newValue${index}`}
                        >
                          New Value:
                        </label>
                        <input
                          type="text"
                          id={`newValue${index}`}
                          value={newValue}
                          onChange={(e) => setNewValue(e.target.value)}
                          className="input input-bordered input-success border rounded px-2 py-1 w-full"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddKeyAndValue(index)}
                          className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                        >
                          Add Key-Value
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-row justify-evenly mt-3">
                        <button
                          type="button"
                          onClick={() => handleAddMoreKeyAndValue(index)}
                          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                        >
                          Add More
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveTextStyle(index)}
                          className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                        >
                          Remove TextStyle
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <label className="block font-bold mb-2" htmlFor="newTextStyleKey">
                New Text Style Key:
              </label>
              <select
                id="newTextStyleKey"
                value={newTextStyleKey}
                onChange={(e) => {
                  const selectedKey = e.target.value;
                  setNewTextStyleKey(selectedKey);
                  if (selectedKey === "custom") {
                    setCustomTextStyleKey("");
                  }
                }}
                className="input input-bordered input-success border rounded px-2 py-1 w-full"
              >
                <option value="">Select Key</option>
                {fieldOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {newTextStyleKey === "custom" && (
                <input
                  type="text"
                  value={customTextStyleKey}
                  onChange={(e) => setCustomTextStyleKey(e.target.value)}
                  placeholder="Enter custom key"
                  className="border rounded px-2 py-1 mt-2 w-full"
                />
              )}
            </div>

            <div className="mt-2">
              <label
                className="block font-bold mb-2"
                htmlFor="newTextStyleValue"
              >
                New Text Style Value:
              </label>
              <input
                type="text"
                id="newTextStyleValue"
                value={newTextStyleValue}
                onChange={(e) => setNewTextStyleValue(e.target.value)}
                className="input input-bordered input-success border rounded px-2 py-1 w-full"
              />
            </div>
            <div className="mt-4">
              <button
                type="button"
                onClick={handleAddNewTextStyle}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add TextStyle
              </button>
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2"
            >
              Create Card
            </button>

            <button
              type="button"
              onClick={handleClearForm}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded mr-2"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCard;
