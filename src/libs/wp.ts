const domain = import.meta.env.WP_DOMAIN;

/**
 * Normaliza URLs de WordPress en una estructura de datos de cualquier profundidad.
 * WordPress almacena las URLs con el dominio de instalación (puede ser local:
 * http://web.exploratours/ etc.). Esta función reemplaza ese origen por el de
 * WP_DOMAIN, garantizando que todas las imágenes funcionen en producción.
 *
 * Solo reemplaza URLs que contengan /wp-content/ o /wp-includes/ para ser preciso.
 */
const _wpOrigin = domain.endsWith("/") ? domain.slice(0, -1) : domain;

const normalizeUrls = <T>(data: T): T => {
  if (!data) return data;
  const str = JSON.stringify(data);
  const fixed = str.replace(/"(https?:\/\/[^"]+\/wp-(?:content|includes)\/[^"]*)"/g, (_match, url: string) => '"' + url.replace(/^https?:\/\/[^/]+/, _wpOrigin) + '"');
  return JSON.parse(fixed) as T;
};

/** Corrige el origen de una URL individual de WordPress */
export const fixWpUrl = (url: string | null | undefined): string => {
  if (!url) return "";
  return url.replace(/^https?:\/\/[^/]+/, _wpOrigin);
};

const apiTour = `${domain}wp-json/wp/v2`;
const apiPage = `${domain}wp-json/wp/v2`;
const apiBlog = `${domain}wp-json/wp/v2`;
const apiContacto = `${domain}wp-json/wp/v2`;
const apiPosts = `${domain}wp-json/wp/v2`;
const apiHeader = `${domain}wp-json/theme/v1`;
const apiFooter = `${domain}wp-json/theme/v1`;
const apiNav = `${domain}wp-json/wp/v2`;
const idLogo = `${domain}wp-json/custom/v1`;
const apiLogo = `${domain}wp-json/wp/v2`;
const sidebar = `${domain}wp-json/custom/v1`;
const apiCategory = `${domain}wp-json/wp/v2`;

export const getInfoContacto = async () => {
  try {
    const response = await fetch(`${apiContacto}/pages?slug=contacto`);

    if (!response.ok) throw new Error(`Error al obtener datos del Blog`);

    const [data] = await response.json();

    return normalizeUrls(data ?? null);
  } catch (error) {
    return null;
  }
};

export const getInfoContactoEn = async () => {
  try {
    const response = await fetch(`${apiContacto}/pages?slug=contact-us&lang=en`);

    if (!response.ok) throw new Error(`Error al obtener datos del Blog`);

    const [data] = await response.json();

    return normalizeUrls(data ?? null);
  } catch (error) {
    return null;
  }
};

export const getInfoCategory = async (id: number) => {
  try {
    const response = await fetch(`${apiCategory}/peru/${id}`);

    if (!response.ok) throw new Error(`Error al obtener datos de la Pagina`);

    const data = await response.json();

    return data ?? null;
  } catch (error) {
    return null;
  }
};

export async function getImagesBatch(ids: number[], lang: string = "es") {
  if (!ids?.length) return [];

  const langParam = lang === "en" ? "&lang=en" : "";

  const res = await fetch(`${domain}wp-json/wp/v2/media?include=${ids.join(",")}&per_page=${ids.length}${langParam}`);

  if (!res.ok) return [];

  const data = await res.json();

  const mapped = data.map((img: any) => ({
    id: img.id,
    url: fixWpUrl(img.source_url),
    title: img.title?.rendered || "Gallery image",
  }));

  const ordered = ids.map((id) => mapped.find((img:any) => img.id === Number(id))).filter(Boolean);

  return ordered;
}

export const getInfoHeader = async (lang: string = "es") => {
  try {
    const langParam = lang === "en" ? "?lang=en" : "";

    const response = await fetch(`${apiHeader}/settings${langParam}`);

    if (!response.ok) throw new Error(`Error al obtener datos de la Pagina`);

    const data = await response.json();

    // return data ?? []

    return normalizeUrls(data ?? []);
  } catch (error) {
    return null;
  }
};

export const getInfoFooter = async (lang: string = "es") => {
  try {
    const langParam = lang === "en" ? "?lang=en" : "";

    const response = await fetch(`${apiFooter}/settings${langParam}`);

    if (!response.ok) throw new Error(`Error al obtener datos de la Pagina`);

    const data = await response.json();

    return normalizeUrls(data ?? []);
  } catch (error) {
    return null;
  }
};

