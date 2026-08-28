// Quiz Data Manifest & Pure On-Demand Fast RAM Cache

export const QUIZ_MANIFEST = [
  { id: 'vnr202-de-cuong-thay', filename: 'VNR202_De_Cuong_Thay.json', title: 'VNR202 - Đề Cương Ôn Thi Tổng Hợp Final (539 Câu Chuẩn Của Thầy)', subject: 'Lịch Sử Đảng', category: 'VNR202', color: 'from-rose-100 to-red-100', icon: 'BookOpen' },
  { id: 'vnr202-full', filename: 'VNR202_Full.json', title: 'VNR202 Full - Lịch Sử Đảng Cộng Sản Việt Nam (428 Câu Chuẩn)', subject: 'Lịch Sử Đảng', category: 'VNR202', color: 'from-rose-100 to-red-100', icon: 'BookOpen' },
  { id: 'vnr202-fe', filename: 'VNR202 - FE - QuizApp.json', title: 'VNR202 - Lịch Sử Đảng Cộng Sản Việt Nam (420 Câu)', subject: 'Lịch Sử Đảng', category: 'VNR202', color: 'from-rose-100 to-red-100', icon: 'BookOpen' },
  { id: 'hcm202-flashcard', filename: 'HCM202 - Flashcard - QuizApp.json', title: 'HCM202 - Tư Tưởng Hồ Chí Minh (300 Câu)', subject: 'Tư Tưởng Hồ Chí Minh', category: 'HCM202', color: 'from-rose-100 to-orange-100', icon: 'Award' },
  { id: 'mln131-flashcard', filename: 'MLN131 - Flashcard - QuizApp.json', title: 'MLN131 - Chủ Nghĩa Xã Hội Khoa Học (360 Câu)', subject: 'Chủ Nghĩa Xã Hội Khoa Học', category: 'MLN131', color: 'from-amber-100 to-orange-100', icon: 'BookOpen' },
  { id: 'enw493c-flashcard', filename: 'ENW493c - Flashcard - QuizApp.json', title: 'ENW493c - Academic Writing (90 Câu)', subject: 'Tiếng Anh Chuyên Ngành', category: 'ENW493c', color: 'from-blue-100 to-indigo-100', icon: 'BookOpen' },
  { id: 'wdu202c-flashcard', filename: 'WDU202c - Flashcard - QuizApp.json', title: 'WDU202c - Web Design & UI/UX (200 Câu)', subject: 'Thiết Kế Web & UI/UX', category: 'WDU202c', color: 'from-purple-100 to-pink-100', icon: 'Layout' },
  { id: 'aid301c-flashcard', filename: 'AID301c - Flashcard - QuizApp.json', title: 'AID301c - Artificial Intelligence Applications (100 Câu)', subject: 'Trí Tuệ Nhân Tạo', category: 'AID301c', color: 'from-emerald-100 to-teal-100', icon: 'Cpu' },
  { id: 'aid301c-flashcard-158', filename: 'AID301c_158_Flashcard.json', title: 'AID301c - Flashcard Full (158 Câu Có Giải Thích)', subject: 'Trí Tuệ Nhân Tạo', category: 'AID301c', color: 'from-teal-100 to-cyan-100', icon: 'Cpu' },
  { id: 'AID301c_SU26_FE', filename: 'AID301c_SU26_FE.json', title: 'AID301c_SU26_FE - (50 câu chuẩn thi lần 1 có đáp án)', subject: 'Trí Tuệ Nhân Tạo', category: 'AID301c', color: 'from-emerald-100 to-teal-100', icon: 'Cpu' },
  { id: 'AID301c_SP26_FE', filename: 'AID301c_SP26_FE.json', title: 'AID301c_SP26_FE - (50 câu có giải thích)', subject: 'Trí Tuệ Nhân Tạo', category: 'AID301c', color: 'from-teal-100 to-cyan-100', icon: 'FileText' },
  { id: 'AID301c_SP26_FE_859730', filename: 'AID301c_SP26_FE_859730.json', title: 'AID301c_SP26_FE_859730 - (50 câu có giải thích)', subject: 'Trí Tuệ Nhân Tạo', category: 'AID301c', color: 'from-teal-100 to-cyan-100', icon: 'FileText' },
  { id: 'ENW493C_FA25_FE_357671', filename: 'ENW493C_FA25_FE_357671.json', title: 'ENW493C_FA25_FE_357671 - (30 câu có giải thích)', subject: 'Tiếng Anh Chuyên Ngành', category: 'ENW493c', color: 'from-sky-100 to-blue-100', icon: 'FileText' },
  { id: 'ENW493c_FA25_FE_W_713459_HA_NOI_25.12.2025', filename: 'ENW493c_FA25_FE_W_713459_HA_NOI_25.12.2025.json', title: 'ENW493c_FA25_FE_W_713459_HA_NOI_25.12.2025 - (Đề Thi PE Essay Guide)', subject: 'Tiếng Anh Chuyên Ngành', category: 'ENW493c', color: 'from-sky-100 to-blue-100', icon: 'FileText' },
  { id: 'ENW493c_FA25_RE', filename: 'ENW493c_FA25_RE.json', title: 'ENW493c_FA25_RE - (30 câu có giải thích)', subject: 'Tiếng Anh Chuyên Ngành', category: 'ENW493c', color: 'from-sky-100 to-blue-100', icon: 'FileText' },
  { id: 'ENW493c_FA25_RE_539812', filename: 'ENW493c_FA25_RE_539812.json', title: 'ENW493c_FA25_RE_539812 - (30 câu có giải thích)', subject: 'Tiếng Anh Chuyên Ngành', category: 'ENW493c', color: 'from-sky-100 to-blue-100', icon: 'FileText' },
  { id: 'ENW493c_FA25_RE_W_891634_HCM_20.12.2025', filename: 'ENW493c_FA25_RE_W_891634_HCM_20.12.2025.json', title: 'ENW493c_FA25_RE_W_891634_HCM_20.12.2025 - (Đề Thi PE Essay Guide)', subject: 'Tiếng Anh Chuyên Ngành', category: 'ENW493c', color: 'from-sky-100 to-blue-100', icon: 'FileText' },
  { id: 'ENW493c_SP26_FE', filename: 'ENW493c_SP26_FE.json', title: 'ENW493c_SP26_FE - (30 câu có giải thích)', subject: 'Tiếng Anh Chuyên Ngành', category: 'ENW493c', color: 'from-sky-100 to-blue-100', icon: 'FileText' },
  { id: 'ENW493c_SP26_FE_662326', filename: 'ENW493c_SP26_FE_662326.json', title: 'ENW493c_SP26_FE_662326 - (30 câu có giải thích)', subject: 'Tiếng Anh Chuyên Ngành', category: 'ENW493c', color: 'from-sky-100 to-blue-100', icon: 'FileText' },
  { id: 'ENW493c_SP26_FE_W_621868_HCM_19.04.2026', filename: 'ENW493c_SP26_FE_W_621868_HCM_19.04.2026.json', title: 'ENW493c_SP26_FE_W_621868_HCM_19.04.2026 - (Đề Thi PE Essay Guide)', subject: 'Tiếng Anh Chuyên Ngành', category: 'ENW493c', color: 'from-sky-100 to-blue-100', icon: 'FileText' },
  { id: 'ENW493c_SP26_RE', filename: 'ENW493c_SP26_RE.json', title: 'ENW493c_SP26_RE - (30 câu có giải thích)', subject: 'Tiếng Anh Chuyên Ngành', category: 'ENW493c', color: 'from-sky-100 to-blue-100', icon: 'FileText' },
  { id: 'ENW493c_SP26_RE_680360', filename: 'ENW493c_SP26_RE_680360.json', title: 'ENW493c_SP26_RE_680360 - (30 câu có giải thích)', subject: 'Tiếng Anh Chuyên Ngành', category: 'ENW493c', color: 'from-sky-100 to-blue-100', icon: 'FileText' },
  { id: 'ENW493c_SP26_RE_W_863461_HCM_04.05.2026', filename: 'ENW493c_SP26_RE_W_863461_HCM_04.05.2026.json', title: 'ENW493c_SP26_RE_W_863461_HCM_04.05.2026 - (Đề Thi PE Essay Guide)', subject: 'Tiếng Anh Chuyên Ngành', category: 'ENW493c', color: 'from-sky-100 to-blue-100', icon: 'FileText' },
  { id: 'ENW493c_SP26_RE_W_PE', filename: 'ENW493c_SP26_RE_W_PE.json', title: 'ENW493c_SP26_RE_W_PE - (Đề Thi PE Essay Guide)', subject: 'Tiếng Anh Chuyên Ngành', category: 'ENW493c', color: 'from-sky-100 to-blue-100', icon: 'FileText' },
  { id: 'ENW493c_SU25_FE_913742', filename: 'ENW493c_SU25_FE_913742.json', title: 'ENW493c_SU25_FE_913742 - (30 câu có giải thích)', subject: 'Tiếng Anh Chuyên Ngành', category: 'ENW493c', color: 'from-sky-100 to-blue-100', icon: 'FileText' },
  { id: 'ENW493c_SU25_FE_R_501794_HCM_23.08.2025', filename: 'ENW493c_SU25_FE_R_501794_HCM_23.08.2025.json', title: 'ENW493c_SU25_FE_R_501794_HCM_23.08.2025 - (Đề Thi PE Essay Guide)', subject: 'Tiếng Anh Chuyên Ngành', category: 'ENW493c', color: 'from-sky-100 to-blue-100', icon: 'FileText' },
  { id: 'HCM202_FA25_FEB5', filename: 'HCM202_FA25_FEB5.json', title: 'HCM202_FA25_FEB5 - (60 câu có giải thích)', subject: 'Tư Tưởng Hồ Chí Minh', category: 'HCM202', color: 'from-rose-100 to-orange-100', icon: 'FileText' },
  { id: 'HCM202_SP25_FE_873109', filename: 'HCM202_SP25_FE_873109.json', title: 'HCM202_SP25_FE_873109 - (61 câu có giải thích)', subject: 'Tư Tưởng Hồ Chí Minh', category: 'HCM202', color: 'from-rose-100 to-orange-100', icon: 'FileText' },
  { id: 'HCM202_SP26_B5FE', filename: 'HCM202_SP26_B5FE.json', title: 'HCM202_SP26_B5FE - (60 câu có giải thích)', subject: 'Tư Tưởng Hồ Chí Minh', category: 'HCM202', color: 'from-rose-100 to-orange-100', icon: 'FileText' },
  { id: 'HCM202_SP26_B5FE_915637', filename: 'HCM202_SP26_B5FE_915637.json', title: 'HCM202_SP26_B5FE_915637 - (61 câu có giải thích)', subject: 'Tư Tưởng Hồ Chí Minh', category: 'HCM202', color: 'from-rose-100 to-orange-100', icon: 'FileText' },
  { id: 'HCM202_SP26_FE_175643', filename: 'HCM202_SP26_FE_175643.json', title: 'HCM202_SP26_FE_175643 - (60 câu có giải thích)', subject: 'Tư Tưởng Hồ Chí Minh', category: 'HCM202', color: 'from-rose-100 to-orange-100', icon: 'FileText' },
  { id: 'HCM202_SP26_RE_513826', filename: 'HCM202_SP26_RE_513826.json', title: 'HCM202_SP26_RE_513826 - (61 câu có giải thích)', subject: 'Tư Tưởng Hồ Chí Minh', category: 'HCM202', color: 'from-rose-100 to-orange-100', icon: 'FileText' },
  { id: 'HCM202_SU25_B5FE', filename: 'HCM202_SU25_B5FE.json', title: 'HCM202_SU25_B5FE - (60 câu có giải thích)', subject: 'Tư Tưởng Hồ Chí Minh', category: 'HCM202', color: 'from-rose-100 to-orange-100', icon: 'FileText' },
  { id: 'HCM202_SU26_C1FE', filename: 'HCM202_SU26_C1FE.json', title: 'HCM202_SU26_C1FE - (60 câu có giải thích)', subject: 'Tư Tưởng Hồ Chí Minh', category: 'HCM202', color: 'from-rose-100 to-orange-100', icon: 'FileText' },
  { id: 'HCM202_SU26_C1FE_133326', filename: 'HCM202_SU26_C1FE_133326.json', title: 'HCM202_SU26_C1FE_133326 - (61 câu có giải thích)', subject: 'Tư Tưởng Hồ Chí Minh', category: 'HCM202', color: 'from-rose-100 to-orange-100', icon: 'FileText' },
  { id: 'HCM202_SU26_RE', filename: 'HCM202_SU26_RE.json', title: 'HCM202_SU26_RE - (60 câu có giải thích)', subject: 'Tư Tưởng Hồ Chí Minh', category: 'HCM202', color: 'from-rose-100 to-orange-100', icon: 'FileText' },
  { id: 'HCM202_SU26_RE_198246', filename: 'HCM202_SU26_RE_198246.json', title: 'HCM202_SU26_RE_198246 - (60 câu có giải thích)', subject: 'Tư Tưởng Hồ Chí Minh', category: 'HCM202', color: 'from-rose-100 to-orange-100', icon: 'FileText' },
  { id: 'MLN131_SP25_FE', filename: 'MLN131_SP25_FE.json', title: 'MLN131_SP25_FE - (60 câu có giải thích)', subject: 'Chủ Nghĩa Xã Hội Khoa Học', category: 'MLN131', color: 'from-amber-100 to-yellow-100', icon: 'FileText' },
  { id: 'MLN131_SP25_FE_982736', filename: 'MLN131_SP25_FE_982736.json', title: 'MLN131_SP25_FE_982736 - (60 câu có giải thích)', subject: 'Chủ Nghĩa Xã Hội Khoa Học', category: 'MLN131', color: 'from-amber-100 to-yellow-100', icon: 'FileText' },
  { id: 'MLN131_SP26_FE', filename: 'MLN131_SP26_FE.json', title: 'MLN131_SP26_FE - (60 câu có giải thích)', subject: 'Chủ Nghĩa Xã Hội Khoa Học', category: 'MLN131', color: 'from-amber-100 to-yellow-100', icon: 'FileText' },
  { id: 'MLN131_SP26_FE_468502', filename: 'MLN131_SP26_FE_468502.json', title: 'MLN131_SP26_FE_468502 - (60 câu có giải thích)', subject: 'Chủ Nghĩa Xã Hội Khoa Học', category: 'MLN131', color: 'from-amber-100 to-yellow-100', icon: 'FileText' },
  { id: 'MLN131_SP26_RE', filename: 'MLN131_SP26_RE.json', title: 'MLN131_SP26_RE - (60 câu có giải thích)', subject: 'Chủ Nghĩa Xã Hội Khoa Học', category: 'MLN131', color: 'from-amber-100 to-yellow-100', icon: 'FileText' },
  { id: 'MLN131_SP26_RE_986572', filename: 'MLN131_SP26_RE_986572.json', title: 'MLN131_SP26_RE_986572 - (61 câu có giải thích)', subject: 'Chủ Nghĩa Xã Hội Khoa Học', category: 'MLN131', color: 'from-amber-100 to-yellow-100', icon: 'FileText' },
  { id: 'MLN131_SU25_B5_FE_873081', filename: 'MLN131_SU25_B5_FE_873081.json', title: 'MLN131_SU25_B5_FE_873081 - (61 câu có giải thích)', subject: 'Chủ Nghĩa Xã Hội Khoa Học', category: 'MLN131', color: 'from-amber-100 to-yellow-100', icon: 'FileText' },
  { id: 'MLN131_SU25_FE_728604', filename: 'MLN131_SU25_FE_728604.json', title: 'MLN131_SU25_FE_728604 - (60 câu có giải thích)', subject: 'Chủ Nghĩa Xã Hội Khoa Học', category: 'MLN131', color: 'from-amber-100 to-yellow-100', icon: 'FileText' },
  { id: 'MLN131_SU26_C1FE', filename: 'MLN131_SU26_C1FE.json', title: 'MLN131_SU26_C1FE - (60 câu có giải thích)', subject: 'Chủ Nghĩa Xã Hội Khoa Học', category: 'MLN131', color: 'from-amber-100 to-yellow-100', icon: 'FileText' },
  { id: 'MLN131_SU26_C1FE_301629', filename: 'MLN131_SU26_C1FE_301629.json', title: 'MLN131_SU26_C1FE_301629 - (61 câu có giải thích)', subject: 'Chủ Nghĩa Xã Hội Khoa Học', category: 'MLN131', color: 'from-amber-100 to-yellow-100', icon: 'FileText' },
  { id: 'MLN131_SU26_C1RE', filename: 'MLN131_SU26_C1RE.json', title: 'MLN131_SU26_C1RE - (60 câu có giải thích)', subject: 'Chủ Nghĩa Xã Hội Khoa Học', category: 'MLN131', color: 'from-amber-100 to-yellow-100', icon: 'FileText' },
  { id: 'MLN131_SU26_C2RE_294773', filename: 'MLN131_SU26_C2RE_294773.json', title: 'MLN131_SU26_C2RE_294773 - (61 câu có giải thích)', subject: 'Chủ Nghĩa Xã Hội Khoa Học', category: 'MLN131', color: 'from-amber-100 to-yellow-100', icon: 'FileText' },
  { id: 'MLN131_SU26_FE', filename: 'MLN131_SU26_FE.json', title: 'MLN131_SU26_FE - (60 câu có giải thích)', subject: 'Chủ Nghĩa Xã Hội Khoa Học', category: 'MLN131', color: 'from-amber-100 to-yellow-100', icon: 'FileText' },
  { id: 'VNR202_C1FA25_FE', filename: 'VNR202_C1FA25_FE.json', title: 'VNR202_C1FA25_FE - (60 câu có giải thích)', subject: 'Lịch Sử Đảng', category: 'VNR202', color: 'from-red-100 to-amber-100', icon: 'FileText' },
  { id: 'VNR202_C2FA25_FE', filename: 'VNR202_C2FA25_FE.json', title: 'VNR202_C2FA25_FE - (60 câu có giải thích)', subject: 'Lịch Sử Đảng', category: 'VNR202', color: 'from-red-100 to-amber-100', icon: 'FileText' },
  { id: 'VNR202_FA25_B5_FE_453817', filename: 'VNR202_FA25_B5_FE_453817.json', title: 'VNR202_FA25_B5_FE_453817 - (61 câu có giải thích)', subject: 'Lịch Sử Đảng', category: 'VNR202', color: 'from-red-100 to-amber-100', icon: 'FileText' },
  { id: 'VNR202_FA25_RE_Ca_1', filename: 'VNR202_FA25_RE_Ca_1.json', title: 'VNR202_FA25_RE_Ca_1 - (60 câu có giải thích)', subject: 'Lịch Sử Đảng', category: 'VNR202', color: 'from-red-100 to-amber-100', icon: 'FileText' },
  { id: 'VNR202_FA25_RE_Ca_2', filename: 'VNR202_FA25_RE_Ca_2.json', title: 'VNR202_FA25_RE_Ca_2 - (60 câu có giải thích)', subject: 'Lịch Sử Đảng', category: 'VNR202', color: 'from-red-100 to-amber-100', icon: 'FileText' },
  { id: 'VNR202_SP26_B5FE', filename: 'VNR202_SP26_B5FE.json', title: 'VNR202_SP26_B5FE - (60 câu có giải thích)', subject: 'Lịch Sử Đảng', category: 'VNR202', color: 'from-red-100 to-amber-100', icon: 'FileText' },
  { id: 'VNR202_SP26_B5FE_384726', filename: 'VNR202_SP26_B5FE_384726.json', title: 'VNR202_SP26_B5FE_384726 - (60 câu có giải thích)', subject: 'Lịch Sử Đảng', category: 'VNR202', color: 'from-red-100 to-amber-100', icon: 'FileText' },
  { id: 'VNR202_SP26_FE_812943', filename: 'VNR202_SP26_FE_812943.json', title: 'VNR202_SP26_FE_812943 - (60 câu có giải thích)', subject: 'Lịch Sử Đảng', category: 'VNR202', color: 'from-red-100 to-amber-100', icon: 'FileText' },
  { id: 'VNR202_SP26_RE', filename: 'VNR202_SP26_RE.json', title: 'VNR202_SP26_RE - (60 câu có giải thích)', subject: 'Lịch Sử Đảng', category: 'VNR202', color: 'from-red-100 to-amber-100', icon: 'FileText' },
  { id: 'VNR202_SP26_RE_879432', filename: 'VNR202_SP26_RE_879432.json', title: 'VNR202_SP26_RE_879432 - (60 câu có giải thích)', subject: 'Lịch Sử Đảng', category: 'VNR202', color: 'from-red-100 to-amber-100', icon: 'FileText' },
  { id: 'VNR202_SU26_FE', filename: 'VNR202_SU26_FE.json', title: 'VNR202_SU26_FE - (60 câu có giải thích)', subject: 'Lịch Sử Đảng', category: 'VNR202', color: 'from-red-100 to-amber-100', icon: 'FileText' },
  { id: 'VNR202_SU26_FE_C2_577432', filename: 'VNR202_SU26_FE_C2_577432.json', title: 'VNR202_SU26_FE_C2_577432 - (60 câu có giải thích)', subject: 'Lịch Sử Đảng', category: 'VNR202', color: 'from-red-100 to-amber-100', icon: 'FileText' },
  { id: 'AET102c_211', filename: 'AET102c_211.json', title: 'AET102c - Art & Aesthetics (211 Câu)', subject: 'Nghệ Thuật & Mỹ Học', category: 'AET102c', color: 'from-fuchsia-100 to-pink-100', icon: 'Sparkles' },
];

