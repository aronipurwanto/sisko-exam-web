const BASE_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

const handleResponse = async (response) => {
    let json;

    try {
        json = await response.json();
    } catch {
        json = null;
    }

    if (!response.ok) {
        throw {
            status: json?.status ?? response.status,
            message: json?.message ?? "Unknown error",
            error: json?.error ?? null,
            timestamp: json?.timestamp ?? null
        };
    }
    return json?.data ?? json;
}

export const http = async (url, options = {}) => {
    const config = {
        ...options,
        headers: {
            ...BASE_HEADERS,
            ...(options.headers || {})
        }
    };

    const response = await fetch(url, config);
    return await handleResponse(response);
}