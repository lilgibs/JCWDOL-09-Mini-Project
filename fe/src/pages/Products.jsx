import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Flex, CardHeader, CardBody, CardFooter, SimpleGrid, Heading, Button, Text, Stack, ButtonGroup, Divider, Image } from '@chakra-ui/react'
import { Filter } from "../components";
import { useDispatch } from "react-redux";
import { addToCart, fetchCart } from "../features/cart/cartSlice";
import { formatRupiah } from "../utils/formatRupiah";

function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(3)
  const [maxPage, setMaxPage] = useState(0)
  const [idCategory, setIdCategory] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  const dispatch = useDispatch();

  const handleFilterChange = ({ category, sortOrder }) => {
    setIdCategory(category);
    setSortBy(sortOrder);
    setPage(1); // Reset page to 1 when filter changes
  };

  const fetchProducts = async () => {
    let url = `http://localhost:5500/products?page=${page}&limit=${limit}`;

    if (idCategory) {
      url += `&id_category=${idCategory}`
    }

    if (sortBy) {
      url += `&sortBy=${sortBy}`
    }

    let response = await axios.get(url)

    console.log(response);
    setProducts(response.data.data);
    setMaxPage(Math.ceil(response.data.total / limit))
  };

  const renderProducts = () => {
    return products.map((product) => {
      return (
        <Card maxW='xs'>
          <CardBody>
            <Image
              src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
              alt='Green double couch with wooden legs'
              borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
              <Heading size='md'>{product.name}</Heading>
              <Text>
                {product.description}
              </Text>
              <p className="text-teal-400 font-semibold text-xl">
                {formatRupiah(product.price)}
              </p>
              <Text fontSize='sm' align='right' as='i'>
                {product.total_sales} Terjual
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing='2'>
              <button
                className=" bg-teal-400 text-white px-2 py-1 rounded-sm font-semibold hover:bg-teal-500"
                onClick={() => handleAddTocart(product)}
              >
                Add to cart
              </button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      );
    });
  };

  const handlePageClick = (newPage) => {
    setPage(newPage);
  };

  const renderPagination = () => {
    return (
      <Flex justifyContent="center" mt="4">
        <Button
          colorScheme="teal"
          onClick={() => handlePageClick(Math.max(page - 1, 1))}
          disabled={page === 1}
          mr="2"
        >
          Prev
        </Button>
        <Text px="4" py="2">
          {page} of {maxPage}
        </Text>
        <Button
          colorScheme="teal"
          onClick={() => handlePageClick(Math.min(page + 1, maxPage))}
          disabled={page === maxPage}
          ml="2"
        >
          Next
        </Button>
      </Flex>
    );
  };

  const handleAddTocart = (product) => {
    dispatch(addToCart({
      productId: product.id,
      quantity: 1,
      name: product.name,
      price: product.price,
      image: product.image,
    }))
  }

  useEffect(() => {
    fetchProducts();
  }, [page, idCategory, sortBy]);

  return (
    <>
       <Filter onFilterChange={handleFilterChange} />
      <Flex justifyContent="center" mt="3">
          <SimpleGrid spacing={10} templateColumns='repeat(3, minmax(250px, 1fr))'>
            {renderProducts()}
          </SimpleGrid>
      </Flex>
      {renderPagination()}
    </>
  );
}

export default Products;