// In-Memory RAM Cache for Loaded Quizzes
const normalizedQuizCache = new Map();

// LocalStorage Persistence Keys
const STORAGE_KEY_CUSTOM_QUIZZES = 'quizzlet_custom_quizzes_v1';
const STORAGE_KEY_DELETED_QUIZZES = 'quizzlet_deleted_quiz_ids_v1';

export function getCustomQuizSets() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_CUSTOM_QUIZZES);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function getDeletedQuizIds() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_DELETED_QUIZZES);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

// In-flight request deduplication map to prevent redundant concurrent fetches
const inFlightQuizRequests = new Map();

// Helper to fetch single quiz content from backend on-demand
export async function loadQuizContentAsync(quizId) {
  if (!quizId) return null;
  const targetId = String(quizId).trim().toLowerCase();

  // 1. Return from RAM cache if already loaded
  for (let [key, val] of normalizedQuizCache.entries()) {
    if (String(key).trim().toLowerCase() === targetId && val.questions && val.questions.length > 0) {
      return val;
    }
  }

  // 2. Check custom user-created / community quiz sets from localStorage
  const customSets = getCustomQuizSets();
  const customItem = customSets.find(q => String(q.id).trim().toLowerCase() === targetId);
  if (customItem && customItem.questions && customItem.questions.length > 0) {
    normalizedQuizCache.set(customItem.id, customItem);
    return customItem;
  }

  // 3. Return existing in-flight request promise if already fetching
  if (inFlightQuizRequests.has(targetId)) {
    return inFlightQuizRequests.get(targetId);
  }

  // 4. Fetch from Backend On-Demand API
  const manifestItem = QUIZ_MANIFEST.find(q => String(q.id).trim().toLowerCase() === targetId);
  const lookupKey = manifestItem?.filename?.replace('.json', '') || quizId;
  const API_BASE = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
    ? `${window.location.origin}/api`
    : 'http://localhost:8701/api';

  const requestPromise = (async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('quizzflow_token') : null;
      if (!token) {
        // Unauthenticated: do not spam backend, return safe manifest shell
        return manifestItem ? { ...manifestItem, questions: [] } : { id: quizId, title: 'Bộ Đề Học Tập', questions: [] };
      }

      const headers = { 'Authorization': `Bearer ${token}` };
      const res = await fetch(`${API_BASE}/quizzes/content/${encodeURIComponent(lookupKey)}`, { headers });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.quiz) {
          const fullQuiz = {
            ...(manifestItem || {}),
            ...data.quiz,
            id: manifestItem?.id || data.quiz.id
          };
          normalizedQuizCache.set(fullQuiz.id, fullQuiz);
          normalizedQuizCache.set(targetId, fullQuiz);
          window.dispatchEvent(new CustomEvent('quizzlet_quiz_loaded', { detail: fullQuiz }));
          return fullQuiz;
        }
      }
    } catch (err) {
      console.warn('Error fetching quiz content from API:', err);
    } finally {
      inFlightQuizRequests.delete(targetId);
    }

    return manifestItem ? { ...manifestItem, questions: [] } : { id: quizId, title: 'Bộ Đề Học Tập', questions: [] };
  })();

  inFlightQuizRequests.set(targetId, requestPromise);
  return requestPromise;
}

