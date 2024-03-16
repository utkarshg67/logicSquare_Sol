document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const cafeTableBody = document.querySelector('#cafeTable tbody');
    let cafes = [];
    let places = {};

    // Fetch cafes and places
    fetch('cafe_endpoint.json')
    .then(response => response.json())
    .then(data => {
        cafes = data.cafes;
        return fetch('places_endpoint.json');
    })
    .then(response => response.json())
    .then(data => {
        places = data.places.reduce((acc, place) => {
            acc[place.id] = place;
            return acc;
        }, {});
        displayCafes(cafes, places);
    })
    .catch(error => {
        // Handle error by trying an alternative link
        fetch('https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/cafes.json')
            .then(response => response.json())
            .then(data => {
                cafes = data.cafes;
                return fetch('https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/places.json');
            })
            .then(response => response.json())
            .then(data => {
                places = data.places.reduce((acc, place) => {
                    acc[place.id] = place;
                    return acc;
                }, {});
                displayCafes(cafes, places);
            })
            .catch(error => window.alert("Error Fetching data! Please check your internet connection."));
    });


    // Display cafes based on search input
    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const filteredCafes = cafes.filter(cafe => cafe.name.toLowerCase().includes(searchTerm));
        displayCafes(filteredCafes, places);
    });

    // Function to display cafes
    function displayCafes(cafes, places) {
        cafeTableBody.innerHTML = '';
        cafes.forEach(cafe => {
            const place = places[cafe.location_id];
            const row = `
                <tr>
                    <td>${cafe.name}</td>
                    <td>${place ? `${place.street_no}, ${place.locality}, ${place.postal_code}` : 'Location not found'}</td>
                </tr>
            `;
            cafeTableBody.innerHTML += row;
        });
    }
});
