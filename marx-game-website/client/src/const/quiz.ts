
export interface QuizQuestion {
  id: string;
  context?: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  roleId: "farmer" | "worker" | "student" | "all";
  explanation?: string;
  bonusMoney?: number;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // --- TUYẾN 1: NÔNG DÂN NGHÈO ---
  {
    id: "f1",
    roleId: "farmer",
    context: "Nam là một thanh niên nông thôn vốn chỉ quen với việc đồng áng. Khi khu công nghiệp mọc lên sát lũy tre làng, Nam quyết định trở thành công nhân. Sau 2 năm, Nam không còn mơ về việc tích góp mua thêm sào ruộng mà khao khát học thêm chứng chỉ kỹ thuật để tăng lương.",
    question: "Sự xoay trục trong định hướng cuộc đời của Nam minh chứng cho luận điểm nào của Marx?",
    options: [
      "Ý chí cá nhân là yếu tố quyết định nhận thức.",
      "Truyền thông đô thị cưỡng chế ý thức cá nhân.",
      "Tồn tại xã hội mới quy định ý thức xã hội mới.",
      "Gia đình truyền thống tan rã làm thay đổi tư duy."
    ],
    correctAnswerIndex: 2,
    explanation: "Khi tồn tại xã hội (điều kiện sống, phương thức sản xuất) thay đổi, ý thức xã hội sẽ thay đổi theo để phản ánh thực tại mới."
  },
  {
    id: "f2",
    roleId: "farmer",
    context: "Gia đình ông Chúc giàu lên nhưng vẫn giữ quan niệm 'đàn bà không dự việc lớn'.",
    question: "Tại sao giàu lên nhưng tư duy không đổi?",
    options: [
      "Tâm lý tiểu nông không thay đổi.",
      "Ý thức xã hội có tính độc lập tương đối, biến đổi chậm hơn.",
      "Văn hóa truyền thống luôn đúng.",
      "Kinh tế không ảnh hưởng tư duy."
    ],
    correctAnswerIndex: 1,
    explanation: "Ý thức xã hội thường có sự lạc hậu nhất định so với sự biến đổi của tồn tại xã hội."
  },
  {
    id: "f3",
    roleId: "farmer",
    context: "Có điện và internet, người dân vùng cao bắt đầu biết livestream bán đặc sản, thay đổi hẳn tư duy 'trông chờ cứu trợ'.",
    question: "Điều này chứng minh gì?",
    options: [
      "Ý thức áp đặt tồn tại.",
      "Thay đổi vật chất (tồn tại xã hội) dẫn đến thay đổi ý thức.",
      "Chỉ là biện pháp kỹ thuật thuần túy.",
      "Các yếu tố ngang bằng nhau."
    ],
    correctAnswerIndex: 1,
    explanation: "Cơ sở hạ tầng vật chất thay đổi làm tiền đề khách quan cho sự thay đổi về nhận thức và tư duy."
  },
  {
    id: "f4",
    roleId: "farmer",
    context: "Một đoàn khảo sát nhận ra rằng mọi lễ hội, thói quen ăn ở và tính cách của người dân làng Gốm đều bắt nguồn từ cách họ cùng nhau sản xuất suốt bao đời nay.",
    question: "Yếu tố gốc rễ quyết định những nét văn hóa này là gì?",
    options: [
      "Điều kiện địa lý và khí hậu.",
      "Phương thức sản xuất vật chất.",
      "Phong tục tập quán lâu đời.",
      "Thể chế chính trị địa phương."
    ],
    correctAnswerIndex: 1,
    explanation: "Phương thức sản xuất vật chất là nhân tố quyết định sự tồn tại và phát triển của mọi hình thái ý thức xã hội."
  },
  {
    id: "f5",
    roleId: "farmer",
    context: "Luật Đất đai mới về dồn điền đổi thửa buộc nông dân phải liên kết lại, từ đó hình thành tư duy làm việc tập thể mới.",
    question: "Sự tác động này của luật pháp (ý thức) vào đời sống là ví dụ của:",
    options: [
      "Ý thức xã hội tác động ngược lại tồn tại xã hội thông qua thực tiễn.",
      "Sự phủ định hoàn toàn của thượng tầng kiến trúc.",
      "Ý thức xã hội có tính độc lập tuyệt đối.",
      "Sự đồng quy của các hình thái ý thức."
    ],
    correctAnswerIndex: 0,
    explanation: "Mặc dù bị quyết định bởi tồn tại, ý thức xã hội (luật pháp) vẫn có tính năng động, tác động trở lại làm biến đổi thực tại.",
    bonusMoney: 15
  },
  {
    id: "f6",
    roleId: "farmer",
    context: "Anh Hùng vốn là thợ thủ công tự do, nay chuyển sang làm việc theo dây chuyền tại nhà máy với quy định giờ giấc nghiêm ngặt.",
    question: "Sự thay đổi về tác phong làm việc của anh Hùng minh chứng cho điều gì?",
    options: [
      "Mất đi bản sắc cá nhân vốn có.",
      "Phương thức sản xuất thay đổi hình thành ý thức kỷ luật mới.",
      "Công nghệ làm yếu đi ý chí con người.",
      "Ý thức con người không bao giờ thay đổi."
    ],
    correctAnswerIndex: 1,
    explanation: "Môi trường lao động và phương thức sản xuất công nghiệp rèn luyện tính kỷ luật và ý thức tổ chức cho người lao động."
  },
  {
    id: "f7",
    roleId: "farmer",
    context: "Khi một ngôi làng thuần nông chuyển sang làm du lịch cộng đồng, người dân tự giác học ngoại ngữ và văn hóa giao tiếp văn minh hơn.",
    question: "Sự biến chuyển này cho thấy luận điểm nào?",
    options: [
      "Ý thức tự thân phát triển không cần điều kiện.",
      "Sự đánh mất bản sắc làng quê.",
      "Tồn tại xã hội (nghề nghiệp mới) quyết định ý thức xã hội.",
      "Giao lưu văn hóa là yếu tố duy nhất tác động."
    ],
    correctAnswerIndex: 2,
    explanation: "Nhu cầu kinh tế và phương thức kiếm sống mới buộc con người phải cập nhật tri thức và kỹ năng mới."
  },
  {
    id: "f8",
    roleId: "farmer",
    context: "Dù đời sống đã khấm khá hơn rất nhiều, nhiều gia đình ở nông thôn vẫn giữ thói quen tiết kiệm cực đoan, đôi khi ảnh hưởng đến sức khỏe.",
    question: "Hiện tượng này giải thích tính chất nào của ý thức xã hội?",
    options: [
      "Ý thức xã hội luôn đi trước thời đại.",
      "Ý thức có tính kế thừa và thường bảo thủ, lạc hậu hơn tồn tại.",
      "Sự phát triển kinh tế hoàn toàn không ảnh hưởng đến tư duy.",
      "Hệ thống giáo dục quyết định mọi thói quen con người."
    ],
    correctAnswerIndex: 1,
    explanation: "Tâm lý xã hội và thói quen cũ thường bám rễ sâu và thay đổi chậm hơn so với điều kiện kinh tế vật chất."
  },
  {
    id: "f9",
    roleId: "farmer",
    context: "Việc phổ cập internet và các lớp học online đến vùng sâu vùng xa đã giúp học sinh ở đây có những ước mơ về sự nghiệp toàn cầu.",
    question: "Nguyên lý triết học nào được thể hiện ở đây?",
    options: [
      "Giáo dục có quyền quyết định tuyệt đối mọi thứ.",
      "Ý thức xã hội độc lập hoàn toàn với công cụ lao động.",
      "Điều kiện vật chất (hạ tầng số) tạo tiền đề cho ý thức mới.",
      "Truyền thông đã thay thế hoàn toàn vai trò của kinh tế."
    ],
    correctAnswerIndex: 2,
    explanation: "Phương tiện kỹ thuật (thuộc lực lượng sản xuất) là yếu tố vật chất quan trọng thúc đẩy sự thay đổi trong tư duy của thế hệ trẻ."
  },
  {
    id: "f10",
    roleId: "farmer",
    context: "Trong thời đại kinh tế số, nhiều thanh niên nông thôn chọn con đường làm freelance hoặc kinh doanh online thay vì tìm công việc ổn định lâu dài như cha mẹ.",
    question: "Sự thay đổi trong lựa chọn nghề nghiệp này phản ánh điều gì?",
    options: [
      "Sự suy thoái về đạo đức nghề nghiệp truyền thống.",
      "Điều kiện kinh tế mới làm thay đổi các giá trị sống và ý thức.",
      "Ý chí cá nhân hoàn toàn độc lập với môi trường.",
      "Chỉ là sự ảnh hưởng nhất thời của mạng xã hội."
    ],
    correctAnswerIndex: 1,
    explanation: "Cơ cấu kinh tế thay đổi tạo ra những cơ hội và quan điểm mới về công việc và cuộc sống."
  },
  {
    id: "f11",
    roleId: "farmer",
    context: "Người nông dân vùng lúa nước thường thờ thần Mưa, thần Sấm; trong khi người dân vùng biển lại tôn thờ cá Ông và thần biển.",
    question: "Sự khác biệt trong tín ngưỡng này có ý nghĩa gì?",
    options: [
      "Là sự ngẫu nhiên không có quy luật của lịch sử.",
      "Ý thức xã hội phản ánh trực tiếp điều kiện tồn tại và sản xuất.",
      "Do sở thích cá nhân của những người đứng đầu cộng đồng.",
      "Tín ngưỡng không liên quan đến đời sống kinh tế."
    ],
    correctAnswerIndex: 1,
    explanation: "Ý thức tôn giáo phản ánh một cách hư ảo các điều kiện sống vật chất và sự bất lực của con người trước thiên nhiên trong quá trình sản xuất."
  },
  {
    id: "f12",
    roleId: "farmer",
    context: "Khi mới nhập máy móc hiện đại về nhà máy, một số công nhân có tâm lý bài trừ vì sợ máy móc sẽ cướp mất công việc của mình.",
    question: "Hiện tượng tâm lý này được hiểu là:",
    options: [
      "Ý thức luôn đi trước để dự báo tương lai.",
      "Ý thức xã hội bị lạc hậu so với sự phát triển của tồn tại (công nghệ).",
      "Công nghệ phát triển không ảnh hưởng đến tâm lý.",
      "Ý thức xã hội mang tính độc lập tuyệt đối với vật chất."
    ],
    correctAnswerIndex: 1,
    explanation: "Phản ứng tâm lý này cho thấy sự chưa thích nghi kịp thời của nhận thức trước những bước tiến nhanh chóng của lực lượng sản xuất."
  },
  {
    id: "f13",
    roleId: "farmer",
    context: "Các quy định mới về phát triển bền vững và bảo vệ môi trường đã buộc các chủ doanh nghiệp nông nghiệp phải thay đổi cách bón phân và xử lý chất thải.",
    question: "Điều này chứng minh điều gì về mối quan hệ biện chứng?",
    options: [
      "Con người bị áp đặt hoàn toàn bởi ý chí của nhà nước.",
      "Pháp luật là yếu tố duy nhất quyết định hành vi kinh tế.",
      "Ý thức xã hội (pháp luật, đạo đức) tác động tích cực đến thực tiễn.",
      "Hoạt động sản xuất không có sự tự do cho cá nhân."
    ],
    correctAnswerIndex: 2,
    explanation: "Ý thức xã hội tiến bộ có thể định hướng và thúc đẩy tồn tại xã hội vận động theo hướng tích cực hơn."
  },
  {
    id: "f14",
    roleId: "farmer",
    context: "Sự xuất hiện của các nghề nghiệp mới như YouTuber nông thôn hay TikToker review đặc sản vùng miền là kết quả của sự kết hợp giữa công nghệ và nhu cầu thị trường.",
    question: "Sự ra đời của các loại hình ý thức này chứng minh:",
    options: [
      "Ý thức có thể tự tạo ra tồn tại xã hội mới cho chính nó.",
      "Tồn tại xã hội mới sinh ra những hình thái ý thức xã hội tương ứng.",
      "Công nghệ không có vai trò gì trong việc hình thành tư duy nghề nghiệp.",
      "Các nghề này hoàn toàn không liên quan đến quy luật kinh tế."
    ],
    correctAnswerIndex: 1,
    explanation: "Khi các điều kiện vật chất và công cụ lao động mới xuất hiện, con người sẽ hình thành các nhu cầu và hình thức hoạt động mới."
  },
  {
    id: "f15",
    roleId: "farmer",
    context: "Nhiều thanh niên sau thời gian đi làm việc tại các khu công nghiệp thành phố, khi trở về làng quê đã mang theo tác phong công nghiệp và tư duy làm việc chuyên nghiệp hơn.",
    question: "Điều này phản ánh điều gì?",
    options: [
      "Ý thức xã hội hoàn toàn độc lập với môi trường sống.",
      "Môi trường lao động thực tiễn định hình và rèn luyện ý thức con người.",
      "Bản chất con người là không thể thay đổi dù ở môi trường nào.",
      "Gia đình là yếu tố duy nhất quyết định tính cách cá nhân."
    ],
    correctAnswerIndex: 1,
    explanation: "Thực tiễn lao động trong môi trường hiện đại là trường học tốt nhất để rèn luyện ý thức và kỹ năng cho người lao động.",
    bonusMoney: 20
  },

