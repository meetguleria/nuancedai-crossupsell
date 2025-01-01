import { useState } from "react";
import { Text, Button, Modal } from "@shopify/polaris";

const OnboardingModal = () => {
  const [isOpen, setIsOpen] = useState(true); // Modal will always open for testing
  const [loading, setLoading] = useState(false);

  const handleComplete = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsOpen(false); // Close modal on completion
    }, 1000); // Mock async delay
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      title="Welcome to the app!"
      primaryAction={{
        content: "Complete onboarding",
        onAction: handleComplete,
        loading: loading,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: () => setIsOpen(false),
        },
      ]}
    >
      <Modal.Section>
        <Text as="h2" variant="headingMd">
          Welcome to NuancedAI - Upsell & Cross Sell
        </Text>
        <Text>
          Let's setup your upselling and cross selling configurations to boost your sales.
        </Text>
      </Modal.Section>
    </Modal>
  );
};

export default OnboardingModal;