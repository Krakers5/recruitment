export interface SWStarship {
    id: string;
    properties: SWStarshipProperties;
}

export interface SWStarshipProperties {
    model: string;
    starship_class: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    crew: string;
    passengers: string;
    max_atmosphering_speed: string;
    hyperdrive_rating: string;
    MGLT: string;
    cargo_capacity: string;
    consumables: string;
    pilots: string[];
    create: string;
    edited: string;
    name: string;
    url: string;
}