import React from "react";

const Card = ({ card }) => {
  return (
    <div
        draggable
      className="block  cursor-move  max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {card.data.title}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Lorem ips arum ipsum, illo explicabo.
      </p>
    </div>
  );
};

export default Card;
