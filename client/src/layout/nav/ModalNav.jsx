/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import Navigation from "./Navigation";

function ModalNav({ onClose }) {
  return (
    <div
      onClick={onClose}
      className='flex flex-col items-center justify-center gap-4 p-6 rounded-lg bg-sidebar'
    >
      {/* Navigation Links */}
      <Navigation />

      {/* Close Button */}
      <Button
        onClick={onClose}
        className='bg-primary text-white px-6 py-2 text-lg rounded-lg transition-all'
      >
        Close
      </Button>
    </div>
  );
}

export default ModalNav;
