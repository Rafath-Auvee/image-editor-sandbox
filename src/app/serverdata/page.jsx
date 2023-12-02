import { promises as fs } from "fs";
import React from "react";
import localJson from "../../Data/sitemap.json";

const Checking = async () => {
  const fileContents = await fs.readFile(
    process.cwd() + "/src/Data/sitemap.json",
    "utf8"
  );
  const data = JSON.parse(fileContents);

  // Render the paginated data
  const renderData = () => {
    const pageData = data;
    return pageData.map((item, index) => (
      <div key={Object.keys(item)[0]}>
        {Object.keys(item)[0]}: {Object.values(item)[0]}
      </div>
    ));
  };

  return (
    <div>
      <div>{renderData()}</div>
    </div>
  );
};

export default Checking;
