import BuyMeACoffeeIcon from "@/components/BuyMeACoffeeIcon";
import GithubIcon from "@/components/GithubIcon";
import KofiIcon from "@/components/KofiIcon";
import { DONATE_LINKS } from "@/constants/downloads";

/**
 * Every place that asks for support (donate card, header menu, post-download
 * thank-you, footer) offers the same three platforms in the same order, so a
 * visitor who already uses one of them finds it without hunting. Platform
 * names are brands and stay untranslated.
 */
export const DONATE_OPTIONS = [
  {
    id: "kofi",
    label: "Ko-fi",
    href: DONATE_LINKS.kofi,
    Icon: KofiIcon,
    iconSize: 20,
  },
  {
    id: "buyMeACoffee",
    label: "Buy Me a Coffee",
    href: DONATE_LINKS.buyMeACoffee,
    Icon: BuyMeACoffeeIcon,
    iconSize: 18,
  },
  {
    id: "githubSponsors",
    label: "GitHub Sponsors",
    href: DONATE_LINKS.githubSponsors,
    Icon: GithubIcon,
    iconSize: 16,
  },
];
