import React from 'react';
import packageJson from '../../package.json';
const ver = packageJson.version;

export default function SettingsPopup({ handleSettingsClose, handleSignOut }) {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      
      <div className="bg-white p-6 rounded shadow-lg w-[320px] left-0">
        <h2 className="text-2xl mb-4 text-center">Settings</h2>
        <div className="flex items-center mb-4">
          <span className="mr-2">Account:</span>
          <button 
            onClick={handleSignOut} 
            className="p-2 text-white bg-red-500 hover:bg-red-400 rounded-md w-[120px]"
          >
            Logout
          </button>
        </div>
        <div className="flex items-center mb-4">
          <span className="mr-2">Customisation:</span>
          <button 
            disabled
            className="p-2 text-white bg-emerald-700 hover:bg-emerald-600 rounded-md w-[120px] cursor-not-allowed"
          >
            Customise
          </button>
        </div>
        <div className="flex items-center mt-6">
          <span>About version -</span><span className="font-bold ml-1">{ver}:</span>
        </div>
        <div className="w-[150px] h-[1px] bg-black"></div>
        <div>
          <ul>
            <li>- Added settings popup.</li>
            <li>- Added customisaton (Available in v3.1).</li>
            <li>- Created some small changes.</li>
            <li>- Changed navbar icon designs.</li>
          </ul>
        </div>
        <div className="flex justify-between mt-4">
          <button type="button" onClick={handleSettingsClose} className="p-2 bg-red-300 rounded">Close</button>
      </div>
      </div>
    </div>
  );
}
