import React, { useState } from "react";
// import { MdEdit  } from "react-icons/md";
import {FaTrash , FaCheck, FaTimes } from "react-icons/fa";
import { FaPen } from "react-icons/fa6";
import { Clipboard } from "flowbite-react";

interface PinDivProps {
  id: string;
  name: string;
  valueToCopy: string;
  onDelete: (id: string) => void;
  onUpdate: (id: string, name: string, content: string) => void;
}

export const PinDiv: React.FC<PinDivProps> = ({
  id,
  name,
  valueToCopy,
  onDelete,
  onUpdate,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedContent, setEditedContent] = useState(valueToCopy);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    onUpdate(id, editedName, editedContent);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditedName(name);
    setEditedContent(valueToCopy);
    setEditMode(false);
  };

  return (
    <div className="p-2 grid grid-cols-12 gap-x-2  w-full max-w-full bg-accent-700 border border-accent-300 rounded-lg shadow-md shadow-accent-200 hover:shadow-accent-400 hover:shadow-xl">
      <div className="col-span-3 w-full">
        <input
          type="text"
          className={`${
            editMode
              ? "rounded-lg block w-full border-0 border-b-2 bg-accent-900 px-2.5 py-2 text-sm text-primary focus:border-0 focus:border-2 focus:border-base-500 focus:ring-1 focus:ring-accent focus:bg-white focus:text-gray-900"
              : "block w-full rounded-lg border border-accent-300 bg-background-500 p-2 text-sm text-primary font-medium focus:border-blue-500 focus:ring-blue-500"
          }`}
          value={editMode ? editedName : name}
          onChange={(e) => setEditedName(e.target.value)}
          disabled={!editMode}
        />
      </div>
      <div className="col-span-7 w-full">
        <div className="relative">
          <label htmlFor={"pinname-" + id} className="sr-only">
            Copy
          </label>
          <input
            id={"pincontent-" + id}
            type="text"
            className={`${
              editMode
                ? "rounded-lg block w-full border-0 border-b-2 bg-accent-900 px-2.5 py-2 text-sm text-primary  focus:border-0 focus:border-2 focus:border-base-500 focus:ring-1 focus:ring-accent focus:bg-white focus:text-gray-900"
                : "block w-full rounded-lg border border-accent-300 bg-background-500 p-2 text-sm text-primary font-medium focus:border-blue-500 focus:ring-blue-500"
            }`}
            value={editMode ? editedContent : valueToCopy}
            onChange={(e) => setEditedContent(e.target.value)}
            disabled={!editMode}
          />
          {!editMode && (
            <Clipboard.WithIconText
              valueToCopy={valueToCopy}
              className="bg-background-600 border-2 border-accent-600 ps-2 opacity-0 hover:opacity-100"
            />
          )}
        </div>
      </div>
      {editMode ? (
        <>
          <div
            className="col-span-1 w-full flex justify-center items-center"
            onClick={handleSave}
            title="Save changes"
          >
            <FaCheck  className="hover:cursor-pointer" />
          </div>
          <div
            className="col-span-1 w-full flex justify-center items-center"
            onClick={handleCancel}
            title="Cancel changes"
          >
            <FaTimes className="hover:cursor-pointer" />
          </div>
        </>
      ) : (
        <>
          <div
            className="col-span-1 w-full flex justify-center items-center"
            onClick={handleEdit}
            title="Edit Pin"
          >
            <FaPen   className="hover:cursor-pointer" />
          </div>
          <div
            className="col-span-1 w-full flex justify-center items-center"
            onClick={() => onDelete(id)}
            title="Delete Pin"
          >
            <FaTrash className="hover:cursor-pointer" />
          </div>
        </>
      )}
    </div>
  );
};
