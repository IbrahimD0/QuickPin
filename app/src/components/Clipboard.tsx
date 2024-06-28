import React, { useState } from "react";
import {MdModeEdit, MdDelete, MdSave, MdCancel } from "react-icons/md";

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
    <div className="grid grid-cols-12 gap-2 w-full max-w-full">
      <div className="col-span-3 w-full">
        <input
          type="text"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-4 text-sm text-primary focus:border-blue-500 focus:ring-blue-500"
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
            className="grid-cols-2 block w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-4 text-sm text-primary focus:border-blue-500 focus:ring-blue-500"
            value={editMode ? editedContent : valueToCopy}
            onChange={(e) => setEditedContent(e.target.value)}
            disabled={!editMode}
          />
          <Clipboard.WithIconText valueToCopy={valueToCopy} />
        </div>
      </div>
      {editMode ? (
        <>
          <div
            className="col-span-1 w-full flex justify-center items-center"
            onClick={handleSave}
            title="Save changes"
          >
            <MdSave className="hover:cursor-pointer" />
          </div>
          <div
            className="col-span-1 w-full flex justify-center items-center"
            onClick={handleCancel}
            title="Cancel changes"
          >
            <MdCancel className="hover:cursor-pointer" />
          </div>
        </>
      ) : (
        <>
          <div
            className="col-span-1 w-full flex justify-center items-center"
            onClick={handleEdit}
            title="Edit Pin"
          >
            <MdModeEdit className="hover:cursor-pointer" />
          </div>
          <div
            className="col-span-1 w-full flex justify-center items-center"
            onClick={() => onDelete(id)}
            title="Delete Pin"
          >
            <MdDelete className="hover:cursor-pointer" />
          </div>
        </>
      )}
    </div>
  );
};
