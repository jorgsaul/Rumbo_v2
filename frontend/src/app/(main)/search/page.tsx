import SearchResultsView from "@/features/search/components/SearchResultsView";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  return <SearchResultsView query={q ?? ""} />;
}
