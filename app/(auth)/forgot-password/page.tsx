import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ForgotPasswordPage() {
  return (
    <ScrollArea className="h-screen w-full">
      <div className="flex min-h-screen w-full flex-col items-center justify-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-xl rounded-[2.5rem]">
          <div className="space-y-8">
            <div className="space-y-2 text-left">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                Quen mat khau
              </h1>
              <p className="text-slate-500 dark:text-slate-400">
                Tinh nang khoi phuc mat khau chua duoc ket noi. Trang nay duoc
                tao de route hop le voi typed routes cua Next.js.
              </p>
            </div>

            <div className="space-y-3">
              <label
                htmlFor="recovery-email"
                className="text-sm font-bold text-slate-900 dark:text-slate-200"
              >
                Email
              </label>
              <Input
                id="recovery-email"
                type="email"
                placeholder="name@example.com"
                disabled
              />
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Khi co backend cho reset password, form nay co the duoc mo rong
                ma khong can doi URL.
              </p>
            </div>

            <Button asChild className="h-11 w-full text-sm font-bold">
              <Link href="/login">Quay lai dang nhap</Link>
            </Button>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
