import React, { useState } from "react";
import { ProductType } from "../redux/product/types";
import { Box, Button, Dialog, DialogContent, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteProduct } from "../api";
import { idText } from "typescript";
import { useNavigate } from "react-router-dom";

type ProductCardProps = {
  product: ProductType;
};

function ProductCard(props: ProductCardProps) {
  const [imgUrl, SetImgUrl] = useState(props.product.imageUrl);
    const nav = useNavigate()
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const handleImageError = () => {
    SetImgUrl("/commons/default.png");
  };

  const handleDelete = () => {
    if (props.product.id) {
      deleteProduct(props.product.id);
    }
  };

  const navigate = () => {
    nav(`/product/${props.product.id}`)
  }

  return (
    <Box
      sx={{
        backgroundColor: "#838996",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "250px",
        height: "300px",
        border: "1px solid #4c516d",
        borderRadius: "10px",
      }}
    >
      <Dialog open={isOpenDialog}>
        <DialogContent>
          <h1>Are you sure you want to delete the item?</h1>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Button onClick={() => setIsOpenDialog(false)}>No</Button>
            <Button onClick={handleDelete}>Yes</Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <IconButton onClick={() => setIsOpenDialog(true)}>
          <DeleteIcon />
        </IconButton>
      </Box>
      <Box

        sx={{
          width: "300px",
          height: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
        onClick={navigate}
          src={imgUrl}
          style={{
            border: "1px solid #4c516d",
            borderRadius: "10px",
            width: "200px",
            height: "200px",
            cursor:"pointer"
          }}
          onError={handleImageError}
          alt="Image"
        />
      </Box>
      <h3>{props.product.name}</h3>
    </Box>
  );
}

export default ProductCard;
