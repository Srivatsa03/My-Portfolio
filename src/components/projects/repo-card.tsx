// The same repo cards as the GitHub profile README, loaded from that repo so
// the star and fork counts stay current: its refresh workflow regenerates
// them every Monday. Light and dark versions follow the site theme.
const CARD_BASE = "https://raw.githubusercontent.com/Srivatsa03/Srivatsa03/main/assets";

export function RepoCard({ repo, label }: { repo: string; label: string }) {
  return (
    <a
      href={`https://github.com/Srivatsa03/${repo}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} on GitHub`}
      className="block rounded-[10px] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${CARD_BASE}/card-${repo}-light.svg`}
        alt=""
        width={420}
        height={132}
        loading="lazy"
        className="h-auto w-full dark:hidden"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${CARD_BASE}/card-${repo}-dark.svg`}
        alt=""
        width={420}
        height={132}
        loading="lazy"
        className="hidden h-auto w-full dark:block"
      />
    </a>
  );
}
