import React from 'react';
import BlogPostItem from '@theme-original/BlogPostItem';
import { useBlogPost } from '@docusaurus/theme-common/internal'
import Giscus from '@site/src/components/Giscus';
import HitTracker from '@site/src/components/HitTracker';

export default function BlogPostItemWrapper(props) {
  const { metadata, isBlogPostPage } = useBlogPost();
  const { frontMatter } = metadata;
  const { disable_comments } = frontMatter;

  return (
    <>
      <BlogPostItem {...props} />
      {(!disable_comments && isBlogPostPage) && (
        <>
          <br />
          <HitTracker />
          <Giscus />
        </>
      )}
    </>
  );
}
