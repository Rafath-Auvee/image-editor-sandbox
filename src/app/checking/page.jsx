"use client";

import React, { useState, useEffect } from "react";
import localJson from "../../Data/sitemap.json";

const Checking = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50; // Adjust as needed

  useEffect(() => {
    setData(localJson); // Set the local JSON data to state
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {currentItems.map((item, index) => (
        <div key={index}>
          {Object.keys(item).map((key) => (
            <p key={key}>
              ID: {key}, URL: {item[key]}
            </p>
          ))}
        </div>
      ))}
      {/* Pagination component here */}
      <PaginationOne
        currentPage={currentPage}
        totalItems={data.length}
        itemsPerPage={itemsPerPage}
        paginate={paginate}
      />
    </div>
  );
};

export default Checking;

function PaginationOne({ currentPage, totalItems, itemsPerPage, paginate }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];

  // Determine range for page numbers
  let startPage, endPage;
  if (totalPages <= 10) {
    // less than 10 total pages so show all
    startPage = 1;
    endPage = totalPages;
  } else {
    // more than 10 total pages so calculate start and end pages
    if (currentPage <= 6) {
      startPage = 1;
      endPage = 10;
    } else if (currentPage + 4 >= totalPages) {
      startPage = totalPages - 9;
      endPage = totalPages;
    } else {
      startPage = currentPage - 5;
      endPage = currentPage + 4;
    }
  }

  // Create page number array
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePrevious = () => {
    if (currentPage > 1) paginate(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) paginate(currentPage + 1);
  };

  return (
    <div className="w-full border-t border-gray-300">
      <div className="mt-2 flex items-center justify-between">
        <div>
          <a
            onClick={handlePrevious}
            href="#!"
            className={`mx-1 cursor-pointer text-sm font-semibold text-gray-900 ${
              currentPage === 1 ? "cursor-not-allowed" : ""
            }`}
          >
            &larr; Previous
          </a>
        </div>
        <div className="flex items-center">
          {pageNumbers.map((number, index) =>
            number === currentPage ? (
              <span key={index} className="mx-1 px-3 py-1 text-gray-900">
                {number}
              </span>
            ) : (
              <a
                key={index}
                onClick={() => paginate(number)}
                href="#!"
                className="mx-1 flex items-center px-3 py-1 text-gray-900 hover:scale-105"
              >
                {number}
              </a>
            )
          )}
          {endPage < totalPages && <p className="mx-1">...</p>}
        </div>
        <div>
          <a
            onClick={handleNext}
            href="#!"
            className={`mx-1 cursor-pointer text-sm font-semiboldgit text-gray-900 ${
              currentPage === totalPages ? "cursor-not-allowed" : ""
            }`}
          >
            Next &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
