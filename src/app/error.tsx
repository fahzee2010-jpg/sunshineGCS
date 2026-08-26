"use client";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="container-site py-16">
      <h1 className="mb-4 text-3xl">Something went wrong</h1>
      <p className="text-ink-muted mb-6 max-w-xl">
        We could not load this page right now. Please try again. If the problem
        continues, return to the home page later.
      </p>
      {error.digest ? (
        <p className="text-ink-muted mb-6 text-sm">Reference: {error.digest}</p>
      ) : null}
      <button type="button" className="btn-primary" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
