import { useState } from "react";

export default function BasicInput() {
const [text, setText] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div className="p-4 mt-4 border rounded bg-gray-50 max-w-sm">
      <label className="block text-sm font-medium mb-1">Ketik Sesuatu:</label>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        className="border p-2 rounded w-full"
        placeholder="Ketik sesuatu..."
      />
      <p className="mt-2 text-gray-600">Hasil: {text}</p>
    </div>
  );
}