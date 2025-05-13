/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useEffect } from "react";

function Modal({ isOpen, onClose, children, shouldAutoCloseOnResize = false }) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  // automatic closing of modal window when viewport is resized
  useEffect(() => {
    if (isOpen && shouldAutoCloseOnResize) {
      const handleResize = (e) => {
        if (e.matches) {
          onClose(); // Close the modal if viewport is larger than 768px
        }
      };

      const mediaQuery = window.matchMedia("(min-width: 992px)");
      mediaQuery.addEventListener("change", handleResize);

      // Clean up the event listener on component unmount or modal close
      return () => mediaQuery.removeEventListener("change", handleResize);
    }
  }, [isOpen, onClose, shouldAutoCloseOnResize]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        {/* Trigger will be invisible */}
        <span />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>
          <button onClick={onClose}>
            <X />
          </button>
        </DialogTitle>
        <DialogDescription>{children}</DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
