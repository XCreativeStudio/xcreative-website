import { cache } from "react";

export type LatestRelease = {
  tag: string;
  publishedAt: string;
  /** First zip asset, which is the packaged extension for these repos. */
  zipUrl: string | null;
  zipName: string | null;
};

type GitHubRelease = {
  tag_name?: string;
  published_at?: string;
  assets?: { name?: string; browser_download_url?: string }[];
};

/**
 * One fetch per repo per request, shared by the release line and the download button.
 * Returns null on any failure so the page can fall back to bundled data.
 */
export const getLatestRelease = cache(async (repo: string): Promise<LatestRelease | null> => {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;

    const data = (await res.json()) as GitHubRelease;
    if (!data.tag_name || !data.published_at) return null;

    const assets = (data.assets ?? []).filter(
      (asset): asset is { name: string; browser_download_url: string } =>
        typeof asset.name === "string" &&
        typeof asset.browser_download_url === "string" &&
        /\.zip$/i.test(asset.name)
    );
    const zip = assets.find((asset) => /chrome/i.test(asset.name)) ?? assets[0];

    return {
      tag: data.tag_name,
      publishedAt: data.published_at,
      zipUrl: zip?.browser_download_url ?? null,
      zipName: zip?.name ?? null,
    };
  } catch {
    return null;
  }
});
