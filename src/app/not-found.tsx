import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center pt-24">
      <Container className="text-center">
        <p className="text-xs uppercase tracking-[0.28em] text-gold mb-4">
          404
        </p>
        <h1 className="font-display text-5xl text-ivory mb-4">Page not found</h1>
        <p className="text-muted mb-8">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="inline-flex px-6 py-3 bg-gold text-charcoal text-sm uppercase tracking-wide hover:bg-gold-soft min-h-11 items-center"
        >
          Return Home
        </Link>
      </Container>
    </section>
  );
}
