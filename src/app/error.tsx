"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
      <h2 className="text-2xl font-bold text-ink">Something went wrong</h2>
      <p className="text-muted text-center max-w-md">{error.message || "An unexpected error occurred."}</p>
      <button
        onClick={reset}
        className="min-h-[46px] px-[18px] bg-red text-white font-black text-[0.94rem] rounded-md hover:bg-red-dark transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
