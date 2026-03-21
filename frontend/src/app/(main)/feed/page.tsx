import { FeedList } from "@/features/feed/components/FeedList";
import FeedSidebar from "@/features/feed/components/feedSideBar";

export default function FeedPage() {
  return (
    <div className="flex gap-6 max-w-5xl mx-auto w-full">
      <div className="flex-1 min-w-0 max-w-xl">
        <FeedList />
      </div>
      <aside className="w-72 shrink-0 hidden lg:block">
        <FeedSidebar />
      </aside>
    </div>
  );
}
