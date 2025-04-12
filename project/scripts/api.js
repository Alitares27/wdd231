export async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('The network response was not successful');
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
