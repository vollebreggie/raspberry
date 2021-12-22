import { PComponent } from "./Component";

export class Project {
    id: number;
    title: string;
    description: string;
    image: string;
    place: string;
    components: PComponent[];
}