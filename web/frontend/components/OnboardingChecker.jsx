import { useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../hooks/useAuthenticatedFetch";
import OnboardingModal from "./OnboardingModal";

const OnboardingChecker = () => {
  const fetch = useAuthenticatedFetch();
  const [isOnboarding, setIsOnboarding] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      console.log("Fetching onboarding status...");
      try {
        const response = await fetch('/api/stores/onboarding-status');
        console.log("Response status:", response.status);

        const data = await response.json();
        console.log("Onboarding status response:", data);

        if (!data.hasCompletedOnboarding) {
          setIsOnboarding(true);
        }
      } catch (error) {
        console.error('Error fetching onboarding status:', error);
      }
    };
    checkOnboarding();
  }, [fetch]);

  const handleClose = () => setIsOnboarding(false);

  return <OnboardingModal isOpen={true} onClose={() => console.log("Modal closed")} />;
}

export default OnboardingChecker;