'use client';

/**
 * This route mounts the Sanity Studio at /studio.
 * Visit /studio in dev or production to manage content.
 */

import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';

export const dynamic = 'force-static';
export { metadata, viewport } from 'next-sanity/studio';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
