import Link from "next/link";
import Logo from "./Logo";
import { HiMapPin, HiMiniPhone } from "react-icons/hi2";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="leading-[2.2] justify-self-end flex flex-col gap-4 bg-dark text-cream-200 w-full  py-12 sm:py-14  sm:px-6  lg:px-12  xl:px-32 px-4 ">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-[minmax(400px,_1fr)_repeat(3,_1fr)] lg:gap-12">
        <FooterLocationDetails />

        <div>
          <h2 className="text-lg font-bold">Services</h2>
          <ul className="space-y-1 *:text-[12px] *:md:text-[14px] *:text-grey *:hover:underline trans">
            <li>
              <Link href="/">About</Link>
            </li>
            <li>
              <Link href="/">FAQs</Link>
            </li>
            <li>
              <Link href="/">Contact Us</Link>
            </li>
            <li>
              <Link href="/">Store Location</Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold">Account</h2>
          <ul className="space-y-1 *:text-[12px] *:md:text-[14px] *:text-grey *:hover:underline trans">
            <li>
              <Link href="/">My Account</Link>
            </li>
            <li>
              <Link href="/">My Cart</Link>
            </li>
            <li>
              <Link href="/">Order History</Link>
            </li>
            <li>
              <Link href="/">My Wishlist</Link>
            </li>
            <li>
              <Link href="/">My Address</Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold">Privacy and Terms</h2>
          <ul className="space-y-1 *:text-[12px] *:md:text-[14px] *:text-grey *:hover:underline trans">
            <li>
              <Link href="/">Payment Policy</Link>
            </li>
            <li>
              <Link href="/">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/">Shipping Policy</Link>
            </li>
            <li>
              <Link href="/">Terms and Conditions</Link>
            </li>
          </ul>
        </div>
      </div>

      <p className="text-sm text-center lg:text-base border-t border-grey pt-8 mt-4 tracking-wide">
        &copy; {currentYear} EngrBlack at Stack Design
      </p>
    </footer>
  );
}

export default Footer;

function FooterLocationDetails() {
  return (
    <div className="flex flex-col gap-5 text-sm ">
      <Logo size="small" />
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-[16px_1fr] gap-2 leading-[1.5] items-start">
          <HiMapPin />
          <span>
            Shop 12, Havas Food Court Plaza, Opp. Jaja Hall, Unilag Campus,
            Akoka, Lagos.
          </span>
        </div>

        <div className="grid grid-cols-[16px_1fr] gap-3 leading-[1.5] items-start">
          <HiMiniPhone />
          <div className="flex flex-col gap-1">
            <p>+234 813 073 1895</p>
            <p>Ay@pizza.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
