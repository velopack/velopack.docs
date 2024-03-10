import React from 'react';
import BlogPostItem from '@theme-original/BlogPostItem';
import Giscus from '@site/src/components/Giscus';
import { useBlogPost } from '@docusaurus/theme-common/internal'

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
          <Giscus />
        </>
      )}
    </>
  );
}
