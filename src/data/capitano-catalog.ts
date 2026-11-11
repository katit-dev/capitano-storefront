import type { CatalogProduct, CatalogType, CmsContent } from "@/hooks/data/useCmsContent";
import { PATHS } from "@/config/paths";
import { publishedNewsCategories } from "@/data/news";
import picareLogo from "@/assets/brand/picare-logo-dark.png";
import frescoBanner from "@/assets/brand/banner xịt thơm miệng - trong -suot.png";
import cap001 from "@/assets/products/catalog/CAP001.png";
import cap002 from "@/assets/products/catalog/CAP002.png";
import cap003 from "@/assets/products/catalog/CAP003.png";
import cap005 from "@/assets/products/catalog/CAP005.png";
import cap006 from "@/assets/products/catalog/CAP006.png";
import cap007 from "@/assets/products/catalog/CAP007.png";
import cap008 from "@/assets/products/catalog/CAP008.png";
import cap009 from "@/assets/products/catalog/CAP009.png";
import cap010 from "@/assets/products/catalog/CAP010.png";
import lemon1905 from "@/assets/products/catalog/Kem danh rang Huong Chanh.png";
import bakingSoda from "@/assets/products/catalog/KEM ĐÁNH RĂNG PASTA DEL CAPITANO MAXI BAKING SODA 100ML.png";
import tartarControl from "@/assets/products/catalog/KEM ĐÁNH RĂNG PASTA DEL CAPITANO MAXI HỖ TRỢ GIẢM HÌNH THÀNH CAO RĂNG  100ML.png";
import plaqueControl from "@/assets/products/catalog/KEM ĐÁNH RĂNG PASTA DEL CAPITANO MAXI LÀM SẠCH MẢNG BÁM 100 ML.png";
import cap004 from "@/assets/products/catalog/CAP004.png";
import cap011 from "@/assets/products/catalog/CAP011.png";
import cap012 from "@/assets/products/catalog/CAP012.png";
import cap018 from "@/assets/products/catalog/CAP018.png";

const productTypes: CatalogType[] = [
  { id: "toothpaste", code: "kem-danh-rang", name: "Kem đánh răng" },
  { id: "mouthwash", code: "nuoc-suc-mieng", name: "Nước súc miệng" },
  { id: "spray", code: "xit-thom-mieng", name: "Xịt thơm miệng" },
];

const lines = {
  junior: { name: "Trẻ em", categoryId: "toothpaste" },
  "1905": { name: "1905", categoryId: "toothpaste" },
  maxi: { name: "Maxi", categoryId: "toothpaste" },
  mouthwash: { name: "Nước súc miệng", categoryId: "mouthwash" },
  fresco: { name: "Fresco", categoryId: "spray" },
};

const oralCareNeeds = [
  {
    id: "rang-nhay-cam",
    title: "Răng nhạy cảm",
    image: cap010,
    productSlugs: ["1905-rang-nhay-cam"],
  },
  {
    id: "nguoi-hut-thuoc",
    title: "Dành cho người hút thuốc",
    image: cap005,
    productSlugs: ["1905-cho-nguoi-hut-thuoc"],
  },
  {
    id: "lam-trang-rang",
    title: "Làm trắng răng",
    image: cap007,
    productSlugs: ["1905-trang-rang", "nuoc-suc-mieng-lam-trang-rang"],
  },
  {
    id: "hoi-tho-thom-mat",
    title: "Hơi thở thơm mát",
    image: cap018,
    productSlugs: ["xit-thom-mieng-fresco", "nuoc-suc-mieng-loai-bo-mang-bam"],
  },
  {
    id: "cham-soc-rang-cho-tre",
    title: "Chăm sóc răng cho trẻ",
    image: cap001,
    productSlugs: ["tre-em-3-huong-dau", "tre-em-3-vi-hoa-qua", "tre-em-6-huong-bac-ha", "nuoc-suc-mieng-junior-6-bac-ha"],
  },
];

type LocalProduct = {
  slug: string;
  name: string;
  line: keyof typeof lines;
  volume: string;
  price: number;
  image: string;
  sku?: string;
  featured?: boolean;
  isBestSeller?: boolean;
  publishedAt?: string;
  description: string;
  overview: string;
  keyIngredients: string[];
  benefits: string[];
  ingredients: string;
  usageInstructions: string;
};

const childrenToothpasteUsage = [
  "1. Lấy lượng kem cỡ hạt đậu lên bàn chải.",
  "2. Người lớn hướng dẫn trẻ chải đều các mặt răng. Nhắc trẻ tránh nuốt kem.",
  "3. Hướng dẫn trẻ nhổ bọt kem và súc lại bằng nước sạch.",
].join("\n");

