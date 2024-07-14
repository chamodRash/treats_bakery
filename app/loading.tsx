import { Suspense } from "react";

function Loading() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* Your loading content here */}
    </Suspense>
  );
}

export default Loading;
