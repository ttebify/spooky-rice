import React from "react";
import { TransitionGroup } from "react-transition-group";
import Toast from "./Toast";
import { ToastContainerProps } from "./types";

const ZINDEX = 1000;
const BOTTOM_POSITION = 10; // Initial position from the top

const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onRemove,
  delay = 60000,
  stackSpacing = 80,
}) => {
  return (
    <div>
      <TransitionGroup>
        {toasts.map((toast, index) => {
          const zIndex = (ZINDEX - index).toString();
          const bottom = BOTTOM_POSITION + index * stackSpacing;

          return (
            <Toast
              key={toast.id}
              toast={toast}
              onRemove={onRemove}
              delay={delay}
              style={{ bottom: `${bottom}px`, zIndex }}
            />
          );
        })}
      </TransitionGroup>
    </div>
  );
};

export default ToastContainer;
