import React ,{useState} from 'react';
import {Container,Fab, Input, Pagination} from '@mui/material/';
import Navbar from '../Component/Navbar';
import NoteBox from '../Component/Notebox';
import Editor from '../Component/Editor/Index';
import EditIcon from '@mui/icons-material/Edit';

export default function Index() {


  return (
    <div>
      <Navbar/>
       <NoteBox/>
        <Editor/>
    </div>
  );
}