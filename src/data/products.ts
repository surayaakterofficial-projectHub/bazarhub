export type Product = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  brand: string;
  rating: number;
  reviews: number;
  sold: number;
  stock: number;
  description: string;
  highlights: string[];
};

export const categories = [
  { id: "all", name: "All", icon: "FaThLarge" },
  { id: "grocery", name: "Grocery", icon: "FaShoppingBasket" },
  { id: "restaurant", name: "Restaurants", icon: "FaUtensils" },
  { id: "mens", name: "Men's Fashion", icon: "FaTshirt" },
  { id: "womens", name: "Women's Fashion", icon: "FaFemale" },
  { id: "electronics", name: "Electronics", icon: "FaMobileAlt" },
  { id: "home", name: "Home & Living", icon: "FaCouch" },
  { id: "beauty", name: "Beauty", icon: "FaSpa" },
  { id: "sports", name: "Sports", icon: "FaFutbol" },
  { id: "kids", name: "Kids & Toys", icon: "FaGamepad" },
];

const img = (q: string, sig: number) =>
  `https://images.unsplash.com/photo-${q}?auto=format&fit=crop&w=600&q=70&sig=${sig}`;

export const products: Product[] = [
  // Grocery
  { id: "g1", name: "Pran Premium Basmati Rice 5kg", price: 780, oldPrice: 950, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=70", category: "grocery", brand: "Pran", rating: 4.6, reviews: 312, sold: 1200, stock: 80, description: "Premium quality long-grain basmati rice. Perfect aroma for biryani and pulao.", highlights: ["Long grain", "Aged 12 months", "5kg pack", "100% pure"] },
  { id: "g2", name: "Fresh Mustard Oil 1L Bottle", price: 320, oldPrice: 380, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=70", category: "grocery", brand: "Teer", rating: 4.5, reviews: 188, sold: 540, stock: 120, description: "Cold-pressed mustard oil with rich flavor. Healthy cooking oil.", highlights: ["Cold pressed", "1 litre", "No preservatives"] },
  { id: "g3", name: "Ispahani Mirzapore Tea 400g", price: 240, image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=70", category: "grocery", brand: "Ispahani", rating: 4.7, reviews: 421, sold: 2100, stock: 200, description: "The classic taste of Bangladesh's favorite tea.", highlights: ["400g pouch", "Strong aroma", "CTC blend"] },
  { id: "g4", name: "Fortuna Soybean Oil 5L", price: 920, oldPrice: 1050, image: "https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?auto=format&fit=crop&w=600&q=70", category: "grocery", brand: "Fortuna", rating: 4.4, reviews: 156, sold: 480, stock: 60, description: "Heart-healthy soybean oil for everyday cooking.", highlights: ["Vitamin A & D", "5L jar", "Trans-fat free"] },

  // Restaurant
  { id: "r1", name: "KFC Zinger Burger Combo", price: 450, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=70", category: "restaurant", brand: "KFC", rating: 4.5, reviews: 980, sold: 5400, stock: 999, description: "Crispy zinger fillet burger with fries and drink.", highlights: ["Burger + Fries + Drink", "Spicy", "Hot delivery"] },
  { id: "r2", name: "Sultan's Dine Kacchi Biryani", price: 380, oldPrice: 420, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=70", category: "restaurant", brand: "Sultan's Dine", rating: 4.8, reviews: 2100, sold: 8900, stock: 999, description: "Authentic Dhaka kacchi biryani with mutton, served with borhani.", highlights: ["Mutton kacchi", "With borhani", "Half plate"] },
  { id: "r3", name: "Pizza Hut Cheese Lover Medium", price: 890, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=70", category: "restaurant", brand: "Pizza Hut", rating: 4.4, reviews: 612, sold: 2300, stock: 999, description: "4 cheese blend on hand-tossed crust. Medium size.", highlights: ["Medium 12 inch", "4-cheese", "Hand-tossed"] },
  { id: "r4", name: "Star Kabab Chicken Tikka Set", price: 280, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=70", category: "restaurant", brand: "Star Kabab", rating: 4.6, reviews: 540, sold: 3100, stock: 999, description: "Tender chicken tikka with naan and salad.", highlights: ["With naan", "Side salad", "Special sauce"] },

  // Mens
  { id: "m1", name: "Cotton Casual Shirt - Slim Fit", price: 1190, oldPrice: 1690, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=70", category: "mens", brand: "Easy", rating: 4.4, reviews: 245, sold: 920, stock: 50, description: "100% cotton casual shirt with slim modern fit. Perfect for office or outing.", highlights: ["100% cotton", "Slim fit", "Machine washable", "All sizes"] },
  { id: "m2", name: "Premium Denim Jeans Stretch", price: 1450, oldPrice: 2100, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=70", category: "mens", brand: "Yellow", rating: 4.5, reviews: 380, sold: 1500, stock: 75, description: "Stretchable denim with comfort fit, mid-rise.", highlights: ["Stretch denim", "Mid rise", "Tapered leg"] },
  { id: "m3", name: "Polo T-Shirt Combo Pack of 3", price: 990, oldPrice: 1500, image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=70", category: "mens", brand: "Lubnan", rating: 4.3, reviews: 612, sold: 2800, stock: 200, description: "Pack of 3 premium polo t-shirts in assorted colors.", highlights: ["Pack of 3", "Pique cotton", "All sizes"] },
  { id: "m4", name: "Formal Leather Belt Black", price: 590, image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=600&q=70", category: "mens", brand: "Apex", rating: 4.6, reviews: 188, sold: 740, stock: 150, description: "Genuine leather formal belt with steel buckle.", highlights: ["Genuine leather", "Adjustable", "Black"] },

  // Womens
  { id: "w1", name: "Three-Piece Embroidered Salwar Kameez", price: 2290, oldPrice: 3200, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=70", category: "womens", brand: "Aarong", rating: 4.7, reviews: 432, sold: 1800, stock: 40, description: "Beautifully embroidered salwar kameez with dupatta. Festive wear.", highlights: ["Hand embroidery", "With dupatta", "Unstitched"] },
  { id: "w2", name: "Jamdani Cotton Saree Red", price: 3490, oldPrice: 4500, image: "https://images.unsplash.com/photo-1610030181087-540017dc9d61?auto=format&fit=crop&w=600&q=70", category: "womens", brand: "Tangail", rating: 4.8, reviews: 280, sold: 620, stock: 30, description: "Authentic handloom Jamdani saree from Tangail weavers.", highlights: ["Handloom", "Pure cotton", "Traditional motif"] },
  { id: "w3", name: "Designer Kurti Long Floral", price: 890, oldPrice: 1300, image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=70", category: "womens", brand: "Sailor", rating: 4.4, reviews: 318, sold: 1450, stock: 90, description: "Comfortable long kurti with floral prints. Daily wear.", highlights: ["Rayon fabric", "Side slits", "All sizes"] },
  { id: "w4", name: "Ladies Handbag Premium PU Leather", price: 1290, oldPrice: 1890, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=70", category: "womens", brand: "Bagchase", rating: 4.5, reviews: 220, sold: 880, stock: 60, description: "Stylish handbag with multiple compartments.", highlights: ["PU leather", "3 compartments", "Adjustable strap"] },

  // Electronics
  { id: "e1", name: "Walton Smart LED TV 43 inch", price: 32900, oldPrice: 38500, image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=70", category: "electronics", brand: "Walton", rating: 4.5, reviews: 720, sold: 1200, stock: 25, description: "43-inch FHD smart TV with built-in Android, voice remote.", highlights: ["43 inch FHD", "Android Smart", "Voice remote", "1 year warranty"] },
  { id: "e2", name: "Xiaomi Redmi Note 13 Pro 8/256", price: 32990, oldPrice: 36000, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=70", category: "electronics", brand: "Xiaomi", rating: 4.6, reviews: 1240, sold: 4500, stock: 80, description: "200MP camera, AMOLED display, 67W fast charging.", highlights: ["8GB RAM", "256GB storage", "200MP camera"] },
  { id: "e3", name: "Havit Wireless Bluetooth Earbuds", price: 1490, oldPrice: 2300, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=70", category: "electronics", brand: "Havit", rating: 4.3, reviews: 890, sold: 3100, stock: 200, description: "TWS earbuds with 24h battery, ENC noise cancel.", highlights: ["BT 5.3", "ENC mic", "24h battery"] },
  { id: "e4", name: "Dell Inspiron 15 i5 12th Gen", price: 78900, oldPrice: 89000, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=70", category: "electronics", brand: "Dell", rating: 4.6, reviews: 320, sold: 540, stock: 18, description: "15.6 FHD laptop, i5 12th gen, 8GB RAM, 512GB SSD.", highlights: ["i5 12th gen", "8GB DDR4", "512GB NVMe SSD"] },

  // Home
  { id: "h1", name: "Non-Stick Cookware Set 5 Pieces", price: 2490, oldPrice: 3500, image: "https://images.unsplash.com/photo-1584990347449-a0c8b06a1b6b?auto=format&fit=crop&w=600&q=70", category: "home", brand: "Kiam", rating: 4.4, reviews: 210, sold: 720, stock: 40, description: "Premium non-stick cookware set. Induction compatible.", highlights: ["5 pieces", "Induction base", "Non-stick"] },
  { id: "h2", name: "Cotton Bedsheet King Size", price: 1290, oldPrice: 1800, image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=70", category: "home", brand: "Hometex", rating: 4.5, reviews: 412, sold: 1900, stock: 80, description: "Soft cotton king-size bedsheet with 2 pillow covers.", highlights: ["King size", "2 pillow covers", "100% cotton"] },

  // Beauty
  { id: "b1", name: "Lakme Lip & Cheek Tint", price: 690, image: "https://images.unsplash.com/photo-1522335789203-aaa7f4cfc04f?auto=format&fit=crop&w=600&q=70", category: "beauty", brand: "Lakme", rating: 4.5, reviews: 340, sold: 1500, stock: 100, description: "Multi-use tint for lips and cheeks. Long-lasting.", highlights: ["Long-wear", "Vegan", "Multi-use"] },
  { id: "b2", name: "Himalaya Neem Face Wash 200ml", price: 320, image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=600&q=70", category: "beauty", brand: "Himalaya", rating: 4.6, reviews: 980, sold: 4500, stock: 250, description: "Purifying neem face wash for clear skin.", highlights: ["200ml", "For acne", "Daily use"] },

  // Sports
  { id: "s1", name: "Adidas Predator Football Size 5", price: 1890, oldPrice: 2500, image: "https://images.unsplash.com/photo-1614632537190-23e4146777db?auto=format&fit=crop&w=600&q=70", category: "sports", brand: "Adidas", rating: 4.5, reviews: 180, sold: 540, stock: 60, description: "Match-quality football, hand-stitched.", highlights: ["Size 5", "Hand stitched", "All-weather"] },

  // Kids
  { id: "k1", name: "Lego Classic Creative Bricks 500 pcs", price: 2890, oldPrice: 3500, image: "https://images.unsplash.com/photo-1558877385-8c1b8b9e0a3a?auto=format&fit=crop&w=600&q=70", category: "kids", brand: "Lego", rating: 4.8, reviews: 420, sold: 1100, stock: 35, description: "500 colorful bricks for endless creative play.", highlights: ["500 pieces", "Age 4+", "Original Lego"] },
  { id: "k2", name: "Remote Control Racing Car", price: 1490, image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=600&q=70", category: "kids", brand: "Toyzone", rating: 4.3, reviews: 230, sold: 870, stock: 90, description: "Fast RC racing car with rechargeable battery.", highlights: ["Rechargeable", "2.4GHz remote", "Age 6+"] },
];

export const flashSale = products.filter(p => p.oldPrice).slice(0, 8);
