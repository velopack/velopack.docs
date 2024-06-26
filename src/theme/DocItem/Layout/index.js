import React from 'react';
import clsx from 'clsx';
import { useWindowSize } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/theme-common/internal';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemContent from '@theme/DocItem/Content';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import Unlisted from '@theme/Unlisted';
import styles from './styles.module.css';
import Giscus from '@site/src/components/Giscus';
import HitTracker from '@site/src/components/HitTracker';

function useDocTOC() {
  const { frontMatter, toc } = useDoc();
  const windowSize = useWindowSize();
  const hidden = frontMatter.hide_table_of_contents || toc.length < 1;
  const canRender = !hidden;
  const mobile = canRender ? <DocItemTOCMobile /> : undefined;
  const desktop =
    canRender && (windowSize === 'desktop' || windowSize === 'ssr') ? (
      <DocItemTOCDesktop />
    ) : undefined;
  return {
    hidden,
    mobile,
    desktop,
  };
}

export default function DocItemLayout({ children }) {
  const docTOC = useDocTOC();
  const { metadata } = useDoc();
  const { unlisted, frontMatter, slug } = metadata;
  let { disable_comments } = frontMatter;

  if (slug.includes("/reference/")) {
    // Disable comments for all library reference pages
    disable_comments = true;
  }

  return (
    <div className="row">
      <div className={clsx('col', !docTOC.hidden && styles.docItemCol)}>
        {unlisted && <Unlisted />}
        <DocVersionBanner />
        <div className={styles.docItemContainer}>
          <article>
            <DocBreadcrumbs />
            <DocVersionBadge />
            {docTOC.mobile}
            <DocItemContent>{children}</DocItemContent>
            {(!disable_comments) && (
              <>
                <br />
                <br />
                <HitTracker />
                <Giscus />
              </>
            )}
            <DocItemFooter />
          </article>
          <DocItemPaginator />
        </div>
      </div>
      {docTOC.desktop && <div className={clsx("col", "col--3", styles.docItemColToc)}>{docTOC.desktop}</div>}
    </div>
  );
}
