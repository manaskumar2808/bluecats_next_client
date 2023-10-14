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

interface PostPageProps {
    user: UserDoc;
};

const PostPage = ({ user }: PostPageProps) => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    
    const onPost = async (payload: FormData) => {
        await dispatch(postArticle(payload));
        router?.push(RouteEnum.HOME);
    }

    return (
        <Container>
            <NextSeo 
                {...NEXT_SEO_DEFAULT}
            />
            <Editor user={user} onButtonClick={onPost} />
        </Container>
    );
} 

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const session = await getServerSession(context?.req, context?.res, authOptions);
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

    return {
        props: {
            isAuth: true,
            user: session?.user,
        },
    }
}

export default PostPage;