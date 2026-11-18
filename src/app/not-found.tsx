import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-6 py-28">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
        404
      </p>
      <h1 className="font-display text-5xl tracking-[-0.02em]">This page is not here.</h1>
      <p className="max-w-md text-muted-foreground">
        It may have moved, or it may never have existed. The two products are still where
        they were.
      </p>
      <Button asChild size="lg">
        <Link href="/">Back to the studio</Link>
      </Button>
    </section>
  );
}
