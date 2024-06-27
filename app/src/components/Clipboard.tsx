import { Clipboard } from "flowbite-react";
import { MdModeEdit, MdDelete } from "react-icons/md";


interface PinDivProps {
  id: string;
  name: string;
  valueToCopy: string;
  onDelete: (id: string) => void;
  
}

export const PinDiv: React.FC<PinDivProps> = ({id, name, valueToCopy, onDelete}) => {

  return (
    <div>
      <div className="grid grid-cols-12 gap-2 w-full max-w-full">
        <div className="col-span-1 w-full flex justify-center items-center" onClick={() => onDelete(id)}>
          <MdDelete className="hover:cursor-pointer" />
        </div>
        <div className="col-span-1 w-full flex justify-center items-center" >
          <MdModeEdit className="hover:cursor-pointer" />
        </div>

        <div className="col-span-3 w-full">
          <input
            id={"pinname-" + id}
            type="text"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-4 text-sm text-primary focus:border-blue-500 focus:ring-blue-500"
            value={name}
            disabled
            readOnly
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
              value={valueToCopy}
              disabled
              readOnly
            />
            <Clipboard.WithIconText valueToCopy={valueToCopy} />
          </div>
        </div>
      </div>
    </div>
  );
};
