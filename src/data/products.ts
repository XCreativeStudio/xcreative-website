export type Screenshot = {
  src: string;
  alt: string;
  caption: string;
};

export type Product = {
  slug: string;
  name: string;
  /** Short label used in navigation and metadata. */
  label: string;
  tagline: string;
  /** One or two lines for the home page card. */
  summary: string;
  /** Opening paragraph on the product page. */
  intro: string;
  version: string;
  license: string;
  storeUrl: string;
  repoUrl: string;
  repoName: string;
  icon: string;
  marquee: string;
  features: { title: string; body: string }[];
  sections: { title: string; paragraphs: string[] }[];
  screenshots: Screenshot[];
  privacy: string;
};

export const products: Product[] = [
  {
    slug: "postmessage-catcher",
    name: "postMessage Catcher",
    label: "postMessage Catcher",
    tagline: "Every message. Every frame. No console noise.",
    summary:
      "A DevTools panel that records window.postMessage traffic from every frame — parsed, attributed, and kept across reloads.",
    intro:
      "Pasting console.log into a page to read postMessage fails in three ways: it sees one frame, it starts too late, and it floods the console. This replaces that with a panel that was built around those three failures.",
    version: "3.0.0",
    license: "MIT",
    storeUrl:
      "https://chromewebstore.google.com/detail/postmessage-catcher/henlmhlhpgnkeecjjcbhhcfmecohnilo",
    repoUrl: "https://github.com/XCreativeStudio/postMessage-catcher",
    repoName: "XCreativeStudio/postMessage-catcher",
    icon: "/products/postmessage-catcher/icon.png",
    marquee: "/products/postmessage-catcher/marquee.webp",
    features: [
      {
        title: "Every frame, from document_start",
        body: "iframes, srcdoc, about:blank and data: frames are covered before any page script runs, including traffic sent during page load.",
      },
      {
        title: "Observe, never modify",
        body: "The probe never wraps window.postMessage. Replacing it rewrites event.source and breaks pages that validate the sender, so capture is receive-only.",
      },
      {
        title: "Trusted attribution",
        body: "event.origin plus the relationship — self, parent, child or other — including senders from another origin.",
      },
      {
        title: "Payloads parsed, not dumped",
        body: "JSON-encoded payloads open as a tree with a Parsed / Text switch; the list shows the inner discriminator so messages are easy to tell apart.",
      },
      {
        title: "Survives reloads",
        body: "A per-tab ring buffer lives in the worker and persists a compact copy to storage.session, so you can open the panel after the bug happened.",
      },
      {
        title: "Search, filter, export",
        body: "Direction filters, keyboard navigation, ⌘F search across payload and origin, and JSON export for the whole session.",
      },
    ],
    sections: [
      {
        title: "Why it exists",
        paragraphs: [
          "Most postMessage bugs are not bugs in the handler — they are bugs in what the handler never saw. A message sent before your listener attached, a frame you forgot about, a payload that arrived twice.",
          "v3 is a rewrite built on three rules: be early, observe without modifying, and never break the page. That meant moving capture into the MAIN world at document_start across all frames, and keeping everything pass-through with bounded snapshots and a try/catch on every capture path.",
        ],
      },
      {
        title: "Where it stops",
        paragraphs: [
          "targetOrigin is not shown — it only exists on the sending side, and patching senders is the thing that breaks pages. Cross-origin frameId is unknowable for the same reason. MessagePort, BroadcastChannel and Worker traffic are not captured yet.",
        ],
      },
    ],
    screenshots: [
      {
        src: "/products/postmessage-catcher/messages.webp",
        alt: "The postMessage panel listing captured messages with time, origin, type and size",
        caption: "Every message, with origin, direction and size.",
      },
      {
        src: "/products/postmessage-catcher/payload.webp",
        alt: "A JSON payload parsed into a tree view with parsed and raw switches",
        caption: "JSON payloads open as a tree, with the raw text one click away.",
      },
      {
        src: "/products/postmessage-catcher/popup.webp",
        alt: "The extension popup with per-tab recording and a theme switch",
        caption: "Recording per tab, plus a master switch.",
      },
    ],
    privacy:
      "No network, no telemetry, no remote code. Messages are captured and stored in your browser and never leave it.",
  },
  {
    slug: "customize-tab-icon",
    name: "Changicon",
    label: "Changicon",
    tagline: "Give every tab a face you recognize.",
    summary:
      "Replace a page's favicon with an emoji, a two-letter badge, a line icon, or an image you upload — for one page, one subdomain, or a whole site.",
    intro:
      "Tab bars get crowded and most favicons look the same at 16px. Changicon lets you label a tab the way your brain already does — with an emoji, a short badge, a recognizable line icon, or a picture from your own library.",
    version: "1.2.0",
    license: "MIT",
    storeUrl:
      "https://chromewebstore.google.com/detail/changicon/pcnnpfojchdoapfnaanpibdkjbdmglhi",
    repoUrl: "https://github.com/XCreativeStudio/customize-tab-icon",
    repoName: "XCreativeStudio/customize-tab-icon",
    icon: "/products/customize-tab-icon/icon.png",
    marquee: "/products/customize-tab-icon/marquee.webp",
    features: [
      {
        title: "Four icon sources",
        body: "Emoji (full picker with search), text up to two characters with auto-fit, searchable Lucide icons, and image upload — PNG, JPG, WebP, GIF or SVG, up to 5 MB.",
      },
      {
        title: "Three scopes",
        body: "One page, every page on the current hostname, or the whole registrable domain. Narrower scopes win, and applying a wider one replaces the narrower icons it covers.",
      },
      {
        title: "Instant, in place",
        body: "The tab icon changes immediately, and reset restores the site's own favicon without a reload.",
      },
      {
        title: "Consistent tiles",
        body: "A white rounded tile or a transparent background, chosen once. Crop to fill, or fit the whole image with a background.",
      },
      {
        title: "Light, dark, or system",
        body: "The popup matches your browser, including the finer settings screens.",
      },
      {
        title: "Private by design",
        body: "Icons are generated on your device and stored in chrome.storage.local. The extension makes no requests.",
      },
    ],
    sections: [
      {
        title: "Why it exists",
        paragraphs: [
          "A tab is about 30 pixels wide. At that size, half the web's favicons collapse into the same grey smudge — which is fine until you have twelve tabs open and no idea which one is the dashboard.",
          "Changicon started as a personal fix: five tabs of the same product on different environments, labelled 1 2 3 4 5. It turned out to be useful for anyone who keeps the same sites open all day.",
        ],
      },
      {
        title: "How icons are made",
        paragraphs: [
          "Emoji and text are rendered to a canvas on your machine; uploaded images are cropped or fitted the same way. The result is written to chrome.storage.local and injected as a data URL favicon, so there is no server, no sync and no account.",
        ],
      },
    ],
    screenshots: [
      {
        src: "/products/customize-tab-icon/hero.webp",
        alt: "The Changicon popup over a browser window with custom tab icons",
        caption: "Pick an emoji, a badge, an icon or an image.",
      },
      {
        src: "/products/customize-tab-icon/emoji.webp",
        alt: "Emoji picker with search and frequently used emoji",
        caption: "Search the full emoji library.",
      },
      {
        src: "/products/customize-tab-icon/site.webp",
        alt: "Five tabs on the same domain all showing the same custom icon",
        caption: "One icon for the whole site, or just one page.",
      },
    ],
    privacy:
      "Icons are generated and stored locally in chrome.storage.local. No account, no tracking, no network requests.",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
