export const fetchDashboardData = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };