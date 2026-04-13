'use client';

/**
 * Slice Machine preview must use the client <SliceSimulator sliceZone={...} /> API.
 * The Server Component pattern (<SliceSimulator>{children}</SliceSimulator> + getSlices)
 * hydrates incorrectly because the adapter reads `window` to set `hasSlices`, so the
 * server renders an empty wrapper while the client renders `#root` + SliceZone.
 *
 * @see https://github.com/prismicio/slice-machine (adapter-next SliceSimulator)
 */
import { SliceSimulator } from '@slicemachine/adapter-next/simulator';
import { SliceZone } from '@prismicio/react';

import { components } from '@/slices';

export default function SliceSimulatorPage() {
  return (
    <SliceSimulator
      sliceZone={({ slices }) => (
        <SliceZone slices={slices} components={components} />
      )}
    />
  );
}
