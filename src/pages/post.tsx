import Editor from "@/components/editor";
import { AppDispatch } from "@/store";
import { postArticle } from "@/store/slices/article";
import { Container } from "@/styles/pages/post";
import { GetServerSidePropsContext } from "next";
import { useDispatch } from "react-redux";
import { RouteEnum } from "@/constants/route";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { UserDoc } from "../../types/next-auth";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { NEXT_SEO_DEFAULT } from "../../next-seo-config";
import axios from "axios";
import { publicRuntimeConfig as config } from '../../next.config';
import headerConfig from "@/utility/request";
import { ArticleType } from "@/types/article";

interface PostPageProps {
    user: UserDoc;
    token: string;
    article?: ArticleType;
};

const PostPage = ({ user, article, token }: PostPageProps) => {
    const router = useRouter();
    const dispatch: any = useDispatch<AppDispatch>();
    
    const onPost = async (formData: FormData) => {
        try {
            await dispatch(postArticle({ formData, token }));
            router?.push(RouteEnum.HOME);
        } catch(err) {
            throw err;
        }
    }

    const onSave = async (formData: FormData) => {
        try {
            const response = await axios.post(`${config?.BASE_URL}/${config?.DRAFT}`, formData, headerConfig(token));
            return response?.data;
        } catch(err) {
            throw err;
        }
    }

    const onDelete = async (id: string, redirect: boolean = true) => {
        try {
            await axios.delete(`${config?.BASE_URL}/${config?.DRAFT}/${id}`, headerConfig(token));
            if(redirect)
                router?.push(RouteEnum.PROFILE);
        } catch(err) {
            throw err;
        }
    }

    return (
        <Container>
            <NextSeo 
                {...NEXT_SEO_DEFAULT}
            />
            <Editor article={article} user={user} onButtonClick={onPost} onDraftSave={onSave} onDraftDelete={onDelete} />
        </Container>
    );
} 

export const getServerSideProps = async ({ req, res, params, query }: GetServerSidePropsContext) => {
    const session = await getServerSession(req, res, authOptions);
    if(!session?.jwt || !session?.user) {
        return {
            redirect: {
                permanent: true,
                destination: '/auth?mode=Login',
            },
            props: {
                isAuth: false,
            },
        }
    }

    try {
        const token = session?.jwt?.token as string;
        const id = query?.['id'];
    
        console.log('id', id);
    
        let response;
        if(id)
            response = await axios.get(`${config?.BASE_URL}/${config?.DRAFT}/${id}`, headerConfig(token));
    
        console.log('drafts', response?.data);
    
        const article = response?.data?.payload?.draft || null;
    
        if(id && !article) {
            throw new Error();
        }
    
        return {
            props: {
                isAuth: true,
                user: session?.user,
                token: session?.jwt?.token,
                article,
            },
        }
    } catch(err) {
        console.log('post page error', err);
        return {
            redirect: {
                permanent: true,
                destination: '/post',
            },
            props: {
                isAuth: true,
            },
        }
    }
}

export default PostPage;