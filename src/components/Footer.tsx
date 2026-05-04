import { FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaCcVisa, FaCcMastercard, FaCcPaypal, FaMobileAlt } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-lg gradient-sunset font-black text-warm-foreground">B</div>
            <span className="text-xl font-extrabold"><span className="text-primary">Bazaar</span><span className="text-warm">Hub</span></span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Bangladesh's friendly marketplace for groceries, fashion, electronics, and food.</p>
          <div className="mt-4 flex gap-3 text-primary">
            <FaFacebook size={20} className="cursor-pointer hover:text-warm" />
            <FaInstagram size={20} className="cursor-pointer hover:text-warm" />
            <FaYoutube size={20} className="cursor-pointer hover:text-warm" />
            <FaTwitter size={20} className="cursor-pointer hover:text-warm" />
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold">Customer Care</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Help Center</li><li>How to Buy</li><li>Returns & Refunds</li><li>Contact Us</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold">BazaarHub</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>About Us</li><li>Careers</li><li>Terms & Conditions</li><li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold">Payment & Apps</h4>
          <div className="flex gap-3 text-3xl text-primary">
            <FaCcVisa /><FaCcMastercard /><FaCcPaypal />
          </div>
          <button className="mt-4 inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm hover:bg-muted">
            <FaMobileAlt /> Get the App
          </button>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} BazaarHub. Made with warmth in Bangladesh.
      </div>
    </footer>
  );
}
