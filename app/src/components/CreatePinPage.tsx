import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
interface Pin {
  name: string;
  content: string;
  id: string;
}

const CreatePinPage: React.FC = () => {
    const navigate = useNavigate();
    const [pinName, setPinName] = useState<string>('');
    const [pinContent, setPinContent] = useState<string>('');

    const handleCreatePin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newPin: Pin = {
            id: uuidv4(),
            name: pinName,
            content: pinContent,
        };

        chrome.storage.local.set({ [newPin.id]: newPin }, () => {
           

            setPinName('');
            setPinContent('');
            navigate('/'); 
        });
    };

    return (
      <div className="w-80 h-96 bg-background rounded-lg p-5 flex flex-col justify-between border-primary-600 border-2 shadow-md shadow-primary-800">
        <h1 className="text-2xl font-bold text-primary-600 text-center">
          Create a new Pin
        </h1>
        <form className="flex flex-col space-y-2" onSubmit={handleCreatePin}>
          <label htmlFor="name" className="text-sm font-semibold text-primary-500">
            Pin Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Add your pin name here"
            className="border border-primary-300 rounded-lg p-2"
            value={pinName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPinName(e.target.value)}
          />

          <label htmlFor="content" className="text-sm font-semibold text-primary-500">
            Pin Content
          </label>
          <input
            id="content"
            type="text"
            placeholder="Add your pin content here"
            className="border border-primary-300 rounded-lg p-2"
            value={pinContent}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPinContent(e.target.value)}
          />

          <div className="flex justify-center">
            <button
              type="submit"
              className="text-md bg-accent-500 hover:bg-accent-300 text-white font-bold py-2 px-4 m-4 rounded-lg shadow-secondary shadow-md hover:shadow-secondary-700 hover:shadow-lg"
            >
              Create Pin
            </button>
          </div>
        </form>
      </div>
    );
};

export default CreatePinPage;
