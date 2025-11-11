import Image from "next/image";
import { WaitlistForm } from "@/components/WaitlistForm";

const features = [
  {
    icon: "📍",
    title: "Location-aware nudges",
    description:
      "TapRight surfaces the most relevant card when you're near stores, cafés, or stations, helping you get more value from every purchase.",
  },
  {
    icon: "⚡️",
    title: "Instant reward math",
    description:
      "See quick estimates of cashback or points for your cards before you pay, helping you spend with clarity.",
  },
  {
    icon: "🧠",
    title: "Adaptive strategy",
    description:
      "TapRight gradually learns your regular spots and adjusts suggestions to stay useful over time.",
  },
];

export default function Home() {
  return (
    <>
      <div className="page-gradient" />
      <div className="noise-layer" />
      <div className="page-orb orb-one" />
      <div className="page-orb orb-two" />
      <header className="site-header">
        <div className="site-header__inner">
          <div className="brand">
            <Image
              src="/tapright-glyph.png"
              alt="TapRight logo"
              width={90}
              height={90}
              className="brand-logo"
              priority
            />
            <span>TapRight</span>
          </div>
          <nav>
            <a href="#features">Features</a>
          </nav>
          <a className="cta-link" href="#waitlist">
            Join Waitlist
          </a>
        </div>
      </header>

      <main>
        <section className="hero" id="hero">
          <div className="hero-copy">
            <span className="pill">Smart credit card guidance</span>
            <h1>Spend smarter. Owe less.</h1>
          </div>
          <WaitlistForm />
        </section>

        <section className="features-section" id="features">
          <span className="section-tag">Why TapRight</span>
          <h2>Features that keep you ahead of every tap</h2>
          <p className="features-body">
            TapRight combines contextual intelligence with real-time reward tracking to
            deliver the smartest card play for each purchase. Here’s how it feels in
            motion:
          </p>
          <div className="features-grid">
            {features.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <span className="feature-icon" aria-hidden="true">
                  {feature.icon}
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

      </main>

      <footer className="site-footer">
        <div className="site-footer__brand">
          <Image
            src="/tapright-glyph.png"
            alt="TapRight logo"
            width={76}
            height={76}
          />
          <span>© {new Date().getFullYear()} TapRight. All rights reserved.</span>
        </div>
      </footer>
    </>
  );
}
