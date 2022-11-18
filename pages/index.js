import {
  Box,
  Container,
  Table,
  TableContainer,
  Thead,
  useColorModeValue,
  Button,
  Tbody,
  Td,
  Th,
  Tr,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import backend from "../api/backend";
import { getAllMahasiswa } from "../api/backend";
import axios from "axios";
import Navbar from "../components/navbar";

export default function Home() {
  const [mahasiswas, setMahasiswas] = useState([]);
  const [user, setUser] = useState();

  async function getAllMahasiswa() {
    try {
      const res = await backend.get(`/mahasiswa`);
      const data = res.data;

      console.log(data.mahasiswa);
      setMahasiswas(data.mahasiswa);
    } catch (error) {
      console.log(error);
    }
  }

  // const hasUserLogedIn = () => {
  //   const loggedInUser = localStorage.getItem("user");

  //   if (loggedInUser) {
  //     const foundUser = loggedInUser;
  //     setUser(foundUser);
  //     // console.log("user logged in");
  //   }
  // };

  // const handleDelete = async (nim) => {
  //   const token = localStorage.getItem("user");
  //   const decoded = Buffer.from(token.split(".")[1], "base64").toString();
  //   const nimToken = JSON.parse(decoded).nim;

  //   if (nimToken !== mahasiswas.nim) {
  //     console.log("not authorized");
  //     return;
  //   }
  //   try {
  //     const res = await backend.delete(`/mahasiswa/${nim}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     const data = res.data;
  //     console.log(data);
  //     getAllMahasiswa();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    getAllMahasiswa();
    // hasUserLogedIn();
  }, []);

  return (
    <Box
      justify="center"
      align="center"
      minH="100vh"
      bg={useColorModeValue("gray.50", "gray.800")}
      pt={5}
      pb={10}
      px={10}
    >
      <Navbar />
      <Box
        rounded="lg"
        bg={useColorModeValue("white", "gray.700")}
        p={8}
        boxShadow="lg"
      >
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>NIM</Th>
                <Th>Nama</Th>
                <Th>Angkatan</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {mahasiswas &&
                mahasiswas.map((mahasiswa, index) => (
                  <Tr key={mahasiswa.nim}>
                    <Td>{index + 1}</Td>
                    <Td>{mahasiswa.nim}</Td>
                    <Td>{mahasiswa.nama}</Td>
                    <Td>{mahasiswa.angkatan}</Td>
                    <Td>
                      <Button>Delete</Button>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
