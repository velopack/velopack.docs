import BrowserOnly from "@docusaurus/BrowserOnly";

export default function HitTrackerComponent() {
  return (
    <BrowserOnly>
      {() => {
        const hitUrl = `https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=${encodeURI(window.location.href)}&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=true`;
        return <img src={hitUrl} />;
      }}
    </BrowserOnly>
  )
}