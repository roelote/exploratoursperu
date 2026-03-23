import type { APIRoute } from 'astro';

const site = 'https://exploratoursperu.com';

// ── Páginas generales ───────────────────────────────────────────────
const generalPages = [
  { es: '/',          en: '/en/' },
  { es: '/contacto/', en: '/en/contact-us/' },
  { es: '/blog/',     en: '/en/blog/' },
];

// ── Tours: pares ES → EN ────────────────────────────────────────────
const tourPages = [
  {
    es: '/tour/',
    en: '/en/tour/',
  },

  // Valle Sagrado
  { es: '/tour/valle-sagrado-full-day/',    en: '/en/tour/sacred-valley-full-day/' },
  { es: '/tour/valle-sagrado-privado/',     en: '/en/tour/private-sacred-valley/' },

  // Lima
  { es: '/tour/city-tour-lima/',                    en: '/en/tour/city-tour-lima/' },
  { es: '/tour/city-tour-lima-parque-de-las-aguas/', en: '/en/tour/city-tour-lima-water-park/' },

  // Paracas / Ica / Ballestas
  { es: '/tour/paracas-ica-full-day/', en: '/en/tour/paracas-ica-full-day/' },
  { es: '/tour/islas-ballestas/',      en: '/en/tour/islas-ballestas/' },

  // Cusco
  { es: '/tour/city-tour-cusco/', en: '/en/tour/cusco-city-tour/' },

  // Maras / Moray
  { es: '/tour/maras-moray-salineras/',  en: '/en/tour/maras-moray-salt-mines/' },
  { es: '/tour/cuatrimotos-maras-moray/', en: '/en/tour/atv-maras-moray/' },

  // Montañas de colores
  { es: '/tour/cordillera-de-palcoyo/',      en: '/en/tour/rainbow-mountain-of-palcoyo/' },
  { es: '/tour/montana-de-colores-full-day/', en: '/en/tour/rainbow-mountain-full-day/' },

  // Ausangate / Humantay
  { es: '/tour/lagunas-de-ausangate/',     en: '/en/tour/ausangate-lagoons/' },
  { es: '/tour/laguna-humantay-full-day/', en: '/en/tour/humantay-lake-full-day/' },

  // Puente inca
  { es: '/tour/ultimo-puente-inca-qeswachaka/', en: '/en/tour/last-inca-bridge-qeswachaka/' },

  // Machu Picchu
  { es: '/tour/machu-picchu-full-day/',  en: '/en/tour/machu-picchu-full-day/' },
  { es: '/tour/machu-picchu-privado/',   en: '/en/tour/private-machu-picchu/' },
  { es: '/tour/machu-picchu-2-dias-1-noche/', en: '/en/tour/machu-picchu-tour-2-days-1-night/' },
  { es: '/tour/cusco-machu-picchu-3-dias/', en: '/en/tour/cusco-machu-picchu-3-days/' },

  // Camino Inca / Salkantay
  { es: '/tour/camino-inca-corto-machu-picchu-2-dias-1-noche/', en: '/en/tour/inca-trail-short-route-machu-picchu-2-days-1-night/' },
  { es: '/tour/trekking-salkantay-machu-picchu-4-dias/',        en: '/en/tour/salkantay-trek-machu-picchu-4-days/' },
  { es: '/tour/trekking-salkantay-a-machu-picchu-5-dias-4-dias/', en: '/en/tour/salkantay-trek-to-machu-picchu-5-days-4-nights/' },
];

const allPages = [...generalPages, ...tourPages];

export const GET: APIRoute = () => {
  const urls = allPages.map(({ es, en }) => `
  <url>
    <loc>${site}${es}</loc>
    <xhtml:link rel="alternate" hreflang="es" href="${site}${es}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${site}${en}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${site}${es}"/>
  </url>
  <url>
    <loc>${site}${en}</loc>
    <xhtml:link rel="alternate" hreflang="es" href="${site}${es}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${site}${en}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${site}${es}"/>
  </url>`).join('');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`,
    {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600',
      },
    }
  );
};
