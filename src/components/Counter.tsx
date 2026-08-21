import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState<number>(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div className="p-4 border rounded-lg max-w-sm bg-white shadow-sm mt-4">
      <h3 className="text-lg font-bold">Counter: {count}</h3>
      <div className="flex gap-2 mt-2">
        <button
          onClick={handleIncrement}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Tambah
        </button>
        <button
          onClick={handleDecrement}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Kurang
        </button>
      </div>
    </div>
  );
}