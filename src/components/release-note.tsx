type Release = { tag: string; date: string } | null;

async function getLatestRelease(repo: string): Promise<Release> {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { tag_name?: string; published_at?: string };
    if (!data.tag_name || !data.published_at) return null;
    return { tag: data.tag_name, date: data.published_at };
  } catch {
    return null;
  }
}

export async function ReleaseNote({ repo }: { repo: string }) {
  const release = await getLatestRelease(repo);
  if (!release) return null;

  const date = new Date(release.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
      Latest release {release.tag} · {date}
    </p>
  );
}
