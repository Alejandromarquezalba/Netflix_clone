export enum ProfileType {
    ADULT = "ADULT",
    CHILD = "CHILD",
    }

export enum AgeRating {
    ALL = "ALL",
    KIDS = "KIDS",
    TEEN = "TEEN",
    MATURE = "MATURE",
}

export interface Profile {
    id: string;
    name: string;
    userId: string;
    pin?: string | null;
    ageRestriction: AgeRating;
    autoPlay: boolean;
    avatarUrl?: string | null;
    createdAt: string; 
    hasPin: boolean;
    preferredLanguage?: string | null;
    type: ProfileType;
    updatedAt: string;

    color?: string;
}
