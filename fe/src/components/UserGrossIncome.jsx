import {
  VStack,
  Box,
  Text,
  Flex,
  Badge,
  InputGroup,
  Input,
  InputLeftAddon,
  FormControl,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { formatRupiah } from '../utils/formatRupiah';

function UserGrossIncome() {
  const [grossIncomeData, setGrossIncomeData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const userToken = localStorage.getItem('user_token');

  const fetchData = async () => {
    try {
      let response = await axios.get(`http://localhost:5500/statistic/gross-income`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        params: {
          startDate: startDate || undefined,
          endDate: endDate || undefined,
        },
      });
      console.log(response.data);
      setGrossIncomeData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  return (
    <Flex px={4} mt={8} direction={{ base: 'column', md: 'row' }}>
      <Box
        boxShadow="md"
        p={4}
        rounded="md"
        bg="white"
        mb={{ base: 4, md: 0 }}
        mr={{ base: 0, md: 4 }}
      >
        <FormControl>
          <InputGroup mb={4}>
            <InputLeftAddon width="70px" children="From" />
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon width="70px" children="To" />
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </InputGroup>
        </FormControl>
      </Box>
      <VStack spacing={4} w="100%">
        {grossIncomeData.map((data) => (
          <Box
            key={data.date}
            boxShadow="md"
            p={5}
            rounded="md"
            bg="white"
            w="100%"
          >
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontSize="xl" fontWeight="bold">
                {data.date}
              </Text>
              <Badge fontSize="xl" colorScheme="green" p={2}>
                Income: {formatRupiah((parseFloat(data.gross_income)))}
              </Badge>
            </Flex>
          </Box>
        ))}
      </VStack>
    </Flex>
  );
}

export default UserGrossIncome;
