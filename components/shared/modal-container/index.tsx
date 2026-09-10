import React, { useEffect, useRef } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import cn from "@/utils/cn";
import { ModalPortal } from "./modal-portal";

interface Props {
  children?: React.ReactNode;
  modalId: string;

  isOpen: boolean;
  onClose: () => void;

  shouldCloseOnOverlayClick?: boolean;
  shouldCloseOnEsc?: boolean;

  modalClassName?: string;
  modalContentClassName?: string;
}

const ModalContainer: React.FC<Props> = ({
  modalId,
  isOpen,
  onClose,
  children,
  shouldCloseOnOverlayClick = true,
  shouldCloseOnEsc = true,
  modalClassName,
  modalContentClassName,
}) => {
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Escape" && shouldCloseOnEsc) {
      onClose();
    }
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  useOnClickOutside(modalContentRef as React.RefObject<HTMLElement>, () => {
    if (!shouldCloseOnOverlayClick) return;
    onClose();
  });

  if (!isOpen) return null;

  return (
    <ModalPortal wrapperId={modalId}>
      <div
        className={cn(
          "font-inter fixed inset-0 z-[2000] flex items-center justify-center overflow-y-auto overflow-x-hidden bg-[#A3A3A3]/[0.25] outline-none backdrop-blur-[2px] backdrop-filter",
          modalClassName,
        )}
      >
        <div
          ref={modalContentRef}
          className={cn(
            "relative mx-2 max-w-xl flex-grow rounded-[10px] border border-gray-200/50 bg-white p-4 lg:p-6",
            modalContentClassName,
          )}
        >
          {children}
        </div>
      </div>
    </ModalPortal>
  );
};

export default ModalContainer;
