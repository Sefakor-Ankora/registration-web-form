import global from '../../data/global.json';
/**
 * Sets Document Page Title
 * @param title: New Page Title
 */

export function setPageTitle(title = null) {
  if (title === null || title === undefined) {
    document.title = `${global.brand.name}`;
  } else {
    document.title = `${title} | ${global.brand.name}`;
  }
}
