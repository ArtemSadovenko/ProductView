import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getProductById } from '../api';
import { ProductType } from '../redux/product/types';
import { Box, Typography } from '@mui/material';

function ProductProfile() {
  const { id } = useParams<{ id: string }>(); 
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 

  const [imgUrl, SetImgUrl] = useState(product?.imageUrl);
  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const fetchedProduct = await getProductById(Number(id)); 
          setProduct(fetchedProduct); 
          setLoading(false); 
        } catch (err) {
          setError('Failed to fetch product details');
          setLoading(false);
        }
      }
    };

    fetchProduct();
  }, [id]); 

  const handleImageError = () => {
    SetImgUrl("/commons/default.png");
  };


  return (
    <div>
      {product ? (
        <Box>
          <h2>Product Details</h2>
          <img

          src={imgUrl}
          style={{
            border: "1px solid #4c516d",
            borderRadius: "10px",
            width: "200px",
            height: "200px",
          }}
          onError={handleImageError}
          alt="Image"
        />
          <h3>{product.name}</h3>
          <Typography><strong>Weight:</strong> {product.weight}</Typography>
          <Typography><strong>Count:</strong> {product.count}</Typography>
          <Typography><strong>Size:</strong> {product.size.width} x {product.size.height}</Typography>
          <h4>Comments:</h4>
          <ul>
            {product.comments.map((comment, index) => (
              <li key={index}>{comment.description}</li> 
            ))}
          </ul>
        </Box>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
}

export default ProductProfile
