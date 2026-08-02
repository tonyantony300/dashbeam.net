"use client";

import { useEffect, useState } from "react";
import {
  ARTICLE_MAX,
  Measure,
  MEASURE_MAX,
  Prose,
  PullQuote,
  SectionHead,
  StraightAside,
  StatStrip,
  TOC,
} from "@/components/under-the-hood/ArticleParts";
import { cn } from "@/lib/utils";
import HashTree from "@/components/under-the-hood/figures/HashTree";
import LookupFigure from "@/components/under-the-hood/figures/LookupFigure";
import HolePunchFigure from "@/components/under-the-hood/figures/HolePunchFigure";
import LocalNetworkFigure from "@/components/under-the-hood/figures/LocalNetworkFigure";
import RoamingFigure from "@/components/under-the-hood/figures/RoamingFigure";
import ResumeFigure from "@/components/under-the-hood/figures/ResumeFigure";
import RelayViewFigure from "@/components/under-the-hood/figures/RelayViewFigure";

function ReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h =
        document.documentElement.scrollHeight - window.innerHeight;
      setPct(h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-40 h-0.5 bg-transparent"
    >
      <div
        className="h-full bg-brand-brown transition-[width] duration-75 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export default function UnderTheHoodPageContent() {
  return (
    <>
      <ReadingProgress />
      <article
        className={cn(
          "mx-auto w-full px-5 pb-28 pt-8 md:px-10 lg:px-[60px]",
          ARTICLE_MAX,
        )}
      >
        <Measure as="header" className="mb-10 pt-12 md:pt-14">
          <div className="font-sans text-[11px] uppercase tracking-[0.16em] text-brand-brown">
            DashBeam · How it works
          </div>
          <h1 className="my-4 font-heading text-[40px] font-normal leading-[1.02] tracking-[-0.02em] text-foreground md:text-[60px]">
            A machine&rsquo;s name is a key,
            <br />
            not an address.
          </h1>
          <p className="mb-6 font-heading text-[20px] leading-[1.4] text-foreground md:text-[23px]">
            Most file transfer tools work the way you&rsquo;d guess: you upload
            to a company&rsquo;s servers, they hand you a link, your friend
            downloads it back out. DashBeam doesn&rsquo;t do any of that – and
            the interesting part isn&rsquo;t the claim. It&rsquo;s what has to
            be true underneath for the claim to hold.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border py-2 font-sans text-xs text-muted-foreground">
            <span>Eight sections · seven figures</span>
            <span aria-hidden="true" className="text-border">
              |
            </span>
            <span>
              Built on{" "}
              <a
                className="text-brand-brown underline underline-offset-[3px] decoration-1 hover:opacity-80"
                href="https://www.iroh.computer"
                rel="noopener noreferrer"
                target="_blank"
              >
                iroh
              </a>
              . Where a design decision is iroh&rsquo;s, we say so.
            </span>
          </div>
          <nav
            aria-label="Article sections"
            className="border-b border-border py-3 pb-4"
          >
            <div className="grid grid-cols-1 gap-x-7 gap-y-1.5 sm:grid-cols-2">
              {TOC.map((item) => (
                <a
                  className="flex gap-2.5 font-sans text-[14.5px] leading-snug text-foreground no-underline hover:text-brand-brown"
                  href={`#${item.id}`}
                  key={item.id}
                >
                  <span className="font-heading tabular-nums text-brand-brown">
                    {item.num}
                  </span>
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        </Measure>

        {/* 01 */}
        <SectionHead
          id="fingerprint"
          kicker="The fingerprint"
          num="01"
          title={
            <>
              Drag in 4&nbsp;GB, get a short string
            </>
          }
        />
        <Prose className="mt-6">
          <p>
            Drop a folder into DashBeam. There&rsquo;s no upload bar. A few
            seconds later there&rsquo;s a string of text you can send to
            somebody. Nothing was uploaded, because there&rsquo;s nowhere to
            upload it to.
          </p>
          <p>
            What DashBeam did instead was read the folder and compute a
            fingerprint of its contents. Not a fingerprint of the whole thing at
            once – it split the data into chunks, fingerprinted each chunk, then
            fingerprinted those fingerprints in pairs, and again, and again,
            until everything collapsed into a single 32-byte value at the top.
            Change one byte anywhere in that folder and the value at the top
            changes.
          </p>
          <p>
            Your file never moved. It&rsquo;s still sitting where you left it,
            and your machine is what will serve it. The string you&rsquo;re
            holding isn&rsquo;t a copy of your file. It&rsquo;s an{" "}
            <em>address</em> for it – and it happens to be an address that can
            only ever refer to exactly those bytes and no others.
          </p>
        </Prose>
        <PullQuote>
          DashBeam never moves your file somewhere and then moves it again.
          There is one transfer, and it hasn&rsquo;t started yet.
        </PullQuote>
        <HashTree />
        <StraightAside>
          <p>
            That string is a bearer token. Anyone you forward it to can fetch
            that folder. It&rsquo;s &ldquo;one-time&rdquo; in the sense that it
            points at one specific set of bytes – not in the sense that it
            expires after the first person uses it.
          </p>
        </StraightAside>

        {/* 02 */}
        <SectionHead
          id="names"
          kicker="Names"
          num="02"
          title="Someone on another continent pastes it, and it starts"
        />
        <Prose className="mt-6">
          <p>
            They don&rsquo;t have an account. Neither do you. Neither of you
            told anyone your IP address. They paste the string, and bytes start
            moving.
          </p>
          <p>
            The string carries three things: <strong>who</strong> to talk to,{" "}
            <strong>where to start looking</strong>, and <strong>what</strong>{" "}
            to ask for. The third one is the fingerprint from section&nbsp;1.
            The first one is where it gets interesting.
          </p>
          <p>
            Your machine has a name on the network. That name isn&rsquo;t an
            address – it&rsquo;s a public key. When DashBeam first ran, it
            generated a keypair and kept the secret half on your device. The
            public half, written out, is 52 characters. That&rsquo;s the name.
          </p>
          <p>
            This looks like an odd choice until you notice what comes free with
            it. Anyone who knows your machine&rsquo;s name can encrypt something
            that only your machine can open. Anyone who knows your
            machine&rsquo;s name can verify a signature that only your machine
            could have produced.{" "}
            <strong>
              Naming, encryption, and authentication stop being three problems
              and become one.
            </strong>{" "}
            There&rsquo;s no separate step where you check you&rsquo;re talking
            to the right person, because addressing them at all requires their
            key.
          </p>
          <p>
            That still leaves a practical question: a key isn&rsquo;t somewhere
            you can send packets. Turning a name into a location is a lookup.
            Your device publishes a small record –{" "}
            <em>
              the key you&rsquo;re looking for can currently be reached at this
              relay, and possibly at these addresses directly
            </em>{" "}
            – and signs it with the same secret key the name is derived from.
            Your friend&rsquo;s device fetches that record and checks the
            signature against the name it already has. A tampered record fails
            that check, which means the lookup service doesn&rsquo;t have to be
            trusted, only available.
          </p>
        </Prose>
        <LookupFigure />
        <PullQuote>
          This is a lookup, not a directory. You can resolve a name you already
          have. You cannot browse for one, because there is no list to browse.
          If someone doesn&rsquo;t know your key, your record may as well not
          exist.
        </PullQuote>

        {/* 03 */}
        <SectionHead
          id="hole-punching"
          kicker="Speed & hole punching"
          num="03"
          title="It moves at a speed web tools don’t"
        />
        <StatStrip
          items={[
            { value: "452 GB", label: "in a single transfer" },
            { value: "123 MB/s", label: "sustained across 54 GB" },
            {
              value: "125 MB/s",
              label: "measured peak – a saturated gigabit line",
            },
          ]}
        />
        <Prose>
          <p>Two reasons, and the second one is the one worth reading.</p>
          <p>
            The first is that there&rsquo;s no detour. Bytes go from your disk
            to their disk. Upload-then-download means every byte crosses the
            internet twice, and the whole thing runs at the speed of the slower
            of two links that have nothing to do with each other.
          </p>
          <p>
            The second reason is that the direct connection exists at all –
            which, if you think about home networks for a second, it
            shouldn&rsquo;t. Both machines are almost certainly behind a router
            doing address translation. Such a router only forwards inbound
            packets that belong to a conversation it already watched begin.
            From the outside, neither machine has a reachable address at all.
            Neither one can be dialled by the other.
          </p>
          <p>They connect directly about nine times in ten anyway.</p>
          <p>
            The trick is that the router doesn&rsquo;t ask anyone&rsquo;s
            permission – it just keeps a table. When your laptop sends a packet
            out to some address, the router writes down{" "}
            <em>if something comes back from there, it&rsquo;s for the laptop</em>
            . So if both machines send a packet toward each other at roughly the
            same moment, each router independently opens a hole for a reply it
            now expects. Neither router believes it accepted an inbound
            connection. Both of them did.
          </p>
          <p>
            What needs coordinating is the{" "}
            <em>roughly the same moment</em> part, and which addresses to aim
            at. That&rsquo;s what a relay is for. And notice the ordering,
            because it&rsquo;s the part people assume wrong.
          </p>
        </Prose>
        <HolePunchFigure />
        <PullQuote>
          The relay is already carrying your data while this negotiation
          happens. Nothing is waiting on the direct connection to succeed. When
          it does succeed, traffic moves over and the relay steps back.
        </PullQuote>
        <StraightAside>
          <p>
            Nine in ten means one in ten doesn&rsquo;t. Some networks –
            symmetric address translation on both ends, some corporate setups –
            never get a direct path, and those transfers run through a relay for
            their whole life. They still work; they&rsquo;re just slower.
          </p>
          <p>
            Separately, the browser version is throughput-limited compared to
            the desktop app, and that&rsquo;s a browser constraint rather than
            something we can engineer around.
          </p>
        </StraightAside>

        {/* 04 */}
        <SectionHead
          id="nearby"
          kicker="Nearby"
          num="04"
          title="Someone on your Wi-Fi appears, with no code typed"
        />
        <Prose className="mt-6">
          <p>
            Another DashBeam device on the same network shows up under{" "}
            <strong>Nearby</strong>. You pick it and send. Nobody typed a
            pairing code, and nothing went out to the internet to make that
            happen.
          </p>
          <p>
            When a machine is on the same network segment, all of section&nbsp;2&rsquo;s
            lookup machinery is unnecessary work – the network itself can
            answer. DashBeam advertises and browses using multicast DNS, the
            same mechanism that makes printers and speakers show up without
            configuration.
          </p>
          <p>
            Being precise about where this comes from is worth more than making
            it sound effortless:{" "}
            <strong>
              iroh ships local discovery switched off by default. DashBeam turns
              it on
            </strong>
            , and wraps it in a policy, because &ldquo;everyone on this coffee
            shop Wi-Fi can see my laptop&rsquo;s name&rdquo; is a decision that
            belongs to you rather than to us.
          </p>
          <p>
            The first time two devices meet this way, both show a short
            verification code derived from both public keys. Same code on both
            screens means you&rsquo;re talking to the machine that&rsquo;s
            actually in front of you.
          </p>
        </Prose>
        <LocalNetworkFigure />
        <PullQuote>
          The local path replaces the lookup, not the transfer. Everything after
          this point – the encryption, the verification, the resumption – is
          identical either way.
        </PullQuote>
        <StraightAside>
          <p>
            Plenty of guest networks and VPNs block multicast outright, and when
            they do, Nearby is simply empty. It isn&rsquo;t broken and
            there&rsquo;s no setting to fix it – use a ticket or pair over the
            internet instead.
          </p>
        </StraightAside>

        {/* 05 */}
        <SectionHead
          id="roaming"
          kicker="Roaming"
          num="05"
          title="You walk out the door mid-transfer, and it keeps going"
        />
        <Prose className="mt-6">
          <p>
            The transfer is running. Your phone drops off Wi-Fi and picks up
            cellular. The progress bar doesn&rsquo;t stop.
          </p>
          <p>
            This is where the strange decision back in section&nbsp;2 pays for
            itself completely. The connection was never attached to an IP
            address. It&rsquo;s attached to a key. The addresses were only ever
            a hint about where to find that key – and hints are cheap to
            replace. So when the network underneath changes:
          </p>
          <ol>
            <li>
              A monitor notices the network interfaces and routing table are
              different.
            </li>
            <li>
              Probes go out to relays to learn the new public addresses and how
              far away they are.
            </li>
            <li>
              A small message crosses the relay to the other device:{" "}
              <em>here&rsquo;s where I am now.</em>
            </li>
            <li>
              The other device updates its address book. Same key, new
              addresses.
            </li>
            <li>The new path validates, and traffic moves onto it.</li>
          </ol>
          <p>
            And the reason the progress bar keeps moving through all of that, in
            iroh&rsquo;s own words:
          </p>
        </Prose>
        <blockquote
          className={cn(
            "mx-auto my-6 w-full border-s border-brand-brown ps-4 text-left font-heading text-[20px] font-normal italic leading-[1.4] text-foreground md:text-[22px]",
            MEASURE_MAX,
          )}
        >
          &ldquo;While this hole-punching dance progresses, we are still able to
          send data back and forth over the relay connection, so data never
          stops flowing.&rdquo;
          <div className="mt-2.5 font-sans text-xs not-italic text-muted-foreground">
            iroh –{" "}
            <a
              className="text-brand-brown underline underline-offset-[3px] decoration-1 hover:opacity-80"
              href="https://www.iroh.computer/blog/healing-connections"
              rel="noopener noreferrer"
              target="_blank"
            >
              Healing Connections After Network Migration
            </a>
          </div>
        </blockquote>
        <RoamingFigure />
        <PullQuote large>
          A machine&rsquo;s name is a key, not an address. The key does the
          encryption. So the address is disposable – and everything else here is
          a consequence of that.
        </PullQuote>

        {/* 06 */}
        <SectionHead
          id="resume"
          kicker="Resumption"
          num="06"
          title="Your laptop sleeps, and it picks up where it stopped"
        />
        <Prose className="mt-6">
          <p>
            Close the lid, lose the network, quit the app. When you come back,
            the transfer resumes from where it stopped. It doesn&rsquo;t start
            over.
          </p>
          <p>
            Go back to the tree in section&nbsp;1. Because the folder was
            fingerprinted as a tree rather than as one lump, any individual
            chunk can be checked on its own against that same root value. The
            receiver doesn&rsquo;t need the whole file to know whether the part
            it has is right. That buys two things at once.
          </p>
          <p>
            <strong>Verified streaming.</strong> A corrupted or tampered chunk
            is caught at that chunk – not at the end of a 400&nbsp;GB download.
            Data is checked as it lands, continuously, against a fingerprint
            that was fixed before the transfer started.
          </p>
          <p>
            <strong>Resumption.</strong> The receiver knows exactly which chunks
            it already holds and trusts. When the connection comes back, it asks
            for the rest. Nothing that already arrived is re-sent, and nothing
            that already arrived has to be taken on faith.
          </p>
          <p>
            Folders and very large files use the same idea one level up: a blob
            whose contents are the fingerprints of other blobs.
          </p>
        </Prose>
        <ResumeFigure />
        <Prose>
          <p>
            For what it&rsquo;s worth against the comparison table: LocalSend
            and PairDrop don&rsquo;t resume.
          </p>
        </Prose>

        {/* 07 */}
        <SectionHead
          id="no-accounts"
          kicker="Accounts & privacy"
          num="07"
          title="Nobody ever asked you to sign in"
        />
        <Prose className="mt-6">
          <p>
            No account. No sign-up. No &ldquo;your files&rdquo; page, no
            dashboard, no history of what you&rsquo;ve sent – not hidden
            somewhere, just absent.
          </p>
          <p>
            That&rsquo;s not restraint on our part. There&rsquo;s nothing for an
            account to point at. The string from section&nbsp;2 <em>is</em> the
            coordination protocol, in full. No server holds a record of the
            transfer because no server was involved in arranging it.
          </p>
          <p>
            Section&nbsp;3 admitted that a relay can end up in the path, so
            here&rsquo;s the ledger written out rather than implied.
          </p>
        </Prose>
        <Measure className="my-6 overflow-x-auto">
          <table className="w-full border-collapse font-sans text-sm">
            <tbody>
              {[
                [
                  "A relay operator can see",
                  "that one key exchanged traffic with another key, roughly when, and roughly how much",
                ],
                [
                  "A relay operator cannot see",
                  "what was sent – not the contents, not the filenames, not the folder structure. Traffic is encrypted end to end whether the path is direct or relayed",
                ],
                [
                  "Your ISP sees",
                  "encrypted UDP going to a relay, or encrypted UDP going to a peer",
                ],
                [
                  "The lookup service learns",
                  "that somebody asked for a particular key’s record",
                ],
                [
                  "DashBeam, the project, sees",
                  "nothing. There is no server of ours anywhere in this drawing",
                  true,
                ],
              ].map(([label, body, accent]) => (
                <tr className="border-b border-border" key={label}>
                  <td
                    className={`w-[38%] py-3 pe-4 align-top font-heading text-base ${accent ? "text-brand-brown" : "text-foreground"}`}
                  >
                    {label}
                  </td>
                  <td
                    className={`py-3 align-top leading-relaxed ${accent ? "text-brand-brown" : "text-muted-foreground"}`}
                  >
                    {body}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Measure>
        <RelayViewFigure />
        <Prose>
          <p>
            If that ledger still isn&rsquo;t good enough for you – and for some
            people it shouldn&rsquo;t be –{" "}
            <strong>
              the relay and the lookup service are both self-hostable
            </strong>
            , and the instructions are in the repository. Point DashBeam at your
            own and the last third party leaves the diagram.
          </p>
        </Prose>

        {/* 08 */}
        <SectionHead
          id="pairing"
          kicker="Pairing"
          num="08"
          title="You paired your phone once, and now it’s one button"
        />
        <Prose className="mt-6">
          <p>
            Your own devices are listed. Sending to one is a click. There&rsquo;s
            no string to copy. Pairing doesn&rsquo;t replace the string – it
            delivers it for you.
          </p>
          <p>
            Two devices exchange a short code, and then each one proves it
            actually holds the secret behind its public name by signing material
            bound to that specific connection. A signature copied from somewhere
            else won&rsquo;t do; it has to be produced live, for this
            connection. Once that&rsquo;s done, each device remembers the other
            locally, and a long-lived connection between them carries presence –
            which is how you can see that a device is online before you send to
            it.
          </p>
          <p>
            When you do send, DashBeam still mints an ordinary one-time ticket,
            exactly like section&nbsp;1. It just delivers it as an in-app invite
            instead of asking you to copy and paste. Accepting a Nearby request
            from section&nbsp;4 produces the same stored record – same
            destination, different way of meeting.
          </p>
          <p>
            Manual tickets and the{" "}
            <a
              href="https://www.iroh.computer/sendme"
              rel="noopener noreferrer"
              target="_blank"
            >
              sendme CLI
            </a>{" "}
            keep working exactly as they did.
          </p>
        </Prose>

        {/* close */}
        <Measure className="mt-16">
          <hr className="mb-6 border-0 border-t border-border" />
          <h2 className="mb-4 font-heading text-[26px] font-normal text-foreground">
            The whole thing in one paragraph
          </h2>
          <p className="m-0 font-heading text-[20px] leading-[1.42] text-foreground md:text-[23px]">
            A machine&rsquo;s name is a key. The key does the encryption. So the
            address is disposable – and once the address is disposable,
            everything else follows. You can change networks in the middle of a
            transfer, because the connection was never about the address. You
            can attempt a direct connection without having to trust the result,
            because failure just means the relay stays. A relay can carry your
            traffic without being able to read it, because the name it&rsquo;s
            routing to is the same key the traffic is encrypted for. And nobody
            needs an account, because there&rsquo;s nothing an account could
            point at.
          </p>
          <hr className="my-8 border-0 border-t border-border" />
          <p className="m-0 text-left font-sans text-[13.5px] italic text-muted-foreground">
            DashBeam is built on{" "}
            <a
              className="text-brand-brown not-italic underline underline-offset-[3px] decoration-1 hover:opacity-80"
              href="https://www.iroh.computer"
              rel="noopener noreferrer"
              target="_blank"
            >
              iroh
            </a>
            . If you&rsquo;d rather read source than prose, the protocol lives
            in{" "}
            <a
              className="text-brand-brown not-italic underline underline-offset-[3px] decoration-1 hover:opacity-80"
              href="https://github.com/tonyantony300/dashbeam/tree/main/engine/protocol"
              rel="noopener noreferrer"
              target="_blank"
            >
              engine/protocol
            </a>
            . This page is available in English only.
          </p>
        </Measure>
      </article>
    </>
  );
}