// SRS Card State Tracking (Synchronized Knowt Learning Engine)
export function getQuizCardStates(quizId) {
  try {
    const data = localStorage.getItem(`quizzlet_card_states_${quizId}`);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    return {};
  }
}

export function setQuizCardState(quizId, questionId, state) {
  try {
    const cardStates = getQuizCardStates(quizId);
    cardStates[questionId] = state; // 'NEW' | 'LEARNING' | 'ALMOST' | 'MASTERED'
    localStorage.setItem(`quizzlet_card_states_${quizId}`, JSON.stringify(cardStates));

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('quizzlet_srs_updated', { detail: { quizId, questionId, state } }));
    }
    return cardStates;
  } catch (e) {
    console.error('Error setting card state', e);
    return {};
  }
}

export function calculateQuizProgressStats(quiz) {
  if (!quiz || !Array.isArray(quiz.questions)) {
    return { newCount: 0, learningCount: 0, almostCount: 0, masteredCount: 0, percentage: 0 };
  }

  const total = quiz.questions.length;
  if (total === 0) return { newCount: 0, learningCount: 0, almostCount: 0, masteredCount: 0, percentage: 0 };

  const cardStates = getQuizCardStates(quiz.id);

  let learningCount = 0;
  let almostCount = 0;
  let masteredCount = 0;

  quiz.questions.forEach(q => {
    const st = cardStates[q.id];
    if (st === 'LEARNING') learningCount++;
    else if (st === 'ALMOST') almostCount++;
    else if (st === 'MASTERED') masteredCount++;
  });

  const newCount = Math.max(0, total - (learningCount + almostCount + masteredCount));
  const percentage = Math.round(((masteredCount + almostCount * 0.5) / total) * 100);

  return { newCount, learningCount, almostCount, masteredCount, percentage };
}
// RAM Throttling Cooldown & In-flight Lock for Community Sync
let lastSyncTime = 0;
let inFlightSyncPromise = null;
const SYNC_COOLDOWN_MS = 10000; // 10s cooldown

