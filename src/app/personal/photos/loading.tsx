import RouteLoadingOverlay from "@/components/RouteLoadingOverlay";

export default function Loading() {
  return (
    <RouteLoadingOverlay
      variant="photos"
      title="Loading Photos"
      subtitle="Developing snapshots in the darkroom..."
    />
  );
}
