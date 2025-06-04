// src/components/StatsCard.jsx
import React from 'react';
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import { TrendingUp, TrendingDown, TrendingFlat } from '@mui/icons-material';

export default function StatsCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  trendValue,
  color = 'primary' 
}) {
  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp color="success" />;
    if (trend === 'down') return <TrendingDown color="error" />;
    return <TrendingFlat color="disabled" />;
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'success.main';
    if (trend === 'down') return 'error.main';
    return 'text.secondary';
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          {icon && (
            <Avatar sx={{ bgcolor: `${color}.main`, width: 48, height: 48 }}>
              {icon}
            </Avatar>
          )}
        </Box>
        
        <Typography variant="h3" component="div" fontWeight="bold" mb={1}>
          {value}
        </Typography>
        
        {subtitle && (
          <Typography variant="body2" color="text.secondary" mb={1}>
            {subtitle}
          </Typography>
        )}
        
        {(trend || trendValue) && (
          <Box display="flex" alignItems="center" gap={0.5}>
            {trend && getTrendIcon()}
            {trendValue && (
              <Typography 
                variant="body2" 
                sx={{ color: getTrendColor(), fontWeight: 500 }}
              >
                {trendValue}
              </Typography>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