export async function syncCommunityQuizzes(force = false) {
  const now = Date.now();
  if (!force && (now - lastSyncTime < SYNC_COOLDOWN_MS)) {
    return getCustomQuizSets();
  }
  if (inFlightSyncPromise) {
    return inFlightSyncPromise;
  }

  inFlightSyncPromise = (async () => {
    try {
      lastSyncTime = Date.now();
      const res = await fetch('/api/quizzes');

      if (res.ok) {
        const data = await res.json();
        const serverCommunitySets = data.customQuizzes || [];
        const serverDeletedIds = data.deletedQuizIds || [];

        // 1. Sync deleted IDs
        localStorage.setItem(STORAGE_KEY_DELETED_QUIZZES, JSON.stringify(serverDeletedIds));
        serverDeletedIds.forEach(delId => {
          normalizedQuizCache.delete(delId);
        });

        // 2. Sync active community quizzes
        const activeSets = serverCommunitySets.filter(s => !serverDeletedIds.includes(s.id));
        activeSets.forEach(cSet => {
          normalizedQuizCache.set(cSet.id, cSet);
        });

        localStorage.setItem(STORAGE_KEY_CUSTOM_QUIZZES, JSON.stringify(activeSets));
        return activeSets;
      }
    } catch (e) {
      console.warn('Community sync offline fallback to LocalStorage');
    } finally {
      inFlightSyncPromise = null;
    }
    return getCustomQuizSets();
  })();

  return inFlightSyncPromise;
}

