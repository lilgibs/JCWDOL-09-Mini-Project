import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

function UserProductEditModal({ isOpen, onClose, product, onUpdate }) {
  // State untuk menyimpan nilai form
  const [updatedProduct, setUpdatedProduct] = useState({})

  // Perbarui state saat input berubah
  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'image') {
      setUpdatedProduct({ ...updatedProduct, [name]: e.target.files[0] })
    } else {
      setUpdatedProduct({ ...updatedProduct, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Deklarasi FormData object
      const formData = new FormData()

      // Append form data ke FormData object
      Object.entries(updatedProduct).forEach(([key, value]) => {
        formData.append(key, value)
      })

      // Panggil fungsi onUpdate untuk mengirim data yang diperbarui
      onUpdate(formData)
      onClose()
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setUpdatedProduct(product)
  }, [product])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Produk</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {updatedProduct && product && (
            <>
              <FormControl mt={4}>
                <FormLabel>Nama barang</FormLabel>
                <Input
                  name='product_name'
                  value={updatedProduct.product_name}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Harga</FormLabel>
                <Input
                  name='price'
                  value={updatedProduct.price}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Image</FormLabel>
                <Input
                  type="file"
                  name="image"
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Deskripsi</FormLabel>
                <Input
                  name='description'
                  value={updatedProduct.description}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Status</FormLabel>
                <Input
                  name='active'
                  value={updatedProduct.active}
                  onChange={handleInputChange}
                />
              </FormControl><FormControl mt={4}>
                <FormLabel>Kategori</FormLabel>
                <Input
                  name='category_id'
                  value={updatedProduct.category_id}
                  onChange={handleInputChange}
                />
              </FormControl>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Simpan
          </Button>
          <Button onClick={onClose}>Batal</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserProductEditModal