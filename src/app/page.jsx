import Cursor from "@/components/cursor/Cursor";
import Hero from "@/components/hero/Hero";
import Navbar from "@/components/navbar/Navbar";
import Contact from "@/components/contact/Contact";
import Fixtures from "@/components/fixtures/fixtures";
import Gallery from "@/components/gallery/gallery";

export default function Home() {
  return (
    <div>
      <Cursor />
      <section id="Home">
        <Navbar />
        <Hero />
      </section>
      <section id="Fixtures">
        <Fixtures />
      </section>

      <section id="Gallery">
        <Gallery />
      </section>
      {/* <section>
        <Parallax type="EventDetails" />
      </section>
      <section id="EventDetails" style={{ height: "max-content" }}>
        <EventDetails />
      </section> */}
      <section
        id="Contact"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Contact />
      </section>
    </div>
  );
}
