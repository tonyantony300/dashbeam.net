"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LANGUAGES } from "@/constants/languages";
import { tx } from "@/lib/tx";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("header");
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
        aria-label={tx(t, "changeLanguage", "Change language")}
        className="w-auto min-w-0 font-sans"
        size="sm"
      >
        <SelectValue>{(value) => String(value).toUpperCase()}</SelectValue>
      </SelectTrigger>
      {/* Base UI's default is to overlay the popup on the trigger with the
          selected item on top of it. In a sticky header that puts the list's
          top edge above the viewport, so it renders clipped — anchor it below
          the trigger instead and let the positioner handle collisions. */}
      <SelectPopup alignItemWithTrigger={false} className="font-sans">
        {LANGUAGES.map((language) => (
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