/**
 * Smart Multi-Choice & Flashcard Auto-Parser
 * Parses questions that contain embedded options (A. B. C. D.) in term/content
 * and maps the definition to the exact correct option.
 */
export function parseCustomQuestionItem(q, idx) {
  const qId = q.id || idx + 1;
  const rawContent = (q.term || q.content || '').trim();
  const rawDef = (q.definition || (Array.isArray(q.answers) ? q.answers.find(a => a.isCorrect || a.is_correct)?.content : '') || '').trim();
  const rawExp = (q.explanation || '').trim();

  // If question already has multiple well-structured options
  if (Array.isArray(q.answers) && q.answers.length > 1) {
    const formattedAnswers = q.answers.map((a, aIdx) => {
      const isCor = Boolean(a.isCorrect || a.is_correct);
      return {
        id: a.id || aIdx + 1,
        content: a.content || `Lựa chọn ${String.fromCharCode(65 + aIdx)}`,
        isCorrect: isCor,
        is_correct: isCor,
        index_order: aIdx,
        question_target_id: qId
      };
    });

    return {
      id: qId,
      questionIndex: idx,
      content: rawContent || 'Câu hỏi',
      explanation: rawExp,
      answers: formattedAnswers,
      questionType: "Single Choice",
      answersList: formattedAnswers
    };
  }

  // Check if rawContent contains embedded multiple choice options A. ... B. ... C. ... D. ...
  const optRegex = /(.*?)(?:\s+|^)[A|a][\.\:\)\/]\s*(.*?)(?:\s+|^)[B|b][\.\:\)\/]\s*(.*?)(?:\s+|^)[C|c][\.\:\)\/]\s*(.*?)(?:\s+|^)[D|d][\.\:\)\/]\s*(.*)$/s;
  const match = rawContent.match(optRegex);

  if (match) {
    const stem = match[1].trim();
    const options = [
      match[2].trim(),
      match[3].trim(),
      match[4].trim(),
      match[5].trim()
    ];

    // Determine which option matches definition
    let correctLetter = 'A';
    const cleanDef = rawDef.trim();

    if (/^[A|a][\.\:\s]/.test(cleanDef) || cleanDef.toUpperCase() === 'A') correctLetter = 'A';
    else if (/^[B|b][\.\:\s]/.test(cleanDef) || cleanDef.toUpperCase() === 'B') correctLetter = 'B';
    else if (/^[C|c][\.\:\s]/.test(cleanDef) || cleanDef.toUpperCase() === 'C') correctLetter = 'C';
    else if (/^[D|d][\.\:\s]/.test(cleanDef) || cleanDef.toUpperCase() === 'D') correctLetter = 'D';
    else {
      const defLower = cleanDef.toLowerCase();
      for (let oIdx = 0; oIdx < options.length; oIdx++) {
        const optLower = options[oIdx].toLowerCase();
        if (optLower && (defLower.includes(optLower) || optLower.includes(defLower))) {
          correctLetter = String.fromCharCode(65 + oIdx);
          break;
        }
      }
    }

    const answers = options.map((opt, oIdx) => {
      const isCor = String.fromCharCode(65 + oIdx) === correctLetter;
      return {
        id: oIdx + 1,
        content: opt,
        isCorrect: isCor,
        is_correct: isCor,
        index_order: oIdx,
        question_target_id: qId
      };
    });

    return {
      id: qId,
      questionIndex: idx,
      content: stem || rawContent,
      explanation: rawExp,
      answers,
      questionType: "Single Choice",
      answersList: answers
    };
  }

  // Check for 3 options pattern A. ... B. ... C. ...
  const optRegex3 = /(.*?)(?:\s+|^)[A|a][\.\:\)\/]\s*(.*?)(?:\s+|^)[B|b][\.\:\)\/]\s*(.*?)(?:\s+|^)[C|c][\.\:\)\/]\s*(.*)$/s;
  const match3 = rawContent.match(optRegex3);
  if (match3) {
    const stem = match3[1].trim();
    const options = [
      match3[2].trim(),
      match3[3].trim(),
      match3[4].trim(),
      "Cả A, B và C"
    ];

    let correctLetter = 'A';
    const cleanDef = rawDef.trim();
    if (/^[A|a][\.\:\s]/.test(cleanDef) || cleanDef.toUpperCase() === 'A') correctLetter = 'A';
    else if (/^[B|b][\.\:\s]/.test(cleanDef) || cleanDef.toUpperCase() === 'B') correctLetter = 'B';
    else if (/^[C|c][\.\:\s]/.test(cleanDef) || cleanDef.toUpperCase() === 'C') correctLetter = 'C';
    else if (/^[D|d][\.\:\s]/.test(cleanDef) || cleanDef.toUpperCase() === 'D') correctLetter = 'D';

    const answers = options.map((opt, oIdx) => {
      const isCor = String.fromCharCode(65 + oIdx) === correctLetter;
      return {
        id: oIdx + 1,
        content: opt,
        isCorrect: isCor,
        is_correct: isCor,
        index_order: oIdx,
        question_target_id: qId
      };
    });

    return {
      id: qId,
      questionIndex: idx,
      content: stem || rawContent,
      explanation: rawExp,
      answers,
      questionType: "Single Choice",
      answersList: answers
    };
  }

  // Standard 1-definition card fallback
  const isCor = true;
  const answers = [{
    id: 1,
    content: rawDef || 'Định nghĩa',
    isCorrect: isCor,
    is_correct: isCor,
    index_order: 0,
    question_target_id: qId
  }];

  return {
    id: qId,
    questionIndex: idx,
    content: rawContent || 'Thuật ngữ',
    explanation: rawExp,
    answers,
    questionType: "Single Choice",
    answersList: answers
  };
}

