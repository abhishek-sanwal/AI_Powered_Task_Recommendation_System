import { useEffect, useState } from "react";

function Filter() {
  const [sortBy, setSortBy] = useState("relevant");

  const [sortBy, setSortBy] = useState("relevant");
  const indicator = {
    Low: 3,
    High: 1,
    Medium: 2,
  };

  useEffect(
    function () {
      switch (sortBy) {
        case "priority":
          const newTasks = task
            .slice()
            .sort(
              (first, second) =>
                indicator[first.status] - indicator[second.status]
            );
          setTasks(newTasks);
          return;

        case "deadline":
          return;

        case "status":
          return;

        default:
          return;
      }
    },
    [sortBy]
  );

  useEffect(
    function () {
      switch (sortBy) {
        case "low-high":
          setFilterProducts(
            filterProducts
              .slice()
              .sort((first, second) => first.price - second.price)
          );
          break;
        case "high-low":
          setFilterProducts(
            filterProducts
              .slice()
              .sort((first, second) => second.price - first.price)
          );
          break;

        case "relevant":
          applyFilter();
          break;
      }
    },
    [sortBy]
  );
  return (
    <div>
      {/* Product Sort */}
      <select
        className="border-2 border-gray-300 text-sm px-2"
        value={sortBy}
        onChange={(event) => setSortBy(event.target.value)}
      >
        <option value="relevant">Sort by:Relevant</option>
        <option value={"low-high"}>Sort by:Low to High</option>
        <option value={"high-low"}>Sort by: High to Low</option>
      </select>
    </div>
  );
}

export default Filter;
