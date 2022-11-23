export type CitiesType = {
    isLoading: boolean;
    error: string | null;
    cities: Array<CityType> | null;
    city: CityType;
};

// export type ResponseCitiesType = {
//     data: CitiesArray;
//     limit: number;
// };

// export type CitiesArray = {
//     [key: string]: CityType;
// };

export type CityType = {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    time_zone: number;
    english: string;
    country: string;
    iso: string;
    full_english: string;
    full_name: string;
};
