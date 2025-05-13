import { useState } from "react";
import { FilterIcon } from "lucide-react"; // Lucide Icon
import Modal from "../../../custom/utils/Modal";
import Filter from "./Filter";

export default function FilterSidebar() {
  const [showFilter, setShowFilter] = useState(false);

  function closeModal() {
    setShowFilter(false);
  }

  return (
    <div className='p-6 border-r border-muted relative'>
      <button
        className='absolute left-2 top-1 text-dark text-lg cursor-pointer sm:hidden'
        onClick={() => setShowFilter(true)}
      >
        <FilterIcon /> {/* Using Lucide React Filter Icon */}
      </button>

      {/* Modal for mobile */}
      <Modal isOpen={showFilter} onClose={closeModal}>
        <Filter />
      </Modal>

      {/* For desktop: Filter component directly inside the sidebar */}
      <div className='hidden sm:block'>
        <Filter />
      </div>
    </div>
  );
}
