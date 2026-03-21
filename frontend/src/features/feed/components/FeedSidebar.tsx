"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MessageSquare, FlaskConical, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { forumService, Forum } from "@/features/forums/services/forumService";
import { useAuthStore } from "@/features/auth/hooks/useAuthStore";
import Card from "@/components/ui/Card";
import { useVocationalTestStore } from "@/features/tests/stores/useVocationalTestStore";

function TopForumsWidget() {
  const [forums, setForums] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    forumService
      .getTopForums()
      .then(setForums)
      .catch(() => {});
  }, []);

  if (!forums.length) return null;

  return (
    <Card
      padding="md"
      rounded="xl"
      border="light"
      shadow="sm"
      className="space-y-3"
    >
      <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">
        Foros populares
      </p>
      <div className="space-y-2">
        {forums.map((forum) => (
          <button
            key={forum.id}
            onClick={() => router.push(`/foros/${forum.id}`)}
            className="w-full flex items-center gap-2.5 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg p-1.5 transition-colors text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/10 overflow-hidden shrink-0 flex items-center justify-center">
              {forum.imageUrl ? (
                <Image
                  src={forum.imageUrl}
                  alt=""
                  width={32}
                  height={32}
                  className="object-cover"
                />
              ) : (
                <MessageSquare size={14} className="text-primary" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-neutral-800 dark:text-neutral-100 truncate">
                {forum.name}
              </p>
              <p className="text-xs text-neutral-400">
                {forum._count.posts} posts
              </p>
            </div>
          </button>
        ))}
      </div>
      <Link
        href="/foros"
        className="text-xs text-primary hover:underline block"
      >
        Ver todos →
      </Link>
    </Card>
  );
}

function MyForumsWidget() {
  const [forums, setForums] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    forumService
      .getMyForums()
      .then((data) => setForums(data))
      .catch(() => {});
  }, []);

  if (!forums.length) return null;

  return (
    <Card
      padding="md"
      rounded="xl"
      border="light"
      shadow="sm"
      className="space-y-3"
    >
      <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">
        Mis foros
      </p>
      <div className="space-y-2">
        {forums.slice(0, 5).map((membership) => {
          const forum = membership.forum;
          return (
            <button
              key={forum.id}
              onClick={() => router.push(`/foros/${forum.id}`)}
              className="w-full flex items-center gap-2.5 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg p-1.5 transition-colors text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 overflow-hidden shrink-0 flex items-center justify-center">
                {forum.imageUrl ? (
                  <Image
                    src={forum.imageUrl}
                    alt=""
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                ) : (
                  <MessageSquare size={14} className="text-primary" />
                )}
              </div>
              <p className="text-xs font-medium text-neutral-800 dark:text-neutral-100 truncate flex-1">
                {forum.name}
              </p>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

function TestSuggestionWidget() {
  const { user } = useAuthStore();
  const result = useVocationalTestStore((s) => s.result);
  const router = useRouter();

  return (
    <Card
      padding="md"
      rounded="xl"
      border="light"
      shadow="sm"
      className="space-y-3"
    >
      <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">
        Tests disponibles
      </p>
      <div className="space-y-2">
        <button
          onClick={() => router.push("/tests")}
          className="w-full flex items-center gap-2.5 p-2 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors text-left"
        >
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <FlaskConical size={15} className="text-primary" />
          </div>
          <div>
            <p className="text-xs font-medium text-neutral-800 dark:text-neutral-100">
              Test Vocacional
            </p>
            <p className="text-xs text-neutral-400">
              {result ? "Ver tu resultado" : "Descubre tu vocación"}
            </p>
          </div>
        </button>

        <button
          onClick={() => router.push("/tests")}
          className="w-full flex items-center gap-2.5 p-2 rounded-xl bg-info/5 hover:bg-info/10 transition-colors text-left"
        >
          <div className="w-8 h-8 rounded-lg bg-info/10 flex items-center justify-center shrink-0">
            <BookOpen size={15} className="text-info" />
          </div>
          <div>
            <p className="text-xs font-medium text-neutral-800 dark:text-neutral-100">
              Tests de Conocimientos
            </p>
            <p className="text-xs text-neutral-400">
              Pon a prueba tus conocimientos
            </p>
          </div>
        </button>
      </div>
    </Card>
  );
}

export default function FeedSidebar() {
  return (
    <div className="space-y-4 sticky top-20">
      <TestSuggestionWidget />
      <TopForumsWidget />
      <MyForumsWidget />
    </div>
  );
}
