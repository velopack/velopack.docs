import config from '@generated/docusaurus.config'

export type FlowLinkProps = {
    text?: string;
    suffix?: string;
};

export default function FlowLink({ text = "Velopack Flow", suffix }: FlowLinkProps) { 
    const href = `${config.customFields?.flowBaseUrl}/${suffix || ""}`;
    return (
        <>
            <a href={href} target="_blank">{text}</a>
        </>
    );
}