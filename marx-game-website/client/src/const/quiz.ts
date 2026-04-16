
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
    context: "Một thanh niên nông thôn lên thành phố làm công nhân. Sau 2 năm, từ cách ăn mặc đến quan điểm về việc 'phải có mảnh đất cắm dùi' của anh ta thay đổi hoàn toàn.",
    question: "Luận điểm Marx nào được minh họa ở đây?",
    options: [
      "Con người tự thay đổi độc lập với hoàn cảnh nhờ ý chí.",
      "Đô thị hóa chỉ thay đổi hành vi bên ngoài, ý thức thực sự không đổi.",
      "Tôn giáo và truyền thống gia đình bảo vệ ý thức khỏi thay đổi vĩnh viễn.",
      "Tồn tại xã hội mới (môi trường công nghiệp đô thị) quyết định sự thay đổi ý thức."
    ],
    correctAnswerIndex: 3,
    explanation: "Khi điều kiện sống (tồn tại xã hội) thay đổi, ý thức của cá nhân cũng sẽ biến đổi theo để thích nghi."
  },
  {
    id: "f2",
    roleId: "farmer",
    context: "Dù kinh tế phong kiến đã mất từ lâu, nhưng trong các buổi họp họ ở quê, tư tưởng 'trọng nam khinh nữ' vẫn còn rất nặng nề dù phụ nữ nay đã đi làm kiếm tiền không thua kém nam giới.",
    question: "Marx giải thích hiện tượng này là do:",
    options: [
      "Tư tưởng phong kiến đúng nên không thể thay đổi — đây là quy luật tự nhiên.",
      "Ý thức xã hội thường có độ trễ (lạc hậu) so với tồn tại — ý thức cũ bảo lưu lâu sau khi điều kiện vật chất đã thay đổi.",
      "Điều kiện kinh tế phong kiến thực ra chưa thực sự biến mất, chỉ thay đổi hình thức.",
      "Đây là bằng chứng Marx sai — ý thức không phụ thuộc vào tồn tại."
    ],
    correctAnswerIndex: 1,
    explanation: "Ý thức xã hội thường lạc hậu hơn tồn tại xã hội do sức mạnh của tập quán, truyền thống."
  },
  {
    id: "f3",
    roleId: "farmer",
    context: "Chương trình giảm nghèo của Nhà nước không chỉ hỗ trợ tiền mặt mà còn xây điện, đường, trường, trạm tại bản làng. Việc thay đổi 'điều kiện vật chất' này thể hiện nhận thức Marxist như thế nào?",
    question: "Nhận thức nào sau đây là đúng?",
    options: [
      "Đây là chủ nghĩa nhân đạo thuần túy, không liên quan đến triết học Marx.",
      "Chỉ cần thay đổi ý thức (giáo dục) là đủ, không cần thay đổi điều kiện kinh tế.",
      "Chương trình này mâu thuẫn với Marx vì nhà nước can thiệp vào thị trường.",
      "Nhà nước nhận thức: phải thay đổi tồn tại xã hội (điều kiện vật chất) để thay đổi được ý thức xã hội (tư duy thoát nghèo)."
    ],
    correctAnswerIndex: 3,
    explanation: "Thay đổi tồn tại xã hội là cơ sở để thay đổi ý thức xã hội một cách bền vững.",
    bonusMoney: 10
  },
  {
    id: "f4",
    roleId: "farmer",
    context: "Theo Marx, khi nói về 'tồn tại xã hội' — tức là cái gốc rễ của đời sống nông thôn hay thành thị — thì khái niệm này bao gồm những gì?",
    question: "Khái niệm 'tồn tại xã hội' bao gồm:",
    options: [
      "Quan niệm đạo đức, tôn giáo, triết học của con người trong xã hội.",
      "Hệ thống pháp luật, thể chế chính trị và bộ máy nhà nước.",
      "Ngôn ngữ, văn hóa và phong tục tập quán của dân tộc.",
      "Toàn bộ điều kiện sinh hoạt vật chất, quan hệ sản xuất và phương thức sản xuất."
    ],
    correctAnswerIndex: 3,
    explanation: "Tồn tại xã hội bao gồm phương thức sản xuất, điều kiện tự nhiên và dân cư."
  },
  {
    id: "f5",
    roleId: "farmer",
    context: "Nhà nước ban hành Luật Hôn nhân và Gia đình (1959, 1986, 2014), dần xóa bỏ các hủ tục như tảo hôn, ép hôn ở nông thôn.",
    question: "Điều này giải thích theo Marx như thế nào?",
    options: [
      "Luật pháp (ý thức) có thể tự động thay đổi ý thức người dân dù kinh tế chưa thay đổi.",
      "Việc ban hành luật không có tác dụng gì — chỉ kinh tế mới tự động thay đổi được nhận thức.",
      "Đây là biểu hiện duy tâm, phủ nhận lý thuyết của Marx.",
      "Luật pháp (ý thức) tác động ngược lại, nhưng hiệu quả thực tế cần tồn tại kinh tế đủ trưởng thành để thay đổi truyền thống tư tưởng."
    ],
    correctAnswerIndex: 3,
    explanation: "Minh họa cho tính độc lập tương đối của ý thức xã hội: tác động ngược lại tồn tại xã hội."
  },

  // --- TUYẾN 2: CÔNG NHÂN HIỆN ĐẠI ---
  {
    id: "w1",
    roleId: "worker",
    context: "Sự bùng nổ của kinh tế nền tảng (Grab, Shopee) tạo ra lớp 'lao động tự do' với thu nhập bất ổn.",
    question: "Theo Marx, khi điều kiện lao động mới này xuất hiện, điều gì tất yếu xảy ra?",
    options: [
      "Ý thức về quyền lao động sẽ không thay đổi vì văn hóa 'tự làm tự chịu' ăn sâu.",
      "Công nghệ giải phóng ý thức người lao động mà không cần thay đổi điều kiện sống.",
      "Ý thức xã hội truyền thống sẽ cản trở hoàn toàn việc thích nghi với kinh tế mới.",
      "Điều kiện lao động mới (tồn tại xã hội) sẽ dần hình thành ý thức mới về quyền lợi và đoàn kết."
    ],
    correctAnswerIndex: 3,
    explanation: "Phương thức sản xuất mới sẽ dần hình thành nên hệ tư tưởng và ý thức xã hội tương ứng."
  },
  {
    id: "w2",
    roleId: "worker",
    context: "Trong COVID-19, phong tỏa và mất việc khiến quan niệm về y tế, làm việc từ xa, ưu tiên tích lũy dự phòng của công nhân thay đổi đột ngột và kéo dài.",
    question: "Marx sẽ giải thích hiện tượng này như thế nào?",
    options: [
      "Ý thức con người thay đổi hoàn toàn tự nguyện, không cần điều kiện bên ngoài.",
      "Truyền thông và mạng xã hội là nguyên nhân duy nhất, không liên quan đến tồn tại.",
      "Đây là bằng chứng duy tâm: tinh thần con người vượt qua mọi điều kiện vật chất.",
      "Khủng hoảng vật chất (phong tỏa, mất việc, bệnh dịch) đã trực tiếp tái cấu trúc ý thức xã hội."
    ],
    correctAnswerIndex: 3,
    explanation: "Biến cố trong tồn tại xã hội buộc ý thức xã hội phải thay đổi để thích nghi.",
    bonusMoney: 15
  },
  {
    id: "w3",
    roleId: "worker",
    context: "Một công nhân làm việc ở dây chuyền tự động sẽ phải có kỷ luật và nhận thức khác hẳn một người thợ thủ công làm việc tùy hứng.",
    question: "Nguyên lý căn bản nhất của Marx được áp dụng ở đây là:",
    options: [
      "Ý thức và tồn tại tác động qua lại hoàn toàn ngang bằng nhau.",
      "Ý thức quyết định tồn tại — tư duy định hình thực tại.",
      "Tồn tại và ý thức song song, độc lập, không có nhân quả.",
      "Tồn tại xã hội quyết định ý thức xã hội — điều kiện vật chất (cách làm việc) định hình tư tưởng."
    ],
    correctAnswerIndex: 3,
    explanation: "Tồn tại xã hội quyết định ý thức xã hội là nguyên lý nền tảng."
  },
  {
    id: "w4",
    roleId: "worker",
    context: "Có người nói công nhân bị máy móc kiểm soát nên ý thức của họ chỉ biết phản chiếu hoàn cảnh như một cỗ máy, không thể làm gì khác.",
    question: "Dựa vào quan điểm của Marx, ĐÚNG hay SAI khi cho rằng 'ý thức xã hội hoàn toàn thụ động, không có khả năng tác động ngược lại tồn tại'?",
    options: [
      "ĐÚNG — ý thức chỉ là gương phản chiếu thụ động.",
      "ĐÚNG — vì công nhân không sở hữu tư liệu sản xuất.",
      "SAI — nhưng chỉ đúng với giới tinh hoa, còn công nhân thì thụ động.",
      "SAI — Marx thừa nhận tính độc lập tương đối của ý thức, nó có thể tác động trở lại tồn tại."
    ],
    correctAnswerIndex: 3,
    explanation: "Ý thức xã hội có tính độc lập tương đối và tác động ngược lại tồn tại xã hội."
  },
  {
    id: "w5",
    roleId: "worker",
    context: "Nghe kể các nước Bắc Âu có phúc lợi cho công nhân rất cao, bình đẳng giới tốt, ý thức cộng đồng mạnh.",
    question: "Marx giải thích nguyên nhân chính của ý thức cộng đồng này là gì?",
    options: [
      "Người dân Bắc Âu có gene đặc biệt hoặc khí hậu tạo ra ý thức kỷ luật cao.",
      "Đạo Tin Lành (Protestant) tạo ra ý thức làm việc chăm chỉ và trung thực.",
      "Khí hậu khắc nghiệt buộc mọi người hợp tác, tự nhiên hình thành ý thức cộng đồng.",
      "Tồn tại xã hội (kinh tế phúc lợi, phân phối bình đẳng) định hình ý thức cộng đồng cao."
    ],
    correctAnswerIndex: 3,
    explanation: "Điều kiện sống và quan hệ phân phối (tồn tại xã hội) định hình nên ý thức cộng đồng."
  },

  // --- TUYẾN 3: SINH VIÊN THÀNH PHỐ ---
  {
    id: "s1",
    roleId: "student",
    context: "Gen Z Việt Nam (sinh 1997-2012) có ý thức rất khác thế hệ trước về quyền cá nhân, bình đẳng giới, sức khỏe tâm thần.",
    question: "Marx giải thích sự khác biệt này như thế nào?",
    options: [
      "Gen Z thông minh hơn và tự nhận thức được quyền lợi tốt hơn các thế hệ trước.",
      "Ảnh hưởng văn hóa phương Tây qua internet đã 'nhiễm' vào giới trẻ Việt Nam.",
      "Đây là suy thoái đạo đức, đi ngược lại truyền thống cần phải ngăn chặn.",
      "Tồn tại xã hội của Gen Z (kinh tế số, đô thị, hội nhập, không chiến tranh) hoàn toàn khác → ý thức tất yếu khác."
    ],
    correctAnswerIndex: 3,
    explanation: "Môi trường sống khác biệt tạo ra thế hệ với hệ giá trị và ý thức khác biệt."
  },
  {
    id: "s2",
    roleId: "student",
    context: "Nếu tồn tại quyết định ý thức, tại sao những nhà tư tưởng như Marx hay những sinh viên ôm mộng khởi nghiệp công nghệ lại có thể có những ý tưởng 'đi trước thời đại'?",
    question: "Marx giải thích điều này như thế nào?",
    options: [
      "Điều này chứng tỏ Marx sai — ý thức thiên tài thoát khỏi quy luật.",
      "Tư tưởng tiến bộ chỉ là sự ảo tưởng, không có liên hệ với thực tại.",
      "Đây là vấn đề may mắn, không liên quan đến học thuyết triết học.",
      "Ý thức tiên tiến phản ánh và tổng hợp những mâu thuẫn, xu hướng đang tiềm ẩn trong tồn tại xã hội đương thời."
    ],
    correctAnswerIndex: 3,
    explanation: "Tính vượt trước của ý thức xã hội: phát hiện ra quy luật vận động của tương lai từ trong hiện tại."
  },
  {
    id: "s3",
    roleId: "student",
    context: "Một nhóm sinh viên khởi nghiệp nghèo phát minh ra thuật toán AI mới thay đổi cách thức sản xuất toàn cầu.",
    question: "Phân tích Marxist nào sau đây CHÍNH XÁC NHẤT?",
    options: [
      "Điều này bác bỏ hoàn toàn Marx — ý thức cá nhân đã quyết định tồn tại kinh tế.",
      "Chỉ có thiên tài cá nhân quan trọng — tồn tại xã hội là thứ yếu.",
      "Marx không có quan điểm về khoa học và phát minh kỹ thuật.",
      "Phát minh là sản phẩm của tồn tại xã hội trước đó, đồng thời minh họa ý thức tác động ngược lại tồn tại."
    ],
    correctAnswerIndex: 3,
    explanation: "Khoa học là lực lượng sản xuất đặc biệt, vừa là sản phẩm của xã hội vừa là công cụ cải tạo xã hội.",
    bonusMoney: 20
  },
  {
    id: "s4",
    roleId: "student",
    context: "Từ thời kỳ Đổi Mới 1986 đến nay, tư duy sinh viên chuyển từ 'chỉ muốn làm nhà nước' sang tư duy thị trường, văn hóa doanh nhân, thích khởi nghiệp.",
    question: "Theo Marx, hệ quả ý thức xã hội này có tất yếu không?",
    options: [
      "Không, ý thức xã hội lẽ ra phải giữ nguyên vì văn hóa Việt Nam bền vững.",
      "Chỉ tầng lớp doanh nhân mới đổi ý thức, còn sinh viên thì không.",
      "Khát vọng làm giàu của người Việt Nam từ xưa đã vậy, không liên quan đến Đổi Mới.",
      "Có, tồn tại kinh tế mới (thị trường) tất yếu hình thành ý thức xã hội mới: tư duy thị trường, văn hóa doanh nhân."
    ],
    correctAnswerIndex: 3,
    explanation: "Thay đổi cơ sở kinh tế tất yếu dẫn đến sự thay đổi của kiến thức thượng tầng và ý thức xã hội."
  },
  {
    id: "s5",
    roleId: "student",
    context: "Khi phân tích các trào lưu tư tưởng trong sinh viên (từ những thói quen sống hàng ngày đến lý tưởng chính trị), khái niệm 'Ý thức xã hội' bao gồm những dạng nào?",
    question: "Khái niệm 'Ý thức xã hội' bao gồm:",
    options: [
      "Chỉ bao gồm hệ tư tưởng chính trị, pháp quyền và đạo đức.",
      "Chỉ bao gồm triết học, khoa học và nghệ thuật.",
      "Chỉ là tâm lý xã hội — tình cảm, thói quen, tập tục.",
      "Toàn bộ đời sống tinh thần: tâm lý xã hội và các hình thái hệ tư tưởng (chính trị, pháp quyền, đạo đức, khoa học...)."
    ],
    correctAnswerIndex: 3,
    explanation: "Ý thức xã hội bao hàm cả tâm lý xã hội và hệ tư tưởng xã hội."
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
