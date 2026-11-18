import type { Locale } from "./config";

export type Dictionary = {
  languageName: string;
  switchLabel: string;
  header: { products: string; github: string };
  footer: {
    tagline: string;
    products: string;
    elsewhere: string;
    github: string;
    email: string;
  };
  home: {
    eyebrow: string;
    title: string;
    lede: string;
    seeProducts: string;
    github: string;
    productsLabel: string;
    principles: { title: string; body: string }[];
    ctaTitle: string;
    ctaBody: string;
    ctaButton: string;
  };
  product: {
    back: string;
    status: string;
    builtWith: string;
    website: string;
    source: string;
    live: string;
    addToChrome: string;
    readSource: string;
    free: string;
    latestRelease: string;
    whatItDoes: string;
    inside: string;
    alsoFrom: string;
    next: string;
    cardFree: string;
    view: string;
  };
  notFound: { label: string; title: string; body: string; cta: string };
};

export const dictionaries: Record<Locale, Dictionary> = {
  en: {
    languageName: "English",
    switchLabel: "切换到中文",
    header: { products: "Products", github: "GitHub" },
    footer: {
      tagline: "Small tools, built and maintained by one person.",
      products: "Products",
      elsewhere: "Elsewhere",
      github: "GitHub",
      email: "Email",
    },
    home: {
      eyebrow: "Independent studio · Chrome extensions",
      title: "Make something people want.",
      lede: "Two small extensions that make the browser do what you meant: one shows you the messages your page never sees, the other gives every tab a face you recognize.",
      seeProducts: "See the products",
      github: "GitHub",
      productsLabel: "Products",
      principles: [
        {
          title: "Local by default",
          body: "Both extensions do their work on your machine. No accounts, no telemetry, no server holding a copy of what you pasted.",
        },
        {
          title: "One person, end to end",
          body: "Design, code, store listing and support. That is why the feature list stays short and the details get attention.",
        },
        {
          title: "Small on purpose",
          body: "Each extension does one job and then stops. A tool you reach for ten times a day should not need a manual.",
        },
      ],
      ctaTitle: "Both are free.",
      ctaBody:
        "No accounts, no telemetry. Install from the Chrome Web Store, or read the code and build it yourself.",
      ctaButton: "Browse the source",
    },
    product: {
      back: "All products",
      status: "Status",
      builtWith: "Built with",
      website: "Website",
      source: "Source",
      live: "Live",
      addToChrome: "Add to Chrome",
      readSource: "Read the source",
      free: "Free",
      latestRelease: "Latest release",
      whatItDoes: "What it does",
      inside: "Inside",
      alsoFrom: "Also from the studio",
      next: "Next",
      cardFree: "Free · Chrome",
      view: "View",
    },
    notFound: {
      label: "404",
      title: "This page is not here.",
      body: "It may have moved, or it may never have existed. The two products are still where they were.",
      cta: "Back to the studio",
    },
  },
  zh: {
    languageName: "中文",
    switchLabel: "Switch to English",
    header: { products: "产品", github: "GitHub" },
    footer: {
      tagline: "小工具，一个人做，一个人维护。",
      products: "产品",
      elsewhere: "其它",
      github: "GitHub",
      email: "邮箱",
    },
    home: {
      eyebrow: "独立工作室 · Chrome 扩展",
      title: "做人们想要的东西。",
      lede: "两个小扩展，让浏览器按你的意思工作：一个让你看见页面上看不见的消息，一个让每个标签页都有你一眼认得出的脸。",
      seeProducts: "看看产品",
      github: "GitHub",
      productsLabel: "产品",
      principles: [
        {
          title: "本地优先",
          body: "两个扩展都在你的机器上完成工作。没有账号，没有埋点，没有服务器存一份你粘贴过的内容。",
        },
        {
          title: "一个人，全流程",
          body: "设计、编码、上架、支持。所以功能列表很短，细节有人管。",
        },
        {
          title: "故意做小",
          body: "每个扩展只做一件事，做完就停。一天要用十次的工具，不该配说明书。",
        },
      ],
      ctaTitle: "两个都免费。",
      ctaBody: "没有账号，没有埋点。从 Chrome 应用商店安装，或者读代码自己构建。",
      ctaButton: "看源码",
    },
    product: {
      back: "全部产品",
      status: "状态",
      builtWith: "技术栈",
      website: "网站",
      source: "源码",
      live: "已上线",
      addToChrome: "添加到 Chrome",
      readSource: "阅读源码",
      free: "免费",
      latestRelease: "最新版本",
      whatItDoes: "它能做什么",
      inside: "界面",
      alsoFrom: "工作室的另一个产品",
      next: "下一个",
      cardFree: "免费 · Chrome",
      view: "查看",
    },
    notFound: {
      label: "404",
      title: "这张页面不在这里。",
      body: "它可能被移动过，或者从来没有存在过。两个产品还在原来的地方。",
      cta: "回到工作室",
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