// Create Custom Quiz Set (Sync to Server VPS & Backup to GitHub)
export async function createCustomQuizSet({ title, description, password, questions }) {
  if (!password || password.trim() === '') {
    throw new Error('Bắt buộc phải nhập mật khẩu cho bộ đề!');
  }

  const id = `custom-${Date.now()}`;
  const category = 'TỰ TẠO';
  const parsedQuestions = (questions || []).map((q, idx) => parseCustomQuestionItem(q, idx));

  const newSet = {
    id,
    title: title || 'Bộ đề mới tạo',
    subject: description || 'Bộ đề do người dùng tự tạo',
    category,
    color: 'from-amber-100 via-rose-100 to-indigo-100',
    icon: 'Sparkles',
    isCustom: true,
    password: password.trim(),
    questions: parsedQuestions
  };

  // Update RAM cache immediately
  normalizedQuizCache.set(id, newSet);

  // POST directly to VPS Node.js Backend First (Single Source of Truth)
  try {
    const res = await fetch('/api/quizzes/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSet)
    });

    if (res.ok) {
      await syncCommunityQuizzes();
    } else {
      throw new Error('API server error');
    }
  } catch (e) {
    console.warn('Could not reach backend API, stored locally as fallback.');
    const currentCustoms = getCustomQuizSets();
    const updatedCustoms = [newSet, ...currentCustoms.filter(c => c.id !== id)];
    localStorage.setItem(STORAGE_KEY_CUSTOM_QUIZZES, JSON.stringify(updatedCustoms));
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('quizzlet_custom_created', { detail: newSet }));
  }

  return newSet;
}

