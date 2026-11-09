import { NEWS_CATEGORIES } from "@/config/routes.config";

export type NewsCategory = (typeof NEWS_CATEGORIES)[number]["value"];
export interface NewsArticle {
  slug: string;
  category: NewsCategory;
  title: string;
  description: string;
  intro: string;
  published: string;
  sections: {
    id: string;
    title: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
  faqs: { question: string; answer: string }[];
  productIds: string[];
  sources: { title: string; url: string }[];
  note?: string;
}

const testingSource = {
  title: "American Academy of Dermatology: How to test skin care products",
  url: "https://www.aad.org/public/everyday-care/skin-care-secrets/prevent-skin-problems/test-skin-care-products/",
};
const routineSource = {
  title: "American Academy of Dermatology: Skin care on a budget",
  url: "https://www.aad.org/public/everyday-care/skin-care-basics/care/skin-care-budget",
};
const maskSource = {
  title: "American Academy of Dermatology: Facial masks and skin care",
  url: "https://www.aad.org/public/everyday-care/skin-care-secrets/routine/facial-masks-and-skin-care",
};
const productNote =
  "Bài viết tổng hợp thông tin trong danh mục sản phẩm PaxMoly hiện có, không phải đánh giá sau thử nghiệm thực tế. Thành phần đầy đủ và hướng dẫn trên bao bì của sản phẩm bạn nhận được là thông tin cần đối chiếu trước khi dùng.";

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    slug: "dong-cica-paxmoly-gom-nhung-san-pham-nao",
    category: "hoat-dong-noi-bat",
    title: "Dòng CICA PaxMoly gồm những sản phẩm nào?",
    description:
      "Khám phá 5 sản phẩm thuộc dòng CICA PaxMoly: sữa rửa mặt, toner, serum, kem dưỡng và mặt nạ rau má. Chọn từng bước theo nhu cầu của bạn.",
    intro:
      "CICA là tên dòng sản phẩm rau má đang được giới thiệu tại cửa hàng PaxMoly Vietnam. Bộ sưu tập hiện có năm lựa chọn, từ làm sạch đến dưỡng ẩm. Bạn có thể tìm hiểu từng món trước khi quyết định bổ sung bước nào vào chu trình đang dùng.",
    published: "2026-10-05",
    sections: [
      {
        id: "nam-san-pham",
        title: "Năm sản phẩm trong bộ sưu tập CICA",
        paragraphs: [
          "Danh mục hiện tại tập hợp các sản phẩm có tên Cica hoặc rau má. Mỗi loại có một vai trò khác nhau; cùng thuộc một dòng không có nghĩa là có thể thay thế cho nhau.",
        ],
        bullets: [
          "Perfect Cica Foam Cleanser — sữa rửa mặt rau má, 100 ml.",
          "Dr.jk Multi Solution Vitamin Cica Toner — toner rau má, 160 ml.",
          "5X Plus Cica Madeca Serum — tinh chất rau má, 30 ml.",
          "Centella Cica 5X Repair Cream — kem dưỡng rau má, 100 g.",
          "Real Cica Mask Pack — mặt nạ rau má, gói 25 ml.",
        ],
      },
      {
        id: "chon-buoc",
        title: "Chọn sản phẩm theo bước bạn đang thiếu",
        paragraphs: [
          "Nếu đã có sản phẩm làm sạch và kem dưỡng phù hợp, bạn không cần đổi toàn bộ chu trình để dùng cùng một dòng. Hãy xem bước nào đang cần được bổ sung, rồi đọc thông tin của đúng sản phẩm đó.",
          "Sữa rửa mặt là sản phẩm rửa trôi, trong khi toner, serum và kem dưỡng thường thuộc nhóm lưu lại trên da. Mặt nạ là một lựa chọn bổ sung, không phải yêu cầu bắt buộc để hoàn thành bộ CICA. Việc chọn ít sản phẩm nhưng hiểu rõ cách dùng giúp bạn theo dõi làn da dễ hơn.",
        ],
      },
      {
        id: "doc-nhan",
        title: "Tên CICA không thay cho bảng thành phần",
        paragraphs: [
          "Tên dòng cho biết định hướng giới thiệu sản phẩm, nhưng không phản ánh toàn bộ công thức. Khi so sánh hai món, hãy kiểm tra bảng thành phần đầy đủ, loại sản phẩm, dung tích và hướng dẫn sử dụng trên bao bì.",
          "Danh mục website nêu một số thành phần nổi bật, không phải toàn bộ INCI. Chúng tôi không dùng tên rau má để khẳng định sản phẩm không gây kích ứng hoặc phù hợp với tất cả mọi người. Nếu có thành phần từng gây phản ứng cho bạn, cần đối chiếu nhãn trước khi mua.",
        ],
      },
      {
        id: "xem-bo-suu-tap",
        title: "Tìm đúng sản phẩm CICA tại cửa hàng",
        paragraphs: [
          "Nút xem bộ sưu tập đưa bạn đến cửa hàng với bộ lọc CICA đã chọn. Tại đó, năm sản phẩm được hiển thị cùng ảnh, dung tích, thông tin chính và giá đang áp dụng. Bạn có thể mở từng trang sản phẩm để đọc kỹ hơn trước khi thêm vào giỏ.",
          "Thông tin trong bài là giới thiệu danh mục đang có, không phải thông báo về một sự kiện ra mắt hay một chương trình ưu đãi. Nếu bạn cần kiểm tra hàng hoặc thông tin nhãn, hãy liên hệ hotline 0916.16.3516 trước khi đặt mua.",
        ],
      },
    ],
    faqs: [
      {
        question: "Có cần mua cả bộ CICA không?",
        answer:
          "Không. Bạn có thể chọn sản phẩm theo bước đang cần bổ sung, thay vì mua cả năm món. Cùng một dòng không đồng nghĩa với việc phải dùng đồng thời.",
      },
      {
        question: "Dòng CICA có cả serum và mặt nạ không?",
        answer:
          "Có. Bộ sưu tập hiện có 5X Plus Cica Madeca Serum và Real Cica Mask Pack, bên cạnh sữa rửa mặt, toner và kem dưỡng.",
      },
    ],
    productIds: [
      "cleanser-cica",
      "toner-cica",
      "serum-cica",
      "cream-cica",
      "mask-cica",
    ],
    sources: [
      {
        title: "Danh mục CICA tại PaxMoly Vietnam",
        url: "/cua-hang?collection=cica",
      },
    ],
    note: productNote,
  },
  {
    slug: "thu-tu-skincare-co-ban-toner-serum-kem-duong",
    category: "kien-thuc-lam-dep",
    title: "Thứ tự skincare cơ bản: toner, serum và kem dưỡng",
    description:
      "Hiểu vai trò của làm sạch, toner, serum, kem dưỡng và chống nắng để xây dựng chu trình chăm sóc da đơn giản, không thêm bước chỉ vì trào lưu.",
    intro:
      "Một chu trình chăm sóc da dễ duy trì không nhất thiết có nhiều bước. Trước khi hỏi toner hay serum dùng trước, hãy xác định các bước cơ bản bạn đã có và đọc hướng dẫn của từng sản phẩm. Thứ tự tham khảo dưới đây dành cho mỹ phẩm chăm sóc thông thường, không thay cho hướng dẫn dùng thuốc.",
    published: "2026-10-05",
    sections: [
      {
        id: "nen-tang",
        title: "Bắt đầu từ làm sạch, dưỡng ẩm và bảo vệ da",
        paragraphs: [
          "Theo American Academy of Dermatology, một chu trình đơn giản có thể tập trung vào làm sạch, dưỡng ẩm và bảo vệ da khỏi nắng. Đây là nền tảng trước khi bạn cân nhắc toner, serum hoặc mặt nạ.",
          "Hãy ghi lại những sản phẩm đang dùng theo vai trò thay vì chỉ theo thương hiệu. Nếu hai sản phẩm phục vụ cùng một bước, bạn có thể cân nhắc chọn một món dễ sử dụng hơn, thay vì mặc định xếp cả hai vào chu trình.",
        ],
      },
      {
        id: "thu-tu",
        title: "Toner, serum, kem dưỡng được đặt ở đâu?",
        paragraphs: [
          "Với các sản phẩm chăm sóc thông thường, thứ tự tham khảo là làm sạch, toner nếu dùng, serum rồi kem dưỡng. Ban ngày cần có bước bảo vệ da khỏi nắng. Nếu bao bì có chỉ dẫn riêng, ưu tiên hướng dẫn của sản phẩm thay vì một công thức chung trên mạng.",
          "Toner không phải điều kiện bắt buộc để dùng serum. Serum cũng không thay thế được mọi vai trò của kem dưỡng chỉ vì có thành phần liên quan đến dưỡng ẩm. Hãy xác định sản phẩm nào phù hợp với nhu cầu và cách sử dụng của bạn.",
        ],
        bullets: [
          "Buổi sáng: làm sạch phù hợp → bước dưỡng đang cần → bảo vệ da khỏi nắng.",
          "Buổi tối: làm sạch → toner nếu có → serum nếu cần → kem dưỡng.",
          "Thuốc bôi hoặc liệu trình riêng: theo hướng dẫn của người điều trị.",
        ],
      },
      {
        id: "bot-buoc",
        title: "Không thêm sản phẩm chỉ để đủ một chu trình mẫu",
        paragraphs: [
          "Một danh sách nhiều bước có thể khiến bạn mua những món chưa thực sự cần. Hãy thử đặt câu hỏi: sản phẩm này bổ sung điều gì mà các món hiện tại chưa có? Bạn có thể duy trì bước này đều đặn hay không?",
          "Khi tìm hiểu sản phẩm PaxMoly, xem loại sản phẩm, tên đầy đủ và mục đích được mô tả ở trang chi tiết. Đừng dùng giá hoặc tên hoạt chất làm tiêu chí duy nhất. Nồng độ xuất hiện trong tên không phải điểm số để xếp sản phẩm tốt hơn cho mọi làn da.",
        ],
      },
      {
        id: "theo-doi",
        title: "Theo dõi chu trình thay vì đổi nhiều món cùng lúc",
        paragraphs: [
          "Bạn có thể ghi tên sản phẩm mới và ngày bắt đầu sử dụng để dễ đối chiếu với cảm nhận của mình. Khi chưa hiểu phản ứng của da, tránh đưa nhiều món mới vào cùng một thời điểm.",
          "Nếu đã có lịch chăm sóc được bác sĩ hướng dẫn, không tự thay bằng chu trình trong bài. Nội dung này giúp bạn hiểu vị trí của sản phẩm trong một routine cơ bản, không đánh giá tình trạng da hay đưa ra phác đồ điều trị.",
        ],
      },
    ],
    faqs: [
      {
        question: "Không dùng toner có dùng serum được không?",
        answer:
          "Toner không phải bước bắt buộc trong mọi chu trình. Hãy xem hướng dẫn của serum và các bước chăm sóc đang có trước khi thêm toner.",
      },
      {
        question: "Serum dưỡng ẩm có thay kem chống nắng không?",
        answer:
          "Không. Một serum không được ghi là sản phẩm chống nắng không thay thế được bước bảo vệ da khỏi nắng.",
      },
    ],
    productIds: ["serum-hyaluronic", "cream-cica"],
    sources: [routineSource],
  },
  {
    slug: "da-nhay-cam-thu-san-pham-moi-nhu-the-nao",
    category: "kien-thuc-lam-dep",
    title: "Da nhạy cảm: thử sản phẩm mới như thế nào?",
    description:
      "Những điều cần kiểm tra khi chọn mỹ phẩm cho da nhạy cảm: nhãn thành phần, thử trên vùng nhỏ và phân biệt thử tại nhà với patch test y khoa.",
    intro:
      "Nhãn “cho da nhạy cảm”, tên CICA hoặc chiết xuất thiên nhiên không bảo đảm rằng một mỹ phẩm phù hợp với mọi người. Khi đổi sản phẩm, việc đọc nhãn và thử trước giúp bạn đưa ra lựa chọn thận trọng hơn, thay vì chỉ dựa vào một lời giới thiệu.",
    published: "2026-10-05",
    sections: [
      {
        id: "kiem-tra-nhan",
        title: "Kiểm tra nhãn trước khi xem lời quảng cáo",
        paragraphs: [
          "Bắt đầu bằng tên sản phẩm, loại rửa trôi hay lưu lại trên da, bảng thành phần đầy đủ và hướng dẫn dùng. Nếu bạn đã biết mình phản ứng với một thành phần, thông tin trên nhãn quan trọng hơn tên dòng hay màu sắc bao bì.",
          "Danh sách thành phần nổi bật trên website là bản tóm tắt. Để kiểm tra một chất cụ thể, bạn cần bảng INCI đầy đủ của phiên bản đang mua. Có thể hỏi cửa hàng ảnh nhãn nếu thông tin đó chưa rõ.",
        ],
      },
      {
        id: "thu-vung-nho",
        title: "Thử trên vùng nhỏ theo hướng dẫn tham khảo",
        paragraphs: [
          "AAD khuyến nghị thử sản phẩm trên một vùng nhỏ, như mặt trong cánh tay hoặc nếp khuỷu, trước khi dùng rộng hơn. Hướng dẫn tham khảo của tổ chức này là hai lần mỗi ngày trong 7–10 ngày, với lượng dùng thông thường; thời gian lưu của sản phẩm rửa trôi cần theo nhãn.",
          "Nếu vùng thử đỏ, ngứa hoặc sưng, ngừng dùng và rửa nhẹ sản phẩm. Phản ứng nặng hoặc không cải thiện cần được bác sĩ đánh giá. Một lần thử không phản ứng cũng không bảo đảm bạn sẽ không gặp phản ứng về sau.",
        ],
      },
      {
        id: "khong-phai-chan-doan",
        title: "Thử tại nhà khác với patch test y khoa",
        paragraphs: [
          "Thử một mỹ phẩm tại nhà không phải xét nghiệm để xác định chất gây dị ứng. Khi có phản ứng lặp lại hoặc chưa rõ nguyên nhân, bác sĩ có thể cần kiểm tra chuyên biệt. Đừng dùng kết quả thử tại nhà để tự kết luận rằng mình dị ứng với cả một nhóm hoạt chất.",
          "Việc ghi lại tên sản phẩm, ảnh nhãn và thời điểm có phản ứng sẽ giúp bạn mô tả tình huống rõ hơn khi đi khám. Bài viết này không chẩn đoán da nhạy cảm hoặc hướng dẫn điều trị dị ứng.",
        ],
      },
      {
        id: "chon-co-thong-tin",
        title: "Chọn mỹ phẩm với thông tin có thể đối chiếu",
        paragraphs: [
          "Ở mục nhu cầu làn da của PaxMoly, bộ lọc là điểm bắt đầu để xem sản phẩm, không phải kết luận về độ phù hợp của từng người. Hãy mở trang chi tiết, kiểm tra dung tích và mục đích sử dụng, rồi đối chiếu thành phần trên bao bì.",
          "Với sản phẩm CICA, tên rau má không thay thế bước kiểm tra công thức. Nếu bạn đang điều trị một tình trạng da hoặc dùng thuốc bôi, nên hỏi người điều trị trước khi thay đổi các sản phẩm đang dùng.",
        ],
      },
    ],
    faqs: [
      {
        question: "Sản phẩm thiên nhiên có chắc không gây kích ứng không?",
        answer:
          "Không. Tên chiết xuất thiên nhiên không đủ để kết luận độ phù hợp; cần xem công thức đầy đủ và phản ứng của từng người.",
      },
      {
        question: "Thử sản phẩm tại nhà có tìm được chất gây dị ứng không?",
        answer:
          "Không thay thế được kiểm tra y khoa. Nếu phản ứng lặp lại hoặc nghiêm trọng, cần gặp bác sĩ thay vì tự thử liên tục nhiều sản phẩm.",
      },
    ],
    productIds: ["cleanser-cica", "cream-cica"],
    sources: [testingSource],
  },
  {
    slug: "cach-chon-mat-na-paxmoly-theo-nhu-cau-da",
    category: "kien-thuc-lam-dep",
    title: "Cách chọn mặt nạ PaxMoly theo nhu cầu làn da",
    description:
      "So sánh mặt nạ CICA, Hyaluronic Acid và Retinol PaxMoly theo thông tin danh mục. Đọc nhãn, thời gian đắp và vai trò của mặt nạ trong routine.",
    intro:
      "Mặt nạ giấy là một bước bổ sung, không phải món bắt buộc trong mọi chu trình. Khi chọn mặt nạ PaxMoly, bạn nên bắt đầu từ nhu cầu hiện tại, thông tin thành phần và hướng dẫn trên gói thay vì chọn theo màu bao bì hoặc tên hoạt chất đang phổ biến.",
    published: "2026-10-05",
    sections: [
      {
        id: "vai-tro",
        title: "Mặt nạ là bước bổ sung cho chu trình",
        paragraphs: [
          "AAD lưu ý mặt nạ không thay thế chăm sóc hằng ngày hay điều trị các bệnh da như mụn và chàm. Vì vậy, hãy nhìn mặt nạ như một lựa chọn thêm vào, không phải cách bù cho toàn bộ routine chưa phù hợp.",
          "Bạn không cần mua nhiều loại cùng lúc để so sánh. Một lựa chọn có nhãn rõ ràng, phù hợp với các sản phẩm đang dùng sẽ dễ tìm hiểu hơn một bộ nhiều gói có mục đích chồng chéo.",
        ],
      },
      {
        id: "so-sanh",
        title: "Ba lựa chọn trong danh mục PaxMoly",
        paragraphs: [
          "Danh mục website giới thiệu các mặt nạ theo thành phần và nhu cầu chăm sóc. Các mô tả sau là cách phân nhóm sản phẩm, không phải kết quả thử nghiệm để xếp hạng hiệu quả.",
        ],
        bullets: [
          "Real Hyaluronic Acid Mask Pack: được giới thiệu ở nhóm dưỡng ẩm, da thiếu nước.",
          "Real Cica Mask Pack: mặt nạ rau má thuộc bộ sưu tập CICA.",
          "Real Retinol Mask Pack: được giới thiệu ở nhóm chăm sóc độ săn chắc và bề mặt da.",
        ],
      },
      {
        id: "huong-dan",
        title: "Thời gian đắp và tần suất cần theo nhãn",
        paragraphs: [
          "Không áp dụng một số phút cố định cho mọi mặt nạ. Theo AAD, để mặt nạ lâu hơn hướng dẫn hoặc dùng quá thường xuyên có thể làm tăng nguy cơ kích ứng. Hãy đọc cách dùng trên đúng gói bạn đang có.",
          "Cũng cần xem mặt nạ có trùng các hoạt chất với routine hiện tại hay không. Nếu xuất hiện ngứa, rát hoặc châm chích, dừng sử dụng và rửa sản phẩm; nếu da không ổn hơn, hãy tìm tư vấn y khoa.",
        ],
      },
      {
        id: "truoc-khi-mua",
        title: "Danh sách kiểm tra trước khi đặt mua",
        paragraphs: [
          "Xác nhận tên đầy đủ để không nhầm các dòng có bao bì tương tự. Sau đó kiểm tra quy cách bán: một gói hay cả hộp, dung tích được ghi, hạn dùng và cách bảo quản. Trên website, giá và số lượng cần đọc ở trang sản phẩm tại thời điểm đặt hàng.",
          "Nếu còn phân vân giữa một mặt nạ và serum, hãy xem bạn cần một bước bổ sung theo dịp hay một sản phẩm cho chu trình đang xây dựng. Bài viết không khẳng định rằng hai loại sản phẩm có thể thay cho nhau, hoặc một loại phù hợp cho tất cả mọi người.",
        ],
      },
    ],
    faqs: [
      {
        question: "Mặt nạ giấy có thay kem dưỡng hằng ngày không?",
        answer:
          "Không nên mặc định như vậy. Mặt nạ là bước bổ sung; cách kết hợp còn phụ thuộc hướng dẫn trên nhãn và chu trình đang dùng.",
      },
      {
        question: "Đắp càng lâu có càng tốt không?",
        answer:
          "Không. Hãy tuân thủ thời gian trên bao bì của từng sản phẩm thay vì kéo dài thời gian đắp.",
      },
    ],
    productIds: ["mask-cica", "mask-hyaluronic", "mask-retinol"],
    sources: [maskSource],
  },
  {
    slug: "tim-hieu-serum-paxmoly-hyaluronic-acid-b5",
    category: "review-san-pham",
    title: "Tìm hiểu serum PaxMoly Hyaluronic Acid 10% + B5",
    description:
      "Thông tin serum PaxMoly Hyaluronic Acid 10% + B5: dung tích 30 ml, thành phần nổi bật và những điểm cần kiểm tra trước khi thêm vào routine.",
    intro:
      "Hyaluronic Acid 10% + B5 Serum là một lựa chọn trong nhóm tinh chất dưỡng ẩm của PaxMoly. Bài viết này giúp bạn đọc thông tin sản phẩm và so sánh với nhu cầu đang có; đây không phải review về kết quả sau một thời gian sử dụng.",
    published: "2026-10-05",
    sections: [
      {
        id: "thong-tin",
        title: "Tên, dung tích và nhóm sản phẩm",
        paragraphs: [
          "Sản phẩm được ghi trong danh mục là Hyaluronic Acid 10% + B5 Serum, tên ngắn Intensive Moisture Serum, dung tích 30 ml. Website xếp sản phẩm ở nhóm tinh chất dành cho nhu cầu thiếu ẩm và căng khô.",
          "Tên gần giống nhau có thể xuất hiện ở các sản phẩm khác. Trước khi đặt mua, hãy đối chiếu tên đầy đủ, hình hộp và quy cách trên trang sản phẩm. Giá được cập nhật ở cửa hàng, không cố định trong bài để tránh nhầm với ưu đãi theo từng thời điểm.",
        ],
      },
      {
        id: "thanh-phan",
        title: "Đọc thông tin thành phần như thế nào?",
        paragraphs: [
          "Danh mục nêu Hyaluronic Acid 10%, Vitamin B5 và Betaine là các thành phần nổi bật. Danh sách này không phải công thức INCI đầy đủ và không cho biết mọi chất có trong sản phẩm.",
          "Con số trong tên thương mại được giữ nguyên theo danh mục. Không nên từ đó suy luận hàm lượng của mọi dạng nguyên liệu, mức độ hiệu quả hoặc kết luận rằng nồng độ cao hơn luôn tốt hơn. Muốn kiểm tra một thành phần cụ thể, cần đọc nhãn của phiên bản thực tế.",
        ],
      },
      {
        id: "so-sanh-nhu-cau",
        title: "So sánh với chu trình đang dùng",
        paragraphs: [
          "Nếu bạn đang tìm một serum thuộc nhóm dưỡng ẩm, có thể mở trang chi tiết sản phẩm này để đọc mô tả và hướng dẫn. Cũng hãy xem routine hiện tại đã có những bước nào, thay vì thêm serum chỉ để tăng số sản phẩm.",
          "Cửa hàng còn có Real Hyaluronic Acid Mask Pack. Serum và mặt nạ có quy cách cũng như cách dùng khác nhau; cùng có tên Hyaluronic Acid không có nghĩa hai món tương đương hoặc cần dùng cùng nhau.",
        ],
      },
      {
        id: "gioi-han",
        title: "Những điều bài viết chưa thể khẳng định",
        paragraphs: [
          "Chúng tôi chưa có dữ liệu thử nghiệm độc lập trong bài này để kết luận thời gian thấy thay đổi, mức độ thẩm thấu, cảm giác dính hay độ phù hợp với từng người. Các nhận xét như “không kích ứng” hoặc “hiệu quả sau vài ngày” không được suy ra từ ảnh bao bì.",
          "Trước khi dùng, kiểm tra nhãn, hướng dẫn và những thành phần bạn cần tránh. Nếu đang có một vấn đề da cần điều trị, việc chọn một serum mỹ phẩm không thay cho đánh giá của bác sĩ.",
        ],
      },
    ],
    faqs: [
      {
        question: "Serum này có dung tích bao nhiêu?",
        answer:
          "Theo danh mục hiện tại, Hyaluronic Acid 10% + B5 Serum có dung tích 30 ml. Bạn vẫn nên đối chiếu quy cách trên đơn và bao bì nhận được.",
      },
      {
        question: "Bài viết có đánh giá trải nghiệm sử dụng thực tế không?",
        answer:
          "Không. Đây là bài tìm hiểu thông tin danh mục, không chấm điểm và không khẳng định kết quả sau sử dụng.",
      },
    ],
    productIds: ["serum-hyaluronic", "mask-hyaluronic"],
    sources: [
      {
        title: "Thông tin Hyaluronic Acid 10% + B5 Serum tại PaxMoly",
        url: "/san-pham/hyaluronic-acid-intensive-moisture-serum",
      },
    ],
    note: productNote,
  },
  {
    slug: "tim-hieu-sua-rua-mat-paxmoly-perfect-cica",
    category: "review-san-pham",
    title: "Tìm hiểu sữa rửa mặt PaxMoly Perfect Cica Foam Cleanser",
    description:
      "Perfect Cica Foam Cleanser PaxMoly: sữa rửa mặt rau má 100 ml, thành phần được giới thiệu và các thông tin cần đối chiếu trên nhãn trước khi mua.",
    intro:
      "Perfect Cica Foam Cleanser là sữa rửa mặt thuộc dòng CICA PaxMoly. Trước khi cân nhắc một sản phẩm làm sạch mới, hãy xem tên đầy đủ, quy cách và nhãn thành phần. Bài viết này tổng hợp thông tin danh mục, không mô tả trải nghiệm sau thử nghiệm thực tế.",
    published: "2026-10-05",
    sections: [
      {
        id: "san-pham",
        title: "Perfect Cica Foam Cleanser là sản phẩm gì?",
        paragraphs: [
          "Theo danh mục, sản phẩm có tên Perfect Cica Foam Cleanser, dung tích 100 ml và thuộc nhóm sữa rửa mặt. Đây là sản phẩm rửa trôi, khác với toner hoặc serum lưu lại trên da trong cùng bộ sưu tập.",
          "Bạn có thể nhận diện sản phẩm bằng tên đầy đủ và hình tuýp trên trang chi tiết. Không chỉ nhìn chữ CICA vì chữ này còn xuất hiện trên kem dưỡng, mặt nạ và tinh chất có vai trò khác nhau.",
        ],
      },
      {
        id: "thanh-phan",
        title: "Các thành phần được giới thiệu trong danh mục",
        paragraphs: [
          "Danh mục hiện tại nêu chiết xuất rau má, Vitamin E, chiết xuất trà xanh và chiết xuất keo ong ở phần thành phần nổi bật. Đây là thông tin tóm tắt để tìm hiểu sản phẩm, không phải toàn bộ bảng INCI.",
          "Không thể từ những thành phần nổi bật này xác định đầy đủ hệ làm sạch, pH, mùi hương hoặc cảm giác sau rửa. Nếu một yếu tố cụ thể ảnh hưởng đến quyết định của bạn, hãy hỏi ảnh nhãn hoặc thông tin công thức của đúng phiên bản đang bán.",
        ],
      },
      {
        id: "lua-chon",
        title: "Những câu hỏi hữu ích trước khi đổi sữa rửa mặt",
        paragraphs: [
          "Sản phẩm làm sạch hiện tại có đáp ứng nhu cầu của bạn không? Bạn muốn thay vì hết sản phẩm, vì quy cách hay vì có cảm giác chưa phù hợp? Trả lời được lý do đổi giúp bạn so sánh thông tin thực tế, thay vì mua chỉ theo tên hoạt chất.",
          "Bộ lọc da nhạy cảm của cửa hàng là công cụ điều hướng, không phải bảo đảm rằng một công thức không gây phản ứng. Khi có tiền sử phản ứng với mỹ phẩm hoặc đang điều trị, cần kiểm tra thành phần và hỏi người điều trị trước khi thay đổi.",
        ],
      },
      {
        id: "cach-doc-review",
        title: "Đọc review có giới hạn rõ ràng",
        paragraphs: [
          "Bài viết chưa có thử nghiệm đo pH hoặc khảo sát người dùng để chấm điểm độ dịu nhẹ, lượng bọt hay mức làm sạch. Do đó, không khẳng định sản phẩm trị mụn, dùng được cho mọi loại da hoặc không làm khô da ở tất cả mọi người.",
          "Trên trang sản phẩm, bạn có thể đọc mô tả, xem dung tích và giá hiện tại. Khi mua, hãy kiểm tra bao bì, hạn dùng và chỉ dẫn cách rửa của nhà sản xuất. Thông tin đó cần được ưu tiên hơn một nhận xét chung trong bài giới thiệu.",
        ],
      },
    ],
    faqs: [
      {
        question: "Sản phẩm có thuộc dòng CICA không?",
        answer:
          "Có. Perfect Cica Foam Cleanser là một trong năm sản phẩm của bộ sưu tập CICA đang được giới thiệu tại cửa hàng.",
      },
      {
        question: "Có thể suy ra pH của sản phẩm từ bài viết không?",
        answer:
          "Không. Danh mục đang dùng không cung cấp số đo pH đã được xác minh; bài viết không tự thêm thông số này.",
      },
    ],
    productIds: ["cleanser-cica", "toner-cica", "cream-cica"],
    sources: [
      {
        title: "Thông tin Perfect Cica Foam Cleanser tại PaxMoly",
        url: "/san-pham/perfect-cica-foam-cleanser",
      },
    ],
    note: productNote,
  },
];

export function getNewsCategory(value: string) {
  return NEWS_CATEGORIES.find((category) => category.value === value);
}

export function getArticleReadMinutes(article: NewsArticle) {
  const text = [
    article.intro,
    ...article.sections.flatMap((section) => [
      ...section.paragraphs,
      ...(section.bullets ?? []),
    ]),
    ...article.faqs.map((faq) => `${faq.question} ${faq.answer}`),
  ].join(" ");
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
}

export const formatNewsDate = (date: string) =>
  new Intl.DateTimeFormat("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }).format(
    new Date(`${date}T00:00:00+07:00`),
  );
