import Image from "next/image";
import logo from "../../../public/Logo-blanco.png";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative flex-col items-center justify-center p-12 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute -bottom-32 -right-20 w-[500px] h-[500px] rounded-full bg-white/5" />

        <div className="relative z-10 flex flex-col items-center gap-8 text-white text-center">
          <Image src={logo} alt="Rumbo" width={150} height={150} />
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-bold tracking-tight">Rumbo</h1>
            <p className="text-lg text-white/70 max-w-sm leading-relaxed">
              Descubre tu vocación y conecta con quienes ya recorrieron el
              camino
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 p-6">
        {children}
      </div>
    </main>
  );
}
