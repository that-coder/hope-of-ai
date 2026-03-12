export default {
  layout: "post.njk",
  permalink: (data) => `/blog/${data.page.fileSlug}/`,
  pageImage: "/assets/blog-top.png",
  pageImageAlt: "Hope of AI blog article image",
};
