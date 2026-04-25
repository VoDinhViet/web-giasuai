import * as React from "react";
import { IconChevronRight, IconArrowRight, IconChevronLeft } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

interface TheoryItem {
  title: string;
  desc: string;
}

interface TheorySession {
  id: string;
  title: string;
  description: string;
  items: TheoryItem[];
}

const THEORY_SESSIONS: TheorySession[] = [
  {
    id: "session-1",
    title: "Kiến trúc Next.js 15",
    description: "Khám phá cách Next.js 15 thay đổi cách chúng ta xây dựng ứng dụng web hiện đại.",
    items: [
      { title: "App Router", desc: "Cơ chế routing dựa trên file-system giúp quản lý cấu trúc dự án trực quan." },
      { title: "Server Components", desc: "Giảm thiểu JavaScript gửi đến client bằng cách render mặc định trên server." },
    ]
  },
  {
    id: "session-2",
    title: "Tối ưu hóa Hiệu năng",
    description: "Các kỹ thuật nâng cao để đảm bảo ứng dụng luôn đạt điểm số Core Web Vitals tối đa.",
    items: [
      { title: "Streaming", desc: "Hiển thị giao diện ngay lập tức trong khi dữ liệu đang được tải ở background." },
      { title: "Partial Prerendering", desc: "Kết hợp giữa nội dung tĩnh và động trong cùng một trang một cách thông minh." },
    ]
  },
  {
    id: "session-3",
    title: "Quản lý Dữ liệu",
    description: "Cách tiếp cận hiện đại để tương tác với database và xử lý form.",
    items: [
      { title: "Server Actions", desc: "Xử lý logic phía server trực tiếp từ các component mà không cần API route." },
      { title: "Caching Strategies", desc: "Làm chủ cơ chế cache để tối ưu hóa tốc độ và chi phí hạ tầng." },
    ]
  }
];

interface LessonTheoryStepProps {
  onNext: () => void;
}

export function LessonTheoryStep({ onNext }: LessonTheoryStepProps) {
  const [currentSessionIdx, setCurrentSessionIdx] = React.useState(0);
  const totalSessions = THEORY_SESSIONS.length;
  const session = THEORY_SESSIONS[currentSessionIdx];
  const isLastSession = currentSessionIdx === totalSessions - 1;

  const nextSession = () => {
    if (currentSessionIdx < totalSessions - 1) {
      setCurrentSessionIdx(prev => prev + 1);
    }
  };

  const prevSession = () => {
    if (currentSessionIdx > 0) {
      setCurrentSessionIdx(prev => prev - 1);
    }
  };

  return (
    <div className="space-y-20 animate-in fade-in duration-700">
      {/* Mini Progress for Sessions */}
      <div className="flex gap-2">
        {THEORY_SESSIONS.map((_, idx) => (
          <div 
            key={idx} 
            className={`h-1 flex-1 rounded-full transition-colors ${idx <= currentSessionIdx ? 'bg-zinc-900' : 'bg-zinc-100'}`}
          />
        ))}
      </div>

      {/* Intro Header */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
           <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em]">
             Session 0{currentSessionIdx + 1} / 0{totalSessions}
           </span>
        </div>
        <h1 className="text-5xl font-black tracking-tight leading-tight text-zinc-900">
          {session.title}
        </h1>
        <p className="text-zinc-500 text-xl leading-relaxed max-w-3xl">
          {session.description}
        </p>
      </div>

      {/* Session Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
        {session.items.map((item, iIdx) => (
          <div key={iIdx} className="space-y-4 border-l-2 border-zinc-100 pl-8 py-2 hover:border-zinc-900 transition-colors group">
            <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-900 flex items-center gap-2">
              <IconArrowRight size={14} className="text-zinc-300 group-hover:translate-x-1 transition-transform" />
              {item.title}
            </h4>
            <p className="text-zinc-500 leading-relaxed text-[16px]">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Internal Navigation Controls */}
      <div className="flex items-center justify-between pt-16 border-t border-zinc-50">
        <button 
          onClick={prevSession}
          disabled={currentSessionIdx === 0}
          className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-opacity ${currentSessionIdx === 0 ? 'opacity-0' : 'text-zinc-400 hover:text-zinc-900'}`}
        >
          <IconChevronLeft size={16} />
          Quay lại Session 0{currentSessionIdx}
        </button>

        {isLastSession ? (
          <Button 
            onClick={onNext} 
            className="rounded-full px-12 h-16 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest gap-4 shadow-2xl shadow-zinc-200 transition-all hover:scale-105 active:scale-95"
          >
            Bắt đầu thực hành ngay
            <IconChevronRight size={20} />
          </Button>
        ) : (
          <Button 
            onClick={nextSession} 
            variant="outline"
            className="rounded-full px-10 h-16 border-zinc-200 hover:border-zinc-900 hover:bg-transparent text-zinc-900 font-bold text-xs uppercase tracking-widest gap-4 transition-all"
          >
            Tiếp theo: Session 0{currentSessionIdx + 2}
            <IconChevronRight size={18} />
          </Button>
        )}
      </div>
    </div>
  );
}
