export function seo(data = {}) {
  data.title =
    data.title || "GoodBookBible - A study tool for serious bible learners.";
  data.metaDescription =
    data.metaDescription ||
    "Super-fast Bible memorization and study app. Good Book Bible. Transparency across all platforms so you don’t miss a beat. Easily study back and forth between your cell phone, tablet, and desktop. Available on Android, IOS, Web, and Desktop.";

  document.title = data.title;
  document
    .querySelector('meta[name="description"]')
    .setAttribute("content", data.metaDescription);
}
