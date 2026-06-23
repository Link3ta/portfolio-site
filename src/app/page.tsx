import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { CaseStudy } from "@/components/sections/case-study";
import { Architecture } from "@/components/sections/architecture";
import { Skills } from "@/components/sections/skills";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { CASE_STUDIES } from "@/components/sections/case-studies-data";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[var(--bg-base)]">
      <Nav />
      <main className="flex-1">
        <Hero />
        <About />

        {/* Work — case studies */}
        <section id="work" className="relative bg-[var(--bg-base)]">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-10 pt-24 md:pt-28">
            <div className="label-caps mb-8 flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-[var(--accent-blue)]" />
              Work
            </div>
            <h2
              className="font-serif text-[var(--text-primary)] leading-[1.05] mb-4 max-w-3xl"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              Three production systems, one{" "}
              <span className="text-[var(--accent-blue)]">proptech arc.</span>
            </h2>
            <p
              className="text-[var(--text-secondary)] max-w-2xl mb-8"
              style={{ lineHeight: 1.75 }}
            >
              From luxury Marbella listings to vacation-rental operations to a
              67-county permit intelligence pipeline — built with LLMs, agents,
              and production-grade data discipline.
            </p>
          </div>

          {CASE_STUDIES.map((cs, i) => (
            <div key={cs.index}>
              <CaseStudy data={cs} />
              {i < CASE_STUDIES.length - 1 && (
                <div className="mx-auto max-w-[1200px] px-6 lg:px-10 mt-20 md:mt-24">
                  <div className="hairline" />
                </div>
              )}
            </div>
          ))}
        </section>

        <Architecture />
        <Skills />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
