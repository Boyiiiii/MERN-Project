import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter, BsGithub } from "react-icons/bs";

export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-teal-300">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:texl-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-gray-300">
                BBYY
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 sm:mt-5 gap-8">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link href="http://">ABC Company</Footer.Link>
                <Footer.Link href="http://">DFG Institution</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow Us" />
              <Footer.LinkGroup col>
                <Footer.Link href="http://">Our Ins</Footer.Link>
                <Footer.Link href="http://">Our X</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="http://">Company Policy</Footer.Link>
                <Footer.Link href="http://">Terms & Condition</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full flex justify-between items-center">
          <Footer.Copyright by="BBYY Blog" year={new Date().getFullYear()} />
          <div className="flex gap-10 item-center justify-center">
            <Footer.Icon icon={BsFacebook} />
            <Footer.Icon icon={BsInstagram} />
            <Footer.Icon icon={BsTwitter} />
            <Footer.Icon icon={BsGithub} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
