"use client"; // This is a client component 👈🏽
import Card from "./components/Card";
import { useState } from "react";

const initialData = {
  column1: [
    {
      id: 1,
      data: {
        title: "card 1",
      },
    },
    {
      id: 2,
      data: {
        title: "card 2",
      },
    },

    {
      id: 3,
      data: {
        title: "card 3",
      },
    },
  ],
  column2: [
    {
      id: 4,
      data: {
        title: "card 4",
      },
    },

    {
      id: 5,
      data: {
        title: "card 5",
      },
    },
  ],
};

export default function Home() {
  const [data, setData] = useState(initialData);

  const [dragDropUpdateList, setDragDropUpdateList] = useState([]);

  const handleDragStart = (e, sourceColumn, sourceIndex, sourceData) => {
    e.dataTransfer.setData("sourceColumn", sourceColumn);
    e.dataTransfer.setData("sourceIndex", sourceIndex);
    e.dataTransfer.setData("sourceData", JSON.stringify(sourceData));
  };

  const handleDrop = (e, targetColumn, targetIndex, isNotEnterOnCard) => {
    e.preventDefault();
    const sourceIndex = Number(e.dataTransfer.getData("sourceIndex") || 0);
    const sourceColumn = e.dataTransfer.getData("sourceColumn");
    const copyState = JSON.parse(JSON.stringify(data));
    const sourceData = JSON.parse(e.dataTransfer.getData("sourceData"));
    const changeTargetColName =
      targetColumn === "column1" ? "List 1" : "List 2";
    const changeSourceColName =
      sourceColumn === "column1" ? "List 1" : "List 2";

    if (sourceColumn === targetColumn) {
      console.log({ sourceData });
      const elementToMove = copyState[sourceColumn]?.splice(sourceIndex, 1)[0];
      copyState[sourceColumn]?.splice(targetIndex, 0, elementToMove);
      setData(copyState);

      setDragDropUpdateList((pre) => [
        ...pre,
        {
          id: sourceData?.id,
          message: ` ${sourceData?.data?.title} is moved in the same ${changeTargetColName} `,
          time: Date.now(),
        },
      ]);
    } else {
      copyState[targetColumn]?.splice(targetIndex, 0, sourceData);
      copyState[sourceColumn]?.splice(sourceIndex, 1);
      setData(copyState);

      setDragDropUpdateList((pre) => [
        ...pre,
        {
          id: sourceData?.id,
          message: ` ${sourceData?.data?.title}  is moved from  ${changeSourceColName} to  ${changeTargetColName} `,
          time: Date.now(),
        },
      ]);
    }
  };

  return (
    <main>
      <div className="flex ">
        <div
          className=" border border-gray-200 p-2 w-52 "
          onDragOver={(e) => e.preventDefault()}
        >
          <h1 className="text-center text-2xl font-bold my-4"> List 1 </h1>

          {data.column1?.length > 0 ? (
            data.column1.map((card, index) => (
              <div
                onDrop={(e) =>
                  handleDrop(
                    e,
                    "column1",
                    index === data.column1.length - 1 ? index + 1 : index,
                    false
                  )
                }
                key={card.id}
                className={`bg-transparent  ${
                  index === data.column1.length - 1 ? " h-full " : null
                }`}
              >
                <div
                  className="border  bg-gray-200 border-gray-200 m-2"
                  draggable
                  onDragStart={(e) =>
                    handleDragStart(e, "column1", index, card)
                  }
                >
                  <Card card={card} />
                </div>
              </div>
            ))
          ) : (
            <div
              className="h-full"
              key={data.column1?.length}
              onDrop={(e) => handleDrop(e, "column1", 0, false)}
            ></div>
          )}
        </div>
        <div
          className=" border border-gray-200 p-2 w-52 "
          onDragOver={(e) => e.preventDefault()}
        >
          <h1 className="text-center text-2xl font-bold my-4"> List 2 </h1>

          {data.column2?.length > 0 ? (
            data.column2.map((card, index) => (
              <div
                onDrop={(e) =>
                  handleDrop(
                    e,
                    "column2",
                    index === data.column2.length - 1 ? index + 1 : index,
                    false
                  )
                }
                key={card.id}
                className={`bg-transparent  ${
                  index === data.column2.length - 1 ? " h-full " : null
                }`}
              >
                <div
                  draggable
                  className="border  bg-gray-200 border-gray-200 m-2"
                  onDragStart={(e) =>
                    handleDragStart(e, "column2", index, card)
                  }
                >
                  <Card card={card} />
                </div>
              </div>
            ))
          ) : (
            <div
              className="h-full"
              key={data.column2?.length}
              onDrop={(e) => handleDrop(e, "column2", 0, false)}
            ></div>
          )}
        </div>

        <div className="ml-10 flex-1">
          <ul className="max-w-md  text-lg space-y-1 mb-4 text-gray-500 list-inside dark:text-gray-400">
            {dragDropUpdateList?.map((data) => {
              return (
                <li
                  key={data.time}
                  className="flex w-full flex-1 gap-4 py-2 items-center"
                >
                  <svg
                    className="w-3.5 h-3.5 mr-2 text-green-500 dark:text-green-400 flex-shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                  <p>
                    {data.message}
                    <span className="text-gray-500">
                      at {new Date(data?.time).toLocaleDateString()}{" "}
                      {new Date(data?.time).toLocaleTimeString()}
                    </span>
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </main>
  );
}
