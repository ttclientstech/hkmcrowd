import { BE_API_URL } from "../constants/homePage";

export const fetchAllCampaigners = async () => {
    try {
      const response = await fetch(`${BE_API_URL}/showcampaigns`);
      const data = await response.json();
      return data?.campaignDetails || []; ;
    } catch (error) {
      return []
    }
  };

export const fetchAllContributers = async () => {
    try {
        const response = await fetch(`${BE_API_URL}/show`);
        const data_all_donors = await response.json();
        return data_all_donors;
    } catch (error) {
        return []
    }
};

export const fetchRecentDonors = async () => {
    try {
        const response = await fetch(`${BE_API_URL}/recentdonors`);
        const data_all_donors = await response.json();
        return data_all_donors;
    } catch (error) {
        return []
    }
};

export const fetchLeaderboard = async () => {
    try {

        const response = await fetch(`${BE_API_URL}/api/get_leaderboard`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data; // Returns the array of top 5 donors

    } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
        return []; // Return empty array so the UI doesn't crash
    }
};

export const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};
