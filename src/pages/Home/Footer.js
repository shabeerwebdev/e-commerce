import React from "react";
import payment1 from "../../assets/payment-icons/stripe.png";
import tech1 from "../../assets/tech-icons/tech1.png";
import tech2 from "../../assets/tech-icons/tech2.png";
import tech3 from "../../assets/tech-icons/tech3.png";
import tech4 from "../../assets/tech-icons/tech4.png";
import tech5 from "../../assets/tech-icons/tech5.png";
import tech6 from "../../assets/tech-icons/tech6.png";
import tech7 from "../../assets/tech-icons/tech7.png";
import tech8 from "../../assets/tech-icons/tech8.png";
import tech9 from "../../assets/tech-icons/tech9.png";
import tech10 from "../../assets/tech-icons/tech10.png";

import soc1 from "../../assets/social-media/soc1.png";
import soc2 from "../../assets/social-media/soc2.png";
import soc3 from "../../assets/social-media/soc3.png";
import soc4 from "../../assets/social-media/soc4.png";

function Footer() {
  const arr = [
    tech1,
    tech2,
    tech3,
    tech4,
    tech5,
    tech10,
    tech9,
    tech8,
    tech6,
    tech7,
  ];
  const arr2 = [soc1, soc3, soc2];
  return (
    <div className="footer-wrap">
      <div className="footer">
        <div>
          <p style={{ fontSize: "2rem" }} className="head">
            Developer's note
          </p>
          <p>
            Thank you for visiting my site. Myself Shabeer Im a UI
            designer/developer and a frontend developer with a decent knowledge
            of backend development in MERN stack. I have more than 1 yr of
            hands-on experience in web developement.{" "}
            <a
              style={{ color: "blue" }}
              target="_blank"
              href="https://shabeer.vercel.app"
              rel="noopener noreferrer"
            >
              Know more about me.
            </a>
          </p>
        </div>
        <div className="techs">
          <p>Payment powered by </p>
          <div>
            <img src={payment1} alt="" />
          </div>
        </div>

        <div className="techs">
          <p>Techs used </p>
          <div>
            {arr.map((item, i) => (
              <img key={i} alt="" src={item} />
            ))}
          </div>
        </div>

        <div className="techs">
          <p>Follow me </p>
          <div>
            {/* {arr2.map((item, i) => (
              <img key={i} alt="" src={item} />
            ))} */}
            <p>
              <a
                style={{ color: "gray" }}
                target="_blank"
                rel="noreferrer noopener"
                href="https://linkedin.com/in/shabeer-ahamed-5955661b7"
              >
                LinkedIn
              </a>
            </p>
            <p>
              <a
                style={{ color: "gray" }}
                target="_blank"
                rel="noreferrer noopener"
                href="https://wa.me/+918778244636"
              >
                Whatsapp
              </a>
            </p>
          </div>
        </div>

        <div
          style={{
            gridColumn: "1/-1",
            placeSelf: "center",
            marginBottom: "-4rem",
          }}
        >
          <p style={{ fontSize: "0.8rem" }}>
            Site designed and developed by{" "}
            <a
              style={{ color: "gray" }}
              target="_blank"
              rel="noreferrer noopener"
              href="https://shabeer.vercel.app"
            >
              Shabeer
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
