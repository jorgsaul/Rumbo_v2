const rutas = [
  {
    label: "Tests",
    href: "/admin/tests",
  },
  {
    label: "Moderación",
    href: "/admin/moderation",
  },
  {
    label: "Usuarios",
    href: "/admin/users",
  },
  {
    label: "Soporte",
    href: "/admin/support",
  },
];
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black-mode">
      <nav className="h-14 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 flex items-center px-6 gap-4">
        <span className="font-bold text-neutral-900 dark:text-white text-sm">
          Rumbo <span className="text-primary">Admin</span>
        </span>
        <div className="flex items-center gap-1 ml-4">
          {rutas.map(
            (value: { label: string; href: string }, index: number) => (
              <a
                key={index}
                href={value.href}
                className="text-xs px-3 py-1.5 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                {value.label}
              </a>
            ),
          )}
        </div>
        <div className="ml-auto">
          <a
            href="/feed"
            className="text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
          >
            ← Volver a la app
          </a>
        </div>
      </nav>
      <main className="p-6">{children}</main>
    </div>
  );
}
