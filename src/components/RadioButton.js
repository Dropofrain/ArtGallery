import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React from "react";
import { Prices } from "./prices";

const RadioButton = ({ handleFilters }) => {
  const handleChange = (e) => {
    console.log(e.target.value);
    handleFilters(e.target.value, "product_price");
  };
  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 3,
        bgcolor: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(6px)",
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      }}
    >
      <Typography
        variant="h6"
        fontWeight={700}
        color="secondary.main"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 3,
        }}
      >
        💸 Price Range
      </Typography>

      <RadioGroup>
        {Prices.map((price) => (
          <FormControlLabel
            key={price.id}
            value={price.id}
            control={
              <Radio
                sx={{
                  color: "grey.500",
                  "&.Mui-checked": {
                    color: "secondary.main",
                  },
                  transition: "all 0.3s ease",
                }}
              />
            }
            label={
              <Typography variant="body1" fontWeight={500}>
                {price.name}
              </Typography>
            }
            onChange={handleChange}
            sx={{
              px: 2,
              py: 1,
              borderRadius: 2,
              transition: "background 0.25s",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.04)",
              },
            }}
          />
        ))}
      </RadioGroup>
    </Box>
  );
};

export default RadioButton;
