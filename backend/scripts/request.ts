// URL of the server endpoint
const url: string = "http://localhost:3000/api/register";

// Define the interface for user data
interface UserData {
  name: string;
  email: string;
  password: string;
  role: string;
}

// Define the interface for the server's response
interface RegisterResponse {
  message: string;
  error?: string;  // Error message if the request fails
}

// User data to send in the request body
const userData: UserData = {
  name: "John Doe",
  email: "john.doe@example.com",
  password: "securepassword",
  role: "user",
};

// Function to send the request
const registerUser = async (): Promise<void> => {
  try {
    // Make a POST request with the user data
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify JSON format
      },
      body: JSON.stringify(userData), // Convert userData to JSON
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse and log the response data
    const result: RegisterResponse = await response.json();
    if (result.error) {
      console.error("Error registering user:", result.error);
    } else {
      console.log("User registered successfully:", result);
    }
  } catch (error: unknown) {
    // Handle any errors
    if (error instanceof Error) {
      console.error("Error registering user:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

// Call the function to register the user
registerUser();
