// Defines the structure for a social media link
export interface Social {
	name: "instagram" | "facebook" | "youtube";
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
	address?: string; // <-- NEW OPTIONAL PROPERTY
	locationUrl?: string;
	socials?: Social[];
}

// Defines the structure for the top-level objects in locations.json
export interface State {
	id: string;
	name: string;
	latitude: [number, number];
	region: string;
	country: string;
	isFriend?: boolean; // We'll keep this from the previous task
	multiChurchState?: boolean;
	churches?: Church[];
	family?: string;
	location?: string;
	img?: string;
	locationUrl?: string;
	socials?: Social[];
	address?: string; // <-- NEW: Also add here for single-church states
}

// Defines the structure for a search result
export interface SearchResult {
	state: State;
	church: Church;
	isRegion: boolean;
}
