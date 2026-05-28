import * as cheerio from "cheerio";
import { RawPost, fetchWithTimeout } from "./types";

export async function fetchTelegramChannel(handle: string): Promise<RawPost[]> {
  const url = `https://t.me/s/${handle}`;
  try {
    const res = await fetchWithTimeout(url);
    if (!res.ok) {
      console.warn(`[telegram:${handle}] HTTP ${res.status}`);
      return [];
    }
    const html = await res.text();
    return parseTelegramHtml(html, handle);
  } catch (err) {
    console.warn(`[telegram:${handle}] fetch failed:`, (err as Error).message);
    return [];
  }
}

function parseTelegramHtml(html: string, handle: string): RawPost[] {
  const $ = cheerio.load(html);
  const posts: RawPost[] = [];

  $(".tgme_widget_message").each((_, el) => {
    const $el = $(el);
    const dataPost = $el.attr("data-post");
    if (!dataPost) return;

    const link = `https://t.me/${dataPost}`;
    const $text = $el.find(".tgme_widget_message_text").first();
    let text = $text.text().trim();
    if (!text) {
      text = $el.find(".tgme_widget_message_photo_wrap").attr("href")
        ? "[фото]"
        : "";
    }
    if (!text) return;

    const datetime = $el.find("time[datetime]").attr("datetime");
    if (!datetime) return;

    const firstLine = text.split("\n")[0].trim();
    const title = firstLine.length > 8 ? firstLine.slice(0, 200) : text.slice(0, 200);
    const summary = text.replace(/\s+/g, " ").slice(0, 500);

    posts.push({
      externalId: `tg:${dataPost}`,
      publishedAt: datetime,
      title,
      summary,
      link,
      outlet: `@${handle}`,
      channel: `Telegram · @${handle}`,
    });
  });

  return posts;
}
