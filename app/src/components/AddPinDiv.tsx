import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";


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
    } 
  };

  return (
    <div className="p-2 grid grid-cols-12 gap-2 items-center bg-accent-700 rounded-t-lg border-b-2 border-primary">
      
      <div className="col-span-3">
        <input
         title="Enter pin name"
          type="text"
          placeholder="Pin"
          className="rounded-lg block w-full border-0 border-b-2 bg-accent-900  px-2.5 py-2 text-sm text-primary  focus:border-0  focus:border-2 focus:border-base-500  focus:ring-1 focus:ring-accent focus:bg-white focus:text-gray-900 "
          value={pinName}
          onChange={(e) => setPinName(e.target.value)}
        />
      </div>
      <div className="col-span-7">
        <input
          title="Enter pin content"
          type="text"
          placeholder="Enter pin content"
          className="rounded-lg block w-full border-0 border-b-2 bg-accent-900  px-2.5 py-2 text-sm text-primary focus:border-0 focus:border-2 focus:border-base-500 focus:ring-1 focus:ring-accent focus:bg-white focus:text-gray-900 "
          value={pinContent}
          onChange={(e) => setPinContent(e.target.value)}
        />
      </div>
      <div
        className="col-span-2 flex justify-center items-center"
        onClick={handleSave}
        title="Save Pin"
      >
        <FaPlus  className="text-lg hover:cursor-pointer" />
      </div>
    </div>
  );
};

export default CreatePin;
