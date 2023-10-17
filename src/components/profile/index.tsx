import { getProfileImage } from "@/utility/profile";
import { UserDoc } from "../../../types/next-auth";
import { Container, Image } from '@/styles/components/profile';
import { ImageLoaderProps } from "next/image";

interface ProfileProps {
    user: UserDoc;
    radius: number;
    border?: boolean;
};

const Profile = ({ user, radius = 30, border = false }: ProfileProps) => {
    return (
        <Container radius={radius} border={border}>
            <Image 
                loader={(img: ImageLoaderProps) => img?.src} 
                src={getProfileImage(user?.rand)} 
                alt={user?.userName} 
                fill 
            />
        </Container>
    );
}

export default Profile;