import * as React from "react";
import Image from "next/image";

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
            <Image 
              src="/grid-01.svg" 
              alt="grid" 
              width={450} 
              height={450} 
              className="h-auto w-full" 
              priority 
            />
          </div>
          <div className="absolute bottom-0 left-0 z-0 w-full max-w-[250px] rotate-180 xl:max-w-[450px] opacity-20">
            <Image 
              src="/grid-01.svg" 
              alt="grid" 
              width={450} 
              height={450} 
              className="h-auto w-full" 
            />
          </div>

          <div className="relative z-10 flex max-w-3xl flex-col items-center px-6">
            <div className="mb-8 flex flex-col items-center gap-5">
              <div className="relative flex size-20 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-2xl transition-transform hover:scale-105">
                <Image
                  src="/logo-new.png"
                  alt="Logo"
                  fill
                  sizes="80px"
                  className="p-4 object-contain"
                  priority
                />
              </div>

              <div className="space-y-2 text-center">
                <h2 className="text-3xl font-black tracking-tighter text-white sm:text-4xl lg:text-5xl">
                  GIA SƯ AI
                </h2>
                <p className="text-sm font-bold text-primary-foreground/80 sm:text-base lg:text-lg">
                  Cộng sự giáo dục thông minh
                </p>
              </div>
            </div>

            <p className="max-w-md text-center text-xs font-medium text-white/50 leading-relaxed text-balance">
              Nền tảng học tập hiện đại, trực quan và sinh động. Hỗ trợ toàn diện cho Giáo viên, Học sinh và Phụ huynh.
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


