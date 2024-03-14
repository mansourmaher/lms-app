import sanitizeHtml from "sanitize-html";

interface SanitizeHTMLProps {
  html: string;
  options?: any;
}

const defaultOptions = {
  allowedTags: [
    "b",
    "i",
    "em",
    "strong",
    "a",
    "p",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "ul",
    "ol",
    "li",
    "blockquote",
    "code",
    "hr",
    "br",
    "div",
    "table",
    "thead",
    "caption",
    "tbody",
    "tr",
    "th",
    "td",
    "pre",
    "iframe",
  ],
  allowedAttributes: {
    a: ["href"],
  },
  allowedIframeHostnames: ["www.youtube.com"],
};

const sanitize = (dirty: any, options: any) => ({
  __html: sanitizeHtml(dirty, { ...defaultOptions, ...options }),
});

const SanitizeHTML = ({ html, options }: SanitizeHTMLProps) => (
  <div dangerouslySetInnerHTML={sanitize(html, options)} />
);
export default SanitizeHTML;
