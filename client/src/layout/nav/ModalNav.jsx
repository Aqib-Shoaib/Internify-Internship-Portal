/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import Navigation from "./Navigation";

function ModalNav({ onClose }) {
  return (
    <div
      onClick={onClose}
      className='flex flex-col items-center justify-center gap-4 p-6 bg-gray-800 rounded-lg'
    >
      {/* Navigation Links */}
      <Navigation />

      {/* Close Button */}
      <Button
        onClick={onClose}
        className='bg-primary-600 text-white px-6 py-2 text-lg rounded-lg transition-all hover:bg-primary-700'
      >
        Close
      </Button>
    </div>
  );
}

export default ModalNav;
