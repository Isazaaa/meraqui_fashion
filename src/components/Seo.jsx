import React from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_NAME, DEFAULT_IMAGE, absoluteUrl } from '../config/site';

/**
 * Per-route metadata. Relies on React 19 hoisting: <title>, <meta> and <link>
 * rendered anywhere in the tree are moved into <head>.
 *
 * `title` is the page name; " | Meraqui Fashion" is appended unless it is
 * already part of it. `children` can carry extra head content (e.g. JSON-LD).
 */
const Seo = ({ title, description, image, path, type = 'website', noindex = false, children }) => {
  const { pathname } = useLocation();
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const url = absoluteUrl(path ?? pathname);
  const imageUrl = absoluteUrl(image || DEFAULT_IMAGE);

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex ? <meta name="robots" content="noindex" /> : <link rel="canonical" href={url} />}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content="es_CO" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {children}
    </>
  );
};

export default Seo;
