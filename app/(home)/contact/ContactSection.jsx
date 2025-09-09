"use client";

import ContactAddress from "./ContactAddress";
import HelpContactForm from "./HelpContactForm";
import Map from "./Map";

function ContactSection() {
  return (
    <div className="py-8">
      <div className=" pb-10 md:pb-20 flex flex-col md:justify-center gap-6 md:flex-row">
        <Map />
        <ContactAddress />
      </div>
      <HelpContactForm />
    </div>
  );
}

export default ContactSection;
