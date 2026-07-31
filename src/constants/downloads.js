const RELEASE_BASE =
  "https://github.com/tonyantony300/dashbeam/releases/download";

export const DONATE_LINKS = {
  buyMeACoffee: "https://buymeacoffee.com/tny_antny",
  githubSponsors: "https://github.com/sponsors/tonyantony300",
};

export const DESKTOP_VERSION = "0.6.2";
export const ANDROID_VERSION = "v0.6.2";
export const WEB_APP_URL = "https://app.dashbeam.net";
const DESKTOP_TAG = `v${DESKTOP_VERSION}`;

export function releaseUrl(tag, filename) {
  return `${RELEASE_BASE}/${tag}/${filename}`;
}

export function detectPlatform() {
  if (typeof navigator === "undefined") {
    return { os: "mac", arch: "x64" };
  }

  const ua = navigator.userAgent.toLowerCase();
  let os = "mac";
  if (ua.includes("win")) os = "windows";
  else if (ua.includes("mac")) os = "mac";
  else if (ua.includes("linux")) os = "linux";

  const arm64 =
    ua.includes("aarch64") ||
    ua.includes("arm64") ||
    (os === "windows" && /\barm\b/.test(ua));

  return { os, arch: arm64 ? "arm64" : "x64" };
}

export const primaryDownloadsByOs = {
  mac: {
    id: "mac",
    icon: "/applelogo.svg",
    file: `DashBeam_${DESKTOP_VERSION}_universal.dmg`,
    tag: DESKTOP_TAG,
    translationKey: "getAppForMac",
    heroTranslationKey: "hero.downloadForMac",
    size: "31 MB",
  },
  web: {
    id: "web",
    icon: "/chrome.svg",
    // Multi-colour mark: opt out of the monochrome treatment the other
    // platform logos get.
    keepIconColor: true,
    externalUrl: WEB_APP_URL,
    translationKey: "getAppForWeb",
    heroTranslationKey: "hero.openInBrowser",
  },
  windows: {
    id: "windows",
    icon: "/windows.svg",
    file: `DashBeam_${DESKTOP_VERSION}_x64-setup.exe`,
    tag: DESKTOP_TAG,
    translationKey: "getAppForWindows",
    heroTranslationKey: "hero.downloadForWindows",
    size: "10 MB",
  },
  "windows-arm64": {
    id: "windows-arm64",
    icon: "/windows.svg",
    file: `DashBeam_${DESKTOP_VERSION}_arm64-setup.exe`,
    tag: DESKTOP_TAG,
    translationKey: "getAppForWindows",
    heroTranslationKey: "hero.downloadForWindows",
    size: "9 MB",
  },
  linux: {
    id: "linux-appimage",
    icon: "/linuxlogo.svg",
    file: `DashBeam_${DESKTOP_VERSION}_amd64.AppImage`,
    tag: DESKTOP_TAG,
    translationKey: "getAppForLinux",
    heroTranslationKey: "hero.downloadForLinux",
    size: "91 MB",
  },
  "linux-arm64": {
    id: "linux-appimage-arm64",
    icon: "/linuxlogo.svg",
    file: `DashBeam_${DESKTOP_VERSION}_aarch64.AppImage`,
    tag: DESKTOP_TAG,
    translationKey: "getAppForLinux",
    heroTranslationKey: "hero.downloadForLinux",
    size: "89 MB",
  },
  android: {
    id: "android",
    icon: "/androidlogo.svg",
    file: `DashBeam-${ANDROID_VERSION}-arm64.apk`,
    tag: ANDROID_VERSION,
    translationKey: "getAppForAndroid",
    heroTranslationKey: "hero.downloadForAndroid",
    size: "49 MB",
  },
};

