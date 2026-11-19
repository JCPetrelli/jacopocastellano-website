import type { APIRoute, GetStaticPaths } from 'astro';
import { renderOgCard, type OgCard } from '../../utils/ogCard';
import { getOgCards } from '../../utils/ogRoutes';

export const getStaticPaths: GetStaticPaths = async () =>
  [...(await getOgCards())].map(([route, card]) => ({ params: { route }, props: { card } }));

export const GET: APIRoute = async ({ props }) =>
  new Response(new Uint8Array(await renderOgCard(props.card as OgCard)), {
    headers: { 'Content-Type': 'image/png' },
  });
