import { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
  path?: string;
};

function upsertMeta(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertOg(property: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function Seo({ title, description, path }: SeoProps) {
  useEffect(() => {
    document.title = title;

    upsertMeta("description", description);

    const url = (() => {
      try {
        const base = window.location.origin;
        return new URL(path ?? window.location.pathname, base).toString();
      } catch {
        return window.location.href;
      }
    })();

    upsertOg("og:title", title);
    upsertOg("og:description", description);
    upsertOg("og:type", "website");
    upsertOg("og:url", url);
  }, [title, description, path]);

  return null;
}
