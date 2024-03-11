'use client'
import { Box, Card, CardActionArea, CardActions, CardMedia, SvgIcon, Typography, IconButton, Tooltip, Button } from '@mui/material'
import Link from 'next/link'
import React, { useState } from 'react'
import Share07Icon from '@untitled-ui/icons-react/build/esm/Share07';
import { formatPrice } from '@/utils/format-price';

export default function Item({ item, ...props }) {

  const [copied, setCopied] = useState(false);

  const handleShare = (link) => {
    navigator.clipboard.writeText(link)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
      })
      .catch((error) => {
        console.error('Failed to copy link to clipboard:', error);
      });
  };


  return (
    <>
      <Card
        sx={{ maxWidth: 250 }}
        {...props}
      >

        <CardActionArea>
          <Link href={`/catalog/items/${item.id}`}>
            {item?.images?.[0]?.url ? (
              <CardMedia
                component="img"
                height="140"
                image={item?.images?.[0]?.url}
                alt={item.name}
              />
            ) : (
              <Box
                sx={{
                  height: 140,
                  backgroundColor: 'grey.300'
                }}
              />
            )}
            <Box
              sx={{
                pt: 2,
                pb: 1,
                px: 3
              }}
            >
              <Typography variant="h6" component="div"
                sx={{
                  mb: 2
                }}
              >
                {item.name ? item.name : 'No name'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.price ?
                  formatPrice({ price: item.price, currency: item.currency })
                  : 'No price'
                }
              </Typography>
            </Box>
          </Link>
        </CardActionArea>
        <CardActions
          sx={{
            justifyContent: 'space-between',
            px: 3,
            pb: 2
          }}
        >
          <Button
            sx={{
              width: '100%',
              mr: 1
            }}
            component={Link} href={`/catalog/items/${item.id}`} variant='outlined'
          >
            View
          </Button>

          <Tooltip
            title={
              copied ? 'Link copied to clipboard!' : 'Share'
            }
          >
            <IconButton
              aria-label="share"
              sx={{
                color: 'primary.main'
              }}
              onClick={() => handleShare(`${window.location.origin}/catalog/items/${item.id}`)}
            >
              <SvgIcon>
                <Share07Icon />
              </SvgIcon>
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </>
  )
}
