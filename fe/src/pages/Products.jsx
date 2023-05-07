import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Flex, CardHeader, CardBody, CardFooter, SimpleGrid, Heading, Button, Text, Stack, ButtonGroup, Divider, Image } from '@chakra-ui/react'
import { Filter } from "../components";
import { useDispatch } from "react-redux";
import { addToCart, fetchCart } from "../features/cart/cartSlice";
import { formatRupiah } from "../utils/formatRupiah";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(8)
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
              src={`http://localhost:5500/` + product.image}
              alt='Green double couch with wooden legs'
              borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
              <Heading size='md' className="truncate">{product.name}</Heading>
              <Text className="truncate text-sm">
                {product.description}
              </Text>
              <p className="text-teal-400 font-semibold text-lg">
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
                <FontAwesomeIcon icon={faCartPlus} /> Add to cart
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
          bg="teal.400"
          color="white"
          _hover={{ bg: "teal.500" }}
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
          bg="teal.400"
          color="white"
          _hover={{ bg: "teal.500" }}
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
      <Flex
        className="w-3/4 mx-auto items-center justify-center border mt-3 rounded-md"
        justifyContent="center"
        alignItems="center"
      >
        <SimpleGrid
          spacing={5}
          templateColumns="repeat(4, minmax(120px, 1fr))"
          w="full"
          maxW="1200px"
          mx="auto"
          p={4}
        >
          {renderProducts()}
        </SimpleGrid>
      </Flex>

      {renderPagination()}
    </>
  );
}

export default Products;
