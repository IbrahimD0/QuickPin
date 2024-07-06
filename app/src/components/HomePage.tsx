import { useEffect, useState } from "react";
import { PinDiv } from "./PinDiv";
import CreatePin from "./AddPinDiv";
import { v4 as uuidv4 } from "uuid";

interface Pin {
  name: string;
  content: string;
  id: string;
}

function HomePage() {
  const [pins, setPins] = useState<Pin[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  //Effect hook to load pins from chrome local storage. Using chrome local storage since it syncs across devices.
  useEffect(() => {
    chrome.storage.local.get(null, (items) => {
      const allPins = Object.values(items);
      if (allPins.length > 0) {
        setPins(allPins);
      }
    });
  }, []);

  //Function to save new pin to chrome local storage
  const handleSaveNewPin = (name: string, content: string) => {
    const newPin = { id: uuidv4(), name, content }; //Create new pin object
    chrome.storage.local.set({ [newPin.id]: newPin }, () => { //Save pin to chrome local storage
      setPins((prevPins) => [...prevPins, newPin]); //Add new pin to the state
    });
  };
  //Function to delete pin from chrome local storage
  const handleDelete = (id: string) => {
    chrome.storage.local.remove([id], () => { //Remove pin from chrome local storage
      setPins((prevPins) => prevPins.filter((pin) => pin.id !== id)); //Remove pin from the state
    });
  };
  //Function to update pin in chrome local storage
  const handleUpdate = (id: string, newName: string, newContent: string) => {
    const updatedPin = { id, name: newName, content: newContent };//Create updated pin object
    chrome.storage.local.set({ [id]: updatedPin }, () => { //Update pin in chrome local storage
      setPins((prevPins) =>
        prevPins.map((pin) => (pin.id === id ? updatedPin : pin)) //Update pin in the state
      );
    });
  };
  //Filter pins based on search term for search functionality
  const filteredPins = pins.filter((pin) =>
    pin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  //Renders the home page with search bar, create pin form and list of pins
  return (
    <div className="w-80 h-96 p-5 bg-background border-primary-600 border-2 shadow-md shadow-primary-800 overflow-auto">
      <h1 className="mb-4 text-2xl font-bold text-primary-500 text-center">
        Welcome to QuickPin
      </h1>
      <div className="flex flex-col gap-4 justify-evenly ">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-center">
            <div className="relative text-gray-600 focus-within:text-gray-400">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input
                type="search"
                name="q"
                className="py-2 text-sm text-white bg-background-600 border-2  rounded-lg shadow-md shadow-accent-500 hover:shadow-accent-400 hover:shadow-lg pl-10 focus:outline-none focus:bg-white focus:text-gray-900 focus:ring-accent "
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-lg  bg-accent-800 border-2 border-primary shadow-md">
            <div className="flex justify-center mb-2">
              <CreatePin onSave={handleSaveNewPin} />
            </div>
            <div className="p-2 min-h-44">
              {pins.length > 0 ? (
                <ul>
                  {filteredPins.map((pin, index) => (
                    <li key={index} className="p-1 mb-2">
                      <PinDiv
                        id={pin.id}
                        name={pin.name}
                        valueToCopy={pin.content}
                        onDelete={() => handleDelete(pin.id)}
                        onUpdate={handleUpdate}
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <h1 className="m-4 text-center font-semibold text-primary-500 text-xl">
                  You haven't created any pins yet.
                </h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
