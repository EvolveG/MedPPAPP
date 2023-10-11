const API_BASE_URL = 'https://zeus-api-63pe.onrender.com/api'; // Replace with your backend API base URL

const API_BASE_PDF_GET_URL = 'https://zeus-api-63pe.onrender.com/uploads/';

const API_INVOICE_PDF_GET_URL = 'https://zeus-api-63pe.onrender.com/api/get/customerinvoice/';

// Function to handle API requests
const apiRequest = async (url, method, data, headers = {}) => {
    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        throw new Error('Error making API request:', error.message);
    }
};



const api = {
  // Define your API endpoints here
  // Login user endpoint
    loginUser: async (email, password) => {
        const url = `${API_BASE_URL}/SignIn`; // Replace with your actual login endpoint
        const data = { email, password };
        try {
            const response = await apiRequest(url, 'POST', data);
            const token = response.token; // Assuming the response contains a 'token' field

            // Assuming the API returns a token upon successful login
            if (token) {
                return token;
            } else {
                throw new Error('Invalid response from login API');
            }
        } catch (error) {
            throw new Error('Error logging in:', error.message);
        }
    },

    fetchMessagesApi: async (userId, userIdAG, token) => {
        const url = `${API_BASE_URL}/chat/getmessages?senderId=${userId}&receiverId=${userIdAG}`;
        try {
          const headers = {
            token: token,
          };
    
          const response = await apiRequest(url, 'GET', undefined, headers);
          //console.log(response)
          if (response) {
            return response;
          } else {
            throw new Error('Invalid response from API');
          }
        } catch (error) {
          throw new Error('Error fetching messages:', error.message);
        }
    },
  
    sendMessagesToApi: async (message, token) => {
        const url = `${API_BASE_URL}/chat/message`;
        try {
            const headers = {
                token: token,
            };

            const data = message;

            const response = await apiRequest(url, 'POST', data, headers);

            if (response) {
                return response;
            } else {
                throw new Error('Invalid response from API');
            }
        } catch (error) {
            throw new Error(`Error sending messages: ${error.message}`);
        }
    },

    deleteMessagesToApi: async (messageId, token) => {
        const url = `${API_BASE_URL}/chat/message/${messageId}`;
        try {
            const headers = {
                token: token,
            };

            const response = await apiRequest(url, 'DELETE', undefined, headers);

            if (response) {
                return response;
            } else {
                throw new Error('Invalid response from API');
            }
        } catch (error) {
            throw new Error(`Error sending messages: ${error.message}`);
        }
    },

    fetchTemplates: async (token) => {
        //const url = `${API_BASE_URL}/get/active/`; // Replace with your actual endpoint
        const url = `${API_BASE_URL}/get/templates`; 
        try {
            const headers = {
                token: token,
            };

            const response = await apiRequest(url, 'GET', undefined, headers);

            if (response) {
                return response;
            } else {
                throw new Error('Invalid response from API');
            }
        } catch (error) {
            throw new Error('Error fetching templates:', error.message);
        }
    },

    getFullPdfUrl : (fileName) => {
        return `${API_BASE_PDF_GET_URL}${fileName}`;
    },

    // Import any necessary modules

    uploadAuthorizationsRequests : async (formData, token) => {
        const url = `${API_BASE_URL}/request/createnew`;
    
        try {
            const headers = {
                token: token,
            };
           

           // console.log(formData)
    
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: formData,
              });

              console.log(response)
          
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
          
              const responseData = await response.json();
          
              if (responseData && responseData.success) {
                return responseData; // You might want to return specific data from the response if available
              } else {
                throw new Error('Invalid response from API');
              }
            } catch (error) {
              throw new Error('Error uploading authorization requests: ' + error.message);
            }
    },
    
    
    
    

    getInvoicePdfUrl: async (item) => {
        return `${API_INVOICE_PDF_GET_URL}${item}`;
    },
    
  


  // ... Add other API endpoints as needed
};



export default api;
