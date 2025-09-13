// Defines the structure for a social media link
export interface Social {
	name: "instagram" | "facebook";
	socialUrl: string;
}

// Defines the structure for a single church entity
export interface Church {
	id: string;
	name: string;
	family: string;
	location: string;
	img: string;
	latitude: [number, number];
	locationUrl?: string; // Optional property
	socials?: Social[]; // Optional array of Social objects
}

// Defines the structure for the top-level objects in states.json
export interface State {
	id: string;
	name: string;
	latitude: [number, number];
	multiChurchState?: boolean;
	churches?: Church[];
	family?: string;
	location?: string;
	img?: string;
	locationUrl?: string;
	socials?: Social[];
}
