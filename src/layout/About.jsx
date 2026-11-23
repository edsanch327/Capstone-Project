import { Link } from "react-router";
//This component displays an About page with a short salon story and a link to the booking page.//
export default function About() {
  return (
    <section className="container inner-page story-layout">
      <div>
        <p className="eyebrow">OUR STORY</p>
        <h1>A softer kind of salon day.</h1>
      </div>
      <div className="story-copy">
        <p>
          We believe great hair starts with feeling comfortable in your own
          skin.
        </p>
        <p className="muted">
          Beauty Calendar is a demo salon experience built around thoughtful
          appointments, easy booking, and space to slow down. Come as you are
          and leave feeling a little more like yourself.
        </p>
        <Link className="outline-button" to="/booking">
          COME SAY HELLO ↗
        </Link>
      </div>
    </section>
  );
}
//when rendered, this component shows the salon’s story and a link visitors can use to go to the booking page.//
