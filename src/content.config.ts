import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        // A prompt for a coding agent. The page gets "Copy for your agent", which
        // copies this prompt and then the Markdown of the page.
        agent: z.string().optional(),
      }),
    }),
  }),
};
