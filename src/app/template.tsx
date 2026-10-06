/** Pass-through template: pages render immediately (no full-page fade) for the fastest first paint. */
export default function Template({ children }: { children: React.ReactNode }) {
  return children;
}
