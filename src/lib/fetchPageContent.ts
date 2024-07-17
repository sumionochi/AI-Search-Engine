import cheerio from "cheerio";

export async function fetchPageContent(link: string): Promise<string> {
  try {
    const response = await fetch(link);
    if (!response.ok) {
      throw new Error(`Failed to fetch content from ${link}`);
    }
    const html = await response.text();
    return extractMainContent(html);
  } catch (error : any) {
    console.error(`Error fetching page content: ${error.message}`);
    return "";
  }
}

function extractMainContent(html: string): string {
  const $ = cheerio.load(html);
  $("script, style, head, nav, footer, iframe, img").remove();
  return $("body").text().replace(/\s+/g, " ").trim();
}
