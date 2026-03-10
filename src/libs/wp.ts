const domain = import.meta.env.WP_DOMAIN;

const apiTour = `${domain}wp-json/wp/v2`;
const apiPage = `${domain}wp-json/wp/v2`;
const apiBlog = `${domain}wp-json/wp/v2`;
const apiPosts  = `${domain}wp-json/wp/v2`;
// const apiPostsCategoy  = `${domain}wp-json/wp/v2/tour_category`;
const apiHeader = `${domain}wp-json/theme/v1`;
const apiNav  = `${domain}wp-json/wp/v2`;
const idLogo  = `${domain}wp-json/custom/v1`;
const apiLogo = `${domain}wp-json/wp/v2`;
const sidebar = `${domain}wp-json/custom/v1`;

// export const getCategoryFullDays = async () => {
//   try {
//     const response = await fetch(`${apiPostsCategoy}/7`);

//     if (!response.ok) throw new Error(`Error al obtener datos de la Pagina`);

//     const data = await response.json();

//     return data ?? null;

//   } catch (error) {
//     return null;
//   }
// };

export const getInfoHeader = async () => {
  try {
    const response = await fetch(`${apiHeader}/settings`);

    if (!response.ok) throw new Error(`Error al obtener datos de la Pagina`);

    const data = await response.json();

    return data ?? null;

  } catch (error) {
    return null;
  }
};

export const getInfoPage = async () => {
  try {
    const response = await fetch(`${apiPage}/pages`);

    if (!response.ok) throw new Error(`Error al obtener datos de la Pagina`);

    const data = await response.json();

    return data ?? null;

  } catch (error) {
    return null;
  }
};

export const getInfoBlog = async (lang: string = 'es') => {
  try {
    const langParam = lang === 'en' ? '&lang=en' : '';
    const response = await fetch(`${apiBlog}/pages?slug=blog${langParam}`);

    if (!response.ok) throw new Error(`Error al obtener datos del Blog`);

    const [data] = await response.json();

    return data ?? null;

  } catch (error) {
    return null;
  }
};


export const getPosts = async (lang: string = 'es') => {
  try {
    const langParam = lang === 'en' ? '&lang=en' : '';
    const response = await fetch(`${apiPosts}/posts?per_page=100${langParam}`);

    if (!response.ok) throw new Error("Error al obtener datos del Blog")

    const data = await response.json();

    return data ?? []; 
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getInfoPageHome = async (lang: string = 'es') => {
  try {
    const langParam = lang === 'en' ? '&lang=en' : '';
    const response = await fetch(`${apiPage}/pages?slug=home${langParam}`);

    if (!response.ok) throw new Error(`Error al obtener datos de la Pagina de Inicio)`);

    const [data] = await response.json();

    return data ?? null;

  } catch (error) {
    return null;
  }
};

export const getSidebarTour = async (lang: string = 'es') => {
  const endpoint = lang === 'en' ? 'sidebar-tour-en' : 'sidebar-tour';
  const response = await fetch(`${sidebar}/${endpoint}`);

  if (!response.ok) {
    throw new Error("No se pudo conectar a la API de Sidebar - Widget");
  }

  const data = await response.json();

  return data;
};

export const getSidebarBlog = async (lang: string = 'es') => {
  const endpoint = lang === 'en' ? 'sidebar-blog-en' : 'sidebar-blog';
  const response = await fetch(`${sidebar}/${endpoint}`);

  if (!response.ok) {
    throw new Error("No se pudo conectar a la API de Sidebar - Widget");
  }

  const data = await response.json();

  return data;
};

export const getTourInfo = async (lang: string = 'es') => {
  const langParam = lang === 'en' ? '&lang=en' : '';
  const response = await fetch(`${apiTour}/tour?per_page=100${langParam}`);

  if (!response.ok) {
    throw new Error("No se pudo conectar a la API de los tours");
  }

  return await response.json();
};


export const getHeaderInfo = async (lang: string = 'es') => {
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

    const logoURL = data.guid.rendered;

    return logoURL;
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
      url : data.guid.rendered,
      title: data.title.rendered
    }
  } catch (error) {
    return null;
  }
};

export const getInfoByTours = async (url: any, lang: string = 'es') => {
  const langParam = lang === 'en' ? '&lang=en' : '';
  const response = await fetch(`${apiTour}/tour?slug=${url}${langParam}`);

  if (!response.ok) throw new Error(`Error al obtener datos del tour (${url})`);

  const data = await response.json();

  return data;
};