export const desktopPlatformGroups = [
  {
    key: "mac",
    links: [
      {
        key: "universalDmg",
        file: `DashBeam_${DESKTOP_VERSION}_universal.dmg`,
        tag: DESKTOP_TAG,
        size: "31 MB",
      },
      {
        key: "x64Dmg",
        file: `DashBeam_${DESKTOP_VERSION}_x64.dmg`,
        tag: DESKTOP_TAG,
        size: "16 MB",
      },
      {
        key: "aarch64Dmg",
        file: `DashBeam_${DESKTOP_VERSION}_aarch64.dmg`,
        tag: DESKTOP_TAG,
        size: "15 MB",
      },
    ],
  },
  {
    key: "windows",
    links: [
      {
        key: "standardExe",
        file: `DashBeam_${DESKTOP_VERSION}_x64-setup.exe`,
        tag: DESKTOP_TAG,
        size: "10 MB",
      },
      {
        key: "portableZip",
        file: `DashBeam_${DESKTOP_VERSION}_x64-portable.zip`,
        tag: DESKTOP_TAG,
        size: "14 MB",
      },
      {
        key: "msi",
        file: `DashBeam_${DESKTOP_VERSION}_x64_en-US.msi`,
        tag: DESKTOP_TAG,
        size: "14 MB",
      },
      {
        key: "arm64Exe",
        file: `DashBeam_${DESKTOP_VERSION}_arm64-setup.exe`,
        tag: DESKTOP_TAG,
        size: "9 MB",
      },
      {
        key: "arm64PortableZip",
        file: `DashBeam_${DESKTOP_VERSION}_arm64-portable.zip`,
        tag: DESKTOP_TAG,
        size: "13 MB",
      },
    ],
  },
  {
    key: "linux",
    links: [
      {
        key: "appImage",
        file: `DashBeam_${DESKTOP_VERSION}_amd64.AppImage`,
        tag: DESKTOP_TAG,
        size: "91 MB",
      },
      {
        key: "debian",
        file: `DashBeam_${DESKTOP_VERSION}_amd64.deb`,
        tag: DESKTOP_TAG,
        size: "13 MB",
      },
      {
        key: "rpm",
        file: `DashBeam-${DESKTOP_VERSION}-1.x86_64.rpm`,
        tag: DESKTOP_TAG,
        size: "19 MB",
      },
      {
        key: "aarch64AppImage",
        file: `DashBeam_${DESKTOP_VERSION}_aarch64.AppImage`,
        tag: DESKTOP_TAG,
        size: "89 MB",
      },
      {
        key: "arm64Debian",
        file: `DashBeam_${DESKTOP_VERSION}_arm64.deb`,
        tag: DESKTOP_TAG,
        size: "13 MB",
      },
      {
        key: "aarch64Rpm",
        file: `DashBeam-${DESKTOP_VERSION}-1.aarch64.rpm`,
        tag: DESKTOP_TAG,
        size: "19 MB",
      },
    ],
  },
];

export const mobilePlatformGroups = [
  {
    key: "android",
    links: [
      {
        key: "arm64Apk",
        file: `DashBeam-${ANDROID_VERSION}-arm64.apk`,
        tag: ANDROID_VERSION,
        size: "49 MB",
      },
      {
        key: "armv7Apk",
        file: `DashBeam-${ANDROID_VERSION}-armv7.apk`,
        tag: ANDROID_VERSION,
        size: "35 MB",
      },
      {
        key: "universalApk",
        file: `DashBeam-${ANDROID_VERSION}-universal.apk`,
        tag: ANDROID_VERSION,
        size: "173 MB",
      },
    ],
  },
];

const HERO_DOWNLOAD_ORDER = ["web", "windows", "mac", "linux", "android"];

export function getDownloadHref(link) {
  return link.externalUrl ?? releaseUrl(link.tag, link.file);
}

export function getPrimaryDownload(os, arch = "x64") {
  if (os === "windows" && arch === "arm64") {
    return primaryDownloadsByOs["windows-arm64"];
  }
  if (os === "linux" && arch === "arm64") {
    return primaryDownloadsByOs["linux-arm64"];
  }
  return primaryDownloadsByOs[os] || primaryDownloadsByOs.mac;
}

export function getPrimaryDownloadUrl(os, arch = "x64") {
  const primary = getPrimaryDownload(os, arch);
  return getDownloadHref(primary);
}

export function getAlternateDownloadsForOs(osKey, arch = "x64") {
  const group = desktopPlatformGroups.find((g) => g.key === osKey);
  if (!group) return [];
  const primary = getPrimaryDownload(osKey, arch);
  return group.links
    .filter((link) => link.file !== primary?.file)
    .map((link) => ({
      ...link,
      href: getDownloadHref(link),
    }));
}

export function getPrimaryDownloadOption(t, os, arch = "x64") {
  const download = getPrimaryDownload(os, arch);
  return {
    id: download.id,
    size: download.size,
    icon: download.icon,
    keepIconColor: Boolean(download.keepIconColor),
    url: getDownloadHref(download),
    label: t(download.heroTranslationKey),
  };
}

export function getDownloadOptions(t) {
  return HERO_DOWNLOAD_ORDER.map((osKey) => {
    const download = primaryDownloadsByOs[osKey];
    return {
      id: download.id,
      size: download.size,
      icon: download.icon,
      keepIconColor: Boolean(download.keepIconColor),
      url: getDownloadHref(download),
      label: t(download.heroTranslationKey),
    };
  });
}
