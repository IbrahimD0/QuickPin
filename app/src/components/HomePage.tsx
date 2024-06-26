import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Pin {
  name: string;
  content: string;
}

function HomePage() {
  const navigate = useNavigate();
  const [pins, setPins] = useState<Pin[]>([]);

  useEffect(() => {
    // Fetch all pins stored in chrome.storage.local
    chrome.storage.local.get(null, (items) => {
      const allPins: Pin[] = Object.values(items);
      if (allPins.length > 0) {
        setPins(allPins);
       
      }
    });
  }, []);

  return (
    <div className="w-80 h-96 bg-background rounded-lg p-5 flex flex-col justify-between border-primary-600 border-2 shadow-md shadow-primary-800">
      <h1 className="text-2xl font-bold text-primary-600 text-center">
        Welcome to QuickPin
      </h1>
      <div>
        {pins.length > 0 ? (
          <ul>
            {pins.map((pin, index) => (
              <li key={index}>
                <strong>{pin.name}</strong>: {pin.content}
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
          className="text-md bg-accent-500 hover:bg-accent-300 text-white font-bold py-2 px-4 m-4
         rounded-lg shadow-secondary shadow-md hover:shadow-secondary-700 hover:shadow-lg"
        >
          Create Pin
        </button>
      </div>
    </div>
  );
}

export default HomePage;
