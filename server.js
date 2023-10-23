const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());

// Define the route
app.get('/api/user-repos/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const accessToken = '';

    const repoResponse = await axios.get(`https://api.github.com/users/${username}/repos`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const repositories = repoResponse.data;

    const repoDetailsPromises = repositories.map(async (repo) => {
      const languagesResponse = await axios.get(repo.languages_url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const languages = Object.keys(languagesResponse.data);
      return {
        name: repo.name,
        languages,
      };
    });

    const repoDetails = await Promise.all(repoDetailsPromises);
    res.json(repoDetails);  // Send the response as JSON
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).send('Internal Server Error');  // Send a 500 status code for internal server error
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
