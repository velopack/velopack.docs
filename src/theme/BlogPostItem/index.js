import React from 'react';
import BlogPostItem from '@theme-original/BlogPostItem';
import Giscus from '@site/src/components/Giscus';
import { useBlogPost } from '@docusaurus/theme-common/internal'

export default function BlogPostItemWrapper(props) {
  const { metadata, isBlogPostPage } = useBlogPost();
  const { frontMatter, permalink } = metadata;
  const { disable_comments } = frontMatter;

  const hitUrl = `https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=${encodeURI(window.location.href)}&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=true`;

  return (
    <>
      <BlogPostItem {...props} />
      {(!disable_comments && isBlogPostPage) && (
        <>
          <br />
          <img src={hitUrl} />
          <Giscus />
        </>
      )}
    </>
  );
}
