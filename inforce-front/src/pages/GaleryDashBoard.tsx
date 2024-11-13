import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/RootReducer";
import { createProduct, getAllProducts } from "../api";
import { setProducts } from "../redux/product/productSlice";
import { ProductType } from "../redux/product/types";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid2,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import ProductCard from "../components/ProductCard";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";

function GaleryDashBoard() {
  const products: ProductType[] = useSelector(
    (state: RootState) => state.products
  );
  const dispatch = useDispatch();
  const [isShowPreloader, setIsShowPreloader] = useState(true);
  const [productsList, setProductsList] = useState<ProductType[]>([]);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [dialogError, setDialogError] = useState(false);
  const [productData, setProductData] = useState<ProductType>({
    id: undefined,
    imageUrl: "",
    name: "",
    count: 0,
    size: { width: 0, height: 0 },
    weight: "",
    comments: [],
  });
  useEffect(() => {
    fetchProducts();
    setIsShowPreloader(false);
  }, []);

  const fetchProducts = async () => {
    try {
      const productData = await getAllProducts();

      if (productData) {
        dispatch(setProducts(productData));
        setProductsList(productData);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddClick = () => {
    setIsOpenDialog(!isOpenDialog);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {

    if (
      !productData.name ||
      !productData.imageUrl ||
      !productData.count ||
      !productData.size.width ||
      !productData.size.height ||
      !productData.weight
    ) {
      setDialogError(true);
      return;
    } else {
      setDialogError(false);
    }

    try {
      await createProduct(productData);
      setIsOpenDialog(false);
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#979aaa",
        overflowX: "auto",
        padding: "12px 24px 12px 24px ",
      }}
    >
      <Dialog open={isOpenDialog}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <TextField
            label="Product Name"
            name="name"
            value={productData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Image URL"
            name="imageUrl"
            value={productData.imageUrl}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Count"
            name="count"
            type="number"
            value={productData.count}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Width"
            name="size.width"
            type="number"
            value={productData.size.width}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Height"
            name="size.height"
            type="number"
            value={productData.size.height}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Weight"
            name="weight"
            value={productData.weight}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {dialogError && (
            <Typography>Please, fill all the fileds properly</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClick} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <h1>Products Galery</h1>

      {isShowPreloader ? (
        <div>Loading products...</div>
      ) : (
        <Box>
          <Grid2 container spacing={2}>
            {productsList.map((product) => (
              <Grid2 key={product.id} size={{ xs: 6, sm: 4, md: 3 }}>
                <ProductCard product={product} />
              </Grid2>
            ))}
          </Grid2>
          <Box
            sx={{
              position: "fixed",
              bottom: 16,
              right: 16,
              zIndex: 1000,
            }}
          >
            <IconButton
              color="primary"
              aria-label="add"
              sx={{
                backgroundColor: "#4c516d",
                color: "white",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              }}
              onClick={handleAddClick}
            >
              <AddIcon />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default GaleryDashBoard;
