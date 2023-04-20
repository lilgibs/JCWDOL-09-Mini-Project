import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, Heading, Button, Text, Stack, ButtonGroup, Divider, Image } from '@chakra-ui/react'
import { Filter, Navbar } from "../components";

function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(6)
  const [maxPage, setMaxPage] = useState(0)
  const [idCategory, setIdCategory] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  
  const handleFilterChange = ({ category, sortOrder }) => {
    setIdCategory(category);
    setSortBy(sortOrder);
    setPage(1); // Reset page to 1 when filter changes
  };

  const fetchProducts = async () => {
    let url = `http://localhost:5500/products?page=${page}&limit=${limit}`;

    if(idCategory){
      url+= `&id_category=${idCategory}`
    }

    if(sortBy){
      url+= `&sortBy=${sortBy}`
    }

    let response = await axios.get(url)
    
    console.log(response);
    setProducts(response.data.data);
    setMaxPage(Math.ceil(response.data.total/limit))
  };

  const renderProducts = () => {
    return products.map((product) => {
      return (
        <Card maxW='sm'>
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
              <Text color='blue.600' fontSize='2xl'>
                Rp. {product.price}
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing='2'>
              <button className="bg-emerald-500 text-white p-2 rounded-md font-semibold hover:bg-emerald-600">
                Buy now
              </button>
              <Button variant='ghost' colorScheme='blue'>
                Add to cart
              </Button>
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
      <div className="flex justify-center mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          onClick={() => handlePageClick(Math.max(page - 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span className="text-blue-500 px-4 py-2">
          {page} of {maxPage}
        </span>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
          onClick={() => handlePageClick(Math.min(page + 1, maxPage))}
          disabled={page === maxPage}
        >
          Next
        </button>
      </div>
    );
  };

  useEffect(() => {
    fetchProducts();
  }, [page, idCategory, sortBy]);

  return (
    <>
      <Navbar/>
      <Filter onFilterChange={handleFilterChange} />
    <div className="flex justify-center mt-3">
      <SimpleGrid spacing={4} templateColumns='repeat(3, minmax(250px, 1fr))'>
        {renderProducts()}
      </SimpleGrid>

    </div>
    {renderPagination()}
    </>
  );
}

export default Products;