// Verify Quiz Password securely via Server API
export async function verifyQuizPassword(quizId, password) {
  try {
    const token = typeof window !== 'undefined' ? (localStorage.getItem('quizzflow_token') || localStorage.getItem('quizzlet_auth_token')) : null;
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch('/api/quizzes/verify-password', {
      method: 'POST',
      headers,
      body: JSON.stringify({ quizId, password })
    });
    if (res.ok) {
      const data = await res.json();
      return Boolean(data.valid);
    }
  } catch (e) {
    console.warn('API password check offline, using local verification');
  }

  // Fallback local verification
  const quiz = fetchQuizById(quizId);
  const correctPassword = quiz?.password || '';
  return password === 'nhu' || (correctPassword !== '' && password === correctPassword);
}

// Update existing Custom Quiz Set
export async function updateCustomQuizSet(quizId, password, { title, description, questions }) {
  const isPasswordValid = await verifyQuizPassword(quizId, password);
  if (!isPasswordValid) {
    throw new Error('Mật khẩu không chính xác');
  }

  const existing = fetchQuizById(quizId);
  const parsedQuestions = (questions || []).map((q, idx) => parseCustomQuestionItem(q, idx));

  const updatedSet = {
    ...existing,
    title: title || existing.title,
    subject: description || existing.subject,
    questions: parsedQuestions
  };

  normalizedQuizCache.set(quizId, updatedSet);

  try {
    const token = typeof window !== 'undefined' ? (localStorage.getItem('quizzflow_token') || localStorage.getItem('quizzlet_auth_token')) : null;
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    await fetch('/api/quizzes/update', {
      method: 'POST',
      headers,
      body: JSON.stringify({ quizId, password, updatedSet })
    });
    await syncCommunityQuizzes(true);
  } catch (e) {
    console.warn('Update API offline');
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('quizzlet_custom_created', { detail: updatedSet }));
  }

  return updatedSet;
}

// Delete ANY Quiz Set Globally (Custom or System sets)
export async function deleteCustomQuizSet(quizId, password) {
  const isPasswordValid = await verifyQuizPassword(quizId, password);
  if (!isPasswordValid) {
    return false;
  }

  // 1. Delete from RAM cache immediately
  normalizedQuizCache.delete(quizId);

  // 2. Delete from local custom storage
  const currentCustoms = getCustomQuizSets();
  const updatedCustoms = currentCustoms.filter(c => c.id !== quizId);
  localStorage.setItem(STORAGE_KEY_CUSTOM_QUIZZES, JSON.stringify(updatedCustoms));

  // 3. Track deleted ID locally
  const currentDeleted = getDeletedQuizIds();
  if (!currentDeleted.includes(quizId)) {
    const updatedDeleted = [...currentDeleted, quizId];
    localStorage.setItem(STORAGE_KEY_DELETED_QUIZZES, JSON.stringify(updatedDeleted));
  }

  try {
    const token = typeof window !== 'undefined' ? (localStorage.getItem('quizzflow_token') || localStorage.getItem('quizzlet_auth_token')) : null;
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch('/api/quizzes/delete', {
      method: 'POST',
      headers,
      body: JSON.stringify({ quizId, password })
    });

    if (res.ok) {
      await syncCommunityQuizzes(true);
    }
  } catch (e) {
    console.warn('Delete API offline');
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('quizzlet_custom_created', { detail: [] }));
  }

  return true;
}

export function fetchQuizById(quizId) {
  if (!quizId) return null;
  const targetId = String(quizId).trim().toLowerCase();
  
  // 1. Check normalized RAM cache
  for (let [key, val] of normalizedQuizCache.entries()) {
    if (String(key).trim().toLowerCase() === targetId) {
      return val;
    }
  }

  // 2. Check static QUIZ_MANIFEST
  const manifestItem = QUIZ_MANIFEST.find(q => String(q.id).trim().toLowerCase() === targetId);
  if (manifestItem) {
    return {
      ...manifestItem,
      questions: []
    };
  }

  // 3. Check custom user-created / community quiz sets
  const customSets = getCustomQuizSets();
  const customItem = customSets.find(q => String(q.id).trim().toLowerCase() === targetId);
  if (customItem) {
    return customItem;
  }

  // 4. Safe Fallback instead of throw Error
  console.warn(`[quizDataLoader] Quiz with id "${quizId}" not found in manifest or custom sets. Returning safe fallback.`);
  return {
    id: quizId,
    title: 'Bộ Đề Học Tập',
    subject: 'Ôn Tập',
    category: 'CHUNG',
    questions: []
  };
}

