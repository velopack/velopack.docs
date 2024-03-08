import "../css/FancyStep.css";
import type { PropsWithChildren } from 'react';
import MDXContent from '@theme/MDXContent';

export type FancyStepProps = PropsWithChildren & {
    step: number;
    noline: boolean;
};

export default function FancyStep({ step, noline, children }: FancyStepProps) {
    return (
        <div className="fancystep-root">
            <div className={noline ? "" : "fancystep-leftcol"}>
                <div className="fancystep-number">{step}</div>
            </div>
            <div className="fancystep-content">
                <MDXContent>{children}</MDXContent>
            </div>
        </div>
    );
}