import Hero from "../landing/Hero";

export default function HeroExample() {
  return (
    <Hero
      onConsumerClick={() => console.log("Consumer CTA clicked")}
      onIntegratorClick={() => console.log("Integrator CTA clicked")}
    />
  );
}
