import CTASection from "../landing/CTASection";

export default function CTASectionExample() {
  return (
    <CTASection
      onConsumerClick={() => console.log("Consumer CTA clicked")}
      onIntegratorClick={() => console.log("Integrator CTA clicked")}
    />
  );
}
