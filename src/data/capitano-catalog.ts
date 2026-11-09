import type { CatalogProduct, CatalogType, CmsContent } from "@/hooks/data/useCmsContent";
import { PATHS } from "@/config/paths";
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

type LocalProduct = {
  slug: string;
  name: string;
  line: keyof typeof lines;
  volume: string;
  price: number;
  image: string;
  sku?: string;
  featured?: boolean;
  description: string;
  ingredients: string;
};

// One photographed retail format per product. Missing official SKUs stay blank.
const localProducts: LocalProduct[] = [
  {
    slug: "tre-em-3-huong-dau",
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
    description: product.description,
    ingredients: product.ingredients,
    imageUrl: product.image,
    isFeatured: product.featured,
    variants: [{
      id,
      sku: product.sku || "",
      name: product.volume,
      listPrice: product.price,
      sellingPrice: product.price,
    }],
  };
});

export const capitanoContent: CmsContent = {
  announcement: null,
  header: { id: "capitano-header", isActive: true, showCart: true },
  menu: [
    { id: "home", isActive: true, label: "Trang chủ", linkUrl: PATHS.HOME },
    { id: "shop", isActive: true, label: "Tất cả sản phẩm", linkUrl: PATHS.SHOP },
  ],
  newsletter: null,
  products,
  productTypes,
  productLines: Object.entries(lines).map(([id, line]) => ({
    id,
    code: id,
    slug: id,
    name: line.name,
  })),
  shopHero: {
    id: "capitano-shop",
    isActive: true,
    subtitle: "Pasta del Capitano",
    titleLine1: "Tất cả sản phẩm",
    description: "Khám phá các dòng kem đánh răng, nước súc miệng và xịt thơm miệng Capitano.",
  },
};
