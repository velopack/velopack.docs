import "../css/appliesto.css";

export type AppliesToProps = {
    os: "windows" | "macos" | "linux" | "all";
};

export default function AppliesTo({ os }: AppliesToProps) {
    return (
        <>
            <div className="appliesto">
                <div className="appliesto-bg"></div>
                <div className="appliesto-text">Applies to</div>
            </div>
            <div className="appliesto active">
                <div className="appliesto-bg"></div>
                <div className="appliesto-text">Windows</div>
            </div>
            <div className="appliesto inactive">
                <div className="appliesto-bg"></div>
                <div className="appliesto-text">MacOS</div>
            </div>
            <div className="appliesto inactive">
                <div className="appliesto-bg"></div>
                <div className="appliesto-text">Linux</div>
            </div>
        </>
    );
}