import Button from "@/app/_components/Button";
import InputGroup from "@/app/_components/InputGroup";
import {
  HiEnvelope,
  HiMiniChatBubbleOvalLeft,
  HiPhone,
  HiUser,
} from "react-icons/hi2";

function HelpContactForm() {
  return (
    <div className=" rounded border-2 border-cream-100 p-3 sm:p-6 shadow-lg hover:shadow-2xl trans">
      <form action="">
        <h1 className="font-rowdies capitalize text-2xl bg-transparent sm:text-3xl xl:text-4xl relative w-fit  mb-4 md:mb-8 pb-4.5 sm:pb-4 bg-linear-to-r from-gradient-1 to-gradient-2 bg-clip-text text-transparent after:content-[''] after:absolute after:bottom-1.5 md:after:-bottom-1 after:left-0  after:w-2/6 after:h-1 sm:after:h-1.5 after:bg-orangered-100 after:rounded ">
          How can we help you?
        </h1>

        <div className="mt-0 flex flex-col gap-2 md:gap-4">
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <InputGroup label="First Name:" icon={<HiUser />}>
              <input
                className="input "
                type="text"
                name="firstName"
                id="firstName"
              />
            </InputGroup>
            <InputGroup label="Last Name:" icon={<HiUser />}>
              <input
                className="input "
                type="text"
                name="lastName"
                id="lastName"
              />
            </InputGroup>
          </div>

          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <InputGroup label="Contact:" icon={<HiPhone />}>
              <input
                className="input "
                type="text"
                inputMode="number"
                name="contact"
                id="contact"
              />
            </InputGroup>
            <InputGroup label="Subject:" icon={<HiEnvelope />}>
              <input
                className="input "
                type="text"
                name="subject"
                id="subject"
              />
            </InputGroup>
          </div>
          <InputGroup label="Email:" icon={<HiEnvelope />}>
            <input className="input " type="email" name="email" id="email" />
          </InputGroup>

          <InputGroup label="Message:" icon={<HiMiniChatBubbleOvalLeft />}>
            <textarea
              className="input h-30 md:h-40"
              type="text"
              name="message"
              id="message"
            ></textarea>
          </InputGroup>
          <div className="flex items-center justify-end gap-4 mt-2">
            <Button>Submit</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default HelpContactForm;
