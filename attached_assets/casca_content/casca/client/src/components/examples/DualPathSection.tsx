import DualPathSection from "../landing/DualPathSection";

export default function DualPathSectionExample() {
  return (
    <DualPathSection
      onConsumerClick={() => console.log("Consumer path clicked")}
      onIntegratorClick={() => console.log("Integrator path clicked")}
    />
  );
}