export const getInfoPage = async (lang: string = "es") => {
  try {
    const langParam = lang === "en" ? "&lang=en" : "";

    const response = await fetch(`${apiPage}/pages?per_page=100${langParam}`);

    if (!response.ok) throw new Error(`Error al obtener datos de la Pagina`);

    const data = await response.json();

    return data ?? []
  } catch (error) {
    return null;
  }
};

export const getInfoBlog = async (lang: string = "es") => {
  try {
    const langParam = lang === "en" ? "&lang=en" : "";

    const response = await fetch(`${apiBlog}/pages?slug=blog${langParam}`);

    if (!response.ok) throw new Error(`Error al obtener datos del Blog`);

    const [data] = await response.json();

    return normalizeUrls(data ?? null);
  } catch (error) {
    return null;
  }
};

export const getPosts = async (lang: string = "es") => {
  try {
    const langParam = lang === "en" ? "&lang=en" : "";
    const response = await fetch(`${apiPosts}/posts?per_page=100${langParam}`);

    if (!response.ok) throw new Error("Error al obtener datos del Blog");

    const data = await response.json();

    return normalizeUrls(data ?? []);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getInfoPageHome = async (lang: string = "es") => {
  try {
    const langParam = lang === "en" ? "&lang=en" : "";
    const response = await fetch(`${apiPage}/pages?slug=home${langParam}`);

    if (!response.ok) throw new Error(`Error al obtener datos de la Pagina de Inicio)`);

    const [data] = await response.json();

    return normalizeUrls(data ?? null);
  } catch (error) {
    return null;
  }
};

export const getSidebarTour = async (lang: string = "es") => {
  const endpoint = lang === "en" ? "sidebar-tour-en" : "sidebar-tour";
  const response = await fetch(`${sidebar}/${endpoint}`);

  if (!response.ok) {
    throw new Error("No se pudo conectar a la API de Sidebar - Widget");
  }

  const data = await response.json();

  return data;
};

export const getSidebarBlog = async (lang: string = "es") => {
  const endpoint = lang === "en" ? "sidebar-blog-en" : "sidebar-blog";
  const response = await fetch(`${sidebar}/${endpoint}`);

  if (!response.ok) {
    throw new Error("No se pudo conectar a la API de Sidebar - Widget");
  }

  const data = await response.json();

  return data;
};

export const getTourInfo = async (lang: string = "es") => {
  const langParam = lang === "en" ? "&lang=en" : "";
  const response = await fetch(`${apiTour}/tour?per_page=100${langParam}`);

  if (!response.ok) {
    throw new Error("No se pudo conectar a la API de los tours");
  }

  return normalizeUrls(await response.json());
};

export const getHeaderInfo = async (lang: string = "es") => {
  try {
    const response = await fetch(`${apiNav}/top-nav/?lang=${lang}`);

    if (!response.ok) {
      throw new Error("No se pudo conectar a la API");
    }

    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      return data;
    }

    return null;
  } catch (error) {
    return null;
  }
};

export const getLogoInfo = async () => {
  try {
    const response = await fetch(`${idLogo}/logo`);

    if (!response.ok) {
      throw new Error("No se pudo conectar a la API para obtener el logo");
    }

    const data = await response.json();
    const logo = Number(data);
    return await getLogo(logo);
  } catch (error) {
    return null;
  }
};

export const getLogo = async (logo: number) => {
  try {
    const response = await fetch(`${apiLogo}/media/${logo}`);

    if (!response.ok) {
      throw new Error("No se pudo conectar a la API para obtener el logo");
    }

    const data = await response.json();

    return fixWpUrl(data.guid.rendered);
  } catch (error) {
    return null;
  }
};

export const getImages = async (logo: number) => {
  try {
    const response = await fetch(`${apiLogo}/media/${logo}`);

    if (!response.ok) {
      throw new Error("No se pudo conectar a la API para obtener el logo");
    }

    const data = await response.json();
    return {
      url: fixWpUrl(data.guid.rendered),
      title: data.title.rendered,
    };
  } catch (error) {
    return null;
  }
};

export const getInfoByTours = async (url: any, lang: string = "es") => {
  const langParam = lang === "en" ? "&lang=en" : "";
  const response = await fetch(`${apiTour}/tour?slug=${url}${langParam}`);

  if (!response.ok) throw new Error(`Error al obtener datos del tour (${url})`);

  return normalizeUrls(await response.json());
};

export const getInfoPageBySlug = async (url: any, lang: string = "es") => {

  const langParam = lang === "en" ? "&lang=en" : "";
  const response = await fetch(`${apiTour}/pages?slug=${url}${langParam}`);

  if (!response.ok) throw new Error(`Error al obtener datos del tour (${url})`);

  return normalizeUrls(await response.json());
  
} 
