import { AccessEnum } from "@/constants/access";
import { IconType } from "react-icons";

export type NavItemType = {
    id: string;
    title: string;
    path: string;
    Icon?: IconType;
    showFor: AccessEnum[],
}