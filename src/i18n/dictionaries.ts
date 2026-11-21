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
      tagline: "Small tools, made carefully and kept working.",
      products: "Products",
      elsewhere: "Elsewhere",
      github: "GitHub",
      email: "Email",
    },
    home: {
      eyebrow: "Independent studio · small tools",
      title: "Make something people want.",
      lede: "Small, specific tools for the everyday things you repeat: the ones nobody has bothered to do well. The platform doesn't matter. One step less is the point.",
      seeProducts: "See the products",
      github: "GitHub",
      productsLabel: "Products",
      principles: [
        {
          title: "Your data stays with you",
          body: "Most of what you do can happen right on your device, with nothing uploaded. When a tool does need the network, it says what it sends and why. What you put in is used only for the thing you're doing.",
        },
        {
          title: "Keep it simple",
          body: "A tool solves one kind of problem, and nothing useless sits on the screen. Open it and use it — simple and clear.",
        },
        {
          title: "Keep improving",
          body: "We keep working on it after launch: fixing problems, tuning details, smoothing the experience. Feedback is always welcome. No rush to add features — first make it easier to use.",
        },
      ],
      ctaTitle: "It's all on this page.",
      ctaBody: "New tools land here too. Open-source code lives on GitHub.",
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
      alsoFrom: "More from the studio",
      next: "Next",
      cardFree: "Free",
      view: "View",
    },
    notFound: {
      label: "404",
      title: "This page is not here.",
      body: "It may have moved, or it may never have existed. The products are still where they were.",
      cta: "Back to the studio",
    },
  },
  zh: {
    languageName: "中文",
    switchLabel: "Switch to English",
    header: { products: "产品", github: "GitHub" },
    footer: {
      tagline: "小工具，认真做，长期维护。",
      products: "产品",
      elsewhere: "其它",
      github: "GitHub",
      email: "邮箱",
    },
    home: {
      eyebrow: "独立工作室 · 小工具",
      title: "做人们想要的东西。",
      lede: "做小而具体的工具，专治那些每天都要重复、又一直没人好好做的小事。跑在哪个平台上不重要，能少一步就少一步。",
      seeProducts: "看看产品",
      github: "GitHub",
      productsLabel: "产品",
      principles: [
        {
          title: "数据留在你这边",
          body: "大部分事情在你设备上就能完成，不用上传。需要联网时，会说明传了什么、为什么。你的内容只用于你正在做的这件事。",
        },
        {
          title: "保持简单",
          body: "一个工具就解决一类问题，界面上不放用不上的按钮。打开就能用，简单清晰。",
        },
        {
          title: "持续优化",
          body: "上线之后还会一直打磨：修问题，调细节，优化体验，也欢迎你反馈。不急着加功能，先让它更顺手。",
        },
      ],
      ctaTitle: "都在这一页。",
      ctaBody: "以后做的也会放上来。能开源的代码都在 GitHub。",
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
      alsoFrom: "工作室的其他产品",
      next: "下一个",
      cardFree: "免费",
      view: "查看",
    },
    notFound: {
      label: "404",
      title: "这张页面不在这里。",
      body: "它可能被移动过，或者从来没有存在过。产品还在原来的地方。",
      cta: "回到工作室",
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
