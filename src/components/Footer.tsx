"use client";
import { personalName, contactEmail, contactPhone } from "@/lib/siteInfo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { label: "GitHub", link: "https://github.com/shanmugavelr", icon: "🐙" },
    { label: "LinkedIn", link: "https://www.linkedin.com/in/shanmugavelcf/", icon: "💼" },
    { label: "Email", link: `mailto:${contactEmail}`, icon: "📧" },
    { label: "Phone", link: `tel:${contactPhone.replace(/\s+/g, "")}`, icon: "📱" },
  ];

  return (
    <footer className="bg-dark-bg border-t border-dark-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h4 className="text-xl font-bold text-blue-400 mb-2">{personalName}</h4>
            <p className="text-dark-muted">
              Senior software engineer — enterprise systems
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["About", "Projects", "Blog", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-dark-muted hover:text-blue-400 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Follow Me</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl hover:text-blue-400 transition-transform transform hover:scale-125"
                  title={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

          <div className="border-t border-dark-border pt-8">
          <div className="text-center text-dark-muted">
            <p>
              © {currentYear} {personalName}. All rights reserved. | Senior software engineer & enterprise systems
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
