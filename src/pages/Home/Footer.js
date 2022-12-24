import React from "react";
import payment1 from "../../assets/payment-icons/stripe.png";
import tech1 from "../../assets/tech-icons/tech1.png";
import tech2 from "../../assets/tech-icons/tech2.png";
import tech3 from "../../assets/tech-icons/tech3.png";
import tech4 from "../../assets/tech-icons/tech4.png";
import tech5 from "../../assets/tech-icons/tech5.png";
import tech6 from "../../assets/tech-icons/tech6.png";
import tech7 from "../../assets/tech-icons/tech7.png";

import soc1 from "../../assets/social-media/soc1.png";
import soc2 from "../../assets/social-media/soc2.png";
import soc3 from "../../assets/social-media/soc3.png";
import soc4 from "../../assets/social-media/soc4.png";

function Footer() {
  const arr = [tech1, tech2, tech3, tech4, tech5, tech6, tech7];
  const arr2 = [soc1, soc3, soc2];
  return (
    <div>
      <div className="footer">
        <div>
          <p style={{ fontSize: "2rem" }} className="head">
            Developer's note
          </p>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries.
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
            {arr.map((item) => (
              <img alt="" src={item} />
            ))}
          </div>
        </div>

        <div className="techs">
          <p>Follow me </p>
          <div>
            {arr2.map((item) => (
              <img alt="" src={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
