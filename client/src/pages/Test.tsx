import { useMemo, useState } from "react";

const Test = () => {
  const [test, setTest] = useState([
    {
      rev: false,
      value: 1,
    },
    {
      rev: false,
      value: 1,
    },
    {
      rev: false,
      value: 2,
    },
    {
      rev: false,
      value: 2,
    },
  ]);

  let curr: number[] = useMemo(() => [], []);
  console.log(curr);
  const reset = () => {
    setTest((prev) => {
      return prev.map((item) => {
        return {
          ...item,
          rev: false,
        };
      });
    });
  };

  return (
    <div className="grid grid-cols-2 gap-10 p-10">
      {test.map((item, index) => (
        <button
          onClick={() => {
            if (curr.length === 0) curr.push(item.value);
            else {
              if (
                curr[curr.length - 1] === item.value ||
                (curr.length > 1 &&
                  curr[curr.length - 2] === curr[curr.length - 1])
              ) {
                curr.push(item.value);
              } else {
                while (curr.length > 0) {
                  curr.pop();
                }

                reset();
              }
            }

            if (curr.length != 0) {
              setTest((prev) => {
                return prev.map((item, i) => {
                  if (i === index) {
                    return {
                      ...item,
                      rev: !item.rev,
                    };
                  }
                  return item;
                });
              });
            }

            if (curr.length === test.length) {
              setTimeout(() => {
                reset();
                curr = [];
              }, 2000);
            }
          }}
          disabled={item.rev}
          key={index}
          className="flex items-center justify-center h-32 w-32 bg-gray-200 rounded-lg"
        >
          {item.rev ? item.value : ""}
        </button>
      ))}
    </div>
  );
};

export default Test;
