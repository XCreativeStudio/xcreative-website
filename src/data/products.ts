import type { Locale } from "@/i18n/config";

export type ProductText = {
  tagline: string;
  summary: string;
  intro: string;
  features: { title: string; body: string }[];
  sections: { title: string; paragraphs: string[] }[];
  screenshots: { alt: string; caption: string }[];
  privacy: string;
};

export type Product = {
  slug: string;
  name: string;
  /** Where it ships, shown on the home card: "Chrome", "微信小程序", "iOS". */
  platform: string;
  version: string;
  license: string;
  storeUrl: string;
  repoUrl: string;
  repoName: string;
  icon: string;
  marquee: string;
  /** Screenshot files, in the same order as `text[locale].screenshots`. */
  screenshotSrcs: string[];
  text: Record<Locale, ProductText>;
};

export const products: Product[] = [
  {
    slug: "postmessage-catcher",
    name: "postMessage Catcher",
    platform: "Chrome",
    version: "3.0.0",
    license: "MIT",
    storeUrl:
      "https://chromewebstore.google.com/detail/postmessage-catcher/henlmhlhpgnkeecjjcbhhcfmecohnilo",
    repoUrl: "https://github.com/XCreativeStudio/postMessage-catcher",
    repoName: "XCreativeStudio/postMessage-catcher",
    icon: "/products/postmessage-catcher/icon.png",
    marquee: "/products/postmessage-catcher/marquee.webp",
    screenshotSrcs: [
      "/products/postmessage-catcher/messages.webp",
      "/products/postmessage-catcher/payload.webp",
      "/products/postmessage-catcher/popup.webp",
    ],
    text: {
      en: {
        tagline: "Every message. Every frame. No console noise.",
        summary:
          "A DevTools panel that records window.postMessage traffic from every frame — parsed, attributed, and kept across reloads.",
        intro:
          "Pasting console.log into a page to read postMessage fails in three ways: it sees one frame, it starts too late, and it floods the console. This replaces that with a panel that was built around those three failures.",
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
            alt: "The postMessage panel listing captured messages with time, origin, type and size",
            caption: "Every message, with origin, direction and size.",
          },
          {
            alt: "A JSON payload parsed into a tree view with parsed and raw switches",
            caption: "JSON payloads open as a tree, with the raw text one click away.",
          },
          {
            alt: "The extension popup with per-tab recording and a theme switch",
            caption: "Recording per tab, plus a master switch.",
          },
        ],
        privacy:
          "No network, no telemetry, no remote code. Messages are captured and stored in your browser and never leave it.",
      },
      zh: {
        tagline: "每条消息，每一帧，都不再靠 console 刷屏。",
        summary:
          "一个 DevTools 面板，抓取每一帧里的 window.postMessage 消息——解析好的、带发送方归属的，刷新之后还在。",
        intro:
          "往页面里贴 console.log 来读 postMessage，会在三件事上失败：只能看到一个帧、开始得太晚、把控制台刷满。这个面板就是围绕这三种失败做的。",
        features: [
          {
            title: "从 document_start 开始，覆盖每一帧",
            body: "iframe、srcdoc、about:blank 和 data: 帧都在页面脚本运行前就被覆盖，包括加载期间发出的消息。",
          },
          {
            title: "只观察，不修改",
            body: "探针从不包装 window.postMessage。替换它会改写 event.source，让校验发送方的页面出错，所以只做接收侧捕获。",
          },
          {
            title: "可信的发送方归属",
            body: "event.origin 加上关系——自身、父级、子级或其它——跨源发送方同样适用。",
          },
          {
            title: "解析载荷，而不是直接倒出来",
            body: "JSON 字符串按树展开，可在 Parsed / Text 之间切换；列表里显示内层判别字段，方便区分消息。",
          },
          {
            title: "刷新之后还在",
            body: "worker 里按标签页维护环形缓冲，并把精简副本存进 storage.session，所以 bug 发生之后再打开面板也看得到。",
          },
          {
            title: "搜索、筛选、导出",
            body: "方向筛选、键盘导航、⌘F 搜载荷与来源，整段会话可以导出为 JSON。",
          },
        ],
        sections: [
          {
            title: "为什么做它",
            paragraphs: [
              "大多数 postMessage 的 bug 不出在处理函数里，而出在它从没看见的东西上：监听器挂上之前就发出去的消息、你忘了的一个帧、重复到达的同一份载荷。",
              "v3 是一次重写，建立在三条规则上：早一点、只观察不修改、绝不弄坏页面。为此捕获要在 document_start 时进入所有帧的 MAIN world，并且全程透传，用有界的快照和每条捕获路径上的 try/catch 兜底。",
            ],
          },
          {
            title: "它到哪里为止",
            paragraphs: [
              "不显示 targetOrigin——它只存在于发送侧，而给发送侧打补丁正是会弄坏页面的做法。跨源的 frameId 同理不可知。MessagePort、BroadcastChannel 和 Worker 的流量还没有捕获。",
            ],
          },
        ],
        screenshots: [
          {
            alt: "postMessage 面板列出捕获到的消息，含时间、来源、类型和大小",
            caption: "每条消息，带来源、方向和大小。",
          },
          {
            alt: "JSON 载荷被解析成树状视图，可切换原始文本",
            caption: "JSON 载荷按树展开，原始文本一键可看。",
          },
          {
            alt: "扩展弹窗，按标签页录制并提供主题切换",
            caption: "按标签页录制，外加一个总开关。",
          },
        ],
        privacy:
          "没有网络请求，没有埋点，没有远程代码。消息只在你浏览器里捕获和保存，不会离开它。",
      },
    },
  },
  {
    slug: "customize-tab-icon",
    name: "Changicon",
    platform: "Chrome",
    version: "1.2.0",
    license: "MIT",
    storeUrl:
      "https://chromewebstore.google.com/detail/changicon/pcnnpfojchdoapfnaanpibdkjbdmglhi",
    repoUrl: "https://github.com/XCreativeStudio/customize-tab-icon",
    repoName: "XCreativeStudio/customize-tab-icon",
    icon: "/products/customize-tab-icon/icon.png",
    marquee: "/products/customize-tab-icon/marquee.webp",
    screenshotSrcs: [
      "/products/customize-tab-icon/hero.webp",
      "/products/customize-tab-icon/emoji.webp",
      "/products/customize-tab-icon/site.webp",
    ],
    text: {
      en: {
        tagline: "Give every tab a face you recognize.",
        summary:
          "Replace a page's favicon with an emoji, a two-letter badge, a line icon, or an image you upload — for one page, one subdomain, or a whole site.",
        intro:
          "Tab bars get crowded and most favicons look the same at 16px. Changicon lets you label a tab the way your brain already does — with an emoji, a short badge, a recognizable line icon, or a picture from your own library.",
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
            alt: "The Changicon popup over a browser window with custom tab icons",
            caption: "Pick an emoji, a badge, an icon or an image.",
          },
          {
            alt: "Emoji picker with search and frequently used emoji",
            caption: "Search the full emoji library.",
          },
          {
            alt: "Five tabs on the same domain all showing the same custom icon",
            caption: "One icon for the whole site, or just one page.",
          },
        ],
        privacy:
          "Icons are generated and stored locally in chrome.storage.local. No account, no tracking, no network requests.",
      },
      zh: {
        tagline: "给每个标签页一张认得出的脸。",
        summary:
          "把网页的 favicon 换成你选的 emoji、两个字母的徽标、线性图标或上传的图片——单页、单个子域名或整个站点都行。",
        intro:
          "标签栏越来越挤，大多数 favicon 在 16px 下长得一模一样。Changicon 让你用脑子本来就在用的方式标记标签页——一个 emoji、一个短徽标、一个认得出的线性图标，或者你自己的图片。",
        features: [
          {
            title: "四种图标来源",
            body: "emoji（完整选择器带搜索）、最多两个字符且自动适配的文字、可搜索的 Lucide 图标，以及图片上传——PNG、JPG、WebP、GIF 或 SVG，最大 5 MB。",
          },
          {
            title: "三种作用范围",
            body: "单个页面、当前主机名的所有页面，或整个可注册域名。范围更窄的优先，套用更宽的范围会替换它覆盖到的窄范围图标。",
          },
          {
            title: "即时生效",
            body: "标签页图标立刻变化，重置会还原站点自己的 favicon，不需要刷新。",
          },
          {
            title: "统一的底板",
            body: "白色圆角底或透明底，选一次即可。图片可以裁切铺满，也可以完整放入并配底色。",
          },
          {
            title: "亮色、暗色或跟随系统",
            body: "弹窗与浏览器主题一致，更细的设置页也一样。",
          },
          {
            title: "默认隐私",
            body: "图标在你的设备上生成，存在 chrome.storage.local 里。扩展不发出任何请求。",
          },
        ],
        sections: [
          {
            title: "为什么做它",
            paragraphs: [
              "一个标签页大约 30 像素宽。在这个尺寸下，网上半数 favicon 都会缩成同一团灰色——直到你开了十二个标签页，分不清哪个是后台。",
              "Changicon 最初是给自己的修复：同一个产品的五个环境，标成 1 2 3 4 5。后来发现，对任何整天挂着同样几个网站的人都有用。",
            ],
          },
          {
            title: "图标是怎么生成的",
            paragraphs: [
              "emoji 和文字在你的机器上用 canvas 渲染；上传的图片按同样方式裁切或适配。结果写进 chrome.storage.local，再以 data URL 的形式注入 favicon，所以没有服务器、没有同步、没有账号。",
            ],
          },
        ],
        screenshots: [
          {
            alt: "Changicon 弹窗浮在浏览器窗口上，标签页显示自定义图标",
            caption: "选 emoji、徽标、图标或图片。",
          },
          {
            alt: "emoji 选择器，带搜索和常用 emoji",
            caption: "搜索完整的 emoji 库。",
          },
          {
            alt: "同一域名下的五个标签页显示同一个自定义图标",
            caption: "整个站点共用一个图标，也可以只改一个页面。",
          },
        ],
        privacy:
          "图标在本地生成并保存在 chrome.storage.local。没有账号，没有追踪，没有网络请求。",
      },
    },
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function localizeProduct(product: Product, locale: Locale) {
  const text = product.text[locale];
  return {
    ...product,
    ...text,
    screenshots: text.screenshots.map((shot, index) => ({
      ...shot,
      src: product.screenshotSrcs[index],
    })),
  };
}

export function localizeProducts(locale: Locale) {
  return products.map((product) => localizeProduct(product, locale));
}
