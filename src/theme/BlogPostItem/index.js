/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import BlogPostItemContainer from '@theme/BlogPostItem/Container';
import BlogPostItemHeader from '@theme/BlogPostItem/Header';
import BlogPostItemContent from '@theme/BlogPostItem/Content';
import BlogPostItemFooter from '@theme/BlogPostItem/Footer';
import Giscus from '@site/src/components/Giscus';

// apply a bottom margin in list view
function useContainerClassName() {
  const {isBlogPostPage} = useBlogPost();
  return !isBlogPostPage ? 'margin-bottom--xl' : undefined;
}

export default function BlogPostItem({
  children,
  className,
}) {
  const containerClassName = useContainerClassName();
  const {isBlogPostPage, metadata} = useBlogPost();
  const {frontMatter} = metadata;
  const {disable_comments} = frontMatter;
  return (
    <BlogPostItemContainer className={clsx(containerClassName, className)}>
      <BlogPostItemHeader />
      <BlogPostItemContent>{children}</BlogPostItemContent>
      {(!disable_comments && isBlogPostPage) && (
        <>
          <br />
          <Giscus />
        </>
      )}
      <BlogPostItemFooter />
    </BlogPostItemContainer>
  );
}