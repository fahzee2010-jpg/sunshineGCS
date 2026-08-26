import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-site py-16">
      <h1 className="mb-4 text-3xl">Page not found</h1>
      <p className="text-ink-muted mb-8 max-w-xl">
        The page you requested does not exist or may have moved. You can return
        to the home page to continue.
      </p>
      <Link href="/" className="btn-primary">
        Back to home
      </Link>
    </div>
  );
}
