import React from 'react';
import Giscus from "@giscus/react";
import { useColorMode } from '@docusaurus/theme-common';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function GiscusComponent() {
    const { colorMode } = useColorMode();
    const { i18n, siteConfig } = useDocusaurusContext();
    const { pathname } = useLocation();

    // Build a locale-independent discussion term so a page and all of its translations
    // share a single Giscus thread. We strip the site baseUrl and the locale prefix
    // (e.g. "/es") from the current pathname. For the default locale this yields exactly
    // the pathname, so existing English threads (previously mapped via "pathname") are
    // preserved.
    const { currentLocale, defaultLocale } = i18n;
    let term = pathname;
    if (siteConfig.baseUrl !== '/' && term.startsWith(siteConfig.baseUrl)) {
        term = '/' + term.slice(siteConfig.baseUrl.length);
    }
    if (currentLocale !== defaultLocale) {
        const localePrefix = `/${currentLocale}`;
        if (term === localePrefix) {
            term = '/';
        } else if (term.startsWith(`${localePrefix}/`)) {
            term = term.slice(localePrefix.length);
        }
    }
    // Normalize trailing slash (but keep the root as "/").
    if (term.length > 1 && term.endsWith('/')) {
        term = term.slice(0, -1);
    }

    return (
        <Giscus
            repo="velopack/velopack.docs"
            repoId="R_kgDOLaUYhQ"
            category="General"
            categoryId="DIC_kwDOLaUYhc4Cd3Se"
            mapping="specific"
            term={term}
            strict="1"
            reactionsEnabled="0"
            emitMetadata="1"
            inputPosition="top"
            theme={colorMode}
            lang={currentLocale}
            loading="eager"
        />
    );
}
