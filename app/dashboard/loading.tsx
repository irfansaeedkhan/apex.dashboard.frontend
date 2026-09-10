export default function DashboardLoading() {
  return (
    <div className="flex animate-pulse flex-col gap-5" aria-label="Loading dashboard">
      <div className="h-10 w-48 rounded-lg bg-gray-200" />
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="h-40 rounded-2xl bg-gray-200" />
        <div className="h-40 rounded-2xl bg-gray-200" />
      </div>
      <div className="h-72 rounded-2xl bg-gray-200" />
    </div>
  );
}