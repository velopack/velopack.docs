import "../css/appliesto.css";

export type AppliesToProps = {
    win: boolean;
    nix: boolean;
    mac: boolean;
    all: boolean;
};

export default function AppliesTo({ win, nix, mac, all }: AppliesToProps) {
    const active = "appliesto active";
    const inactive = "appliesto inactive";
    return (
        <>
            <div className="appliesto">
                <div className="appliesto-bg"></div>
                <div className="appliesto-text">Applies to</div>
            </div>
            <div className={win || all ? active : inactive}>
                <div className="appliesto-bg"></div>
                <div className="appliesto-text">Windows</div>
            </div>
            <div className={mac || all ? active : inactive}>
                <div className="appliesto-bg"></div>
                <div className="appliesto-text">MacOS</div>
            </div>
            <div className={nix || all ? active : inactive}>
                <div className="appliesto-bg"></div>
                <div className="appliesto-text">Linux</div>
            </div>
        </>
    );
}