  // --- TUYẾN 2: CÔNG NHÂN HIỆN ĐẠI ---
  {
    id: "w1",
    roleId: "worker",
    context: "Hùng là tài xế công nghệ. Khi hãng giảm chiết khấu, các tài xế liên kết tắt app để phản đối.",
    question: "Phân tích Marxist nào đúng nhất về hành động này?",
    options: [
      "Tâm lý xã hội của người lao động bị thuật toán hóa thụ động.",
      "Biến đổi lao động (tồn tại) dẫn đến nhận thức quyền lợi mới (ý thức).",
      "Ý thức tự do cá nhân đã chiến thắng sự kìm kẹp của quan hệ sản xuất.",
      "Đây là một dạng ý thức ảo, không có gốc rễ vật chất thực tế."
    ],
    correctAnswerIndex: 1,
    explanation: "Sự biến đổi trong phương thức lao động (tồn tại xã hội) là cơ sở nảy sinh những hình thái ý thức mới về đấu tranh và quyền lợi."
  },
  {
    id: "w2",
    roleId: "worker",
    context: "Sau đại dịch, nhiều công nhân chuyển từ thói quen tiêu dùng nhanh sang tiết kiệm và mua bảo hiểm sức khỏe.",
    question: "Triết học Marx giải thích sự thay đổi này như thế nào?",
    options: [
      "Ý thức con người có khả năng tự thích nghi độc lập hoàn toàn.",
      "Sự biến đổi của điều kiện vật chất buộc ý thức xã hội phải tái cấu trúc.",
      "Hệ tư tưởng y tế đã thay thế vai trò của tồn tại xã hội.",
      "Đây là ví dụ của việc tâm lý xã hội vượt trước hệ tư tưởng."
    ],
    correctAnswerIndex: 1,
    explanation: "Các biến cố về điều kiện sống vật chất (tồn tại xã hội) buộc con người phải thay đổi thói quen và tư duy (ý thức xã hội)."
  },
  {
    id: "w3",
    roleId: "worker",
    context: "Một nhóm công nhân tại nhà máy thông minh đã tự nghiên cứu và cải tiến quy trình robot giúp tăng năng suất và giảm mệt mỏi.",
    question: "Hành động này khẳng định luận điểm nào của triết học Marx?",
    options: [
      "Vật chất quyết định ý thức một cách tuyệt đối, một chiều.",
      "Ý thức con người có tính độc lập tương đối và tính sáng tạo.",
      "Ý thức chỉ là sản phẩm phụ thụ động của sản xuất vật chất.",
      "Công nghệ đã thay thế hoàn toàn vai trò của ý thức con người."
    ],
    correctAnswerIndex: 1,
    explanation: "Ý thức không thụ động mà có tính tích cực, sáng tạo và có thể tác động trở lại để cải tạo thực tại vật chất qua thực tiễn."
  },
  {
    id: "w4",
    roleId: "worker",
    context: "Người lao động ở các nước có hệ thống an sinh tốt (như Bắc Âu) thường có tinh thần cộng đồng và tự giác cao hơn trong công việc.",
    question: "Nguồn gốc của ý thức xã hội này là gì?",
    options: [
      "Tố chất gene và đặc điểm khí hậu đặc thù của vùng miền.",
      "Tồn tại xã hội (quan hệ phân phối và an sinh) quy định ý thức.",
      "Do các chính sách giáo dục cưỡng chế lâu đời của nhà nước.",
      "Là sự kế thừa các giá trị tôn giáo từ thời trung cổ."
    ],
    correctAnswerIndex: 1,
    explanation: "Tính chất của các quan hệ sản xuất và phân phối (tồn tại xã hội) là nền tảng hình thành nên đạo đức và lối sống cộng đồng."
  },
  {
    id: "w5",
    roleId: "worker",
    context: "Để bảo vệ công nhân trước việc nhắn tin giao việc 24/7 của sếp, luật mới về 'quyền được ngắt kết nối' đã được ban hành.",
    question: "Sự ra đời của luật pháp này thể hiện điều gì?",
    options: [
      "Ý thức pháp luật luôn đi trước để định hướng công nghệ.",
      "Pháp luật là sản phẩm ý chí chủ quan, không phụ thuộc vật chất.",
      "Lực lượng sản xuất (công nghệ) biến đổi buộc thượng tầng (luật pháp) đổi theo.",
      "Ý thức xã hội luôn mâu thuẫn tuyệt đối với tồn tại xã hội."
    ],
    correctAnswerIndex: 2,
    explanation: "Khi lực lượng sản xuất phát triển, nó đòi hỏi các quy tắc pháp lý (thượng tầng kiến trúc) phải thay đổi tương ứng để điều chỉnh các quan hệ mới."
  },
  {
    id: "w6",
    roleId: "worker",
    context: "Trong nền kinh tế nền tảng (Gig economy), công nhân nhận việc hoàn toàn qua app và không biết người quản lý trực tiếp là ai.",
    question: "Quan hệ lao động 'vô hình' này phản ánh điều gì?",
    options: [
      "Quan hệ sản xuất biến đổi để thích ứng với trình độ công nghệ mới.",
      "Con người đã thoát khỏi mọi quan hệ xã hội trong sản xuất.",
      "Ý thức con người bị xóa bỏ hoàn toàn bởi thuật toán.",
      "Lao động cá nhân không còn đóng góp vào giá trị thặng dư."
    ],
    correctAnswerIndex: 0,
    explanation: "Công nghệ mới làm thay đổi hình thức biểu hiện của quan hệ sản xuất nhưng không xóa bỏ bản chất của các quan hệ đó."
  },
  {
    id: "w7",
    roleId: "worker",
    context: "Tài xế công nghệ bị khách hàng đánh giá bằng 'sao', điều này trực tiếp quyết định thu nhập và cơ hội nhận đơn của họ.",
    question: "Phân tích Marxist nào đúng về hiện tượng này?",
    options: [
      "Ý thức của khách hàng là yếu tố quyết định kinh tế duy nhất.",
      "Quan hệ sản xuất được tái cấu trúc thông qua các nền tảng kỹ thuật số.",
      "Công nghệ đã giải phóng con người khỏi sự kiểm soát của đồng tiền.",
      "Đây là hiện tượng mang tính ngẫu nhiên, không có tính quy luật."
    ],
    correctAnswerIndex: 1,
    explanation: "Sự kiểm soát lao động trong thời đại số chuyển dịch sang các công cụ thuật toán, làm đa dạng hóa các quan hệ sản xuất."
  },
  {
    id: "w8",
    roleId: "worker",
    context: "Việc làm việc từ xa (Remote work) trở thành xu thế, cho phép công nhân tri thức làm việc ở bất cứ đâu trên thế giới.",
    question: "Điều này dẫn tới sự thay đổi nào trong ý thức xã hội?",
    options: [
      "Sự xóa bỏ hoàn toàn các giai cấp trong xã hội hiện đại.",
      "Làm thay đổi nhận thức về không gian lao động và quan hệ tập thể.",
      "Ý thức con người trở nên thụ động vì thiếu tương tác trực tiếp.",
      "Không có ảnh hưởng gì đáng kể đến đời sống tinh thần."
    ],
    correctAnswerIndex: 1,
    explanation: "Phương thức lao động mới làm thay đổi các hình thái ý thức xã hội về tính cộng đồng và sự gắn kết truyền thống."
  },
  {
    id: "w9",
    roleId: "worker",
    context: "Người lao động 'tự do' trong nền kinh tế Gig thường không có bảo hiểm, nghỉ phép hay lương hưu ổn định.",
    question: "Theo Marx, mâu thuẫn chính ở đây nằm ở đâu?",
    options: [
      "Mâu thuẫn giữa sở thích cá nhân và trách nhiệm xã hội.",
      "Lực lượng sản xuất hiện đại mâu thuẫn với quan hệ sản xuất cũ về an sinh.",
      "Mâu thuẫn giữa công nghệ AI và năng lực của con người.",
      "Mâu thuẫn giữa ý thức tôn giáo và thực tại vật chất."
    ],
    correctAnswerIndex: 1,
    explanation: "Sự phát triển của lực lượng sản xuất (nền tảng số) vượt quá khả năng điều chỉnh của các quan hệ sản xuất và pháp lý hiện tại."
  },
  {
    id: "w10",
    roleId: "worker",
    context: "Sự bùng nổ của robot và AI khiến nhiều công nhân vận hành máy móc truyền thống đối mặt với nguy cơ mất việc làm.",
    question: "Hệ quả tất yếu về mặt xã hội theo quan điểm Marx là gì?",
    options: [
      "Xã hội sẽ tự động tiến tới sự công bằng tuyệt đối nhờ máy móc.",
      "Gia tăng mâu thuẫn giữa người lao động và chủ sở hữu tư liệu sản xuất.",
      "Ý thức con người sẽ quyết định việc robot có nên tồn tại hay không.",
      "Công nghệ sẽ xóa sổ hoàn toàn nhu cầu về ý thức xã hội."
    ],
    correctAnswerIndex: 1,
    explanation: "Công nghệ là công cụ của lực lượng sản xuất; trong quan hệ sản xuất tư bản, nó thường làm sâu sắc thêm mâu thuẫn giai cấp."
  },
  {
    id: "w11",
    roleId: "worker",
    context: "Thay vì các cuộc đình công truyền thống, công nhân hiện đại thành lập các nhóm kín trên mạng xã hội để bảo vệ quyền lợi.",
    question: "Hình thức này thể hiện điều gì?",
    options: [
      "Sự tan rã hoàn toàn của ý thức giai cấp trong thời đại số.",
      "Sự phát triển hình thái mới của ý thức giai cấp dựa trên kết nối số.",
      "Ý thức xã hội trở thành một dạng 'ảo tưởng' không có tác động thực tiễn.",
      "Hành động mang tính cá nhân ích kỷ, không có tính cộng đồng."
    ],
    correctAnswerIndex: 1,
    explanation: "Ý thức xã hội (ý thức giai cấp) sử dụng các phương tiện vật chất mới (internet) để duy trì và phát triển sức mạnh của mình."
  },
  {
    id: "w12",
    roleId: "worker",
    context: "Nhân viên văn phòng ngày nay bị giám sát chặt chẽ bởi các chỉ số KPI và phần mềm theo dõi tiến độ công việc từng phút.",
    question: "Sự giám sát này phản ánh đặc điểm nào của sản xuất hiện đại?",
    options: [
      "Quản lý khoa học và sự kiểm soát tinh vi đối với sức lao động.",
      "Sự phát triển của quyền tự do và độc lập của ý thức cá nhân.",
      "Văn hóa doanh nghiệp tách rời hoàn toàn khỏi kinh tế.",
      "Công nghệ làm cho lao động trở nên nhẹ nhàng và tự nguyện hơn."
    ],
    correctAnswerIndex: 0,
    explanation: "Sự phát triển của công cụ lao động (phần mềm) được sử dụng để tối ưu hóa việc bóc lột giá trị thặng dư."
  },
  {
    id: "w13",
    roleId: "worker",
    context: "Một số nhân viên startup nghĩ mình là 'đối tác' tự do, nhưng thực tế họ vẫn phải tuân thủ nghiêm ngặt các quy tắc để mang lại lợi nhuận cho nhà đầu tư.",
    question: "Đây là biểu hiện của vấn đề gì?",
    options: [
      "Sự tự do tuyệt đối của cá nhân trong nền kinh tế tri thức.",
      "Quan hệ sản xuất (sở hữu) vẫn chi phối ý thức về địa vị của con người.",
      "Sự biến mất hoàn toàn của các quan hệ bóc lột lao động.",
      "Ý thức con người đã hoàn toàn vượt khỏi các ràng buộc vật chất."
    ],
    correctAnswerIndex: 1,
    explanation: "Dù hình thức bên ngoài có vẻ tự do, bản chất quan hệ sản xuất vẫn quyết định vị thế thực tế của người lao động."
  },
  {
    id: "w14",
    roleId: "worker",
    context: "Dữ liệu người dùng (Big Data) được xem là 'dầu mỏ mới', mang lại lợi nhuận khổng lồ cho các tập đoàn công nghệ.",
    question: "Trong triết học Marx, dữ liệu đóng vai trò là gì?",
    options: [
      "Chỉ là các hình thái ý thức xã hội thuần túy.",
      "Một loại tư liệu sản xuất đặc biệt trong nền kinh tế số.",
      "Yếu tố thuộc về thượng tầng kiến trúc văn hóa.",
      "Sản phẩm của trí tưởng tượng, không có giá trị vật chất."
    ],
    correctAnswerIndex: 1,
    explanation: "Dữ liệu trở thành đối tượng lao động và công cụ lao động mới, đóng vai trò quan trọng trong lực lượng sản xuất hiện đại."
  },
  {
    id: "w15",
    roleId: "worker",
    context: "Các cuộc đình công 'tắt ứng dụng' đồng loạt của tài xế công nghệ buộc các hãng xe phải đàm phán lại về mức chiết khấu.",
    question: "Điều này chứng minh sức mạnh của nhân tố nào?",
    options: [
      "Sức mạnh cảm tính nhất thời của nhóm nhỏ cá nhân.",
      "Cuộc đấu tranh giai cấp trong hình thái mới của nền kinh tế số.",
      "Sự sụp đổ của các quy luật kinh tế khách quan.",
      "Hành động phá hoại không mang lại giá trị thực tiễn."
    ],
    correctAnswerIndex: 1,
    explanation: "Đấu tranh giai cấp vẫn tồn tại dưới những hình thức mới, phản ánh mâu thuẫn lợi ích cốt lõi trong quan hệ sản xuất.",
    bonusMoney: 30
  },

