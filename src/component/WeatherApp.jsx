import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    Grid,
    Paper,
    TextField,
    Typography,
    Alert,
} from '@mui/material';

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchWeather = async () => {
        if (!city) return;
        setLoading(true);
        setWeather(null);

        try {
            const apiKey = '3fbfeeda650449feba2201008251605';
            const response = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
            );

            if (!response.ok) throw new Error('Failed to fetch weather data');

            const data = await response.json();

            const parsedWeather = {
                temperature: `${data.current.temp_c}°C`,
                humidity: `${data.current.humidity}%`,
                condition: data.current.condition.text,
                windSpeed: `${data.current.wind_kph} kph`,
            };

            setWeather(parsedWeather);
        } catch (error) {
            alert('Failed to fetch weather data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ backgroundColor: '#eef8ff', minHeight: '100vh', py: 5 }}>
            <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
                <Box display="flex" justifyContent="center" gap={2} mb={2}>
                    <TextField
                        label="Enter city name"
                        variant="outlined"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        fullWidth
                    />
                    <Button
                        variant="contained"
                        color="success"
                        onClick={fetchWeather}
                        sx={{ whiteSpace: 'nowrap' }}
                    >
                        Search
                    </Button>
                </Box>

                {loading && (
                    <p>
                        Loading data...
                    </p>
                )}

                {weather && (
                    <Box
                        mt={3}
                        display="flex"
                        justifyContent="center"
                        gap={2}
                        className="weather-cards"
                        flexWrap="nowrap"
                    >
                        <Paper className='weather-card' elevation={3} sx={{ p: 2, minWidth: 120, textAlign: 'center' }}>
                            <Typography variant="subtitle1" fontWeight="bold">
                                Temperature
                            </Typography>
                            <Typography>{weather.temperature}</Typography>
                        </Paper>
                        <Paper className='weather-card' elevation={3} sx={{ p: 2, minWidth: 120, textAlign: 'center' }}>
                            <Typography variant="subtitle1" fontWeight="bold">
                                Humidity
                            </Typography>
                            <Typography>{weather.humidity}</Typography>
                        </Paper>
                        <Paper className='weather-card' elevation={3} sx={{ p: 2, minWidth: 120, textAlign: 'center' }}>
                            <Typography variant="subtitle1" fontWeight="bold">
                                Condition
                            </Typography>
                            <Typography>{weather.condition}</Typography>
                        </Paper>
                        <Paper className='weather-card' elevation={3} sx={{ p: 2, minWidth: 120, textAlign: 'center' }}>
                            <Typography variant="subtitle1" fontWeight="bold">
                                Wind Speed
                            </Typography>
                            <Typography>{weather.windSpeed}</Typography>
                        </Paper>
                    </Box>
                )}

            </Container>
        </Box>
    );
};

export default WeatherApp;
