"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "th", name: "ไทย", flag: "🇹🇭" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Select
      onValueChange={(value) => {
        if (value && value !== locale) {
          router.replace(pathname, { locale: value });
        }
      }}
      value={locale}
    >
      <SelectTrigger
        aria-label="Change language"
        className="w-auto min-w-0 font-sans"
        size="sm"
      >
        <SelectValue>{(value) => String(value).toUpperCase()}</SelectValue>
      </SelectTrigger>
      <SelectPopup className="font-sans">
        {languages.map((language) => (
          <SelectItem key={language.code} value={language.code}>
            <span className="flex items-center gap-2 whitespace-nowrap">
              <span aria-hidden="true">{language.flag}</span>
              {language.name}
            </span>
          </SelectItem>
        ))}
      </SelectPopup>
    </Select>
  );
}
