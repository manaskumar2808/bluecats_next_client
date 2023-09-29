import Editor from "@/components/editor";
import { AppDispatch } from "@/store";
import { postArticle } from "@/store/slices/article";
import { Container } from "@/styles/pages/post";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { redirect } from 'next/navigation';
import { useDispatch } from "react-redux";

const PostPage: NextPage = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    
    const onPost = async (payload: FormData) => {
        await dispatch(postArticle(payload));
        const url = process.env.BASE_URL as string;
        redirect(url);
    }

    return (
        <Container>
            <Editor onButtonClick={onPost} />
        </Container>
    );
} 

export default PostPage;