import { GetServerSidePropsContext } from "next"
import axios from "axios";
import getConfig from "next/config";
import { ArticleType } from "@/types/article";

const { publicRuntimeConfig: config } = getConfig();

const SiteMap = () => {}

function generateSiteMap(articles: ArticleType[]) {
    return `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       ${articles
         .map(({ title }) => {
           return `
         <url>
             <loc>${`${process?.env?.NEXTAUTH_URL}/${encodeURIComponent(title)}`}</loc>
         </url>
       `;
         })
         .join('')}
     </urlset>
   `;
  }

export const getServerSideProps = async ({ res }: GetServerSidePropsContext) => {
    const response = await axios.get(`${config?.BASE_URL}/${config?.ARTICLE}`);
    const articles = response?.data?.payload?.articles || [];
    const sitemap = generateSiteMap(articles);
    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    }
}

export default SiteMap;