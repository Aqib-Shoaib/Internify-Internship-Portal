/* eslint-disable react/prop-types */
import { Menu as MenuIcon } from "lucide-react";
import Modal from "../../components/custom/utils/Modal";
import ModalNav from "./ModalNav";
import Navigation from "./Navigation";

function Nav({ showNavModal, setShowNavModal }) {
  function closeModal() {
    setShowNavModal(false);
  }

  return (
    <>
      {/* Mobile Menu Icon */}
      {!showNavModal && (
        <span
          onClick={() => setShowNavModal(true)}
          className='text-white text-xl cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 md:hidden'
        >
          <MenuIcon />
        </span>
      )}

      {/* Modal for smaller screens */}
      <Modal
        isOpen={showNavModal}
        onClose={closeModal}
        shouldAutoCloseOnResize={true}
      >
        <ModalNav onClose={closeModal} />
      </Modal>

      {/* Navigation for larger screens */}
      <nav className='hidden md:flex absolute right-4 top-1/2 transform -translate-y-1/2 items-center justify-center text-base font-normal space-x-4'>
        <Navigation />
      </nav>
    </>
  );
}

export default Nav;
