import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitizes HTML for safe use with React's dangerouslySetInnerHTML.
 * Use this for any string that will be passed to __html.
 */
export function sanitizeHtmlForDangerouslySetInnerHTML(html: string | null | undefined): string {
  if (html == null || typeof html !== 'string') {
    return '';
  }

  return DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
}
