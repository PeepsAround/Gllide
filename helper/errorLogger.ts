export const logError = (error: any) => {
	if (error.response) {
		
		// The request was made and the server responded with a status code
		// that falls out of the range of 2xx
		console.error('Server responded with error status:', error.response.status);
		console.error('Response data:', error.response.data);
		
	} else if (error.request) {
		
		// The request was made but no response was received
		console.error('No response received from server');
		
	} else {
		
		// Something happened in setting up the request that triggered an Error
		console.error('Error setting up the request:', error.message);
		
	}
}