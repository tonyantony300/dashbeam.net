import { GITHUB_REPO_URL } from "@/lib/seo";

export const PRIVACY_LAST_UPDATED = "July 21, 2026";

export const PRIVACY_SOURCE_URL = `${GITHUB_REPO_URL}/blob/main/PRIVACY.md`;


export const privacyPolicy = {
  intro:
    "DashBeam is designed with privacy and security as core principles. This privacy policy explains how the application handles your data and what information may be visible to third parties.",

  sections: [
    {
      id: "principles",
      title: "Core Privacy Principles",
      bullets: [
        {
          label: "No Account Required",
          text: "DashBeam does not require user registration, accounts, or any personal information.",
        },
        {
          label: "End-to-End Encryption",
          text: "All file transfers are encrypted end-to-end using QUIC + TLS 1.3.",
        },
        {
          label: "Peer-to-Peer",
          text: "Files are transferred directly between sender and receiver when possible.",
        },
        {
          label: "No Usage Tracking",
          text: "DashBeam does not collect telemetry or transfer statistics.",
        },
      ],
    },
    {
      id: "how-it-works",
      title: "How DashBeam Works",
      paragraphs: [
        "DashBeam uses peer-to-peer (P2P) networking technology powered by Iroh to transfer files directly between devices. The application:",
      ],
      numbered: [
        {
          label: "Establishes Direct Connections",
          text: "When possible, files are transferred directly between devices using NAT hole punching.",
        },
        {
          label: "Uses Relay Servers as Fallback",
          text: "If a direct connection isn't possible, the application may use relay servers to facilitate the transfer.",
        },
        {
          label: "Encrypts All Traffic",
          text: "All file data is encrypted end-to-end, meaning only the sender and receiver can decrypt it.",
        },
      ],
      links: [{ href: "https://www.iroh.computer", label: "Iroh" }],
    },
    {
      id: "local-data",
      title: "Data Stored Locally",
      paragraphs: [
        "DashBeam stores the following data locally on your device:",
      ],
      bullets: [
        {
          label: "Secret Keys",
          text: "On desktop, your device's Iroh secret key is stored in the OS credential store (macOS Keychain, Windows Credential Manager, Linux Secret Service) under the alt-sendme service name. Public device metadata (display name, endpoint ID) is stored in the app data directory. During active transfers, temporary files are stored in your system's temp directory.",
        },
        {
          label: "Paired devices",
          text: "When you pair devices, DashBeam stores the remote device's endpoint ID and display name locally. Paired invites deliver the same one-time blob ticket as manual sharing; tickets are not reused across shares.",
        },
        {
          label: "Downloaded Files",
          text: "Files you receive are saved to a location you choose.",
        },
      ],
      paragraphsAfter: [
        "This data never leaves your device unless you explicitly share it (for example, by sharing a transfer ticket).",
      ],
    },
    {
      id: "network",
      title: "Network Connections and Third-Party Services",
      subsections: [
        {
          title: "Relay Servers",
          paragraphs: [
            "By default, DashBeam may use relay servers operated by the Iroh project (n0) when direct peer-to-peer connections cannot be established.",
          ],
          subheadings: [
            {
              heading: "What Relay Servers May See",
              bullets: [
                "Connection metadata (IP addresses, connection timestamps)",
                "Connection duration",
                "Amount of data transferred (bandwidth usage)",
              ],
            },
            {
              heading: "What Relay Servers Cannot See",
              bullets: [
                "File contents (all data is encrypted end-to-end)",
                "File names or directory structures",
                "File metadata beyond transfer size",
                "Who you are communicating with (only encrypted connection endpoints)",
              ],
            },
            {
              heading: "Your Control",
              bullets: [
                "You can disable relay servers entirely in Settings → Infra (this may limit connectivity in some network configurations).",
                "You can configure custom self-hosted relay servers in Settings → Infra.",
                "You can configure a custom self-hosted discovery server in Settings → Infra.",
                "Relay servers are only used when direct connections fail.",
              ],
            },
          ],
        },
        {
          title: "Discovery (Pkarr)",
          paragraphs: [
            "When using Node ID-only tickets, DashBeam uses public-key based discovery (Pkarr) to find peer addresses. This service may temporarily store:",
          ],
          bullets: [
            "Node addresses (relay URL and/or IP addresses) associated with Node IDs",
            "This information is signed by the device's own key and used only for connection establishment",
          ],
          subheadings: [
            {
              heading: "Your Control",
              bullets: [
                "By default, DashBeam uses the discovery servers operated by the Iroh project (n0).",
                "You can configure a custom self-hosted discovery server in Settings → Infra. Discovery is independent of relays — you can self-host either, both, or neither.",
                "Custom discovery publishes over HTTPS pkarr. If you also set a DNS origin (advanced real-DNS path), resolution may use your system DNS resolver for TXT lookups under that origin, in addition to HTTPS — the same class of disclosure as default n0 DNS discovery.",
                "Discovery records are self-authenticating: a discovery server never sees file contents or names, only small signed address records.",
              ],
            },
          ],
        },
        {
          title: "Direct Connections",
          paragraphs: [
            "When a direct peer-to-peer connection is established (the preferred method), no third-party servers are involved in the transfer.",
          ],
        },
      ],
    },
    {
      id: "encryption",
      title: "Encryption and Security",
      bullets: [
        {
          label: "Encryption Protocol",
          text: "All traffic uses QUIC protocol with TLS 1.3 encryption.",
        },
        {
          label: "Content Verification",
          text: "Files are verified using Blake3 cryptographic hashing to ensure integrity.",
        },
        {
          label: "Node IDs",
          text: "256-bit cryptographic node identifiers are used for peer authentication.",
        },
        {
          label: "No Plaintext",
          text: "File contents are never transmitted or stored in unencrypted form.",
        },
      ],
    },
    {
      id: "does-not-do",
      title: "What This Project Doesn't Do",
      plainBullets: [
        "No personal information is collected",
        "File contents are not tracked",
        "Files are not stored or accessed on any servers — there is no server-side file storage",
        "Tracking services or cookies are not used by the app",
        "Data is not shared with third parties for advertising or analytics",
      ],
    },
    {
      id: "open-source",
      title: "Open Source and Transparency",
      paragraphs: [
        "DashBeam is open source software licensed under AGPL-3.0. You can:",
      ],
      plainBullets: [
        "Review the complete source code on GitHub",
        "Verify how the application handles your data",
        "Build and run the application yourself if desired",
        "Contribute improvements to privacy and security features",
      ],
      links: [{ href: GITHUB_REPO_URL, label: "GitHub repository" }],
    },
    {
      id: "rights",
      title: "Your Rights and Control",
      paragraphs: ["You maintain full control over:"],
      plainBullets: [
        "Which files you send and receive",
        "Where files are saved on your device",
        "Whether to use relay servers (can be disabled)",
        "Whether to use custom relay servers",
        "Whether to use a custom self-hosted discovery server",
        "Local data storage (can be cleared by uninstalling the application)",
      ],
    },
    {
      id: "retention",
      title: "Data Retention",
      bullets: [
        {
          label: "Secret Keys",
          text: "Stored locally until you delete the application or clear application data.",
        },
        {
          label: "Temporary Transfer Files",
          text: "Automatically cleaned up when transfers complete or the application closes.",
        },
        {
          label: "Downloaded Files",
          text: "Remain on your device until you delete them.",
        },
      ],
    },
    {
      id: "third-party",
      title: "Third-Party Services",
      paragraphs: ["DashBeam uses the following third-party services:"],
      numbered: [
        {
          label: "Iroh Network Library",
          text: "Core P2P networking functionality.",
        },
        {
          label: "Default Relay Servers",
          text: "Operated by the Iroh project, used only when direct connections fail.",
        },
        {
          label: "DNS Discovery",
          text: "Used for peer discovery when necessary (default n0 path, or your configured DNS origin when the advanced real-DNS option is enabled).",
        },
      ],
      paragraphsAfter: [
        "You may review the privacy policies of these services if you have concerns.",
      ],
      links: [{ href: "https://www.iroh.computer", label: "Iroh" }],
    },
    {
      id: "changes",
      title: "Changes to This Policy",
      paragraphs: [
        'This privacy policy may be updated from time to time. The "Last Updated" date at the top indicates when changes were made. Continued use of DashBeam after changes constitutes acceptance of the updated policy.',
      ],
    },
    {
      id: "contact",
      title: "Contact",
      paragraphs: [
        "If you have questions about this privacy policy or how DashBeam handles your data, please open an issue on GitHub or use the contact form on this website.",
      ],
      links: [
        {
          href: `${GITHUB_REPO_URL}/issues`,
          label: "GitHub issues",
        },
      ],
    },
    {
      id: "disclaimer",
      title: "Disclaimer",
      paragraphs: [
        "While DashBeam is designed with privacy and security in mind, no method of transmission over the internet is 100% secure. Users should:",
      ],
      plainBullets: [
        "Only share transfer tickets with trusted parties",
        "Be aware that encrypted transfer metadata may still be visible to relay server operators (connection metadata only)",
        "Consider using custom relay servers or disabling relays for maximum privacy",
        "Understand that direct peer-to-peer connections may expose your IP address to the other party and also to any relay server facilitating the connection",
      ],
    },
  ],
};
