import React from "react";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>

      {/* Hero Section */}
      <section style={styles.hero}>
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c"
          alt="coworking space"
          style={styles.heroImg}
        />

        <div style={styles.heroText}>
          <h1>Welcome to CoworkSpace</h1>
          <p>The best place to work and collaborate.</p>
          <button style={styles.button}>Book Your Desk</button>
        </div>
      </section>

      {/* Services */}
      <section style={styles.section}>
        <h2>Our Services</h2>

        <div style={styles.services}>
          <div style={styles.card}>
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
              alt=""
              style={styles.cardImg}
            />
            <h3>Meeting Rooms</h3>
            <p>Professional meeting rooms.</p>
          </div>

          <div style={styles.card}>
            <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
              alt=""
              style={styles.cardImg}
            />
            <h3>Comfortable Desks</h3>
            <p>Work in a modern environment.</p>
          </div>

          <div style={styles.card}>
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72"
              alt=""
              style={styles.cardImg}
            />
            <h3>High Speed WiFi</h3>
            <p>Fast and secure internet.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

    </div>
  );
}

const styles = {
  hero: {
    position: "relative",
    height: "60vh",
  },

  heroImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  heroText: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    color: "white",
    textAlign: "center",
    background: "rgba(0,0,0,0.5)",
    padding: "30px",
    borderRadius: "10px",
  },

  section: {
    padding: "60px 20px",
    textAlign: "center",
  },

  services: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: "20px",
    marginTop: "40px",
  },

  card: {
    background: "#f4f4f4",
    padding: "20px",
    borderRadius: "10px",
  },

  cardImg: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px",
  },

  button: {
    marginTop: "15px",
    padding: "10px 20px",
    background: "#ff7a00",
    border: "none",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
  },
};