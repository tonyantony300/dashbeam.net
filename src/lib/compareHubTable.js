import { STATUS, status, text } from "@/components/ComparisonMatrix";

export function buildCompareHubTable(t, s) {
  const columns = [
    s("altsendme"),
    s("blip"),
    s("localsend"),
    s("wormhole"),
    s("pairdrop"),
  ];

  const yes = (statusKey = STATUS.yes) =>
    status(statusKey, t("yes"), { compact: true });
  const no = () => status(STATUS.no, t("no"), { compact: true });

  const sections = [
    {
      title: t("table.sectionConnectivity"),
      rows: [
        {
          feature: t("table.protocol"),
          values: [
            text(t("table.protocolAltsendme")),
            text(t("table.protocolBlip")),
            text(t("table.protocolLocalsend")),
            text(t("table.protocolWormhole")),
            text(t("table.protocolPairdrop")),
          ],
        },
        {
          feature: t("table.worksOverInternet"),
          values: [
            yes(),
            yes(),
            status(STATUS.lanOnly, t("lanOnly"), { compact: true }),
            yes(),
            yes(),
          ],
        },
        {
          feature: t("table.gigabitSpeed"),
          values: [
            yes(),
            yes(),
            status(STATUS.yes, t("table.gigabitLocalsend")),
            yes(),
            status(STATUS.no, t("table.gigabitPairdrop")),
          ],
        },
      ],
    },
    {
      title: t("table.sectionFeatures"),
      rows: [
        {
          feature: t("table.openSource"),
          values: [yes(), no(), yes(), yes(), yes()],
        },
        {
          feature: t("table.noAccount"),
          values: [yes(), no(), yes(), yes(), yes()],
        },
        {
          feature: t("table.e2eEncryption"),
          values: [yes(), yes(), yes(), yes(), yes()],
        },
        {
          feature: t("table.folders"),
          values: [
            yes(),
            yes(),
            yes(),
            yes(),
            status(STATUS.yes, t("table.foldersPairdrop")),
          ],
        },
        {
          feature: t("table.resumable"),
          values: [yes(), yes(), no(), no(), no()],
        },
        {
          feature: t("table.unlimitedSize"),
          values: [
            yes(),
            yes(),
            yes(),
            yes(),
            status(STATUS.partial, t("table.sizePairdrop")),
          ],
        },
        {
          feature: t("table.platforms"),
          values: [
            text(t("table.platformsAltsendme")),
            text(t("table.platformsBlip")),
            text(t("table.platformsLocalsend")),
            text(t("table.platformsWormhole")),
            text(t("table.platformsPairdrop")),
          ],
        },
      ],
    },
    {
      title: t("table.theCatch"),
      rows: [
        {
          feature: "",
          highlighted: true,
          values: [
            text(t("table.catchAltsendme")),
            text(t("table.catchBlip")),
            text(t("table.catchLocalsend")),
            text(t("table.catchWormhole")),
            text(t("table.catchPairdrop")),
          ],
        },
      ],
    },
  ];

  return { columns, sections };
}