const productUsage = {
  // General brushing technique: https://www.mouthhealthy.org/all-topics-a-z/brushing-your-teeth
  toothpaste: [
    "1. Cho một lượng kem vừa đủ lên bàn chải lông mềm.",
    "2. Chải nhẹ mặt ngoài, mặt trong và mặt nhai của răng.",
    "3. Nhổ bỏ bọt kem.",
  ].join("\n"),
  // https://picare.vn/san-pham/kem-danh-rang-pasta-del-capitano-baby-3-vi-dau-tay-75ml
  babyToothpaste: `Dành cho trẻ từ 3 tuổi.\n\n${childrenToothpasteUsage}`,
  // https://picare.vn/san-pham/kem-danh-rang-pasta-del-capitano-junior-6-vi-bac-ha-75ml
  juniorToothpaste: `Dành cho trẻ từ 6 tuổi.\n\n${childrenToothpasteUsage}`,
  // https://drciccarelli.vn/?product=nuoc-suc-mieng-lam-trang-rang-pasta-del-capitano-whitening-mouthwash-400-ml
  // https://drciccarelli.vn/?product=nuoc-suc-mieng-ngan-ngua-mang-bam-pasta-del-capitano-plaque-remover-mouthwash-400-ml
  mouthwash: [
    "1. Dùng trực tiếp khoảng 20 ml nước súc miệng.",
    "2. Súc đều trong miệng khoảng 30 giây.",
    "3. Nhổ bỏ dung dịch, không nuốt. Không cần súc lại bằng nước sạch.",
    "",
    "Không dùng cho trẻ dưới 6 tuổi.",
  ].join("\n"),
  // https://pastadelcapitano.it/en/baby-junior
  // https://www.ada.org/resources/ada-library/oral-health-topics/mouthrinse-mouthwash
  juniorMouthwash: [
    "Dành cho trẻ từ 6 tuổi.",
    "",
    "1. Người lớn giám sát trẻ súc miệng theo lượng dùng và thời gian ghi trên nhãn chai.",
    "2. Nhắc trẻ nhổ bỏ toàn bộ dung dịch sau khi súc, không nuốt.",
  ].join("\n"),
  // https://drciccarelli.vn/?product=xit-thom-mieng-dac-tri-hoi-mieng-pasta-del-capitano-mouth-spray-15-ml
  fresco: [
    "1. Mở nắp và xịt thử ra ngoài.",
    "2. Hướng vòi vào khoang miệng và xịt 1–2 lần.",
    "3. Tránh nuốt nước bọt trong khoảng 30 giây sau khi xịt.",
  ].join("\n"),
};

