// ContactSection.js
import React from 'react';
import './ContactSection.css';

const ContactSection = () => {
  return (
    <div className="contact-section">
      <div className="contact-info">
        <h3>CONTACT</h3>
        <p>📍 Kasetsart University Sriracha Campus</p>
        <p>199 Moo 6, Sukhumvit Road, Tung Sukla, Sri Racha, Chon Buri, 20230 THAILAND.</p>
        <p>📞 +66(0)3835-4580-4, +66(0)3835-2611-6</p>
        <p>📧 prsrc@ku.th</p>
      </div>
      <div className="open-close">
        <h3>OPEN - CLOSE</h3>
        <p>MON 10:00 am - 5:00 pm</p>
        <p>TUE 10:00 am - 5:00 pm</p>
        <p>WED 10:00 am - 5:00 pm</p>
        <p>THU 10:00 am - 5:00 pm</p>
        <p>FRI 10:00 am - 5:00 pm</p>
        <p>SAT 10:00 am - 5:00 pm</p>
        <p>SUN 10:00 am - 5:00 pm</p>
      </div>
      <div className="map">
        <h3>LOCATION</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.749247858707!2d100.90168101483049!3d13.152695490741206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3102a49d37f1a2f5%3A0x6531214dd1c3e49a!2z4LiV4Li54LiB4Lix4LiXIOC4oeC4seC4suC4mOC4i-C5gOC4l-C4o-C4tOC4ouC5gOC4lQ!5e0!3m2!1sth!2sth!4v1695501920735!5m2!1sth!2sth"
          width="100%"
          height="200"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactSection;