  // --- TUYẾN 3: SINH VIÊN THÀNH PHỐ ---
  {
    id: "s1",
    roleId: "student",
    context: "Trong khi bố mẹ muốn con cái phải tìm việc 'ổn định', mua nhà, thì Linh lại ưu tiên làm Freelance để có thời gian trải nghiệm.",
    question: "Tại sao lại có sự 'lệch pha' sâu sắc này trong quan điểm giữa hai thế hệ?",
    options: [
      "Do sự đứt gãy hoàn toàn của tính kế thừa văn hóa truyền thống.",
      "Do tồn tại xã hội (môi trường số, kinh tế thị trường) của họ khác biệt.",
      "Do hệ tư tưởng phương Tây đã xâm chiếm hoàn toàn thực tại.",
      "Do ý thức xã hội giới trẻ luôn mang tính phản kháng ngẫu nhiên."
    ],
    correctAnswerIndex: 1,
    explanation: "Môi trường sống của các thế hệ khác nhau (tồn tại xã hội) tạo ra những hệ giá trị và ưu tiên khác nhau."
  },
  {
    id: "s2",
    roleId: "student",
    context: "Một nhóm sinh viên khởi nghiệp đã dự báo chính xác sự thoái trào của một nền tảng mạng xã hội lớn dựa trên phân tích mâu thuẫn nội tại.",
    question: "Khả năng 'nhìn thấu' tương lai này được triết học Marx giải thích là:",
    options: [
      "Trí tuệ thiên tài có khả năng thoát ly khỏi sự kiềm tỏa của thực tại.",
      "Ý thức xã hội tiên tiến phản ánh đúng quy luật vận động khách quan.",
      "Đây là sự ngẫu nhiên của lịch sử, không có mối liên hệ biện chứng.",
      "Ý thức đã tự tạo ra một tồn tại xã hội ảo cho riêng mình."
    ],
    correctAnswerIndex: 1,
    explanation: "Ý thức xã hội có khả năng vượt trước, phát hiện ra quy luật vận động của tương lai từ ngay trong lòng thực tại."
  },
  {
    id: "s3",
    roleId: "student",
    context: "Nhóm sinh viên CNTT phát triển hệ thống AI giúp chẩn đoán sâu bệnh cho nông dân, làm thay đổi hẳn cách vận hành của ngành.",
    question: "Hệ thống AI này thể hiện vai trò gì của tri thức?",
    options: [
      "Tri thức (ý thức) đã phủ định hoàn toàn vai trò của vật chất.",
      "Ý thức (tri thức khoa học) trở thành lực lượng sản xuất trực tiếp.",
      "Đây là ví dụ về sự lệ thuộc tuyệt đối của con người vào máy móc.",
      "AI chỉ là một hình thái tâm lý xã hội mới, không có tác động thực."
    ],
    correctAnswerIndex: 1,
    explanation: "Khoa học ngày nay đã trở thành lực lượng sản xuất trực tiếp, biến đổi thế giới vật chất thông qua tri thức."
  },
  {
    id: "s4",
    roleId: "student",
    context: "Ông nội kể thời xưa ai cũng chờ phân việc, còn Tuấn nay tự mở cửa hàng online từ năm nhất đại học.",
    question: "Nguyên nhân sâu xa của sự thay đổi tư duy này là do:",
    options: [
      "Ý thức chính trị tự thân quyết định sự ra đời của kinh tế thị trường.",
      "Tồn tại xã hội (cơ chế thị trường) hình thành nên ý thức xã hội mới.",
      "Một cuộc cách mạng về tâm lý xã hội độc lập với các biến động kinh tế.",
      "Sự hội nhập quốc tế làm mờ đi bản sắc tồn tại xã hội trong nước."
    ],
    correctAnswerIndex: 1,
    explanation: "Cơ sở hạ tầng và cơ chế kinh tế (tồn tại xã hội) thay đổi buộc tâm lý và cách thức hành động của con người phải thay đổi theo."
  },
  {
    id: "s5",
    roleId: "student",
    context: "Khi phân tích giới trẻ, ta thấy từ việc dùng tiếng lóng (tâm lý) đến các quan điểm về tự do cá nhân (hệ tư tưởng).",
    question: "Tất cả những yếu tố đó hợp thành khái niệm gì?",
    options: [
      "Toàn bộ các tri thức khoa học và chuẩn mực đạo đức cá nhân.",
      "Hệ tư tưởng và ý chí của các giai cấp cầm quyền trong xã hội.",
      "Sự kết hợp giữa tâm lý xã hội và hệ tư tưởng xã hội.",
      "Sự tổng hòa của niềm tin tôn giáo và các văn bản pháp luật."
    ],
    correctAnswerIndex: 2,
    explanation: "Ý thức xã hội bao gồm hai cấp độ: tâm lý xã hội (thói quen, tình cảm) và hệ tư tưởng xã hội (quan điểm, lý luận)."
  },
  {
    id: "s6",
    roleId: "student",
    context: "Nhiều sinh viên thừa nhận họ bị ảnh hưởng mạnh mẽ bởi các KOLs trong việc lựa chọn phong cách sống và tiêu dùng.",
    question: "Hiện tượng này phản ánh điều gì về ý thức xã hội?",
    options: [
      "Ý thức xã hội của cá nhân là độc lập và không bị tác động.",
      "Ý thức xã hội bị chi phối mạnh mẽ bởi môi trường thông tin (tồn tại).",
      "Sự lựa chọn này hoàn toàn không liên quan đến các điều kiện vật chất.",
      "Đây chỉ là một hình thức giải trí đơn thuần, không mang tính ý thức."
    ],
    correctAnswerIndex: 1,
    explanation: "Môi trường thông tin và văn hóa đại chúng (một phần của tồn tại xã hội) định hình nên tâm lý và nhận thức của cá nhân."
  },
  {
    id: "s7",
    roleId: "student",
    context: "Sinh viên ngày nay sử dụng AI và video để tự học, không còn quá lệ thuộc vào các giảng đường truyền thống.",
    question: "Sự thay đổi về phương thức học tập này thể hiện luận điểm nào?",
    options: [
      "Công cụ lao động (công nghệ) làm thay đổi cách thức con người nhận thức thế giới.",
      "Ý thức con người có thể phát triển mà không cần bất kỳ công cụ nào.",
      "Sự sụp đổ hoàn toàn của các giá trị tri thức truyền thống.",
      "Hành động tự phát không mang tính quy luật của giới trẻ."
    ],
    correctAnswerIndex: 0,
    explanation: "Sự phát triển của lực lượng sản xuất (công nghệ số) tạo ra những phương thức mới để con người chiếm lĩnh tri thức."
  },
  {
    id: "s8",
    roleId: "student",
    context: "Kiên tin rằng Internet đã xóa nhòa mọi rào cản giai cấp vì ai cũng có thể truy cập tri thức. Tuy nhiên, cậu nhận thấy sinh viên giàu vẫn có 'đặc quyền thông tin' và cơ hội tốt hơn nhờ tiền bạc.",
    question: "Thực tế này minh chứng cho điều gì?",
    options: [
      "Tồn tại xã hội (điều kiện kinh tế) vẫn quyết định vị thế thực tế của con người.",
      "Internet đã thực sự giải phóng con người khỏi mọi ràng buộc vật chất.",
      "Ý thức về sự công bằng quan trọng hơn các điều kiện vật chất thực tế.",
      "Sự khác biệt giai cấp chỉ là một định kiến tâm lý cũ kỹ."
    ],
    correctAnswerIndex: 0,
    explanation: "Dù hình thức có vẻ bình đẳng, nhưng cơ sở kinh tế vật chất vẫn là yếu tố quyết định cơ hội và vị thế thực tế."
  },
  {
    id: "s9",
    roleId: "student",
    context: "Nhóm của Vy coi công nghệ là giải pháp cho mọi vấn đề xã hội như nghèo đói, mà không cần thay đổi cách thức quản lý kinh tế.",
    question: "Quan điểm này mắc sai lầm gì theo triết học Marx?",
    options: [
      "Quá đề cao vai trò của con người trong sản xuất.",
      "Tách rời lực lượng sản xuất (công nghệ) khỏi quan hệ sản xuất thực tế.",
      "Phủ nhận tính năng động của ý thức xã hội.",
      "Tuyệt đối hóa vai trò của các hình thái ý thức chính trị."
    ],
    correctAnswerIndex: 1,
    explanation: "Công nghệ không thể giải quyết vấn đề xã hội nếu không thay đổi quan hệ sản xuất đang kìm hãm nó."
  },
  {
    id: "s10",
    roleId: "student",
    context: "Để ứng dụng khởi nghiệp thành công, Tuấn phải sử dụng hạ tầng đám mây của các tập đoàn lớn và nhận ra mình đang 'làm thuê' trên nền tảng của họ.",
    question: "Sự phụ thuộc này phản ánh điều gì trong nền kinh tế số?",
    options: [
      "Sự biến mất hoàn toàn của tư hữu về tư liệu sản xuất.",
      "Tư liệu sản xuất chủ chốt (hạ tầng số) vẫn tập trung trong tay các tập đoàn lớn.",
      "Ý thức cá nhân đã hoàn toàn làm chủ được các quy luật kinh tế.",
      "Quan hệ sản xuất hiện đại không còn dựa trên sự sở hữu."
    ],
    correctAnswerIndex: 1,
    explanation: "Trong nền kinh tế số, quyền sở hữu các nền tảng và dữ liệu (tư liệu sản xuất) vẫn quyết định quyền lực kinh tế."
  },
  {
    id: "s11",
    roleId: "student",
    context: "Thế hệ của Linh cực kỳ quan tâm đến biến đổi khí hậu và tiêu dùng bền vững, khác hẳn với tư duy 'phát triển bằng mọi giá' của thế hệ trước.",
    question: "Sự thay đổi ý thức này bắt nguồn từ đâu?",
    options: [
      "Sự đứt gãy ngẫu nhiên của các dòng tư tưởng lịch sử.",
      "Những biến đổi khách quan trong tồn tại xã hội (khủng hoảng tài nguyên, môi trường).",
      "Sự áp đặt của các trào lưu văn hóa phương Tây.",
      "Ý thức con người tự phát sinh mong muốn bảo vệ thiên nhiên."
    ],
    correctAnswerIndex: 1,
    explanation: "Khi các điều kiện sinh tồn vật chất (tồn tại xã hội) bị đe dọa, ý thức xã hội buộc phải thay đổi để thích nghi."
  },
  {
    id: "s12",
    roleId: "student",
    context: "Khi AI có thể viết code và làm đồ họa, nhiều sinh viên lo lắng tri thức của mình bị 'lỗi thời' và bản thân trở thành 'công nhân số'.",
    question: "Hiện tượng này minh chứng cho quy luật nào?",
    options: [
      "Sự giải phóng hoàn toàn sức lao động nhờ máy móc.",
      "Máy móc (tư bản cố định) thay thế lao động sống trong quá trình sản xuất.",
      "Ý thức con người luôn thất bại trước sức mạnh của công nghệ.",
      "Sự biến mất của mọi mâu thuẫn giai cấp trong tương lai."
    ],
    correctAnswerIndex: 1,
    explanation: "Sự phát triển của công cụ lao động (AI) có thể dẫn đến việc thay thế lao động sống, làm thay đổi địa vị của người lao động."
  },
  {
    id: "s13",
    roleId: "student",
    context: "Sinh viên tích cực tham gia các hội nhóm chia sẻ tài liệu, đồ cũ miễn phí trên mạng thay vì chỉ tập trung mua sắm mới.",
    question: "Sự xuất hiện của ý thức chia sẻ này là do:",
    options: [
      "Tính chất xã hội hóa cao của lực lượng sản xuất số thúc đẩy ý thức cộng đồng.",
      "Sự nghèo đi tuyệt đối của tầng lớp sinh viên trong xã hội.",
      "Hành động mang tính nhất thời, không có cơ sở kinh tế.",
      "Sự sụp đổ của các quy luật thị trường truyền thống."
    ],
    correctAnswerIndex: 0,
    explanation: "Lực lượng sản xuất hiện đại mang tính xã hội hóa cao, tạo điều kiện và đòi hỏi những hình thái ý thức cộng đồng phát triển."
  },
  {
    id: "s14",
    roleId: "student",
    context: "Dù sống trong môi trường kinh tế cạnh tranh, một nhóm sinh viên vẫn kiên trì theo đuổi các giá trị nhân văn và giúp đỡ người nghèo.",
    question: "Điều này thể hiện đặc điểm nào của ý thức xã hội?",
    options: [
      "Ý thức xã hội có tính độc lập tương đối và khả năng tác động ngược lại thực tại.",
      "Ý thức xã hội hoàn toàn không chịu tác động của kinh tế.",
      "Sự ảo tưởng của con người về sức mạnh của bản thân.",
      "Tính kế thừa tuyệt đối không thay đổi của văn hóa."
    ],
    correctAnswerIndex: 0,
    explanation: "Ý thức xã hội không chỉ thụ động phản ánh tồn tại mà còn có tính năng động, định hướng hành động cải tạo xã hội."
  },
  {
    id: "s15",
    roleId: "student",
    context: "Sau khi học xong triết học Marx, Linh nhận ra: 'Các nhà triết học đã giải thích thế giới bằng nhiều cách; song vấn đề là cải tạo thế giới.'",
    question: "Tinh thần này đề cao yếu tố nào nhất trong triết học?",
    options: [
      "Vai trò quyết định của tư duy thuần túy.",
      "Vai trò quyết định của thực tiễn trong việc biến đổi thực tại.",
      "Sự chấp nhận số phận và các quy luật khách quan.",
      "Tầm quan trọng của việc chỉ quan sát và giải thích."
    ],
    correctAnswerIndex: 1,
    explanation: "Thực tiễn là tiêu chuẩn của chân lý và là mục đích cuối cùng của mọi lý luận tri thức chân chính.",
    bonusMoney: 40
  },

  // --- CÂU HỎI BOSS (CHUNG) ---
  {
    id: "boss1",
    roleId: "all",
    context: "'Tính độc lập tương đối của ý thức xã hội' (một vũ khí sắc bén của con người trước hoàn cảnh) thể hiện qua những đặc điểm nào?",
    question: "Đặc điểm của tính độc lập tương đối là:",
    options: [
      "Ý thức hoàn toàn tự do, không bị tồn tại chi phối trong bất kỳ giai đoạn nào.",
      "Ý thức chỉ lạc hậu hơn tồn tại, không bao giờ vượt trước.",
      "Ý thức xã hội thay đổi ngay lập tức khi tồn tại thay đổi.",
      "Ý thức có thể lạc hậu, vượt trước, có tính kế thừa hoặc tác động ngược lại tồn tại trong giới hạn nhất định."
    ],
    correctAnswerIndex: 3,
    explanation: "Đây là nội dung then chốt về tính năng động của đời sống tinh thần xã hội.",
    bonusMoney: 30
  }
];
