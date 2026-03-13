import React from "react";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>

        <div>
          <h3>CoworkSpace</h3>
          <p>The best place for freelancers, startups and remote teams.</p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul style={styles.list}>
            <li>Home</li>
            <li>About</li>
            <li>Reservations</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <p>Email: coworkspace@gmail.com</p>
          <p>Phone: +216 00 000 000</p>
          <p>Tunisia</p>
        </div>

      </div>

      <div style={styles.bottom}>
        CoworkSpace. All rights reserved.
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: "#1e293b",
    color: "white",
    marginTop: "50px",
  },

  container: {
    display: "flex",
    justifyContent: "space-between",
    padding: "40px",
    flexWrap: "wrap",
    gap: "30px",
  },

  list: {
    listStyle: "none",
    padding: 0,
  },

  bottom: {
    textAlign: "center",
    padding: "15px",
    borderTop: "1px solid #475569",
  },
};