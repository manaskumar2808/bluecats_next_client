import { AppConstants } from "@/constants";

export const NEXT_SEO_DEFAULT = {
    title: AppConstants.NAME,
    description: AppConstants.NAME,
    openGraph: {
      type: 'website',
      locale: 'en_IE',
      url: process?.env?.NEXTAUTH_URL,
      title: AppConstants.NAME,
      description: AppConstants.NAME,
      siteName: AppConstants.NAME,
    },
};