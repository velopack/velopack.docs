import React from 'react';
import Giscus from "@giscus/react";
import { useColorMode } from '@docusaurus/theme-common';

export default function GiscusComponent() {
    const { colorMode } = useColorMode();
    return (
        <Giscus
            repo="velopack/velopack.docs"
            repoId="R_kgDOLaUYhQ"
            category="General"
            categoryId="DIC_kwDOLaUYhc4Cd3Se"
            mapping="pathname"
            strict="1"
            reactionsEnabled="0"
            emitMetadata="1"
            inputPosition="top"
            theme={colorMode}
            lang="en"
            loading="eager"
        />
    );
}