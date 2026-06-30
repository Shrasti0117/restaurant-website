import { useEffect, useState } from "react";
import { fetchSiteData } from "./api/siteApi.js";
import BookingForm from "./components/BookingForm.jsx";
import Header from "./components/Header.jsx";

const fallbackBusiness = {
  name: "Utsav Family Restaurant & Banquet Hall",
  phone: "9926033222",
  tel: "+919926033222",
  address: "5GM7+G63, Bhopal, Madhya Pradesh 462022",
  rating: 4.9,
  reviewsCount: 21,
  tagline: "Bhopal's Premium Family Dining & Celebrations",
  description: "Savor hearty Indian flavors, graceful hospitality, and beautifully hosted events under one warm roof."
};

function App() {
  const [site, setSite] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSiteData()
      .then(setSite)
      .catch((apiError) => setError(apiError.message));
  }, []);

  useEffect(() => {
    if (!site) return undefined;

    const revealItems = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [site]);

  const business = site?.business || fallbackBusiness;

  if (!site && !error) {
    return <div className="loading-screen">Preparing the Utsav experience...</div>;
  }

  return (
    <>
      <Header business={business} />
      {error && <div className="api-banner">{error}. Showing local fallback design.</div>}
      <main>
        <section className="hero" id="home" aria-label="Restaurant hero">
          <div className="hero-content reveal visible">
            <p className="eyebrow">{business.tagline}</p>
            <h1>{business.name}</h1>
            <p className="hero-copy">{business.description}</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href={`tel:${business.tel}`}>
                <i className="fa-solid fa-calendar-check"></i>
                Book Table
              </a>
              <a className="btn btn-secondary" href="#menu">
                <i className="fa-solid fa-utensils"></i>
                Explore Menu
              </a>
            </div>
            <div className="hero-stats" aria-label="Restaurant highlights">
              {(site?.highlights || ["4.9 Rating", "21 Reviews", "Family Friendly"]).map((item) => {
                const [strong, ...rest] = item.split(" ");
                return (
                  <span key={item}>
                    <strong>{strong}</strong>
                    {rest.join(" ")}
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section intro-band" id="about">
          <div className="container split">
            <div className="section-copy reveal">
              <p className="eyebrow">About Us</p>
              <h2>{site?.about.title}</h2>
              <p>{site?.about.body}</p>
              <div className="feature-list">
                {site?.about.features.map((feature, index) => (
                  <span key={feature}>
                    <i className={`fa-solid ${["fa-bowl-food", "fa-champagne-glasses", "fa-heart"][index]}`}></i>
                    {feature}
                  </span>
                ))}
              </div>
            </div>
            <div className="about-card reveal">
              <img
                src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=900&q=80"
                alt="Elegant restaurant dining table with plated food"
                loading="lazy"
              />
              <div className="rating-pill">
                <i className="fa-solid fa-star"></i>
                <span>{business.rating} rated by local guests</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section menu-section" id="menu">
          <div className="container">
            <div className="section-heading reveal">
              <p className="eyebrow">Signature Menu</p>
              <h2>Comfort classics with a festive touch.</h2>
            </div>
            <div className="menu-grid">
              {site?.menu.map((group) => (
                <article className="menu-card reveal" key={group.category}>
                  <div className="menu-icon">
                    <i className={`fa-solid ${group.icon}`}></i>
                  </div>
                  <h3>{group.category}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item.name}>
                        <span>{item.name}</span>
                        <strong>{item.price}</strong>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section banquet-section" id="banquet">
          <div className="container split reverse">
            <div className="banquet-visual reveal">
              <img
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80"
                alt="Luxurious banquet hall arranged for a formal celebration"
                loading="lazy"
              />
            </div>
            <div className="section-copy reveal">
              <p className="eyebrow">Banquet Hall</p>
              <h2>Host celebrations with polish and heart.</h2>
              <p>
                From intimate ceremonies to lively receptions, the banquet experience at Utsav is designed for
                effortless hosting with flexible decor, curated menus, and warm service.
              </p>
              <div className="event-grid">
                {site?.events.map((eventName, index) => (
                  <span key={eventName}>
                    <i className={`fa-solid ${["fa-ring", "fa-cake-candles", "fa-briefcase", "fa-music"][index]}`}></i>
                    {eventName}
                  </span>
                ))}
              </div>
              <a className="btn btn-primary" href={`tel:${business.tel}`}>
                <i className="fa-solid fa-phone-volume"></i>
                Enquire Now
              </a>
            </div>
          </div>
        </section>

        <section className="section gallery-section" id="gallery">
          <div className="container">
            <div className="section-heading reveal">
              <p className="eyebrow">Gallery</p>
              <h2>Flavors, ambience, and occasions worth gathering for.</h2>
            </div>
            <div className="gallery-grid">
              {site?.gallery.map((image) => (
                <figure className={`gallery-item ${image.variant || ""} reveal`} key={image.src}>
                  <img src={image.src} alt={image.alt} loading="lazy" />
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="section reviews-section" id="reviews">
          <div className="container">
            <div className="reviews-top reveal">
              <div>
                <p className="eyebrow">Customer Reviews</p>
                <h2>Loved by families and event hosts.</h2>
              </div>
              <div className="score-card" aria-label={`Rating ${business.rating} from ${business.reviewsCount} reviews`}>
                <span>{business.rating}</span>
                <div>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i className="fa-solid fa-star" key={star}></i>
                  ))}
                  <small>{business.reviewsCount} reviews</small>
                </div>
              </div>
            </div>
            <div className="testimonial-grid">
              {site?.testimonials.map((review) => (
                <article className="testimonial-card reveal" key={review.name}>
                  <p>"{review.quote}"</p>
                  <strong>{review.name}</strong>
                  <span>{review.context}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="container contact-grid">
            <div className="contact-panel reveal">
              <p className="eyebrow">Visit Us</p>
              <h2>Plan your table or celebration today.</h2>
              <div className="contact-list">
                <a href={`tel:${business.tel}`}>
                  <i className="fa-solid fa-phone"></i>
                  <span>{business.phone}</span>
                </a>
                <a href="https://www.google.com/maps/search/?api=1&query=5GM7%2BG63%2C%20Bhopal%2C%20Madhya%20Pradesh%20462022" target="_blank" rel="noreferrer">
                  <i className="fa-solid fa-location-dot"></i>
                  <span>{business.address}</span>
                </a>
                <span>
                  <i className="fa-solid fa-star"></i>
                  <span>{business.rating} rating from {business.reviewsCount} reviews</span>
                </span>
              </div>
              <BookingForm />
            </div>
            <div className="map-wrap reveal">
              <iframe
                title="Map to Utsav Family Restaurant and Banquet Hall"
                src="https://www.google.com/maps?q=5GM7%2BG63%2C%20Bhopal%2C%20Madhya%20Pradesh%20462022&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <a href="#home" className="brand footer-brand">
              <span className="brand-mark">U</span>
              <span>
                <strong>Utsav</strong>
                <small>Family Restaurant & Banquet Hall</small>
              </span>
            </a>
            <p>Elegant dining and celebration spaces for families, friends, and teams in Bhopal.</p>
          </div>
          <div>
            <h3>Quick Links</h3>
            <a href="#menu">Menu</a>
            <a href="#banquet">Banquet Hall</a>
            <a href="#gallery">Gallery</a>
            <a href="#contact">Contact</a>
          </div>
          <div>
            <h3>Connect</h3>
            <a href={`tel:${business.tel}`}><i className="fa-solid fa-phone"></i> {business.phone}</a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i> Instagram</a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer"><i className="fa-brands fa-facebook"></i> Facebook</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 {business.name}. All rights reserved.</span>
        </div>
      </footer>

      <a className="floating-call" href={`tel:${business.tel}`} aria-label="Call Utsav">
        <i className="fa-solid fa-phone"></i>
      </a>
    </>
  );
}

export default App;
