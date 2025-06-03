import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { viewCategories } from "../API/categoryAPI";
import CategoryIcon from "@mui/icons-material/Category";

const Checkbox_category = ({ handleFilters }) => {
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);

  const handleChange = (e) => {
    const new_checked_categories = [...checked];
    const new_category = e.target.value;

    //check if new_category is already in checked_categories
    //mobile, laptop, household, beauty -> new_checked_categories
    //new_category -> laptop

    const index = new_checked_categories.findIndex(
      (category) => category === new_category
    );
    // if found return index, else return -1
    if (index === -1) {
      new_checked_categories.push(new_category);
    } else {
      new_checked_categories.splice(index, 1);
    }
    setChecked(new_checked_categories);
    console.log(new_checked_categories);
    handleFilters(new_checked_categories, "category");
  };

  useEffect(() => {
    viewCategories()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setCategories(data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box
      sx={{
        p: 3,
        mt: "20px !important",
        bgcolor: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(6px)",
        borderRadius: 3,
        border: "1px solid grey",
        borderColor: "divider",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 14px 34px rgba(0,0,0,0.12)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          mb: 3,
        }}
      >
        <Box
          sx={{
            bgcolor: "primary.main",
            color: "primary.contrastText",
            p: 1,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          <CategoryIcon fontSize="small" />
        </Box>
        <Typography variant="h6" fontWeight={700}>
          Explore Categories
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {categories.map((category) => (
          <FormControlLabel
            key={category._id}
            control={
              <Checkbox
                size="medium"
                sx={{
                  transition: "all 0.3s ease",
                  color: "grey.500",
                  "&.Mui-checked": {
                    color: "primary.main",
                    transform: "scale(1.1)",
                  },
                }}
              />
            }
            label={
              <Typography variant="body1" fontWeight={500}>
                {category.category_name}
              </Typography>
            }
            value={category._id}
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
      </Box>
    </Box>
  );
};

export default Checkbox_category;
