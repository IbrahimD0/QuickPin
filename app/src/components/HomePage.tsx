import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import debounce from "lodash/debounce";
import { PinDiv } from "./Clipboard";

interface Pin {
  name: string;
  content: string;
  id: string;
}

function HomePage() {
  const navigate = useNavigate();
  const [pins, setPins] = useState<Pin[]>([]);
  // const [searchTerm, setSearchTerm] = useState("");
  // const [filteredPins, setFilteredPins] = useState<Pin[]>([]);
  // const [showSuggestions, setShowSuggestions] = useState(false);
  
 
  useEffect(() => {

    chrome.storage.local.get(null, (items) => {
      const allPins = Object.values(items);
      if (allPins.length > 0) {
        setPins(allPins);
      }
    });
  }, []);

  const handleDelete = (id: string) => {

    chrome.storage.local.remove([id], () => {
      setPins((prevPins) => prevPins.filter((pin) => pin.id !== id));

    });
  };
  // useEffect(() => {
  //   setFilteredPins(
  //     pins.filter((pin) =>
  //       pin.name.toLowerCase().includes(searchTerm.toLowerCase())
  //     )
  //   );
  // }, [searchTerm, pins]);

  // const debouncedSearch = debounce((term) => {
  //   setSearchTerm(term);
  // }, 200);

  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   debouncedSearch(event.target.value);
  // };
  // const handleSearchFocus = () => {
  //   setShowSuggestions(true);
  // };
  // const handleSearchBlur = () => {
  //   setShowSuggestions(false);
  // };

  return (
    <div className="w-96 h-96 bg-background p-5 flex flex-col gap-4 justify-between border-primary-600 border-2 shadow-md shadow-primary-800 overflow-auto">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-primary-600 text-center">
          Welcome to QuickPin
        </h1>

        {/* <div className="max-w-md mx-auto relative">
          <input
            type="search"
            className="block w-full p-4 ps-10 pe-16 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-my-primary focus:border-my-primary"
            placeholder="Search for a pin..."
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            required
          />
          {showSuggestions ? (
            <ul className="absolute w-full bg-white border border-gray-300 rounded-md mt-1 z-20">
              {filteredPins.map((pin, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {pin.name}
                </li>
              ))}
            </ul>
          )
            : null}
        </div> */}
      </div>

      <div>
        {pins.length > 0 ? (
          <ul>
            {pins.map((pin, index) => (
              <li key={index} className="py-2">
                <PinDiv
                  id={pin.id}
                  name={pin.name}
                  valueToCopy={pin.content}
                  onDelete={() => handleDelete(pin.id)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-primary-500">
            You haven't created any pins yet.
          </p>
        )}
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => navigate("/create")}
          className="text-lg bg-accent-500 hover:bg-accent-300 text-white font-bold py-2 px-4 m-4
         rounded-lg shadow-secondary shadow-md hover:shadow-secondary-700 hover:shadow-lg"
        >
          Create Pin
        </button>
      </div>
    </div>
  );
}

export default HomePage;
