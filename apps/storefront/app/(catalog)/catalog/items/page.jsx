import Catalog from '@/components/catalog/Catalog'
import React from 'react'
import { organization } from 'ui/config'

export const metadata = {
  title: `${organization.name} | Catalog`,
  description: 'Catalog of items',
}

// const items = fetch(process.env.CATALOG_API_URL + '/items').then(res => res.json())
// const categories = fetch(process.env.CATALOG_API_URL + '/categories').then(res => res.json())
// const options = fetch(process.env.CATALOG_API_URL + '/options').then(res => res.json())

const categories = [
  {
    id: "1",
    name: "Sedans",
    slug: "sedans",
    banner: {
      url: "https://via.placeholder.com/1500x500",
      alt: "Sedans"
    },
    description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    logo: {
      url: "https://via.placeholder.com/500x500",
      alt: "Sedans"
    },
    isActive: true
  },
  {
    id: "2",
    name: "SUVs",
    slug: "suvs",
    banner: {
      url: "https://via.placeholder.com/1500x500",
      alt: "SUVs"
    },
    description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    logo: {
      url: "https://via.placeholder.com/500x500",
      alt: "SUVs"
    },
    isActive: true
  },
  {
    id: "3",
    name: "Trucks",
    slug: "trucks",
    banner: {
      url: "https://via.placeholder.com/1500x500",
      alt: "Trucks"
    },
    description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    logo: {
      url: "https://via.placeholder.com/500x500",
      alt: "Trucks"
    },
    isActive: true
  },
  {
    id: "4",
    name: "Electric",
    slug: "electric",
    banner: {
      url: "https://via.placeholder.com/1500x500",
      alt: "Electric"
    },
    description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    logo: {
      url: "https://via.placeholder.com/500x500",
      alt: "Electric"
    },
    isActive: true
  },
  {
    id: "5",
    name: "Sports",
    slug: "sports",
    banner: {
      url: "https://via.placeholder.com/1500x500",
      alt: "sports"
    },
    description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    logo: {
      url: "https://via.placeholder.com/500x500",
      alt: "sports"
    },
    isActive: true
  }
];

const items = [
  {
    id: "1",
    name: "Hyundai Accent",
    quantity: 10,
    images: [{
      url: "https://via.placeholder.com/500x500",
    }],
    price: 75000.00,
    currency: "SAR",
    description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    category: [{ id: "1" }],
    storeId: "1",
    status: "Approved",
    attributes: [],
    options: [],
    order: 1,
    isActive: true,
    isTaxable: false
  },
  {
    id: "2",
    name: "Hyundai Elantra",
    quantity: 10,
    images: [{
      url: "https://via.placeholder.com/500x500",
    }],
    price: 85000.00,
    currency: "SAR",
    description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    category: [{ id: "1" }],
    storeId: "1",
    status: "Approved",
    attributes: [],
    options: [],
    order: 2,
    isActive: true,
    isTaxable: false
  },
  {
    id: "3",
    name: "Hyundai Sonata",
    quantity: 10,
    images: [{
      url: "https://via.placeholder.com/500x500",
    }],
    price: 95000.00,
    currency: "SAR",
    description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    category: [{ id: "1" }],
    storeId: "1",
    status: "Approved",
    attributes: [],
    options: [],
    order: 3,
    isActive: true,
    isTaxable: false
  },
  {
    id: "4",
    name: "Hyundai Azera",
    quantity: 10,
    images: [{
      url: "https://via.placeholder.com/500x500",
    }],
    price: 105000.00,
    currency: "SAR",
    description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    category: [{ id: "1" }],
    storeId: "1",
    status: "Approved",
    attributes: [],
    options: [],
    order: 4,
    isActive: true,
    isTaxable: false
  },
  {
    id: "5",
    name: "Hyundai Genesis",
    quantity: 10,
    images: [{
      url: "https://via.placeholder.com/500x500",
    }],
    price: 125000.00,
    currency: "SAR",
    description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    category: [{ id: "1" }],
    storeId: "1",
    status: "Approved",
    attributes: [],
    options: [],
    order: 5,
    isActive: true,
    isTaxable: false
  },
  {
    id: "6",
    name: "Hyundai Equus",
    quantity: 10,
    images: [{
      url: "https://via.placeholder.com/500x500",
    }],
    price: 150000.00,
    currency: "SAR",
    description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    category: [{ id: "1" }],
    storeId: "1",
    status: "Approved",
    attributes: [],
    options: [],
    order: 6,
    isActive: true,
    isTaxable: false
  }
];

const options = [
  {
    id: "1",
    title: "Color",
    values: [{
      id: "1",
      label: "Red",
      value: "red"
    }, {
      id: "2",
      label: "Blue",
      value: "blue"
    }, {
      id: "3",
      label: "Black",
      value: "black"
    }]
  },
  {
    id: "2",
    title: "Wheel Size",
    values: [{
      id: "1",
      label: "Small",
      value: "small"
    }, {
      id: "2",
      label: "Medium",
      value: "medium"
    }, {
      id: "3",
      label: "Large",
      value: "large"
    }]
  },
  {
    id: "3",
    title: "Engine",
    values: [{
      id: "1",
      label: "4 Cylinder",
      value: "4cylinder"
    }, {
      id: "2",
      label: "6 Cylinder",
      value: "6cylinder"
    }, {
      id: "3",
      label: "8 Cylinder",
      value: "8cylinder"
    }]
  }
];

const filters = {
  categories,
  options
}

export default function page() {
  return (
    <>
      <Catalog items={items} filters={filters} title={'Catalog'} />
    </>
  )
}
