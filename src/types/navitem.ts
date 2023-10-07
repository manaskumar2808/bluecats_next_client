import { AccessEnum } from "@/constants/access";

export type NavItemType = {
    id: string;
    title: string;
    path: string;
    showFor: AccessEnum[],
}