// src/_component/ProductGallery/page.tsx
import { useState } from 'react';
import { Box, Grid, Paper } from '@mui/material';
import Image from 'next/image';
import { Product } from '@/types/product';

interface ProductGalleryProps {
  product: Product;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const [mainImage, setMainImage] = useState(product.images[0]);

  return (
    <Box>
      {/* Main Image */}
      <Paper elevation={0} sx={{ 
        mb: 2, 
        height: '400px', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        bgcolor: 'background.paper'
      }}>
        <Image
          src={mainImage}
          alt={product.name}
          width={400}
          height={400}
          style={{ 
            maxWidth: '100%', 
            maxHeight: '100%', 
            objectFit: 'contain' 
          }}
        />
      </Paper>
      
      {/* Thumbnail Images */}
      <Grid container spacing={1}>
        {product.images.map((image, index) => (
          <Grid key={index} size={{xs:3,sm:2,md:2}} >
            <Paper 
              elevation={0} 
              sx={{ 
                p: 1, 
                border: mainImage === image ? '2px solid' : '1px solid',
                borderColor: mainImage === image ? 'primary.main' : 'divider',
                cursor: 'pointer',
                height: '80px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'background.paper'
              }}
              onClick={() => setMainImage(image)}
            >
              <Image
                src={image}
                alt={`${product.name} - view ${index + 1}`}
                width={70}
                height={70}
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '100%', 
                  objectFit: 'contain' 
                }}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}