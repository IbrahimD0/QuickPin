import { useEffect, useState } from "react";
import { PinDiv } from "./Clipboard";
import CreatePin from "./CreatePinPage";
import { v4 as uuidv4 } from 'uuid'; 

interface Pin {
  name: string;
  content: string;
  id: string;
}

function HomePage() {
  const [pins, setPins] = useState<Pin[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    chrome.storage.local.get(null, (items) => {
      const allPins = Object.values(items);
      if (allPins.length > 0) {
        setPins(allPins);
      }
    });
  }, []);

  const handleSaveNewPin = (name: string, content: string) => {
    const newPin = { id: uuidv4(), name, content }; 
    chrome.storage.local.set({ [newPin.id]: newPin }, () => {
      setPins((prevPins) => [...prevPins, newPin]);
    });
  };
  const handleDelete = (id: string) => {
    chrome.storage.local.remove([id], () => {
      setPins((prevPins) => prevPins.filter((pin) => pin.id !== id));
    });
  };

  const handleUpdate = (id: string, newName: string, newContent: string) => {
    const updatedPin = { id, name: newName, content: newContent };
    chrome.storage.local.set({ [id]: updatedPin }, () => {
      setPins((prevPins) =>
        prevPins.map((pin) => (pin.id === id ? updatedPin : pin))
      );
    });
  };
  const filteredPins = pins.filter(pin => pin.name.toLowerCase().includes(searchTerm.toLowerCase()));


  return (
    <div className="w-96 h-96 bg-background p-5 flex flex-col gap-4 justify-between border-primary-600 border-2 shadow-md shadow-primary-800 overflow-auto">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-primary-600 text-center">
          Welcome to QuickPin
        </h1>
        
        <div className="max-w-md mx-auto relative">
          <input
             type="text"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             placeholder="Search..."
          />
        
        </div>
      </div>
      <div className="flex justify-center">
        <CreatePin onSave={handleSaveNewPin} />
      </div>
      <div>
        {pins.length > 0 ? (
          <ul>
            {filteredPins.map((pin, index) => (
              <li key={index} className="py-2">
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
          <h1 className="text-center text-primary-500 text-xl">
            You haven't created any pins yet.
          </h1>
        )}
      </div>
      
    </div>
  );
}

export default HomePage;