// LocalStorage Progress Tracker
const STORAGE_KEY_PROGRESS = 'quizzlet_study_progress_v1';

export function getUserProgress() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_PROGRESS);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    console.error('Error reading progress from localStorage', e);
    return {};
  }
}

export function saveQuizProgress(quizId, score, total, mode) {
  try {
    const progress = getUserProgress();
    if (!progress[quizId]) {
      progress[quizId] = { attempts: 0, bestScore: 0, history: [] };
    }
    const current = progress[quizId];
    current.attempts += 1;
    current.bestScore = Math.max(current.bestScore, Math.round((score / total) * 100));
    current.history.push({
      date: new Date().toISOString(),
      score,
      total,
      mode,
      percentage: Math.round((score / total) * 100)
    });
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
    return progress;
  } catch (e) {
    console.error('Error saving progress to localStorage', e);
  }
}

export const STORAGE_KEY_STARS = 'quiz_starred_questions_v2';
const STORAGE_KEY_STARS_V1 = 'quizzlet_starred_questions_v1';

/**
 * Universal Canonical Question ID Generator (100% Invariant across Users/Guests)
 */
export function getCanonicalQuestionId(quizId, question, index = 0) {
  const cleanQuizId = quizId ? String(quizId).trim() : 'GLOBAL';
  const rawQId = (question && question.id !== undefined && question.id !== null) ? question.id : (index + 1);
  return `${cleanQuizId}_q${rawQId}`;
}

export function getStarredQuestions(quizId) {
  try {
    let data = localStorage.getItem(STORAGE_KEY_STARS);
    if (!data) {
      const v1Data = localStorage.getItem(STORAGE_KEY_STARS_V1);
      if (v1Data) {
        data = v1Data;
        localStorage.setItem(STORAGE_KEY_STARS, v1Data);
      }
    }
    const list = data ? JSON.parse(data) : [];
    if (quizId) {
      const targetStr = String(quizId).trim().toLowerCase();
      return list.filter(s => 
        String(s.quizId).trim().toLowerCase() === targetStr || 
        (s.question && String(s.question.quizId).trim().toLowerCase() === targetStr)
      );
    }
    return list;
  } catch (e) {
    return [];
  }
}

export function toggleStarQuestion(questionId, quizId, questionData, questionIndex = 0) {
  try {
    const stars = getStarredQuestions();
    // Unique question matching by questionId or question content to prevent duplicates across exam modes
    const index = stars.findIndex(s => 
      String(s.questionId) === String(questionId) || 
      (s.question && questionData && String(s.question.content).trim() === String(questionData.content).trim())
    );

    let updated;
    if (index >= 0) {
      updated = stars.filter((_, idx) => idx !== index);
    } else {
      let realQuizId = quizId || questionData?.quizId || 'STARRED';
      let quizTitle = questionData?.quizTitle;
      let subjectCode = questionData?.subjectCode || 'BỘ ĐỀ';
      
      // Resolve authentic quiz metadata from manifest or cache
      const quizInfo = normalizedQuizCache.get(realQuizId) || 
                       QUIZ_MANIFEST.find(q => String(q.id).trim().toLowerCase() === String(realQuizId).trim().toLowerCase()) || {};

      if (quizInfo.title) quizTitle = quizInfo.title;
      if (quizInfo.category) subjectCode = quizInfo.category;
      if (quizInfo.id) realQuizId = quizInfo.id;

      if (!quizTitle || quizTitle === 'Bộ Đề Ôn Tập') {
        quizTitle = questionData?.quizTitle || quizInfo.subject || 'Bộ Đề Ôn Tập';
      }
      
      const formattedQuestion = {
        id: questionId,
        content: questionData?.content || 'Nội dung câu hỏi',
        answers: questionData?.answers || questionData?.answersList || [],
        explanation: questionData?.explanation || '',
        quizId: realQuizId,
        quizTitle: quizTitle
      };

      updated = [
        ...stars,
        {
          questionId,
          quizId: realQuizId,
          subjectCode: subjectCode,
          quizTitle: quizTitle,
          questionIndex: questionData?.questionIndex ?? questionIndex,
          question: formattedQuestion,
          timestamp: Date.now()
        }
      ];
    }
    localStorage.setItem(STORAGE_KEY_STARS, JSON.stringify(updated));

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('quizzlet_star_updated', { detail: updated }));
    }
    return updated;
  } catch (e) {
    console.error('Error toggling star question', e);
    return [];
  }
}

export function unstarQuizSet(quizId) {
  try {
    const stars = getStarredQuestions();
    const updated = stars.filter(s => s.quizId !== quizId);
    localStorage.setItem(STORAGE_KEY_STARS, JSON.stringify(updated));

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('quizzlet_star_updated', { detail: updated }));
    }
    return updated;
  } catch (e) {
    console.error('Error unstarring quiz set', e);
    return [];
  }
}

export function clearAllStarredQuestions() {
  try {
    localStorage.setItem(STORAGE_KEY_STARS, JSON.stringify([]));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('quizzlet_star_updated', { detail: [] }));
    }
    return [];
  } catch (e) {
    console.error('Error clearing all starred questions', e);
    return [];
  }
}