// One photographed retail format per product. Missing official SKUs stay blank.
// Editorial copy uses the ingredients and stated uses of each Picare product.
const localProducts: LocalProduct[] = [
  {
    slug: "tre-em-3-huong-dau",
    overview: "Baby 3+ hương dâu là kem đánh răng dạng gel 75 ml dành cho trẻ từ 3 tuổi. Hương dâu dịu nhẹ giúp trẻ làm quen với việc chải răng hằng ngày.\n\nCông thức kết hợp Xylitol, muối fluor và canxi để chăm sóc răng sữa trong lúc chải.",
    keyIngredients: [
      "Xylitol",
      "Sodium Monofluorophosphate (muối fluor)",
      "Calcium Glycerophosphate (muối canxi)",
    ],
    benefits: [
      "Giúp làm sạch răng miệng của trẻ.",
      "Hỗ trợ bảo vệ răng sữa.",
      "Mang lại hơi thở thơm mát với hương dâu.",
    ],
    usageInstructions: productUsage.babyToothpaste,
    name: "Kem đánh răng trẻ em 3+ hương dâu",
    line: "junior",
    volume: "75 ml",
    price: 135_000,
    image: cap001,
    sku: "CAP001",
    featured: true,
    description: "Kem đánh răng dùng cho trẻ em giúp làm sạch răng miệng và cho hơi thở thơm mát. (Sản phẩm dùng cho trẻ từ 3 tuổi trở lên).",
    ingredients: "Aqua, Sorbitol, Hydrated Silica, Xylitol, Polysorbate 60, Zinc Coco-Sulfate, Aroma, Cellulose Gum, Betaine, Sodium Monofluorophosphate, Jojoba Esters, Sodium Saccharin, Sodium Carbonate, Calcium Glycerophosphate, Propylene Glycol, Malva Sylvestris Leaf Extract, CI 73360, CI 77007, CI 19140:1, CI 45430, CI 47005.",
  },
  {
    slug: "tre-em-3-vi-hoa-qua",
    overview: "Baby 3+ vị hoa quả là kem đánh răng dạng gel 75 ml cho trẻ từ 3 tuổi. Vị trái cây tổng hợp là một lựa chọn cho trẻ thích hương trái cây khi chải răng.\n\nCông thức có Xylitol, muối fluor và canxi, phù hợp để làm sạch và chăm sóc răng sữa mỗi ngày.",
    keyIngredients: [
      "Xylitol",
      "Sodium Monofluorophosphate (muối fluor)",
      "Calcium Glycerophosphate (muối canxi)",
    ],
    benefits: [
      "Giúp làm sạch răng miệng của trẻ.",
      "Hỗ trợ bảo vệ răng sữa.",
      "Mang lại hơi thở thơm mát với vị hoa quả.",
    ],
    usageInstructions: productUsage.babyToothpaste,
    name: "Kem đánh răng trẻ em 3+ vị hoa quả",
    line: "junior",
    volume: "75 ml",
    price: 135_000,
    image: cap002,
    sku: "CAP002",
    description: "Kem đánh răng dùng cho trẻ em giúp làm sạch răng miệng và cho hơi thở thơm mát. (Sản phẩm dùng cho trẻ từ 3 tuổi trở lên).",
    ingredients: "Aqua, Sorbitol, Hydrated Silica, Xylitol, Polysorbate 60, Zinc Coco-Sulfate, Aroma, Cellulose Gum, Betaine, Sodium Monofluorophosphate, Jojoba Esters, Sodium Saccharin, Sodium Carbonate, Calcium Glycerophosphate, Propylene Glycol, Benzyl Alcohol, Malva Sylvestris Leaf Extract, Limonene, CI 73360, CI 77007, CI 19140:1, CI 42051, CI 47005.",
  },
  {
    slug: "tre-em-6-huong-bac-ha",
    overview: "Junior 6+ là kem đánh răng hương bạc hà dịu dành cho trẻ từ 6 tuổi. Tuýp 75 ml phù hợp cho thói quen chải răng trong giai đoạn trẻ bắt đầu thay răng.\n\nCông thức có Xylitol, muối fluor và canxi để hỗ trợ chăm sóc cả răng sữa và răng vĩnh viễn mới mọc.",
    keyIngredients: [
      "Xylitol",
      "Sodium Monofluorophosphate (muối fluor)",
      "Calcium Glycerophosphate (muối canxi)",
    ],
    benefits: [
      "Giúp làm sạch răng miệng khi chải.",
      "Hỗ trợ bảo vệ răng sữa và răng vĩnh viễn mới mọc.",
      "Cho hơi thở thơm mát với hương bạc hà dịu.",
    ],
    usageInstructions: productUsage.juniorToothpaste,
    name: "Kem đánh răng trẻ em 6+ hương bạc hà",
    line: "junior",
    volume: "75 ml",
    price: 135_000,
    image: cap003,
    sku: "CAP003",
    description: "Kem đánh răng dùng cho trẻ em từ 6 tuổi trở lên giúp làm sạch răng miệng và cho hơi thở thơm mát.",
    ingredients: "Aqua, Sorbitol, Hydrated Silica, Xylitol, Polysorbate 60, Zinc Coco-Sulfate, Aroma, Cellulose Gum, Sodium Monofluorophosphate, Betaine, Jojoba Esters, Calcium Glycerophosphate, Tocopheryl Acetate, Sodium Saccharin, Sodium Carbonate, Limonene, CI 42051, CI 77007.",
  },
  {
    slug: "1905-cho-nguoi-hut-thuoc",
    overview: "Kem đánh răng 1905 cho người hút thuốc là phiên bản 75 ml tập trung vào việc chăm sóc răng miệng khi dễ tích tụ cao răng.\n\nCông thức có hai muối pyrophosphate và Zinc Coco-Sulfate. Hương bạc hà mang lại cảm giác thơm mát sau khi chải.",
    keyIngredients: [
      "Tetrasodium Pyrophosphate",
      "Disodium Pyrophosphate",
      "Zinc Coco-Sulfate",
    ],
    benefits: [
      "Giúp hạn chế sự hình thành cao răng.",
      "Cho hơi thở thơm mát với hương bạc hà.",
    ],
    usageInstructions: productUsage.toothpaste,
    name: "Kem đánh răng 1905 cho người hút thuốc",
    line: "1905",
    volume: "75 ml",
    price: 162_000,
    image: cap005,
    sku: "CAP005",
    description: "Giúp ngăn ngừa và chống lại sự hình thành của cao răng. Hương bạc hà tươi mát cho bạn luôn có hơi thở thơm tho và nụ cười tự tin.",
    ingredients: "Aqua, Sorbitol, Hydrated Silica, Glycerin, Tetrasodium Pyrophosphate, Polysorbate 60, Aroma, Zinc Coco-Sulfate, Disodium Pyrophosphate, Cellulose Gum, Sodium Monofluorophosphate, Sodium Saccharin, Sodium Fluoride, Sodium Carbonate, CI 77891, CI 47005, CI 42051, Linalool, Limonene.",
  },
  {
    slug: "1905-nguyen-ban-huong-que",
    overview: "Kem đánh răng 1905 nguyên bản là phiên bản 75 ml với hương quế đặc trưng. Sản phẩm dùng để làm sạch mảng bám trong thói quen chải răng hằng ngày.\n\nTrong công thức, Zinc Coco-Sulfate đi cùng các thành phần tạo hương như Cinnamal và Eugenol.",
    keyIngredients: [
      "Zinc Coco-Sulfate",
      "Cinnamal",
      "Eugenol",
    ],
    benefits: [
      "Giúp làm sạch mảng bám khi chải răng.",
      "Giúp hạn chế mùi hôi miệng và làm thơm hơi thở.",
    ],
    usageInstructions: productUsage.toothpaste,
    name: "Kem đánh răng 1905 nguyên bản hương quế",
    line: "1905",
    volume: "75 ml",
    price: 162_000,
    image: cap006,
    sku: "CAP006",
    description: "Làm sạch mảng bám, ngăn ngừa chứng hôi miệng. Cho hơi thở thơm mát và nụ cười tự tin.",
    ingredients: "Sorbitol, Aqua, Hydrated Silica, Polysorbate 60, Aroma, Zinc Coco-Sulfate, Cellulose Gum, Sodium Monofluorophosphate, CI 77891, Sodium Saccharin, Sodium Carbonate, CI 47005 (D&C Yellow 10), CI 45430, Eugenol, Cinnamal, Geraniol, Limonene.",
  },
  {
    slug: "1905-trang-rang",
    overview: "Kem đánh răng 1905 trắng răng là phiên bản 75 ml dành cho nhu cầu làm sạch và giữ răng trông sáng hơn.\n\nCông thức có Cyclodextrin, Phthalimidoperoxycaproic Acid và Xylitol. Sản phẩm giúp răng trắng sáng và mang lại hơi thở thơm mát sau khi chải.",
    keyIngredients: [
      "Cyclodextrin",
      "Phthalimidoperoxycaproic Acid",
      "Xylitol",
    ],
    benefits: [
      "Giúp làm sạch răng miệng.",
      "Hỗ trợ răng trông trắng sáng hơn.",
      "Mang lại hơi thở thơm mát sau khi chải.",
    ],
    usageInstructions: productUsage.toothpaste,
    name: "Kem đánh răng 1905 trắng răng",
    line: "1905",
    volume: "75 ml",
    price: 162_000,
    image: cap007,
    sku: "CAP007",
    featured: true,
    description: "Kem đánh răng giúp làm sạch răng miệng, cho răng trắng sáng và cho hơi thở thơm mát.",
    ingredients: "Sorbitol, Aqua, Hydrated Silica, Xylitol, Cyclodextrin, Polysorbate 60, Aroma, Zinc Coco-Sulfate, Phthalimidoperoxycaproic Acid, Cellulose Gum, Sodium Saccharin, Sodium Fluoride, CI 77891, Jojoba Esters, Citric Acid, Palm Glyceride, CI 77289, Eugenol, Geraniol, Limonene.",
  },
  {
    slug: "1905-vitamin-ace",
    overview: "Kem đánh răng 1905 Vitamin ACE kết hợp các dạng vitamin A, C, E với chiết xuất rau má trong tuýp 75 ml. Đây là phiên bản dành cho thói quen chăm sóc răng và nướu hằng ngày.\n\nHương bạc hà để lại cảm giác dễ chịu sau khi chải.",
    keyIngredients: [
      "Retinyl Palmitate (vitamin A)",
      "Sodium Ascorbyl Phosphate (dẫn xuất vitamin C)",
      "Tocopheryl Acetate (dẫn xuất vitamin E)",
      "Centella Asiatica Extract (chiết xuất rau má)",
    ],
    benefits: [
      "Hỗ trợ chăm sóc và duy trì vệ sinh khoang miệng.",
      "Hỗ trợ chăm sóc nướu khi chải răng hằng ngày.",
    ],
    usageInstructions: productUsage.toothpaste,
    name: "Kem đánh răng 1905 bảo vệ toàn diện Vitamin ACE",
    line: "1905",
    volume: "75 ml",
    price: 162_000,
    image: cap008,
    sku: "CAP008",
    description: "Giúp bảo vệ toàn diện khoang miệng nhờ phức hợp vitamin và cây rau má kết hợp cùng hương thơm từ tinh dầu bạc hà hữu cơ. Giúp kháng viêm hiệu quả và chống lại tình trạng chảy máu chân răng.",
    ingredients: "Aqua, Sorbitol, Hydrated Silica, Xylitol, Polysorbate 60, Tetrasodium Pyrophosphate, Zinc Coco-Sulfate, Disodium Pyrophosphate, Aroma, Cellulose Gum, Jojoba Esters, Sodium Monofluorophosphate, Sodium Saccharin, Sodium Carbonate, Sodium Fluoride, Retinyl Palmitate, Tocopheryl Acetate, Propylene Glycol, Limonene, Linalool, Sodium Ascorbyl Phosphate, CI 77007, Centella Asiatica Extract, CI 42090, CI 47005.",
  },
  {
    slug: "1905-thao-moc",
    overview: "Kem đánh răng 1905 thảo mộc 75 ml kết hợp chiết xuất rau má, cúc tím, táo gai và địa y Iceland.\n\nSản phẩm dành cho người muốn bổ sung công thức có chiết xuất thực vật vào thói quen vệ sinh răng miệng hằng ngày.",
    keyIngredients: [
      "Centella Asiatica Extract (chiết xuất rau má)",
      "Echinacea Angustifolia Root Extract (chiết xuất rễ cúc tím)",
      "Crataegus Oxyacantha Extract (chiết xuất táo gai)",
      "Cetraria Islandica Extract (chiết xuất địa y Iceland)",
    ],
    benefits: [
      "Hỗ trợ làm sạch và duy trì vệ sinh khoang miệng hằng ngày.",
    ],
    usageInstructions: productUsage.toothpaste,
    name: "Kem đánh răng 1905 thảo mộc",
    line: "1905",
    volume: "75 ml",
    price: 162_000,
    image: cap009,
    sku: "CAP009",
    description: "Mang đến giải pháp chăm sóc toàn diện giúp bảo vệ và duy trì vệ sinh khoang miệng hiệu quả với sự kết hợp của Rau Má, Echinacea, Táo Gai và Địa Y Iceland.",
    ingredients: "Sorbitol, Aqua, Hydrated Silica, Xylitol, Glycerin, PEG-32, Zinc Coco-Sulfate, Aroma, Propylene Glycol, Cellulose Gum, Sodium Benzoate, Sodium Fluoride, Sodium Saccharin, Sodium Carbonate, Jojoba Esters, Centella Asiatica Extract, Cetraria Islandica Extract, Echinacea Angustifolia Root Extract, Crataegus Oxyacantha Extract, CI 77289, CI 47005 (D&C Yellow 10), CI 42090 (FD&C Blue 1), Limonene.",
  },
  {
    slug: "1905-rang-nhay-cam",
    overview: "Kem đánh răng 1905 răng nhạy cảm là phiên bản 75 ml dành cho người hay ê buốt khi ăn uống.\n\nCông thức chứa Potassium Nitrate, Hydroxyapatite và Betaine. Sản phẩm hướng đến việc chăm sóc răng nhạy cảm trong lúc chải hằng ngày.",
    keyIngredients: [
      "Potassium Nitrate",
      "Hydroxyapatite",
      "Betaine",
    ],
    benefits: [
      "Giúp giảm cảm giác ê buốt.",
      "Hỗ trợ bảo vệ răng nhạy cảm khi tiếp xúc với thức ăn và đồ uống.",
    ],
    usageInstructions: productUsage.toothpaste,
    name: "Kem đánh răng 1905 cho răng nhạy cảm",
    line: "1905",
    volume: "75 ml",
    price: 162_000,
    image: cap010,
    sku: "CAP010",
    description: "Giảm tình trạng ê buốt, bảo vệ răng khỏi sự tấn công của thức ăn và đồ uống.",
    ingredients: "Glycerin, Aqua, Hydrated Silica, Potassium Nitrate, Hydroxyapatite, Zinc Coco-Sulfate, Cellulose Gum, Aroma, PVM/MA Copolymer, Betaine, Sodium Carbonate, CI 77891, Sodium Saccharin, Tetrasodium Pyrophosphate, Glucomannan, Limonene.",
  },
  {
    slug: "1905-huong-chanh",
    overview: "Kem đánh răng 1905 hương chanh 75 ml có tinh dầu vỏ chanh, chiết xuất quả chanh và Menthol trong công thức.\n\nPhiên bản này dành cho nhu cầu vệ sinh răng miệng và chăm sóc nướu hằng ngày, với hương chanh tươi mát khi chải.",
    keyIngredients: [
      "Citrus Limon Peel Oil (tinh dầu vỏ chanh)",
      "Citrus Limon Fruit Extract (chiết xuất quả chanh)",
      "Menthol",
    ],
    benefits: [
      "Giúp duy trì vệ sinh khoang miệng.",
      "Hỗ trợ chăm sóc nướu.",
      "Giúp hạn chế mùi hôi miệng.",
    ],
    usageInstructions: productUsage.toothpaste,
    name: "Kem đánh răng 1905 hương chanh",
    line: "1905",
    volume: "75 ml",
    price: 162_000,
    image: lemon1905,
    description: "Giúp duy trì vệ sinh khoang miệng, hỗ trợ nướu khỏe mạnh và hạn chế mùi hôi miệng.",
    ingredients: "Sorbitol, Aqua, Hydrated Silica, Calcium Carbonate, Polysorbate 60, Zinc Coco-Sulfate, Cellulose Gum, Menthol, Limonene, Aroma, Sodium Saccharin, Citrus Limon Peel Oil, Citral, Citrus Limon Fruit Extract, Pinene, Linalyl Acetate, Linalool, Terpineol, Camphor, Beta-Caryophyllene, Geranyl Acetate, Geraniol, Terpinolene.",
  },
  {
    slug: "maxi-baking-soda",
    overview: "Maxi Baking Soda là kem đánh răng tuýp 100 ml, tập trung vào việc làm sáng màu răng tự nhiên và chăm sóc khoang miệng hằng ngày.\n\nCác thành phần được liệt kê trong công thức gồm Calcium Carbonate, Hydrated Silica và tinh dầu bạc hà.",
    keyIngredients: [
      "Calcium Carbonate",
      "Hydrated Silica",
      "Mentha Piperita Oil (tinh dầu bạc hà)",
    ],
    benefits: [
      "Giúp trung hòa axit từ mảng bám và cân bằng pH khoang miệng.",
      "Hỗ trợ phục hồi màu trắng tự nhiên của răng.",
    ],
    usageInstructions: productUsage.toothpaste,
    name: "Kem đánh răng Maxi Baking Soda",
    line: "maxi",
    volume: "100 ml",
    price: 135_000,
    image: bakingSoda,
    description: "Trung hòa axit mảng bám, điều chỉnh độ pH trong khoang miệng, giúp phục hồi màu trắng tự nhiên của răng.",
    ingredients: "Glycerin, Hydrated Silica, Aqua (Water), Sorbitol, Calcium Carbonate, Polysorbate 60, Zinc Coco-Sulfate, Cellulose Gum, Menthol, Anethole, Sodium Saccharin, Mentha Viridis Leaf Oil, Carvone, Aroma (Hương liệu), Mentha Piperita Oil, Eugenol, Limonene, Geraniol, Beta-Caryophyllene, Beta-Pinenes, Alpha-Pinenes.",
  },
  {
    slug: "maxi-giam-cao-rang",
    overview: "Maxi giảm cao răng là kem đánh răng tuýp 100 ml dành cho nhu cầu làm sạch khoang miệng và hạn chế cao răng tích tụ.\n\nCông thức có Tetrasodium Pyrophosphate, kết hợp chiết xuất cỏ xạ hương và xô thơm.",
    keyIngredients: [
      "Tetrasodium Pyrophosphate",
      "Thymus vulgaris Flower/Leaf Extract (chiết xuất cỏ xạ hương)",
      "Salvia Officinalis Extract (chiết xuất xô thơm)",
    ],
    benefits: [
      "Giúp làm sạch khoang miệng khi chải răng.",
      "Hỗ trợ hạn chế cao răng tích tụ.",
    ],
    usageInstructions: productUsage.toothpaste,
    name: "Kem đánh răng Maxi hỗ trợ giảm hình thành cao răng",
    line: "maxi",
    volume: "100 ml",
    price: 135_000,
    image: tartarControl,
    description: "Giúp làm sạch khoang miệng, ngăn ngừa tình trạng tích tụ cao răng.",
    ingredients: "Aqua, Sorbitol, Hydrated silica, Glycerin, Calcium carbonate,Polysorbate 60, Zinc coco-sulfate, Aroma, Cellulose gum, Propylene glycol, Sodium monofluorophosphate, Sodium saccharin, Tetrasodium pyrophosphate, Zinc lactate, Sodium fluoride, Zinc citrate, Thymusvulgaris flower/leaf extract, Salvia officinalis extract, Linalool, Limonene, CI 47005, CI 42051.",
  },
  {
    slug: "maxi-lam-sach-mang-bam",
    overview: "Maxi làm sạch mảng bám là kem đánh răng tuýp 100 ml dành cho thói quen vệ sinh răng miệng mỗi ngày.\n\nCông thức có Tetrasodium Pyrophosphate, muối fluor và tinh dầu bạc hà. Sản phẩm tập trung vào làm sạch khoang miệng và hạn chế sự hình thành cao răng.",
    keyIngredients: [
      "Tetrasodium Pyrophosphate",
      "Sodium Monofluorophosphate (muối fluor)",
      "Mentha Piperita Oil (tinh dầu bạc hà)",
    ],
    benefits: [
      "Giúp làm sạch khoang miệng và mảng bám khi chải.",
      "Hỗ trợ hạn chế sự hình thành cao răng.",
    ],
    usageInstructions: productUsage.toothpaste,
    name: "Kem đánh răng Maxi làm sạch mảng bám",
    line: "maxi",
    volume: "100 ml",
    price: 135_000,
    image: plaqueControl,
    description: "Giúp làm sạch khoang miệng, ngăn ngừa tình trạng hình thành cao răng.",
    ingredients: "Aqua, Glycerin, Hydrated Silica, Calcium Carbonate, Zinc Coco-Sulfate, Cellulose Gum, Menthol, Sodium Monofluorophosphate, Sodium Saccharin, Anethole, Aroma, Tetrasodium Pyrophosphate, Mentha Piperita Oil, Eugenol, Mentha Viridis Leaf Oil, Carvone, Limonene, Geraniol, Beta-Pinenes, Eugenia Caryophyllus Oil, Alpha-Pinenes, Beta-Caryophyllene, Linalool.",
  },
  {
    slug: "nuoc-suc-mieng-junior-6-bac-ha",
    overview: "Nước súc miệng Junior 6+ hương bạc hà là bước chăm sóc bổ sung sau khi chải răng cho trẻ từ 6 tuổi. Sản phẩm có dung tích 400 ml.\n\nCông thức có muối fluor, muối canxi và chiết xuất hoa cúc kim tiền để hỗ trợ chăm sóc men răng và nướu.",
    keyIngredients: [
      "Sodium Monofluorophosphate (muối fluor)",
      "Calcium Glycerophosphate (muối canxi)",
      "Calendula Officinalis Extract (chiết xuất hoa cúc kim tiền)",
      "Malva Sylvestris Extract",
    ],
    benefits: [
      "Hỗ trợ làm sạch khoang miệng.",
      "Giúp bảo vệ men răng và phòng ngừa sâu răng.",
      "Hỗ trợ làm dịu nướu.",
    ],
    usageInstructions: productUsage.juniorMouthwash,
    name: "Nước súc miệng Junior 6+ hương bạc hà",
    line: "mouthwash",
    volume: "400 ml",
    price: 162_000,
    image: cap004,
    sku: "CAP004",
    description: "Làm dịu và giảm viêm nướu, sạch khuẩn khoan miệng, bảo vệ men răng và ngừa sâu răng. An toàn cho cả giai đoạn niềng răng.",
    ingredients: "Aqua, Glycerin, Propylene Glycol, Betaine, PPG-26-Buteth-26, PEG-40 Hydrogenated Castor Oil, Sodium Benzoate, Sodium Monofluorophosphate, Calcium Glycerophosphate, Calendula Officinalis Extract, Malva Sylvestris Extract, Lactic Acid, Sodium Lactate, Sodium Bicarbonate, 2-Bromo-2-Nitropropane-1,3-Diol, Zinc Coco-Sulfate, Sodium Saccharin, Aroma, CI 42051, CI 47005.",
  },
  {
    slug: "nuoc-suc-mieng-lam-trang-rang",
    overview: "Nước súc miệng làm trắng răng 400 ml là bước chăm sóc bổ sung cho người muốn làm sạch mảng bám và giữ răng trông sáng hơn.\n\nCông thức có PVP, Potassium Citrate và Betaine. Sản phẩm đồng thời giúp hơi thở thơm mát sau khi súc miệng.",
    keyIngredients: [
      "PVP",
      "Potassium Citrate",
      "Betaine",
    ],
    benefits: [
      "Giúp loại bỏ mảng bám và làm sạch khoang miệng.",
      "Hỗ trợ răng trông trắng sáng hơn.",
      "Cho hơi thở thơm mát sau khi súc miệng.",
    ],
    usageInstructions: productUsage.mouthwash,
    name: "Nước súc miệng làm trắng răng",
    line: "mouthwash",
    volume: "400 ml",
    price: 135_000,
    image: cap011,
    sku: "CAP011",
    featured: true,
    description: "Nước súc miệng giúp làm sạch răng, loại bỏ mảng bám giúp làm sạch khoang miệng, cho răng trắng sáng và cho cho hơi thở thơm mát. (Không sử dụng cho trẻ em dưới 6 tuổi).",
    ingredients: "Aqua, Glycerin, Alcohol Denat., Potassium Citrate, Betaine, PVP, Polysorbate 20, PEG-40 Hydrogenated Castor Oil, Sodium Benzoate, Sodium Lactate, Aroma, Lactic Acid, Sodium Bicarbonate, Sodium Fluoride, 2-Bromo-2-Nitropropane-1,3-Diol, Sodium Monofluorophosphate, Zinc Coco-Sulfate, Sodium Saccharin, CI 47005, CI 42051, Limonene, Eugenol, Geraniol.",
  },
  {
    slug: "nuoc-suc-mieng-loai-bo-mang-bam",
    overview: "Nước súc miệng loại bỏ mảng bám 400 ml bổ sung bước làm sạch sau khi chải răng. Phiên bản này dành cho nhu cầu làm sạch mảng bám và giữ hơi thở thơm mát.\n\nCông thức kết hợp Zinc Citrate, Zinc Coco-Sulfate và chiết xuất rau má.",
    keyIngredients: [
      "Zinc Citrate",
      "Zinc Coco-Sulfate",
      "Centella Asiatica Extract (chiết xuất rau má)",
    ],
    benefits: [
      "Hỗ trợ loại bỏ mảng bám trên răng.",
      "Giúp làm sạch khoang miệng.",
      "Cho hơi thở thơm mát sau khi súc miệng.",
    ],
    usageInstructions: productUsage.mouthwash,
    name: "Nước súc miệng loại bỏ mảng bám",
    line: "mouthwash",
    volume: "400 ml",
    price: 135_000,
    image: cap012,
    sku: "CAP012",
    description: "Nước súc miệng giúp làm sạch răng, loại bỏ mảng bám giúp làm sạch khoang miệng, cho hơi thở thơm mát. (Không sử dụng cho trẻ em dưới 6 tuổi).",
    ingredients: "Aqua, Propylene Glycol, PEG-40 Hydrogenated Castor Oil, Sodium Benzoate, Polysorbate 20, Aroma, Lactic Acid, Sodium Lactate, Sodium Bicarbonate, Zinc Coco-Sulfate, Zinc Citrate, Sodium Fluoride, Centella Asiatica Extract, 2-Bromo-2-Nitropropane-1,3-Diol, Sodium Saccharin, Eugenol, Limonene, Geraniol, CI 42051, CI 47005.",
  },
  {
    slug: "xit-thom-mieng-fresco",
    overview: "Fresco là xịt thơm miệng 15 ml, gọn để mang theo khi đi làm hoặc đi ra ngoài.\n\nCông thức có chiết xuất keo ong, tinh dầu bạc hà và hợp chất kẽm. Sản phẩm giúp làm sạch khoang miệng và làm thơm hơi thở khi cần.",
    keyIngredients: [
      "Propolis Extract (chiết xuất keo ong)",
      "Mentha Piperita Oil (tinh dầu bạc hà)",
      "Zinc Coco-Sulfate",
    ],
    benefits: [
      "Giúp làm sạch khoang miệng.",
      "Giúp giảm mùi hôi miệng và cho hơi thở thơm mát.",
    ],
    usageInstructions: productUsage.fresco,
    name: "Xịt thơm miệng Fresco",
    line: "fresco",
    volume: "15 ml",
    price: 135_000,
    image: cap018,
    sku: "CAP018",
    featured: true,
    description: "Sản phẩm dạng xịt giúp làm sạch răng miệng, loại bỏ mảng bám, cho hơi thở thơm mát.",
    ingredients: "Aqua, Xylitol, PEG-40 Hydrogenated Castor Oil, Glycerin, Polysorbate 20, Propylene Glycol, Menthol, Sodium Benzoate, Aroma, Mentha Piperita Oil, Citric Acid, Sodium Saccharin, Sodium Citrate, Zinc Lactate, Anethole, Linalool, Mentha Viridis Leaf Oil, Carvone, Limonene, Zinc Citrate, Propolis Extract, Beta-Pinenes, Zinc Coco-Sulfate, Alpha-Pinenes, Beta-Caryophyllene, Menthyl Succinate.",
  },
];

