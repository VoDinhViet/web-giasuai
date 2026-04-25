import * as React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col lg:flex-row-reverse">
      {/* Hero Column (TailAdmin Inspired) */}
      <div className="relative hidden h-screen w-full items-center bg-primary lg:grid lg:w-1/2">
        <div className="relative z-1 flex items-center justify-center h-full">
          {/* Common Grid Shapes */}
          <div className="absolute right-0 top-0 z-0 w-full max-w-[250px] xl:max-w-[450px] opacity-20">
            <img src="/grid-01.svg" alt="grid" className="w-full" />
          </div>
          <div className="absolute bottom-0 left-0 z-0 w-full max-w-[250px] rotate-180 xl:max-w-[450px] opacity-20">
            <img src="/grid-01.svg" alt="grid" className="w-full" />
          </div>

          <div className="relative z-10 flex max-w-3xl flex-col items-center px-6">
            <div className="mb-8 flex flex-col items-center gap-5">
              <div className="flex size-20 items-center justify-center overflow-hidden rounded-2xl bg-white p-2 shadow-2xl transition-transform hover:scale-105">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="size-full object-contain"
                />
              </div>

              <div className="space-y-2 text-center">
                <h2 className="text-3xl font-black tracking-tighter text-white sm:text-4xl lg:text-5xl">
                  GIA SƯ AI
                </h2>
                <p className="text-sm font-bold text-primary-foreground/80 sm:text-base lg:text-lg">
                  Trợ lý số hóa dành cho giáo viên
                </p>
              </div>
            </div>

            <p className="max-w-md text-center text-xs font-medium text-white/50 leading-relaxed text-balance">
              Hệ thống kho học liệu số tập trung, hỗ trợ giảng dạy và học tập
              với nguồn tài nguyên giáo dục phong phú và chất lượng cao.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content (LoginForm, etc.) */}
      <main className="flex min-h-screen flex-1 overflow-hidden lg:w-1/2">
        {children}
      </main>
    </div>
  );
}
