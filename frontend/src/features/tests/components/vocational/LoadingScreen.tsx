"use client";

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-neutral-50 dark:bg-black-mode p-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-neutral-200 dark:border-neutral-800" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
          Analizando tu perfil...
        </h2>
        <p className="text-sm text-neutral-400 max-w-xs">
          Estamos calculando las carreras que mejor se alinean con tu Ikigai
        </p>
      </div>

      <div className="flex items-center gap-2">
        {["Pasión", "Vocación", "Profesión", "Misión"].map((pilar, i) => (
          <span
            key={pilar}
            className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium opacity-0 animate-fade-in"
            style={{
              animationDelay: `${i * 0.3}s`,
              animationFillMode: "forwards",
            }}
          >
            {pilar}
          </span>
        ))}
      </div>
    </div>
  );
}