const products: CatalogProduct[] = localProducts.map(product => {
  const id = `capitano-${product.slug}`;
  return {
    id,
    slug: product.slug,
    code: product.sku || id,
    name: product.name,
    shortName: product.volume,
    categoryId: lines[product.line].categoryId,
    productLineId: product.line,
    careNeeds: oralCareNeeds.filter(need => need.productSlugs.includes(product.slug)).map(need => need.title),
    description: product.description,
    overview: product.overview,
    keyIngredients: product.keyIngredients.join("\n"),
    ingredients: product.ingredients,
    usageInstructions: product.usageInstructions,
    benefits: product.benefits.join("\n"),
    imageUrl: product.image,
    isFeatured: product.featured,
    isBestSeller: product.isBestSeller,
    publishedAt: product.publishedAt,
    variants: [{
      id,
      sku: product.sku || "",
      name: product.volume,
      listPrice: product.price,
      sellingPrice: product.price,
    }],
  };
});

export const capitanoAnnouncement = {
  id: "capitano-announcement",
  isActive: true,
  message: "Pasta del Capitano Việt Nam · Chăm sóc răng miệng từ Ý",
  partnerLabel: "Phân phối bởi",
  partnerLogoUrl: picareLogo,
  partnerLogoAlt: "Picare Việt Nam",
  mobileMessage: "Capitano Việt Nam",
};

