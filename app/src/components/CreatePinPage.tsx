import React, { useState } from "react";
import { MdOutlineAdd } from "react-icons/md";

interface CreatePinProps {
  onSave: (name: string, content: string) => void;
}

const CreatePin: React.FC<CreatePinProps> = ({ onSave }) => {
  const [pinName, setPinName] = useState("");
  const [pinContent, setPinContent] = useState("");

  const handleSave = () => {
    if (pinName && pinContent) {
      onSave(pinName, pinContent);
      setPinName("");
      setPinContent("");
    } else {
      alert("Both name and content must be filled out!");
    }
  };

  return (
    <div className="grid grid-cols-12 gap-2 items-center">
      <div className="col-span-2">
        <input
          type="text"
          placeholder="Enter pin name"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-2 text-sm text-primary focus:border-blue-500 focus:ring-blue-500"
          value={pinName}
          onChange={(e) => setPinName(e.target.value)}
        />
      </div>
      <div className="col-span-8">
        <input
          type="text"
          placeholder="Enter pin content"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-2 text-sm text-primary focus:border-blue-500 focus:ring-blue-500"
          value={pinContent}
          onChange={(e) => setPinContent(e.target.value)}
        />
      </div>
      <div
        className="col-span-2 flex justify-center items-center"
        onClick={handleSave}
        title="Save Pin"
      >
        <MdOutlineAdd  className="text-lg hover:cursor-pointer" />
      </div>
    </div>
  );
};

export default CreatePin;
