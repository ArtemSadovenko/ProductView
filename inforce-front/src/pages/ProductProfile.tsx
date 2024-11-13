import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addComment, getProductById, updateProduct } from "../api";
import { ProductType } from "../redux/product/types";
import { Box, Button, Grid2, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/RootReducer";
import { BlankCommentType, CommentType } from "../redux/comment/types";
import { AddComment } from "@mui/icons-material";

function ProductProfile() {
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState<boolean>(true);
  const products = useSelector((state: RootState) => state.products);
  const [product, setProduct] = useState<ProductType>(
    products.find((item) => item.id === Number(id)) as ProductType
  );
  const [imgUrl, SetImgUrl] = useState("");
  const [disableInput, setDisableInput] = useState(true);
  const [inputError, setInoutError] = useState({
    nameError: false,
    countError: false,
    sizeWidthError: false,
    sizeHeightError: false,
    weightError: false,
  });
  const [comment, setComment] = useState("");

  const [error, setError] = useState(false);
  useEffect(() => {
    setLoading(true);
    if (id) {
      const currentProduct = products.find(
        (item) => item.id === Number(id)
      ) as ProductType;
      setProduct(currentProduct);

      SetImgUrl(currentProduct.imageUrl);
    }
    setLoading(false);
  }, [id, products]);

const handleCommentAdd = () => {
  if(comment){
    const newComment: BlankCommentType = {
      description: comment,
      date: "", 
    };
  
    addComment(id? Number(id): 0, newComment)
    // Create a new product object with updated comments (immutable update)
    const newProduct: ProductType = {
      ...product,  // Copy the rest of the product
      comments: [...product.comments, newComment],  // Add the new comment immutably
    };
    setProduct((prevData) => ({
      ...prevData,
      comments: [...prevData.comments, { id: 20, description: comment, date: "", productId: id ? Number(id) : 0 } as CommentType],
    }));
    

    updateProduct(newProduct)
  }
}

  const handleImageError = () => {
    SetImgUrl("/commons/default.png");
  };

  const handleUpdateSubmit = () => {
    if (
      !product.imageUrl ||
      !product.name ||
      !product.count ||
      !product.size.width ||
      !product.size.height ||
      !product.weight
    ) {
      setError(true);
    } else {
      setError(false);
      updateProduct(product);
    }
  };

  return (
    <div>
      {!loading ? (
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "#979aaa",
            overflowX: "auto",
          }}
        >
          <Box
            sx={{
              padding: "32px 0px 0px 32px",
            }}
          >
            <Grid2 container spacing={3}>
              <Grid2 size={4}>
                <h2>{product.name} Details</h2>
                {imgUrl && (
                  <img
                    src={imgUrl}
                    style={{
                      border: "1px solid #4c516d",
                      borderRadius: "10px",
                      width: "400px",
                      height: "400px",
                    }}
                    onError={handleImageError}
                    alt="Image"
                  />
                )}
              </Grid2>
              <Grid2 size={8}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "40%",
                    marginTop: "64px",
                  }}
                >
                  <TextField
                    label="Product Name"
                    variant="standard"
                    value={product.name}
                    disabled={disableInput}
                    error={inputError.nameError}
                    onChange={(event) => {
                      setProduct((prevData) => ({
                        ...prevData,
                        name: event.target.value,
                      }));
                    }}
                  ></TextField>

                  <TextField
                    label="Count"
                    variant="standard"
                    value={product.count}
                    disabled={disableInput}
                    error={inputError.countError}
                    onChange={(event) => {
                      setProduct((prevData) => ({
                        ...prevData,
                        count: Number(event.target.value),
                      }));
                    }}
                  ></TextField>

                  <TextField
                    label="Width"
                    variant="standard"
                    value={product.size.width}
                    disabled={disableInput}
                    error={inputError.sizeWidthError}
                    type="number"
                    onChange={(event) => {
                      setProduct((prevData) => ({
                        ...prevData,
                        size: {
                          width: Number(event.target.value),
                          height: prevData.size.height,
                        },
                      }));
                    }}
                  ></TextField>

                  <TextField
                    label="Height"
                    variant="standard"
                    value={product.size.height}
                    disabled={disableInput}
                    error={inputError.sizeHeightError}
                    type="number"
                    onChange={(event) => {
                      setProduct((prevData) => ({
                        ...prevData,
                        size: {
                          width: prevData.size.width,
                          height: Number(event.target.value),
                        },
                      }));
                    }}
                  ></TextField>

                  <TextField
                    label="Weight"
                    variant="standard"
                    value={product.weight}
                    disabled={disableInput}
                    error={inputError.weightError}
                    onChange={(event) => {
                      setProduct((prevData) => ({
                        ...prevData,
                        weight: event.target.value,
                      }));
                    }}
                  ></TextField>
                  <Box
                    sx={{
                      margin: "24px 24px 24px 6px ",
                    }}
                  >
                    {disableInput ? (
                      <Button
                        variant="outlined"
                        onClick={() => setDisableInput(false)}
                      >
                        Edit
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        onClick={() => handleUpdateSubmit()}
                      >
                        Submit
                      </Button>
                    )}
                  </Box>
                  <Box
                    sx={{
                      paddingBottom: "34px",
                      display: "flex",
                      width: "500px",
                    }}
                  >
                    <Box>
                      <h3>Comments:</h3>
                      <ul>
                        {product.comments.map((comment) => (
                          <li>{comment.description} </li>
                        ))}
                      </ul>
                    </Box>
                    <Box
                      sx={{
                        padding: "12px 24px 12px 24px ",
                      }}
                    >
                      <TextField
                        sx={{
                          width: "auto",
                          marginBottom:"12px"
                        }}
                        value={comment}
                        placeholder="Leave a comment!"
                        multiline
                        onChange={(event) => {
                          setComment(event.target.value);
                        }}
                      ></TextField>
                      <Box  sx={{
                        width:"100%",
                        display:"flex",
                        justifyContent: "flex-end"
                      }}>
                        <Button variant="outlined" onClick={handleCommentAdd}>Confirm</Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                {/* 

              <h3>{product.name}</h3>
              <Typography>
                <strong>Weight:</strong> {product.weight}
              </Typography>
              <Typography>
                <strong>Count:</strong> {product.count}
              </Typography>
              <Typography>
                <strong>Size:</strong> {product.size.width} x{" "}
                {product.size.height}
              </Typography>
              <h4>Comments:</h4>
              <ul>
                {product.comments.map((comment, index) => (
                  <li key={index}>{comment.description}</li>
                ))}
              </ul> */}
              </Grid2>
            </Grid2>
          </Box>
        </Box>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
}

export default ProductProfile;
