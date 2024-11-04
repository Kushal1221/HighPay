const data = async () => {
    try {
        const response = await fetch("http://192.168.1.5:8082/api/positions", {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + btoa('admin:admin') // Replace with actual username and password
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

data(); // Call the function to execute the fetch
