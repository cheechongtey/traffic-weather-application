export type ReportData = {
  recentSearch: RecentSearchData[];
  topSearch: TopSearchData[];
  mostSearched: MostSearchData;
};

export type RecentSearchData = {
  id: number;
  uuid: string;
  datetime: string;
  location_name: string;
  location_coordinates: string;
  createdAt: string;
};

export type TopSearchData = {
  search_date: string;
  location_coordinates: string;
  location_name: string;
  search_count: number;
};

export type MostSearchData = {
  datetime: string;
  search_count: number;
};
