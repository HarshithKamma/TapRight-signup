import Image from "next/image";
import { WaitlistForm } from "@/components/WaitlistForm";

export default function Home() {
  return (
    <>
      <div className="page-gradient" />
      <div className="noise-layer" />
      <header className="site-header">
        <div className="site-header__inner">
          <div className="brand">
            <Image
              src="/tapright-logo.png"
              alt="TapRight logo"
              width={42}
              height={42}
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
        <section className="hero" id="features">
          <div className="hero-copy">
            <span className="pill">Smart credit card guidance</span>
            <h1>Spend smarter. Owe less.</h1>
            <p>
              TapRight gives you live notifications based on your location to help
              you choose the best credit card for every purchase — so you never miss
              rewards or cashback.
            </p>
            <p>
              With background location tracking, TapRight learns your spending trends
              and suggests the right card at the right time — automatically.
            </p>
          </div>
          <WaitlistForm />
        </section>

      </main>

      <footer className="site-footer">
        <div className="site-footer__brand">
          <Image
            src="/tapright-logo.png"
            alt="TapRight logo"
            width={34}
            height={34}
          />
          <span>© {new Date().getFullYear()} TapRight. All rights reserved.</span>
        </div>
        <div className="footer-links">
          <a href="#waitlist">Privacy</a>
          <a href="#waitlist">Terms</a>
          <a href="mailto:hello@tapright.ai">Contact</a>
        </div>
      </footer>
    </>
  );
}
