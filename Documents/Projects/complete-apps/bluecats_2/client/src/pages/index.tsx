import { Container, Error, FallbackContainer } from "@/styles/pages";
import { ArticleType } from "@/types/article";
import { GetServerSidePropsContext, NextPage } from "next";
import { store, wrapper } from '@/store';
import { fetchArticles, updateArticles } from "@/store/slices/article";
import { useSelector } from "react-redux";
import { getArticleErrorSelector, getArticleLoaderSelector, getArticleSelector } from "@/store/selectors/article";
import ArticleListing from "@/components/listing/article";
import { Spinner } from "react-bootstrap";
import axios from "axios";

const sample_article: ArticleType = {
    id: 'sample_id',
    title: 'The Galactic Odyssey: Chronicles of the Cosmic Explorer',
    author: 'Aria Starlight',
    image: 'https://img.freepik.com/free-photo/ultra-detailed-nebula-abstract-wallpaper-4_1562-749.jpg',
    content: `In the far reaches of the universe, where the mysteries of the cosmos abound, there exists a solitary figure whose name is whispered in hushed tones among interstellar travelers. Aria Starlight, a name synonymous with adventure and discovery, has become a legend in her own right. Her exploits as a cosmic explorer are nothing short of extraordinary, and her chronicles are revered by all who seek to unravel the secrets of the universe.

    "The Galactic Odyssey: Chronicles of the Cosmic Explorer" is a magnum opus that transports readers to the very edges of known space and beyond. With a spaceship powered by cutting-edge technology and a boundless curiosity that defies the boundaries of human knowledge, Aria embarks on a journey that spans galaxies and millennia.
    
    From the breathtakingly beautiful rings of Saturn to the enigmatic dark matter realms at the heart of distant galaxies, Aria's adventures are nothing short of awe-inspiring. With each turn of the page, readers will delve deeper into the cosmos, encountering alien civilizations, navigating treacherous cosmic phenomena, and unlocking the secrets of ancient extraterrestrial artifacts.
    
    But it's not just the cosmic wonders that make Aria's chronicles so enthralling. It's her unwavering determination, her unwavering belief in the boundless potential of humanity, and her relentless pursuit of knowledge that truly captivate the reader. Through her eyes, we glimpse the infinite possibilities that await us among the stars.
    
    Join Aria Starlight on a journey that will challenge your perception of space, time, and the very nature of existence itself. "The Galactic Odyssey" is more than a book; it's a portal to the infinite, an invitation to explore the universe alongside a fearless explorer, and a testament to the power of human curiosity.
    
    Are you ready to embark on the cosmic adventure of a lifetime? Prepare to be dazzled, inspired, and forever changed by the indomitable spirit of Aria Starlight and "The Galactic Odyssey."`,
}

interface HomePageProps {
    articles: ArticleType[];
};

const HomePage = ({ articles: articleList }: HomePageProps) => {
    const articles = useSelector(getArticleSelector);
    const loader = useSelector(getArticleLoaderSelector);
    const error = useSelector(getArticleErrorSelector);

    if(loader) {
        return (
            <FallbackContainer>
                <Spinner style={{ height: 30, width: 30, color: '#1894ff' }} />
            </FallbackContainer>
        );
    }

    if(error) {
        return (
            <FallbackContainer>
                <Error>Cannot get articles at the moment.</Error>
            </FallbackContainer>
        );
    }

    return (
        <Container>
            <ArticleListing list={articleList} />
        </Container>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    // const res = await store.dispatch(fetchArticles());
    const res = await axios.get('http://localhost:2000/api/article');
    const articles = res?.data?.payload?.articles || [];
    store.dispatch(updateArticles({ articles }));

    return {
        props: {
            articles,
        },
    };
}

// HomePage.getInitialProps = wrapper.getInitialPageProps(({ dispatch }) => async () => {
//     // const response = await dispatch(fetchArticles());
//     const response = await axios.get('http://localhost:2000/api/article');

//     return {
//         payload: response?.data || {},
//     }
// });

export default HomePage;