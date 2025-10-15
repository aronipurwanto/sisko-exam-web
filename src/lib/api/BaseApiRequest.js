export const apiRequest = async (url, options = {}) => {
    try {
        const response = await fetch(url, {
            headers: {'Accept': 'application/json', ...options.headers},
            ...options,
        });
        const json = await response.json();

        if (!response.ok) {
            throw {
                status: json.status ?? response.status,
                message: json.message ?? "Unknown error",
                error: json.error ?? null,
                timestamp: json.timestamp ?? null
            };
        }

        if (json && 'data' in json) {
            return json.data;
        }

        return json;
    } catch (error) {
        console.error('error in apiRequest: ', error);
        throw error;
    }
}