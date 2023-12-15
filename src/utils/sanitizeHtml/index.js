import sanitizeHtml from 'sanitize-html';
import safeTags from './settings/safeTags.json';
import safeAttributes from './settings/safeAttributes.json';

export function safeText(string) {
  return sanitizeHtml(string.replaceAll('&nbsp;', ' '), {
    allowedTags: [],
    allowedAttributes: {},
  });
}

export function safeHtml(string) {
  return sanitizeHtml(string, {
    allowedTags: safeTags,
    allowedAttributes: safeAttributes,
  });
}
