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

function UserCategoryEditModal({ isOpen, onClose, category, onUpdate }) {
  // State untuk menyimpan nilai form
  const [updatedCategory, setUpdatedCategory] = useState({})

  // Perbarui state saat input berubah
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUpdatedCategory({ ...updatedCategory, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Panggil fungsi onUpdate untuk mengirim data yang diperbarui
      onUpdate(updatedCategory)
      onClose()
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setUpdatedCategory(category)
  }, [category])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Produk</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {updatedCategory && category && (
            <>
              <FormControl mt={4}>
                <FormLabel>Nama kategori</FormLabel>
                <Input
                  name='name'
                  value={updatedCategory.name}
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

export default UserCategoryEditModal