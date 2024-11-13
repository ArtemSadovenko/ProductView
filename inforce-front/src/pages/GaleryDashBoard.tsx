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
  FormControl,
  Grid2,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import ProductCard from "../components/ProductCard";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";

enum SortCase {
  ASCE = "Alphabetically",
  DESC = "Reverce Alphabetically",
  COUNT = "By value",
}

function GaleryDashBoard() {
  let products: ProductType[];
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
  const [sort, setSort] = useState<SortCase>(SortCase.ASCE);

  useEffect(() => {
    fetchProducts();
    setIsShowPreloader(false);
  }, []);

  const fetchProducts = async () => {
    setIsShowPreloader(true);
    try {
      const productData = await getAllProducts();

      if (productData) {
        dispatch(setProducts(productData));
        sortView(productData, sort);
      }
      if (productsList) {
        setIsShowPreloader(false);
      }
    } catch (error) {
      setIsShowPreloader(false);
      console.error("Error fetching products:", error);
    }
  };

  const handleAddClick = () => {
    setIsOpenDialog(!isOpenDialog);
  };

  const sortView = (list: ProductType[], sort: SortCase) => {
    switch (sort) {
      case SortCase.ASCE:
        return setProductsList(
          list.sort((a, b) =>
            a.name.toLowerCase().localeCompare(b.name.toLowerCase())
          )
        );
      case SortCase.DESC:
        return setProductsList(
          list.sort((a, b) =>
            b.name.toLowerCase().localeCompare(a.name.toLowerCase())
          )
        );
      case SortCase.COUNT:
        return setProductsList(list.sort((a, b) => a.count - b.count));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleInnnerSizeValuerChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      size: {
        ...prevData.size,
        [name]: value,
      },
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
      fetchProducts();
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "#979aaa",
        overflowX: "auto",
        // padding: "12px 24px 12px 24px ",
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
            name="width"
            type="number"
            value={productData.size.width}
            onChange={handleInnnerSizeValuerChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Height"
            name="height"
            type="number"
            value={productData.size.height}
            onChange={handleInnnerSizeValuerChange}
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

      <Box
        sx={{
          width: "90%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 48px 12px 24px",
        }}
      >
        <h1>Products Galery</h1>
        <FormControl
          sx={{
            width: "auto",
          }}
        >
          <InputLabel>Sort</InputLabel>
          <Select
            value={sort}
            label="Sort"
            onChange={(event) => {
              setSort(event.target.value as SortCase);
              sortView(productsList, event.target.value as SortCase);
            }}
          >
            <MenuItem value={SortCase.ASCE}>Alphabetically</MenuItem>
            <MenuItem value={SortCase.DESC}>Reverce Alphabetically</MenuItem>
            <MenuItem value={SortCase.COUNT}>By value</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {isShowPreloader ? (
        <div>Loading products...</div>
      ) : (
        <Box >
          <Grid2 container   spacing={2} >
            {productsList.map((product) => (
              <Grid2 display="flex" justifyContent="center" alignItems="center"  key={product.id} size={{ xs: 6, sm: 4, md: 3 }}>
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
