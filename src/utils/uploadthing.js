const {
  generateUploadButton,
  generateUploadDropzone,
} = require("@uploadthing/react");

// Import OurFileRouter if needed, but since it's a type declaration, it's not required in JavaScript
// const { OurFileRouter } = require("../app/api/uploadthing/core");

// Assuming OurFileRouter is defined elsewhere and accessible in JavaScript

// Export the generated UploadButton and UploadDropzone components
const UploadButton = generateUploadButton();
const UploadDropzone = generateUploadDropzone();

module.exports = { UploadButton, UploadDropzone };