export const capitanoContent: CmsContent = {
  announcement: capitanoAnnouncement,
  header: { id: "capitano-header", isActive: true, showCart: true },
  menu: [
    { id: "home", isActive: true, label: "Về chúng tôi", linkUrl: PATHS.HOME },
    { id: "shop", isActive: true, label: "Danh mục sản phẩm", linkUrl: PATHS.SHOP },
    { id: "shop-by-type", parentId: "shop", isActive: true, label: "Theo loại sản phẩm" },
    ...productTypes.map(type => ({
      id: `shop-type-${type.id}`,
      parentId: "shop-by-type",
      isActive: true,
      label: type.name,
      linkUrl: `${PATHS.SHOP}?category=${type.code}`,
    })),
    { id: "shop-by-line", parentId: "shop", isActive: true, label: "Theo dòng sản phẩm" },
    ...(["1905", "maxi", "junior"] as const).map(id => ({
      id: `shop-line-${id}`,
      parentId: "shop-by-line",
      isActive: true,
      label: id === "junior" ? "Kem đánh răng trẻ em" : lines[id].name,
      linkUrl: `${PATHS.SHOP}?collection=${id}`,
    })),
    { id: "news", isActive: true, label: "Tin tức" },
    { id: "news-all", parentId: "news", isActive: true, label: "Tất cả tin tức", linkUrl: PATHS.NEWS },
    ...publishedNewsCategories.map(category => ({
      id: `news-category-${category.value}`,
      parentId: "news",
      isActive: true,
      label: category.label,
      linkUrl: `${PATHS.NEWS}?category=${category.value}`,
    })),
  ],
  newsletter: {
    id: "capitano-newsletter",
    isActive: true,
    titleLine1: "Nhận tin từ Capitano",
    description: "Đăng ký để nhận thông tin về sản phẩm mới và ưu đãi từ Pasta del Capitano qua email.",
    inputPlaceholder: "Nhập địa chỉ email của bạn",
    buttonLabel: "Đăng ký",
  },
  products,
  productTypes,
  productLines: Object.entries(lines).map(([id, line]) => ({
    id,
    code: id,
    slug: id,
    name: line.name,
  })),
  skinNeedSection: {
    id: "capitano-oral-care-needs",
    isActive: true,
    title: "Chọn theo nhu cầu chăm sóc răng miệng",
    linkLabel: "Xem sản phẩm",
  },
  skinNeeds: oralCareNeeds.map(need => ({
    id: need.id,
    isActive: true,
    title: need.title,
    imageUrl: need.image,
    linkUrl: `${PATHS.SHOP}?concern=${encodeURIComponent(need.title)}`,
  })),
  featuredLines: [{
    id: "capitano-featured-1905",
    isActive: true,
    productLineId: "1905",
    title: "Kem đánh răng 1905",
    description: "Từ hương quế nguyên bản đến Vitamin ACE và phiên bản dành cho răng nhạy cảm.",
    products: products.filter(product => ["CAP006", "CAP008", "CAP010"].includes(product.code)),
  }],
  underBanner: {
    id: "capitano-fresco-campaign",
    isActive: true,
    imageUrl: frescoBanner,
    imageAlt: "Banner Fresco của Pasta del Capitano với chai xịt, lá bạc hà và thông điệp 4 không",
    buttonLabel: "Xem Fresco",
    buttonLinkUrl: PATHS.product("xit-thom-mieng-fresco"),
  },
  shopHero: {
    id: "capitano-shop",
    isActive: true,
    subtitle: "Pasta del Capitano",
    titleLine1: "Tất cả sản phẩm",
    description: "Khám phá các dòng kem đánh răng, nước súc miệng và xịt thơm miệng Capitano.",
  },
};
