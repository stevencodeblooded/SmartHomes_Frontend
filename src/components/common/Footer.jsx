import { ApartmentLogoNested } from "./ApartmentLogo";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerSections = {
    tenantArea: {
      title: "Tenant area",
      links: ["Search for rental properties", "Create a listing alert", "FAQs"],
    },
    about: {
      title: "About",
      links: ["About us", "Terms & Conditions", "Contact us"],
    },
  };

  return (
    <footer className="bg-gray-50 py-10">
      <section>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className=" w-fit">
                <Link to="/" className="flex items-center">
                  <div>
                    <ApartmentLogoNested />
                  </div>
                  <div>
                    <h1 className="text-sm font-semibold">SmartHomes</h1>
                  </div>
                </Link>
              </div>

              {/* Tenant Area */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {footerSections.tenantArea.title}
                </h3>
                <ul className="space-y-3">
                  {footerSections.tenantArea.links.map((link, index) => (
                    <li key={index}>
                      <a
                        href="to-be-added"
                        className="text-gray-600 hover:text-red-500 transition-colors text-sm"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* About & Language */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {footerSections.about.title}
                </h3>
                <ul className="space-y-3 mb-6">
                  {footerSections.about.links.map((link, index) => (
                    <li key={index}>
                      <a
                        href="to-be-added"
                        className="text-gray-600 hover:text-red-500 transition-colors text-sm"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                © Copyright 2026{" "}
                <span className="font-semibold">SmartHomes</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
