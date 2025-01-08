import React, { useState } from "react";
import { Modal } from "@shopify/app-bridge-react";

const OnboardingModal = () => {
  const [isOpen, setIsOpen] = useState(true); // Modal opens by default for testing

  const handleComplete = () => {
    // Handle "Complete Onboarding" action
    console.log("Onboarding completed");
    setIsOpen(false);
  };

  const handleClose = () => {
    console.log("Modal closed");
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <Modal
          open={isOpen}
          onClose={handleClose}
          title="Welcome to the App!"
          primaryAction={{
            content: "Complete Onboarding",
            onAction: handleComplete,
          }}
          secondaryActions={[
            {
              content: "Cancel",
              onAction: handleClose,
            },
          ]}
        >
          <p>
            Enhance your store's experience with AI-driven product recommendations.
            Let's get started!
          </p>
        </Modal>
      )}
    </>
  );
};

export default OnboardingModal;